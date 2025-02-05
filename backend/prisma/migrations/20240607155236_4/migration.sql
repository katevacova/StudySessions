/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Auth_user_id_key" ON "Auth"("user_id");
