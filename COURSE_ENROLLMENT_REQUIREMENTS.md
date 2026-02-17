# Course Enrollment Requirements Feature

## Overview
Added comprehensive enrollment requirements system to control which students can enroll in specific courses. This feature allows administrators to set various criteria including year level, student type, GPAX, prerequisites, and enrollment limits.

## Features

### 1. **Minimum Year Level**
- **Field**: `minYearLevel` (Integer, optional)
- **Range**: 1-4 for Bachelor's, 1-2 for Master's
- **Purpose**: Restrict course to students in specific year levels or higher
- **Example**: Set to `2` means only 2nd year and above can enroll

### 2. **Allowed Student Types**
- **Field**: `allowedStudentTypes` (JSON array, optional)
- **Options**:
  - REGULAR (นักศึกษาปกติ)
  - EXCHANGE (นักศึกษาแลกเปลี่ยน)
  - SCHOLARSHIP (นักศึกษาทุน)
  - SPECIAL (นักศึกษาพิเศษ)
  - TRANSFER (นักศึกษาโอนย้าย)
  - INTERNATIONAL (นักศึกษานานาชาติ)
- **Purpose**: Limit course to specific student categories
- **Example**: `["REGULAR", "SCHOLARSHIP"]` = only regular and scholarship students

### 3. **Allowed Programs**
- **Field**: `allowedPrograms` (JSON array, optional)
- **Purpose**: Restrict course to students from specific programs
- **Example**: `["prog-cs-001", "prog-it-002"]` = only CS and IT students
- **Note**: UI for this will be added in future update

### 4. **Minimum GPAX**
- **Field**: `minGpax` (Float, optional)
- **Range**: 0.00 - 4.00
- **Purpose**: Require minimum GPA for enrollment
- **Example**: `2.50` means students need at least 2.50 GPAX

### 5. **Prerequisite Courses**
- **Field**: `prerequisiteCourses` (JSON array, optional)
- **Purpose**: Courses that must be completed before enrolling
- **Format**: Array of course codes
- **Example**: `["CS101", "MATH101"]`
- **UI**: Dynamic list with add/remove buttons

### 6. **Maximum Enrollment**
- **Field**: `maxEnrollment` (Integer, optional)
- **Purpose**: Limit total number of students
- **Example**: `50` means maximum 50 students
- **Note**: `null` = unlimited enrollment

### 7. **Requires Instructor Approval**
- **Field**: `requiresApproval` (Boolean, default: false)
- **Purpose**: Students must get approval before enrolling
- **Use Case**: Special topics, research courses, independent study

## Database Schema

```prisma
model Course {
  // ... existing fields
  
  // Enrollment Requirements
  minYearLevel        Int?              // Minimum year level (1-4 for Bachelor, 1-2 for Master)
  allowedStudentTypes String?  @db.Text // JSON array of allowed StudentType
  allowedPrograms     String?  @db.Text // JSON array of allowed Program IDs
  minGpax             Float?            // Minimum GPAX required (e.g., 2.50)
  prerequisiteCourses String?  @db.Text // JSON array of prerequisite course codes
  maxEnrollment       Int?              // Maximum number of students (null = unlimited)
  requiresApproval    Boolean  @default(false) // Requires instructor approval
}
```

## User Interface

### Create/Edit Course Form

The form is organized into 4 main sections:

#### 1. Basic Information
- Course Code, Names, Credits, Description

#### 2. **Enrollment Requirements** (NEW)
```
┌─────────────────────────────────────────────┐
│ Enrollment Requirements                  ℹ️  │
├─────────────────────────────────────────────┤
│ Minimum Year Level: [2]                     │
│ Minimum GPAX: [2.50]                        │
│                                             │
│ Allowed Student Types:                      │
│ ☑ Regular (นักศึกษาปกติ)                    │
│ ☐ Exchange (นักศึกษาแลกเปลี่ยน)             │
│ ☑ Scholarship (นักศึกษาทุน)                 │
│ ☐ Special (นักศึกษาพิเศษ)                   │
│ ☐ Transfer (นักศึกษาโอนย้าย)                │
│ ☐ International (นักศึกษานานาชาติ)          │
│                                             │
│ Prerequisite Courses:                       │
│ [CS101] [Remove]                            │
│ [MATH101] [Remove]                          │
│ [+ Add Prerequisite]                        │
│                                             │
│ Maximum Enrollment: [50]                    │
│ ☑ Requires Instructor Approval              │
└─────────────────────────────────────────────┘
```

