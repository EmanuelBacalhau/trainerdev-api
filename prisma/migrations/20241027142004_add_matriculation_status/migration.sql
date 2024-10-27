-- CreateEnum
CREATE TYPE "MatriculationStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "matriculations" ADD COLUMN     "status" "MatriculationStatus" NOT NULL DEFAULT 'ACTIVE';
