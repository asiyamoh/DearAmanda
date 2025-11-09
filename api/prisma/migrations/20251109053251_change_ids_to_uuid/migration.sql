/*
  Warnings:

  - The primary key for the `compliments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `compliments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `topics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `topics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `topic_id` on the `compliments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "compliments" DROP CONSTRAINT "compliments_topic_id_fkey";

-- AlterTable
ALTER TABLE "compliments" DROP CONSTRAINT "compliments_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "topic_id",
ADD COLUMN     "topic_id" UUID NOT NULL,
ADD CONSTRAINT "compliments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "topics" DROP CONSTRAINT "topics_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "topics_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "compliments_topic_id_idx" ON "compliments"("topic_id");

-- CreateIndex
CREATE INDEX "compliments_topic_id_used_created_at_idx" ON "compliments"("topic_id", "used", "created_at");

-- AddForeignKey
ALTER TABLE "compliments" ADD CONSTRAINT "compliments_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
