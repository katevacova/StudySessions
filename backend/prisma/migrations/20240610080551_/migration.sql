/*
  Warnings:

  - You are about to drop the column `end` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `repeatPeriod` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "end",
DROP COLUMN "repeatPeriod";