#### 3. Learning Outcomes
- Learning objectives textarea

#### 4. Course Materials
- Syllabus PDF URL

## Usage Examples

### Example 1: Advanced Course
```
Course: Advanced Algorithms (CS401)
- Minimum Year Level: 3
- Allowed Student Types: REGULAR, SCHOLARSHIP
- Minimum GPAX: 3.00
- Prerequisites: ["CS201", "CS301"]
- Max Enrollment: 30
- Requires Approval: false
```

### Example 2: Special Topics Course
```
Course: Special Topics in AI (CS499)
- Minimum Year Level: 4
- Allowed Student Types: REGULAR, EXCHANGE, INTERNATIONAL
- Minimum GPAX: 3.50
- Prerequisites: ["CS301", "CS302"]
- Max Enrollment: 20
- Requires Approval: true
```

### Example 3: Foundation Course
```
Course: Introduction to Programming (CS101)
- Minimum Year Level: 1
- Allowed Student Types: (all - leave empty)
- Minimum GPAX: (none)
- Prerequisites: []
- Max Enrollment: (unlimited)
- Requires Approval: false
```

## Enrollment Validation Logic

When a student attempts to enroll, the system should check:

```typescript
function canEnroll(student: Student, course: Course): boolean {
  // 1. Check year level
  if (course.minYearLevel && student.yearLevel < course.minYearLevel) {
    return false; // "Year level requirement not met"
  }
  
  // 2. Check student type
  if (course.allowedStudentTypes) {
    const allowed = JSON.parse(course.allowedStudentTypes);
    if (!allowed.includes(student.studentType)) {
      return false; // "Student type not allowed"
    }
  }
  
  // 3. Check program
  if (course.allowedPrograms) {
    const allowed = JSON.parse(course.allowedPrograms);
    if (!allowed.includes(student.programId)) {
      return false; // "Program not allowed"
    }
  }
  
  // 4. Check GPAX
  if (course.minGpax && student.gpax < course.minGpax) {
    return false; // "GPAX requirement not met"
  }
  
  // 5. Check prerequisites
  if (course.prerequisiteCourses) {
    const prerequisites = JSON.parse(course.prerequisiteCourses);
    const completed = student.completedCourses.map(c => c.code);
    const missing = prerequisites.filter(p => !completed.includes(p));
    if (missing.length > 0) {
      return false; // "Missing prerequisites: " + missing.join(", ")
    }
  }
  
  // 6. Check enrollment limit
  if (course.maxEnrollment) {
    const currentEnrollment = getCurrentEnrollmentCount(course.id);
    if (currentEnrollment >= course.maxEnrollment) {
      return false; // "Course is full"
    }
  }
  
  // 7. Check approval requirement
  if (course.requiresApproval) {
    return "PENDING_APPROVAL"; // Needs instructor approval
  }
  
  return true; // All checks passed
}
```

## API Reference

### createCourse(formData: FormData)
```typescript
FormData fields:
// Basic
- code: string (required)
- nameTh: string (required)
- nameEn: string (required)
- credits: number (required)
- description: string (optional)

// Learning & Materials
- learningOutcomes: string (optional)
- syllabusUrl: string (optional)

// Enrollment Requirements (NEW)
- minYearLevel: number (optional)
- allowedStudentTypes: JSON string (optional)
- allowedPrograms: JSON string (optional)
- minGpax: number (optional)
- prerequisiteCourses: JSON string (optional)
- maxEnrollment: number (optional)
- requiresApproval: boolean (optional)
```

