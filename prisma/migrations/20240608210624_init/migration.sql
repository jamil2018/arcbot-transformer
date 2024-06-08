-- CreateTable
CREATE TABLE "Locator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "Locator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Locator_name_key" ON "Locator"("name");
