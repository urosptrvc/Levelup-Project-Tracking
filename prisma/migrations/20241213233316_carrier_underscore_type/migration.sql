/*
  Warnings:

  - You are about to drop the column `carriertype` on the `shipments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `shipments` DROP COLUMN `carriertype`,
    ADD COLUMN `carrier_type` VARCHAR(191) NULL;
