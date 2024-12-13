-- CreateTable
CREATE TABLE `shipments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NULL,
    `house_awb` VARCHAR(191) NULL,
    `shipper` VARCHAR(191) NULL,
    `shipper_country` VARCHAR(191) NULL,
    `receiver` VARCHAR(191) NULL,
    `receiver_country` VARCHAR(191) NULL,
    `po_number` VARCHAR(191) NULL,
    `carrier` VARCHAR(191) NULL,
    `packages` INTEGER NULL,
    `weight` DOUBLE NULL,
    `volume` DOUBLE NULL,
    `etd` DATETIME(3) NULL,
    `eta` DATETIME(3) NULL,
    `atd` DATETIME(3) NULL,
    `ata` DATETIME(3) NULL,
    `vessel_flight` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `pickup_date` DATETIME(3) NULL,
    `latest_cp` VARCHAR(191) NULL,
    `shipper_ref_no` VARCHAR(191) NULL,
    `inco_term` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
