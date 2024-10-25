-- CreateTable
CREATE TABLE "matriculations" (
    "userId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matriculations_pkey" PRIMARY KEY ("userId","trackId")
);

-- CreateIndex
CREATE INDEX "matriculations_userId_idx" ON "matriculations"("userId");

-- CreateIndex
CREATE INDEX "matriculations_trackId_idx" ON "matriculations"("trackId");

-- AddForeignKey
ALTER TABLE "matriculations" ADD CONSTRAINT "matriculations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriculations" ADD CONSTRAINT "matriculations_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