### updateCourse(id: string, formData: FormData)
Same fields as createCourse

## Data Storage Format

### allowedStudentTypes
```json
["REGULAR", "SCHOLARSHIP", "INTERNATIONAL"]
```

### allowedPrograms
```json
["prog-cs-001", "prog-it-002", "prog-se-003"]
```

### prerequisiteCourses
```json
["CS101", "MATH101", "CS201"]
```

## Benefits

### For Administrators:
1. ✅ Fine-grained control over course enrollment
2. ✅ Automatic enforcement of prerequisites
3. ✅ Manage course capacity effectively
4. ✅ Ensure students meet requirements

### For Students:
1. ✅ Clear understanding of requirements
2. ✅ Prevented from enrolling in unsuitable courses
3. ✅ Better academic planning
4. ✅ Reduced enrollment errors

### For Instructors:
1. ✅ Ensure qualified students only
2. ✅ Manage class size
3. ✅ Control special course access
4. ✅ Approval workflow for selective courses

## Future Enhancements

### 1. **Program Selection UI**
- Multi-select dropdown for allowed programs
- Currently stored as JSON, UI to be added

### 2. **Prerequisite Validation**
- Real-time validation of course codes
- Autocomplete for course selection
- Visual prerequisite tree

### 3. **Enrollment Dashboard**
- Show current vs. max enrollment
- Waitlist functionality
- Enrollment statistics

### 4. **Advanced Rules**
- OR/AND logic for prerequisites
- Time-based restrictions (e.g., only in Fall semester)
- Department-specific rules

### 5. **Approval Workflow**
- Instructor approval interface
- Email notifications
- Approval history

### 6. **Student View**
- Show why enrollment is blocked
- Suggest prerequisite courses
- Show available seats

## Testing Checklist

- [ ] Create course with minimum year level
- [ ] Create course with student type restrictions
- [ ] Create course with GPAX requirement
- [ ] Add multiple prerequisites
- [ ] Set maximum enrollment
- [ ] Enable instructor approval
- [ ] Edit existing course requirements
- [ ] Verify all fields save correctly
- [ ] Test with empty/null values
- [ ] Verify JSON arrays parse correctly

## Migration Notes

- All new fields are optional (nullable)
- Existing courses will have `null` values
- No data migration needed
- Backward compatible

## Important Notes

1. **JSON Storage**: Student types, programs, and prerequisites are stored as JSON strings
2. **Validation**: Frontend validation only - backend validation needed for production
3. **Enrollment Logic**: The validation logic provided is a reference - needs implementation
4. **UI Limitations**: Program selection UI not yet implemented (stored as JSON)
5. **Performance**: Consider indexing if filtering by requirements becomes common

## Example Course Configurations

### 1. Introductory Course (Open to All)
```
CS101 - Introduction to Computer Science
- No restrictions
- All fields empty/null
```

### 2. Intermediate Course
```
CS201 - Data Structures
- minYearLevel: 2
- prerequisiteCourses: ["CS101"]
- maxEnrollment: 60
```

### 3. Advanced Course
```
CS401 - Advanced Algorithms
- minYearLevel: 3
- minGpax: 3.00
- prerequisiteCourses: ["CS201", "CS301"]
- allowedStudentTypes: ["REGULAR", "SCHOLARSHIP"]
- maxEnrollment: 30
```

### 4. Graduate Seminar
```
CS599 - Research Seminar
- minYearLevel: 4
- minGpax: 3.50
- requiresApproval: true
- maxEnrollment: 15
```

### 5. Exchange Student Course
```
CS350 - Global Software Development
- allowedStudentTypes: ["EXCHANGE", "INTERNATIONAL"]
- prerequisiteCourses: ["CS201"]
- maxEnrollment: 25
```

## Conclusion

The Enrollment Requirements feature provides comprehensive control over course access, ensuring students meet necessary qualifications while giving administrators flexibility to manage course enrollment effectively. This system lays the foundation for automated enrollment validation and approval workflows.
