/*
  Warnings:

  - You are about to drop the column `date` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Post` table. All the data in the column will be lost.
  - Added the required column `commenteddate` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posteddate` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "date",
ADD COLUMN     "commenteddate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "date",
ADD COLUMN     "posteddate" TIMESTAMP(3) NOT NULL;
