/*
  Warnings:

  - A unique constraint covering the columns `[serialCode]` on the table `matriculations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serialCode` to the `matriculations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matriculations" ADD COLUMN     "serialCode" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "matriculations_serialCode_key" ON "matriculations"("serialCode");
