# Schedule Management System - Database Schema Design

## 📋 Overview

ระบบจัดการตารางเรียน-สอน ประกอบด้วย 4 โมดูลหลัก:
1. Class Timetable (ตารางเรียน)
2. Teaching Schedule (ตารางสอน)
3. Room Allocation (จัดการห้องเรียน)
4. Exam Schedule (ตารางสอบ)

---

## 🗂️ Database Models

### 1. **Room** (ห้องเรียน/ห้องปฏิบัติการ)

```prisma
model Room {
  id          String   @id @default(cuid())
  code        String   @unique // e.g., "B101", "LAB-CS-01"
  name        String   // e.g., "Computer Lab 1"
  building    String   // e.g., "Building A", "Science Building"
  floor       Int      // ชั้น
  capacity    Int      // ความจุ (จำนวนที่นั่ง)
  roomType    RoomType // ประเภทห้อง
  
  // Facilities (JSON string)
  facilities  String?  @db.Text // {"projector": true, "aircon": true, "computers": 40}
  
  // Status
  isActive    Boolean  @default(true)
  isAvailable Boolean  @default(true) // ว่างหรือไม่ (สำหรับ maintenance)
  
  // Relations
  schedules   ClassSchedule[]
  examSlots   ExamSlot[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([building, floor])
  @@index([roomType])
}

enum RoomType {
  LECTURE_ROOM    // ห้องบรรยาย
  LABORATORY      // ห้องปฏิบัติการ
  COMPUTER_LAB    // ห้องคอมพิวเตอร์
  STUDIO          // ห้องสตูดิโอ
  SEMINAR_ROOM    // ห้องสัมมนา
  AUDITORIUM      // หอประชุม
  SPORTS_FACILITY // สนามกีฬา/ห้องออกกำลังกาย
  OTHER           // อื่นๆ
}
```

---

### 2. **AcademicTerm** (ภาคการศึกษา)

```prisma
model AcademicTerm {
  id            String   @id @default(cuid())
  academicYear  String   // e.g., "2567"
  term          Int      // 1, 2, 3 (Summer)
  name          String   // e.g., "ภาคการศึกษาที่ 1/2567"
  
  // Dates
  startDate     DateTime
  endDate       DateTime
  
  // Registration Period
  regStartDate  DateTime
  regEndDate    DateTime
  
  // Exam Period
  midtermStart  DateTime?
  midtermEnd    DateTime?
  finalStart    DateTime?
  finalEnd      DateTime?
  
  // Status
  isActive      Boolean  @default(false)
  isCurrent     Boolean  @default(false) // ภาคการศึกษาปัจจุบัน
  
  // Relations
  schedules     ClassSchedule[]
  examSchedules ExamSchedule[]
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@unique([academicYear, term])
  @@index([isCurrent])
}
```

---

### 3. **ClassSchedule** (ตารางเรียน-สอน)

```prisma
model ClassSchedule {
  id              String        @id @default(cuid())
  
  // Course Info
  courseId        String
  course          Course        @relation(fields: [courseId], references: [id], onDelete: Cascade)
  
  section         String        // กลุ่มเรียน e.g., "01", "02"
  
  // Academic Term
  termId          String
  term            AcademicTerm  @relation(fields: [termId], references: [id], onDelete: Cascade)
  
  // Instructor
  instructorId    String?
  instructor      Personnel?    @relation(fields: [instructorId], references: [id], onDelete: SetNull)
  
  // Room
  roomId          String?
  room            Room?         @relation(fields: [roomId], references: [id], onDelete: SetNull)
  
  // Time Slots
  dayOfWeek       DayOfWeek     // วันในสัปดาห์
  startTime       String        // e.g., "09:00"
  endTime         String        // e.g., "12:00"
  
  // Capacity
  maxStudents     Int           // จำนวนนักศึกษาสูงสุด
  enrolledCount   Int           @default(0) // จำนวนนักศึกษาที่ลงทะเบียนแล้ว
  
  // Status
  isActive        Boolean       @default(true)
  
  // Notes
  notes           String?       @db.Text
  
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  
  @@unique([courseId, section, termId])
  @@index([termId, dayOfWeek])
  @@index([instructorId])
  @@index([roomId])
}

enum DayOfWeek {
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
  SATURDAY
  SUNDAY
}
```

