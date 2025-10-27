import re
import os
from collections import Counter
from pythainlp import word_tokenize
from pythainlp.corpus.common import thai_stopwords

# === Stopwords ===
EN_STOPWORDS = {
    "the", "a", "an", "and", "or", "if", "is", "of", "in", "to", "for", "on",
    "at", "by", "with", "as", "from", "that", "this", "it", "be", "are",
    "was", "were", "but", "not", "can", "have", "has", "had", "do", "does",
    "did", "so", "such", "no", "yes", "there", "their", "them", "they", "he",
    "she", "his", "her", "you", "your", "yours", "me", "my", "mine", "we",
    "our", "ours"
}

TH_STOPWORDS = set(thai_stopwords())

def clean_and_tokenize(text: str):
    # ตัดคำภาษาไทย + แยกภาษาอังกฤษด้วย regex
    th_tokens = word_tokenize(text, keep_whitespace=False)
    en_tokens = re.findall(r"\b[a-zA-Z']+\b", text.lower())

    # รวม token ทั้งหมด
    words = []
    for w in th_tokens + en_tokens:
        w = w.strip().lower()
        if not w:
            continue
        # ข้าม stopword ทั้งไทยและอังกฤษ + ตัวสั้นเกินไป
        if w in EN_STOPWORDS or w in TH_STOPWORDS or len(w) <= 1:
            continue
        words.append(w)

    return words

def top_meaningful_words(filepath, top_n=10):
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()
    words = clean_and_tokenize(text)
    counter = Counter(words)
    return counter.most_common(top_n)

# === MAIN EXECUTION ===
base_dir = os.path.dirname(__file__)
file1 = os.path.join(base_dir, "file1.txt")
file2 = os.path.join(base_dir, "file2.txt")

top1 = top_meaningful_words(file1)
top2 = top_meaningful_words(file2)

print(f"\n🔹 Top 10 คำที่พบบ่อยใน {os.path.basename(file1)}:")
for word, count in top1:
    print(f"{word}: {count}")

print(f"\n🔹 Top 10 คำที่พบบ่อยใน {os.path.basename(file2)}:")
for word, count in top2:
    print(f"{word}: {count}")
