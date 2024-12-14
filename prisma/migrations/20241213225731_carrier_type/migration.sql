/*
  Warnings:

  - Added the required column `carriertype` to the `shipments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shipments` ADD COLUMN `carriertype` VARCHAR(191) NOT NULL;
