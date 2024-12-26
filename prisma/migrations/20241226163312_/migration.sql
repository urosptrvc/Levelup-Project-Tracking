-- AlterTable
ALTER TABLE `shipments` MODIFY `status` VARCHAR(191) NULL,
    MODIFY `house_awb` VARCHAR(191) NULL,
    MODIFY `shipper` VARCHAR(191) NULL,
    MODIFY `shipper_country` VARCHAR(191) NULL,
    MODIFY `receiver` VARCHAR(191) NULL,
    MODIFY `receiver_country` VARCHAR(191) NULL,
    MODIFY `po_number` VARCHAR(191) NULL,
    MODIFY `carrier` VARCHAR(191) NULL,
    MODIFY `weight` VARCHAR(191) NULL,
    MODIFY `volume` VARCHAR(191) NULL,
    MODIFY `vessel_flight` VARCHAR(191) NULL,
    MODIFY `latest_cp` VARCHAR(191) NULL,
    MODIFY `shipper_ref_no` VARCHAR(191) NULL,
    MODIFY `inco_term` VARCHAR(191) NULL,
    MODIFY `carrier_type` VARCHAR(191) NULL,
    MODIFY `filename` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
