# Student Type Module Implementation

## Overview
This document describes the implementation of the Student Type module for the University Management System (UMS). The module allows administrators to categorize students into different types and manage them accordingly.

## Features Implemented

### 1. Student Type Enum
The system supports 6 types of students:
- **REGULAR** (นักศึกษาปกติ) - Regular students
- **EXCHANGE** (นักศึกษาแลกเปลี่ยน) - Exchange students
- **SCHOLARSHIP** (นักศึกษาทุน) - Scholarship students
- **SPECIAL** (นักศึกษาพิเศษ) - Special program students
- **TRANSFER** (นักศึกษาโอนย้าย) - Transfer students
- **INTERNATIONAL** (นักศึกษานานาชาติ) - International students

### 2. Database Schema
The `StudentType` enum is already defined in the Prisma schema (`packages/lib/prisma/schema.prisma`):
```prisma
enum StudentType {
  REGULAR
  EXCHANGE
  SCHOLARSHIP
  SPECIAL
  TRANSFER
  INTERNATIONAL
}
```

The `Student` model includes the `studentType` field with a default value of `REGULAR`:
```prisma
model Student {
  ...
  studentType StudentType @default(REGULAR)
  ...
}
```

### 3. Utility Functions
Created `/apps/web/lib/student-type.ts` with:
- `STUDENT_TYPE_LABELS` - Labels in English and Thai
- `STUDENT_TYPE_COLORS` - Color mappings for UI badges
- `getStudentTypeLabel()` - Get label in specified language
- `getStudentTypeColor()` - Get color class for badge
- `getStudentTypeDisplay()` - Get formatted display string

### 4. Reusable Component
Created `/apps/web/components/student-type-badge.tsx`:
- Displays student type with appropriate colors
- Supports showing labels in English, Thai, or both
- Consistent styling across the application

### 5. Updated Pages

#### Student List Page (`/admin/students`)
- Added "Student Type" column in the table
- Displays color-coded badges for each student type
- Uses utility functions for clean, maintainable code

#### Create Student Page (`/admin/students/create`)
- Added Student Type dropdown in the Academic Information section
- Default value set to "REGULAR"
- Includes all 6 student types with Thai translations

#### Edit Student Page (`/admin/students/[id]/edit`)
- Already had Student Type dropdown (no changes needed)
- Allows updating student type

#### Student Detail Page (`/admin/students/[id]`)
- Added Student Type badge in the profile card
- Added Student Type field in Academic Information section
- Shows both English and Thai labels

### 6. Server Actions
Updated `/apps/web/actions/student.ts`:
- `createStudent()` - Now accepts `studentType` parameter
- `updateStudent()` - Already supported `studentType` parameter

## Color Scheme
Each student type has a unique color for easy visual identification:
- **REGULAR**: Blue (`bg-blue-100 text-blue-800`)
- **EXCHANGE**: Purple (`bg-purple-100 text-purple-800`)
- **SCHOLARSHIP**: Amber (`bg-amber-100 text-amber-800`)
- **SPECIAL**: Pink (`bg-pink-100 text-pink-800`)
- **TRANSFER**: Teal (`bg-teal-100 text-teal-800`)
- **INTERNATIONAL**: Indigo (`bg-indigo-100 text-indigo-800`)

## Files Modified/Created

### Created Files:
1. `/apps/web/lib/student-type.ts` - Utility functions and constants
2. `/apps/web/components/student-type-badge.tsx` - Reusable badge component

### Modified Files:
1. `/apps/web/actions/student.ts` - Added studentType parameter to createStudent
2. `/apps/web/app/admin/students/page.tsx` - Added Student Type column
3. `/apps/web/app/admin/students/create/create-form.tsx` - Added Student Type dropdown
4. `/apps/web/app/admin/students/[id]/page.tsx` - Added Student Type display
5. `/apps/web/app/admin/students/[id]/edit/edit-student-form.tsx` - Already had the field

## Usage Examples

### Creating a Student with Type
```typescript
await createStudent({
  email: "student@example.com",
  password: "password123",
  studentId: "66010001",
  firstName: "John",
  lastName: "Doe",
  birthDate: new Date("2000-01-01"),
  programId: "program-id",
  studentType: "SCHOLARSHIP" // Optional, defaults to REGULAR
});
```

### Displaying Student Type Badge
```tsx
import StudentTypeBadge from "@/components/student-type-badge";

// Show English only
<StudentTypeBadge type="REGULAR" showLabel="en" />

// Show Thai only
<StudentTypeBadge type="SCHOLARSHIP" showLabel="th" />

// Show both languages
<StudentTypeBadge type="EXCHANGE" showLabel="both" />
```

### Using Utility Functions
```typescript
import { getStudentTypeLabel, getStudentTypeColor } from "@/lib/student-type";

const label = getStudentTypeLabel("REGULAR", "th"); // "นักศึกษาปกติ"
const color = getStudentTypeColor("SCHOLARSHIP"); // "bg-amber-100 text-amber-800"
```

## Testing Checklist
- [ ] Create a new student with different student types
- [ ] Edit existing student's type
- [ ] Verify student type displays correctly in the list view
- [ ] Verify student type displays correctly in the detail view
- [ ] Check that colors are consistent across all pages
- [ ] Verify Thai and English labels display correctly

## Future Enhancements
1. Add filtering by student type in the student list page
2. Add statistics/charts showing distribution of student types
3. Add student type-specific features or permissions
4. Export student lists filtered by type
5. Add student type change history/audit log

## Notes
- The database schema already had the StudentType enum, so no migration was needed
- Default value for new students is REGULAR
- All student types support both English and Thai labels
- The implementation follows the existing UMS design patterns and conventions
