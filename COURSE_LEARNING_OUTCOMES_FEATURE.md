# Course Learning Outcomes & Syllabus Upload Feature

## Overview
Enhanced the course management system to include learning outcomes and syllabus PDF upload functionality. This allows administrators to define clear learning objectives for each course and attach course syllabus documents.

## Features Added

### 1. **Learning Outcomes Field**
- **Type**: Text area (supports multi-line input)
- **Purpose**: Define what students will learn and be able to do after completing the course
- **Format**: Supports bullet points and structured text
- **Optional**: Not required, but recommended for complete course information

### 2. **Syllabus PDF Upload**
- **Type**: URL input field
- **Purpose**: Link to course syllabus PDF document
- **Options**:
  - Enter direct URL (e.g., `https://example.com/syllabus.pdf`)
  - Enter relative path (e.g., `/uploads/syllabus.pdf`)
  - Upload button (placeholder for future file upload feature)
- **Optional**: Not required

## Database Changes

### Schema Updates
Added two new fields to the `Course` model in Prisma schema:

```prisma
model Course {
  id          String   @id @default(cuid())
  code        String   @unique
  nameTh      String
  nameEn      String
  credits     Int
  description String?  @db.Text
  
  // NEW FIELDS
  learningOutcomes String?  @db.Text  // Learning outcomes/objectives
  syllabusUrl      String?            // URL/path to syllabus PDF file
  
  sections    ClassSection[]
  programs    ProgramCourse[]
}
```

### Migration
- Migration name: `20251128231749_init`
- Status: ✅ Applied successfully
- Database: Reset and reseeded with test data

## Files Modified

### 1. Database Schema
**File**: `/packages/lib/prisma/schema.prisma`
- Added `learningOutcomes` field (Text)
- Added `syllabusUrl` field (String)

### 2. Server Actions
**File**: `/apps/web/actions/course.ts`

**`createCourse()` function:**
```typescript
- Added learningOutcomes parameter
- Added syllabusUrl parameter
- Both fields are optional (null if empty)
```

**`updateCourse()` function:**
```typescript
- Added learningOutcomes parameter
- Added syllabusUrl parameter
- Both fields are optional (null if empty)
```

### 3. Create Course Page
**File**: `/apps/web/app/admin/program/courses/create/page.tsx`

**Enhancements:**
- Reorganized into 3 sections:
  1. **Basic Information** - Code, names, credits, description
  2. **Learning Outcomes** - Large textarea for objectives
  3. **Course Materials** - Syllabus URL input with upload button

**UI Improvements:**
- Section headers with borders
- Better spacing and organization
- Helpful placeholder text
- Upload button (placeholder for future feature)

### 4. Edit Course Page
**File**: `/apps/web/app/admin/program/courses/[id]/edit/page.tsx`

**Enhancements:**
- Same 3-section layout as create page
- Pre-populated with existing course data
- Shows link to view current syllabus (if exists)
- All fields editable

## User Interface

### Create Course Form

```
┌─────────────────────────────────────────┐
│ Basic Information                        │
├─────────────────────────────────────────┤
│ Course Code: [CS101]                    │
│ Thai Name: [ชื่อวิชา]                    │
│ English Name: [Course Name]             │
│ Credits: [3]                            │
│ Description: [Brief description...]     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Learning Outcomes                        │
├─────────────────────────────────────────┤
│ Learning Outcomes / Objectives:         │
│ ┌─────────────────────────────────────┐ │
│ │ - Understand fundamental concepts   │ │
│ │ - Apply knowledge to solve problems │ │
│ │ - Analyze and evaluate solutions    │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Course Materials                         │
├─────────────────────────────────────────┤
│ Syllabus PDF URL:                       │
│ [https://example.com/syllabus.pdf]      │
│ [Upload] button                         │
└─────────────────────────────────────────┘
```

### Edit Course Form
- Same layout as create form
- All fields pre-populated
- Shows "View current syllabus" link if URL exists

## Usage Examples

### Creating a Course with Learning Outcomes

1. Navigate to `/admin/program/courses/create`
2. Fill in basic information (code, names, credits)
3. Add learning outcomes:
   ```
   - Understand object-oriented programming concepts
   - Design and implement classes and objects
   - Apply inheritance and polymorphism
   - Use design patterns effectively
   ```
