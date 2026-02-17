/*
  Warnings:

  - You are about to drop the column `room` on the `ClassSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `valueEn` on the `Translation` table. All the data in the column will be lost.
  - You are about to drop the column `valueTh` on the `Translation` table. All the data in the column will be lost.
  - Added the required column `en` to the `Translation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `th` to the `Translation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ClassSchedule` DROP COLUMN `room`,
    ADD COLUMN `courseId` VARCHAR(191) NULL,
    ADD COLUMN `instructorId` VARCHAR(191) NULL,
    ADD COLUMN `roomId` VARCHAR(191) NULL,
    ADD COLUMN `termId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Translation` DROP COLUMN `valueEn`,
    DROP COLUMN `valueTh`,
    ADD COLUMN `en` TEXT NOT NULL,
    ADD COLUMN `th` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `Room` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `building` VARCHAR(191) NOT NULL,
    `floor` INTEGER NOT NULL,
    `capacity` INTEGER NOT NULL,
    `roomType` ENUM('LECTURE_ROOM', 'LABORATORY', 'COMPUTER_LAB', 'STUDIO', 'SEMINAR_ROOM', 'AUDITORIUM', 'SPORTS_FACILITY', 'OTHER') NOT NULL,
    `facilities` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isAvailable` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Room_code_key`(`code`),
    INDEX `Room_building_floor_idx`(`building`, `floor`),
    INDEX `Room_roomType_idx`(`roomType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExamSchedule` (
    `id` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `termId` VARCHAR(191) NOT NULL,
    `examType` ENUM('MIDTERM', 'FINAL', 'QUIZ', 'MAKEUP') NOT NULL,
    `examDate` DATETIME(3) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `examFormat` ENUM('CLOSED_BOOK', 'OPEN_BOOK', 'TAKE_HOME', 'ONLINE', 'PRACTICAL') NOT NULL DEFAULT 'CLOSED_BOOK',
    `instructions` TEXT NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ExamSchedule_termId_examType_idx`(`termId`, `examType`),
    INDEX `ExamSchedule_examDate_idx`(`examDate`),
    UNIQUE INDEX `ExamSchedule_courseId_section_termId_examType_key`(`courseId`, `section`, `termId`, `examType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExamSlot` (
    `id` VARCHAR(191) NOT NULL,
    `examScheduleId` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `assignedCount` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ExamSlot_examScheduleId_idx`(`examScheduleId`),
    INDEX `ExamSlot_roomId_idx`(`roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExamProctor` (
    `id` VARCHAR(191) NOT NULL,
    `examSlotId` VARCHAR(191) NOT NULL,
    `proctorId` VARCHAR(191) NOT NULL,
    `role` ENUM('CHIEF', 'ASSISTANT') NOT NULL DEFAULT 'ASSISTANT',
    `isConfirmed` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ExamProctor_proctorId_idx`(`proctorId`),
    UNIQUE INDEX `ExamProctor_examSlotId_proctorId_key`(`examSlotId`, `proctorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeachingLoad` (
    `id` VARCHAR(191) NOT NULL,
    `instructorId` VARCHAR(191) NOT NULL,
    `termId` VARCHAR(191) NOT NULL,
    `lectureHours` DOUBLE NOT NULL DEFAULT 0,
    `labHours` DOUBLE NOT NULL DEFAULT 0,
    `totalHours` DOUBLE NOT NULL DEFAULT 0,
    `courseCount` INTEGER NOT NULL DEFAULT 0,
    `isApproved` BOOLEAN NOT NULL DEFAULT false,
    `approvedBy` VARCHAR(191) NULL,
    `approvedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TeachingLoad_termId_idx`(`termId`),
    UNIQUE INDEX `TeachingLoad_instructorId_termId_key`(`instructorId`, `termId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClassSchedule` ADD CONSTRAINT `ClassSchedule_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassSchedule` ADD CONSTRAINT `ClassSchedule_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassSchedule` ADD CONSTRAINT `ClassSchedule_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Personnel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassSchedule` ADD CONSTRAINT `ClassSchedule_termId_fkey` FOREIGN KEY (`termId`) REFERENCES `AcademicTerm`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamSchedule` ADD CONSTRAINT `ExamSchedule_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamSchedule` ADD CONSTRAINT `ExamSchedule_termId_fkey` FOREIGN KEY (`termId`) REFERENCES `AcademicTerm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamSlot` ADD CONSTRAINT `ExamSlot_examScheduleId_fkey` FOREIGN KEY (`examScheduleId`) REFERENCES `ExamSchedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamSlot` ADD CONSTRAINT `ExamSlot_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamProctor` ADD CONSTRAINT `ExamProctor_examSlotId_fkey` FOREIGN KEY (`examSlotId`) REFERENCES `ExamSlot`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamProctor` ADD CONSTRAINT `ExamProctor_proctorId_fkey` FOREIGN KEY (`proctorId`) REFERENCES `Personnel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeachingLoad` ADD CONSTRAINT `TeachingLoad_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Personnel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeachingLoad` ADD CONSTRAINT `TeachingLoad_termId_fkey` FOREIGN KEY (`termId`) REFERENCES `AcademicTerm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
