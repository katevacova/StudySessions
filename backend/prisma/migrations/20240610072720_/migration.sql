/*
  Warnings:

  - You are about to drop the column `endedAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `periodic` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledDate` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the `GroupSessions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subject` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Made the column `repeatPeriod` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "GroupSessions" DROP CONSTRAINT "GroupSessions_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupSessions" DROP CONSTRAINT "GroupSessions_sessionId_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "endedAt",
DROP COLUMN "name",
DROP COLUMN "periodic",
DROP COLUMN "scheduledDate",
DROP COLUMN "startedAt",
ADD COLUMN     "end" TIMESTAMP(3),
ADD COLUMN     "repeatSeriesId" TEXT,
ADD COLUMN     "start" TIMESTAMP(3),
ADD COLUMN     "subject" TEXT NOT NULL,
ALTER COLUMN "repeatPeriod" SET NOT NULL,
ALTER COLUMN "repeatPeriod" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "GroupSessions";
