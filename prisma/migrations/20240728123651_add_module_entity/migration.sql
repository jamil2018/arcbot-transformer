/*
  Warnings:

  - You are about to drop the column `module` on the `Locator` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Locator" DROP COLUMN "module",
ADD COLUMN     "moduleId" INTEGER;

-- CreateTable
CREATE TABLE "Module" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Module_name_key" ON "Module"("name");

-- AddForeignKey
ALTER TABLE "Locator" ADD CONSTRAINT "Locator_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;
