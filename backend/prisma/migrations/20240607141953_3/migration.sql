/*
  Warnings:

  - You are about to drop the column `pw_hash` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "pw_hash";

-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "pw_hash" TEXT NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
