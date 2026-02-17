-- AlterTable
ALTER TABLE `Application` ADD COLUMN `trackId` VARCHAR(191) NULL,
    MODIFY `status` ENUM('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'DOCUMENT_VERIFIED', 'INTERVIEW_READY', 'INTERVIEW_COMPLETED', 'ACCEPTED', 'REJECTED', 'ENROLLED') NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE `Course` ADD COLUMN `allowedPrograms` TEXT NULL,
    ADD COLUMN `allowedStudentTypes` TEXT NULL,
    ADD COLUMN `maxEnrollment` INTEGER NULL,
    ADD COLUMN `minGpax` DOUBLE NULL,
    ADD COLUMN `minYearLevel` INTEGER NULL,
    ADD COLUMN `prerequisiteCourses` TEXT NULL,
    ADD COLUMN `requiresApproval` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `AdmissionTrackType` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `nameTh` VARCHAR(191) NOT NULL,
    `nameEn` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `color` VARCHAR(191) NOT NULL DEFAULT '#3B82F6',
    `icon` VARCHAR(191) NOT NULL DEFAULT 'Target',
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isSystem` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AdmissionTrackType_code_key`(`code`),
    INDEX `AdmissionTrackType_isActive_idx`(`isActive`),
    INDEX `AdmissionTrackType_displayOrder_idx`(`displayOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdmissionTrack` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `nameTh` VARCHAR(191) NOT NULL,
    `nameEn` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `typeId` VARCHAR(191) NOT NULL,
    `programId` VARCHAR(191) NOT NULL,
    `academicYear` VARCHAR(191) NOT NULL,
    `openDate` DATETIME(3) NOT NULL,
    `closeDate` DATETIME(3) NOT NULL,
    `announceDate` DATETIME(3) NULL,
    `totalSeats` INTEGER NOT NULL,
    `filledSeats` INTEGER NOT NULL DEFAULT 0,
    `reservedSeats` INTEGER NULL,
    `enableWaitlist` BOOLEAN NOT NULL DEFAULT false,
    `requirements` TEXT NULL,
    `applicationFee` DOUBLE NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AdmissionTrack_code_key`(`code`),
    INDEX `AdmissionTrack_programId_idx`(`programId`),
    INDEX `AdmissionTrack_typeId_idx`(`typeId`),
    INDEX `AdmissionTrack_academicYear_idx`(`academicYear`),
    INDEX `AdmissionTrack_isActive_isPublished_idx`(`isActive`, `isPublished`),
    INDEX `AdmissionTrack_openDate_closeDate_idx`(`openDate`, `closeDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Application_trackId_idx` ON `Application`(`trackId`);

-- CreateIndex
CREATE INDEX `Application_status_idx` ON `Application`(`status`);

-- AddForeignKey
ALTER TABLE `AdmissionTrack` ADD CONSTRAINT `AdmissionTrack_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `AdmissionTrackType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdmissionTrack` ADD CONSTRAINT `AdmissionTrack_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_trackId_fkey` FOREIGN KEY (`trackId`) REFERENCES `AdmissionTrack`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Application` RENAME INDEX `Application_applicantId_fkey` TO `Application_applicantId_idx`;

-- RenameIndex
ALTER TABLE `Application` RENAME INDEX `Application_programId_fkey` TO `Application_programId_idx`;