4. Add syllabus URL: `https://cs.university.edu/courses/CS101/syllabus.pdf`
5. Click "Create Course"

### Editing Learning Outcomes

1. Navigate to `/admin/program/courses/[id]/edit`
2. Modify the learning outcomes textarea
3. Update syllabus URL if needed
4. Click "Save Changes"

## Learning Outcomes Best Practices

### Format Suggestions:
```
1. Numbered list:
   1. Understand fundamental concepts
   2. Apply knowledge to real-world problems
   3. Analyze complex scenarios

2. Bullet points:
   - Master programming techniques
   - Develop problem-solving skills
   - Work effectively in teams

3. Bloom's Taxonomy:
   Knowledge: Define key terms
   Comprehension: Explain concepts
   Application: Implement solutions
   Analysis: Evaluate approaches
   Synthesis: Design systems
   Evaluation: Critique implementations
```

## Syllabus URL Options

### 1. External URL
```
https://university.edu/courses/CS101/syllabus.pdf
```

### 2. Relative Path (if hosted locally)
```
/uploads/syllabi/cs101-syllabus.pdf
```

### 3. Cloud Storage
```
https://storage.googleapis.com/university-courses/cs101.pdf
https://s3.amazonaws.com/university/syllabi/cs101.pdf
```

## Future Enhancements

### 1. **File Upload Feature**
Currently, the "Upload" button shows a placeholder alert. Future implementation should:
- Allow direct PDF file upload
- Store files in `/public/uploads/syllabi/` or cloud storage
- Generate and save the URL automatically
- Validate file type (PDF only)
- Limit file size (e.g., 10MB max)

### 2. **Rich Text Editor**
- Replace textarea with WYSIWYG editor for learning outcomes
- Support formatting (bold, italic, lists)
- Better user experience for structured content

### 3. **Learning Outcome Templates**
- Provide pre-defined templates based on course level
- Bloom's Taxonomy integration
- Program-specific outcome templates

### 4. **Syllabus Preview**
- Inline PDF viewer
- Download button
- Version history

### 5. **Validation**
- Check if syllabus URL is accessible
- Validate PDF format
- Warn if learning outcomes are empty

## Testing Checklist

- [ ] Create new course with learning outcomes
- [ ] Create new course with syllabus URL
- [ ] Create course without optional fields
- [ ] Edit existing course learning outcomes
- [ ] Edit existing course syllabus URL
- [ ] View syllabus link (if URL exists)
- [ ] Verify data saves correctly to database
- [ ] Test with long learning outcomes text
- [ ] Test with various URL formats
- [ ] Verify form validation

## API Reference

### createCourse(formData: FormData)
```typescript
FormData fields:
- code: string (required)
- nameTh: string (required)
- nameEn: string (required)
- credits: number (required)
- description: string (optional)
- learningOutcomes: string (optional)  // NEW
- syllabusUrl: string (optional)       // NEW
```

### updateCourse(id: string, formData: FormData)
```typescript
FormData fields:
- code: string (required)
- nameTh: string (required)
- nameEn: string (required)
- credits: number (required)
- description: string (optional)
- learningOutcomes: string (optional)  // NEW
- syllabusUrl: string (optional)       // NEW
```

## Notes

- Both new fields are optional to maintain backward compatibility
- Existing courses will have `null` values for these fields
- The upload button is a placeholder - actual file upload needs implementation
- Learning outcomes support plain text with line breaks
- Syllabus URL is not validated - any string is accepted

## Benefits

### For Administrators:
1. ✅ Define clear learning objectives for each course
2. ✅ Attach official syllabus documents
3. ✅ Better course documentation
4. ✅ Easier course approval process

### For Students:
1. ✅ Clear understanding of course objectives
2. ✅ Access to course syllabus
3. ✅ Better course selection decisions
4. ✅ Know what to expect from the course

### For Faculty:
1. ✅ Standardized learning outcome format
2. ✅ Easy syllabus distribution
3. ✅ Better course planning
4. ✅ Alignment with program objectives

## Conclusion

The course management system now supports comprehensive course documentation with learning outcomes and syllabus attachments. This enhancement improves transparency and helps students make informed decisions about their course selections.
