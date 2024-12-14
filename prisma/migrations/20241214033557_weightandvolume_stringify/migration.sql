/*
  Warnings:

  - You are about to alter the column `weight` on the `shipments` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `volume` on the `shipments` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `shipments` MODIFY `weight` VARCHAR(191) NULL,
    MODIFY `volume` VARCHAR(191) NULL;
