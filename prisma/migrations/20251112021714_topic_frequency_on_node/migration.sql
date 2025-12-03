-- CreateTable
CREATE TABLE "OntologyTopic" (
    "id" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "scope" TEXT NOT NULL DEFAULT 'default',
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "frequency" INTEGER NOT NULL DEFAULT 0,
    "score" DOUBLE PRECISION,

    CONSTRAINT "OntologyTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OntologyTopicRelation" (
    "fromTopicId" UUID NOT NULL,
    "toTopicId" UUID NOT NULL,
    "weight" DOUBLE PRECISION,

    CONSTRAINT "OntologyTopicRelation_pkey" PRIMARY KEY ("fromTopicId","toTopicId")
);

-- CreateIndex
CREATE INDEX "OntologyTopic_userId_scope_idx" ON "OntologyTopic"("userId", "scope");

-- CreateIndex
CREATE UNIQUE INDEX "OntologyTopic_userId_scope_name_key" ON "OntologyTopic"("userId", "scope", "name");

-- AddForeignKey
ALTER TABLE "OntologyTopicRelation" ADD CONSTRAINT "OntologyTopicRelation_fromTopicId_fkey" FOREIGN KEY ("fromTopicId") REFERENCES "OntologyTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OntologyTopicRelation" ADD CONSTRAINT "OntologyTopicRelation_toTopicId_fkey" FOREIGN KEY ("toTopicId") REFERENCES "OntologyTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