---

### 4. **ExamSchedule** (ตารางสอบ)

```prisma
model ExamSchedule {
  id            String       @id @default(cuid())
  
  // Course Info
  courseId      String
  course        Course       @relation(fields: [courseId], references: [id], onDelete: Cascade)
  
  section       String       // กลุ่มเรียน
  
  // Academic Term
  termId        String
  term          AcademicTerm @relation(fields: [termId], references: [id], onDelete: Cascade)
  
  // Exam Type
  examType      ExamType
  
  // Exam Slots (Multiple rooms possible)
  examSlots     ExamSlot[]
  
  // Exam Details
  examDate      DateTime
  startTime     String       // e.g., "09:00"
  endTime       String       // e.g., "12:00"
  duration      Int          // minutes
  
  // Instructions
  examFormat    ExamFormat   @default(CLOSED_BOOK)
  instructions  String?      @db.Text
  
  // Status
  isPublished   Boolean      @default(false)
  
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  
  @@unique([courseId, section, termId, examType])
  @@index([termId, examType])
  @@index([examDate])
}

enum ExamType {
  MIDTERM    // สอบกลางภาค
  FINAL      // สอบปลายภาค
  QUIZ       // สอบย่อย
  MAKEUP     // สอบชดเชย
}

enum ExamFormat {
  CLOSED_BOOK    // ปิดหนังสือ
  OPEN_BOOK      // เปิดหนังสือ
  TAKE_HOME      // สอบที่บ้าน
  ONLINE         // สอบออนไลน์
  PRACTICAL      // สอบปฏิบัติ
}
```

---

### 5. **ExamSlot** (ห้องสอบ)

```prisma
model ExamSlot {
  id              String        @id @default(cuid())
  
  // Exam Schedule
  examScheduleId  String
  examSchedule    ExamSchedule  @relation(fields: [examScheduleId], references: [id], onDelete: Cascade)
  
  // Room
  roomId          String
  room            Room          @relation(fields: [roomId], references: [id], onDelete: Restrict)
  
  // Capacity
  capacity        Int           // จำนวนที่นั่งสอบในห้องนี้
  assignedCount   Int           @default(0) // จำนวนที่จัดสรรแล้ว
  
  // Proctors (ผู้คุมสอบ)
  proctors        ExamProctor[]
  
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  
  @@index([examScheduleId])
  @@index([roomId])
}
```

---

### 6. **ExamProctor** (ผู้คุมสอบ)

```prisma
model ExamProctor {
  id          String     @id @default(cuid())
  
  // Exam Slot
  examSlotId  String
  examSlot    ExamSlot   @relation(fields: [examSlotId], references: [id], onDelete: Cascade)
  
  // Proctor (Personnel)
  proctorId   String
  proctor     Personnel  @relation(fields: [proctorId], references: [id], onDelete: Cascade)
  
  // Role
  role        ProctorRole @default(ASSISTANT)
  
  // Status
  isConfirmed Boolean    @default(false)
  
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  
  @@unique([examSlotId, proctorId])
  @@index([proctorId])
}

enum ProctorRole {
  CHIEF      // หัวหน้าคุมสอบ
  ASSISTANT  // ผู้ช่วยคุมสอบ
}
```

---

### 7. **TeachingLoad** (ภาระงานสอน)

