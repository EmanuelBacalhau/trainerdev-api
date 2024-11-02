-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "matriculations" DROP CONSTRAINT "matriculations_trackId_fkey";

-- DropForeignKey
ALTER TABLE "matriculations" DROP CONSTRAINT "matriculations_userId_fkey";

-- AddForeignKey
ALTER TABLE "matriculations" ADD CONSTRAINT "matriculations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriculations" ADD CONSTRAINT "matriculations_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
