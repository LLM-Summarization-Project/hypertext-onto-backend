/*
  Warnings:

  - You are about to drop the column `scope` on the `OntologyTopic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `OntologyTopic` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OntologyTopic_userId_scope_idx";

-- DropIndex
DROP INDEX "OntologyTopic_userId_scope_name_key";

-- AlterTable
ALTER TABLE "OntologyTopic" DROP COLUMN "scope";

-- CreateIndex
CREATE INDEX "OntologyTopic_userId_idx" ON "OntologyTopic"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OntologyTopic_userId_name_key" ON "OntologyTopic"("userId", "name");