```prisma
model TeachingLoad {
  id            String       @id @default(cuid())
  
  // Instructor
  instructorId  String
  instructor    Personnel    @relation(fields: [instructorId], references: [id], onDelete: Cascade)
  
  // Academic Term
  termId        String
  term          AcademicTerm @relation(fields: [termId], references: [id], onDelete: Cascade)
  
  // Teaching Hours
  lectureHours  Float        @default(0) // ชั่วโมงบรรยาย
  labHours      Float        @default(0) // ชั่วโมงปฏิบัติการ
  totalHours    Float        @default(0) // รวมทั้งหมด
  
  // Calculated from ClassSchedule
  courseCount   Int          @default(0) // จำนวนวิชาที่สอน
  
  // Status
  isApproved    Boolean      @default(false)
  approvedBy    String?
  approvedAt    DateTime?
  
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  
  @@unique([instructorId, termId])
  @@index([termId])
}
```

---

## 🔗 Relations with Existing Models

### **Course Model** (ต้องเพิ่ม relations)
```prisma
model Course {
  // ... existing fields
  
  // NEW: Schedule Relations
  schedules     ClassSchedule[]
  examSchedules ExamSchedule[]
}
```

### **Personnel Model** (ต้องเพิ่ม relations)
```prisma
model Personnel {
  // ... existing fields
  
  // NEW: Teaching Relations
  teachingSchedules ClassSchedule[]
  teachingLoads     TeachingLoad[]
  proctorDuties     ExamProctor[]
}
```

---

## 📊 Key Features Supported

### ✅ **Class Timetable**
- ดูตารางเรียนตามหลักสูตร/ชั้นปี/กลุ่มเรียน
- ตรวจสอบความซ้ำซ้อนของตาราง
- Export ตารางเป็น PDF/iCal

### ✅ **Teaching Schedule**
- จัดตารางสอนให้อาจารย์
- คำนวณภาระงานสอน (Teaching Load)
- ตรวจสอบตารางสอนที่ซ้อนทับ

### ✅ **Room Allocation**
- จัดสรรห้องเรียนอัตโนมัติ
- ตรวจสอบห้องว่าง
- วิเคราะห์อัตราการใช้งานห้อง (Room Utilization)

### ✅ **Exam Schedule**
- จัดตารางสอบกลางภาค/ปลายภาค
- จัดสรรห้องสอบและผู้คุมสอบ
- ออกบัตรประจำตัวสอบ
- ตรวจสอบนักศึกษาที่สอบซ้อนเวลา

---

## 🎯 Business Rules

### **Room Allocation Rules**
1. ห้องเรียนต้องมีความจุเพียงพอสำหรับจำนวนนักศึกษา
2. ห้องเดียวกันไม่สามารถใช้งานซ้อนเวลาได้
3. ห้อง Lab ต้องจองล่วงหน้า
4. ห้องสอบต้องมีที่นั่งห่างกัน (capacity * 0.5)

### **Teaching Load Rules**
1. อาจารย์เต็มเวลา: สอนได้ไม่เกิน 18 ชั่วโมง/สัปดาห์
2. อาจารย์พิเศษ: สอนได้ไม่เกิน 9 ชั่วโมง/สัปดาห์
3. ชั่วโมง Lab นับ 0.5 ของชั่วโมงบรรยาย

### **Exam Schedule Rules**
1. สอบกลางภาคต้องอยู่ในช่วง midterm period
2. สอบปลายภาคต้องอยู่ในช่วง final period
3. นักศึกษาไม่สามารถสอบซ้อนเวลาได้
4. ต้องมีผู้คุมสอบอย่างน้อย 1 คนต่อ 30 นักศึกษา

---

## 📈 Indexes for Performance

```prisma
// ClassSchedule
@@index([termId, dayOfWeek])
@@index([instructorId])
@@index([roomId])

// ExamSchedule
@@index([termId, examType])
@@index([examDate])

// Room
@@index([building, floor])
@@index([roomType])

// AcademicTerm
@@index([isCurrent])
```

---

## 🚀 Next Steps

1. **Add to schema.prisma**
2. **Run migration**: `npx prisma migrate dev --name add_schedule_management`
3. **Generate Prisma Client**: `npx prisma generate`
4. **Create seed data** for Rooms and AcademicTerms
5. **Implement Server Actions**
6. **Build UI Pages**

---

**Created**: 2025-11-29  
**Status**: Ready for Implementation
