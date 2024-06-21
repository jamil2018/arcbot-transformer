/*
  Warnings:

  - A unique constraint covering the columns `[name,file]` on the table `Locator` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Locator_file_key";

-- DropIndex
DROP INDEX "Locator_module_key";

-- CreateIndex
CREATE UNIQUE INDEX "Locator_name_file_key" ON "Locator"("name", "file");
