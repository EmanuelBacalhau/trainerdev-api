/*
  Warnings:

  - You are about to drop the `track_modules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "track_modules" DROP CONSTRAINT "track_modules_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "track_modules" DROP CONSTRAINT "track_modules_trackId_fkey";

-- DropTable
DROP TABLE "track_modules";

-- CreateTable
CREATE TABLE "_track_modules" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_track_modules_AB_unique" ON "_track_modules"("A", "B");

-- CreateIndex
CREATE INDEX "_track_modules_B_index" ON "_track_modules"("B");

-- AddForeignKey
ALTER TABLE "_track_modules" ADD CONSTRAINT "_track_modules_A_fkey" FOREIGN KEY ("A") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_track_modules" ADD CONSTRAINT "_track_modules_B_fkey" FOREIGN KEY ("B") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
