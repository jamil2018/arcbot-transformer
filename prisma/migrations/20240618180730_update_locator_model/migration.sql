/*
  Warnings:

  - A unique constraint covering the columns `[module]` on the table `Locator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[file]` on the table `Locator` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `module` to the `Locator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Locator" ADD COLUMN     "module" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Locator_module_key" ON "Locator"("module");

-- CreateIndex
CREATE UNIQUE INDEX "Locator_file_key" ON "Locator"("file");
