/*
  Warnings:

  - The primary key for the `matriculations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `matriculations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "matriculations" DROP CONSTRAINT "matriculations_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "matriculations_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "matriculations_userId_key" ON "matriculations"("userId");
