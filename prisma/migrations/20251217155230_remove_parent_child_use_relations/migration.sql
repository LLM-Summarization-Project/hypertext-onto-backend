-- AlterTable
ALTER TABLE "OntologyTopic" ADD COLUMN     "relatedTopics" TEXT[] DEFAULT ARRAY[]::TEXT[];
