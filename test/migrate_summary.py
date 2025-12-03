import psycopg2
import pandas as pd

# === 1️⃣ Database URLs ===
OLD_DB_URL = "postgresql://neondb_owner:npg_ibJ9YPwuxIk2@ep-bold-shadow-adfammtu-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
NEW_DB_URL = "postgresql://app:app@localhost:5432/app"  # 👈 แก้ได้ถ้าใช้ DB อื่น

# === 2️⃣ Fetch data from old DB ===
print("⏳ Connecting to OLD database...")
old_conn = psycopg2.connect(OLD_DB_URL)
old_cur = old_conn.cursor()

fetch_query = 'SELECT id, keyword FROM "Summary";'
old_cur.execute(fetch_query)
rows = old_cur.fetchall()

df = pd.DataFrame(rows, columns=["old_id", "keyword"])
print(f"🧾 Fetched {len(df)} total rows from old Summary")

# === 3️⃣ Clean data ===
# แปลงเป็น string, ตัดช่องว่าง, ลบแถวที่ keyword เป็น None, '', 'None'
df["keyword"] = df["keyword"].astype(str).str.strip()
df = df[df["keyword"].notnull() & (df["keyword"] != "") & (df["keyword"].str.lower() != "none")]
df = df.reset_index(drop=True)
print(f"✅ {len(df)} usable rows after cleaning:")
print(df[["old_id", "keyword"]])

old_cur.close()
old_conn.close()

# === 4️⃣ Connect to NEW DB ===
print("⏳ Connecting to NEW database...")
new_conn = psycopg2.connect(NEW_DB_URL)
new_cur = new_conn.cursor()

# --- Ensure pgcrypto extension ---
new_cur.execute("CREATE EXTENSION IF NOT EXISTS pgcrypto;")

# --- Ensure OntologyTopic table exists ---
new_cur.execute("""
CREATE TABLE IF NOT EXISTS "OntologyTopic" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    "createdAt" TIMESTAMP DEFAULT now(),
    UNIQUE("userId", name)
);
""")
new_conn.commit()

# --- Ensure id column default gen_random_uuid() ---
new_cur.execute("""
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT column_default FROM information_schema.columns
        WHERE table_name = 'OntologyTopic'
          AND column_name = 'id'
          AND column_default LIKE '%gen_random_uuid%'
    ) THEN
        EXECUTE 'ALTER TABLE "OntologyTopic" ALTER COLUMN id SET DEFAULT gen_random_uuid();';
    END IF;
END
$$;
""")
new_conn.commit()

# === 5️⃣ Insert filtered data ===
insert_query = """
INSERT INTO "OntologyTopic" ("userId", name)
VALUES (%s, %s)
ON CONFLICT ("userId", name) DO NOTHING;
"""

inserted = 0
for _, row in df.iterrows():
    new_cur.execute(insert_query, (row["old_id"], row["keyword"]))
    inserted += 1

new_conn.commit()
print(f"🚀 Inserted {inserted} valid rows into OntologyTopic")

# === 6️⃣ Verify ===
new_cur.execute('SELECT COUNT(*) FROM "OntologyTopic";')
count = new_cur.fetchone()[0]
print(f"📊 Total rows now in OntologyTopic: {count}")

# === 7️⃣ Clean up ===
new_cur.close()
new_conn.close()
print("🎉 Migration complete — skipped all rows with None or empty keywords.")
