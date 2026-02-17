# System Restructuring Plan: Admission Tracks Module

## 📋 Executive Summary

**Objective**: Restructure the system to support multiple admission tracks (รอบการรับสมัคร) for the same program, such as:
- Quota Admission (รับสมัครแบบโควต้า)
- Direct Admission (รับสมัครแบบตรง)
- Portfolio Admission (รับสมัครแบบยื่น Portfolio)
- Special Talent Admission (รับสมัครแบบความสามารถพิเศษ)

**Key Changes**:
1. Move "Program Management" under "Academic" category
2. Create new "Admission Tracks" module
3. Restructure Application model to link with Admission Tracks
4. Enhance navigation and menu structure

---

## 🎯 Current System Analysis

### Current Structure

```
Application Model:
├── applicantId (ผู้สมัคร)
├── programId (หลักสูตร)
└── status (สถานะ)

Navigation:
├── Core Management
│   ├── Program Management
│   ├── Personnel Management
│   ├── Admissions
│   └── Student Management
└── Academic
    ├── Academic Management
    └── Finance
```

### Current Limitations

1. **One Application Type Per Program**: Currently, each application is directly linked to a program without specifying the admission method/track
2. **No Track Differentiation**: Cannot distinguish between different admission rounds or methods
3. **Limited Filtering**: Cannot filter or manage applications by admission track
4. **Inflexible Criteria**: Each program has only one set of admission criteria

---

## 🏗️ Proposed New Structure

### 1. Database Schema Changes

#### New Model: `AdmissionTrack`

```prisma
enum AdmissionTrackType {
  QUOTA              // รับสมัครแบบโควต้า
  DIRECT             // รับสมัครแบบตรง
  PORTFOLIO          // รับสมัครแบบยื่น Portfolio
  SPECIAL_TALENT     // รับสมัครแบบความสามารถพิเศษ
  EARLY_ADMISSION    // รับสมัครแบบ Early Admission
  TRANSFER           // รับสมัครแบบโอนย้าย
  INTERNATIONAL      // รับสมัครนักศึกษาต่างชาติ
}

model AdmissionTrack {
  id          String              @id @default(cuid())
  
  // Basic Information
  code        String              @unique // e.g., "QUOTA-2024-1"
  nameTh      String              // e.g., "รอบที่ 1 โควต้า"
  nameEn      String              // e.g., "Round 1: Quota Admission"
  type        AdmissionTrackType
  
  // Program Relation
  programId   String
  program     Program             @relation(fields: [programId], references: [id])
  
  // Timeline
  academicYear String             // e.g., "2024"
  openDate    DateTime
  closeDate   DateTime
  
  // Capacity
  totalSeats  Int                 // Total available seats
  filledSeats Int                 @default(0) // Current filled seats
  
  // Requirements (JSON for flexibility)
  requirements String?  @db.Text  // JSON: { minGPA: 2.5, documents: [...], etc. }
  
  // Fees
  applicationFee Float?            // Application fee for this track
  
  // Status
  isActive    Boolean             @default(true)
  isPublished Boolean             @default(false) // Visible to public
  
  // Relations
  applications Application[]
  
  createdAt   DateTime            @default(now())
  updatedAt   DateTime            @updatedAt
}
```

#### Modified Model: `Application`

```prisma
model Application {
  id            String            @id @default(cuid())
  applicantId   String
  applicant     Applicant         @relation(fields: [applicantId], references: [id])
  
  // NEW: Link to Admission Track instead of direct Program
  trackId       String
  track         AdmissionTrack    @relation(fields: [trackId], references: [id])
  
  // Keep programId for quick access (denormalized)
  programId     String
  program       Program           @relation(fields: [programId], references: [id])
  
  status        ApplicationStatus @default(DRAFT)
  submittedAt   DateTime?
  
  documents     Document[]
  interview     InterviewResult?
  
  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @updatedAt
}
```

#### Modified Model: `Program`

```prisma
model Program {
  // ... existing fields
  
  // NEW: One program can have multiple admission tracks
  admissionTracks AdmissionTrack[]
  
  // ... existing relations
}
```

---

### 2. Navigation Structure Changes

#### New Navigation Structure

```typescript
const navigation = [
  {
    category: "Overview",
    items: [
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard }
    ]
  },
  {
    category: "Academic", // MOVED HERE
    items: [
      { 
        title: "Program Management", // MOVED FROM Core Management
        href: "/admin/academic/programs", 
        icon: BookOpen 
      },
      { 
        title: "Course Management", 
        href: "/admin/academic/courses", 
        icon: BookMarked 
      },
      { 
        title: "Academic Calendar", 
        href: "/admin/academic/calendar", 
        icon: Calendar 
      },
      { 
        title: "Class Schedules", 
        href: "/admin/academic/schedules", 
        icon: Clock 
      }
    ]
  },
  {
    category: "Admissions", // NEW CATEGORY
    items: [
      { 
        title: "Admission Tracks", // NEW
        href: "/admin/admissions/tracks", 
        icon: Target 
      },
      { 
        title: "Applications", 
        href: "/admin/admissions/applications", 
        icon: FileText 
      },
      { 
        title: "Interview Management", 
        href: "/admin/admissions/interviews", 
        icon: Users 
      },
      { 
        title: "Admission Reports", 
        href: "/admin/admissions/reports", 
        icon: BarChart 
      }
    ]
  },
  {
    category: "Student Management",
    items: [
      { title: "Student Roster", href: "/admin/students", icon: GraduationCap },
      { title: "Enrollment", href: "/admin/students/enrollment", icon: UserPlus }
    ]
  },
  {
    category: "Personnel",
    items: [
      { title: "Personnel Management", href: "/admin/personnel", icon: Users }
    ]
  },
  // ... rest of categories
];
```

---

### 3. New Module: Admission Tracks Management

#### Features

##### 3.1. Admission Track Dashboard (`/admin/admissions/tracks`)
- **Overview Cards**:
  - Total Active Tracks
  - Total Applications Received
  - Available Seats
  - Upcoming Deadlines
- **Track List Table**:
  - Columns: Code, Name, Program, Type, Open Date, Close Date, Seats (Filled/Total), Status, Actions
  - Filters: Program, Type, Academic Year, Status
  - Actions: View, Edit, Duplicate, Archive

##### 3.2. Create Admission Track (`/admin/admissions/tracks/create`)
Form Sections:
1. **Basic Information**
   - Track Code (auto-generated or manual)
   - Thai Name
   - English Name
   - Track Type (dropdown)
   - Academic Year

2. **Program Selection**
   - Select Program (searchable dropdown)
   - Display: Faculty, Department, Degree Level

3. **Timeline**
   - Opening Date & Time
   - Closing Date & Time
   - Result Announcement Date

4. **Capacity Management**
   - Total Seats Available
   - Reserved Seats (optional)
   - Waitlist Enabled (checkbox)

5. **Requirements** (JSON-based, flexible)
   - Minimum GPA/GPAX
   - Required Documents (checklist)
   - Special Requirements (textarea)
   - Eligibility Criteria

6. **Fees**
   - Application Fee
   - Payment Methods Accepted

7. **Visibility**
   - Is Active (checkbox)
   - Is Published (checkbox)
   - Display Order (number)

##### 3.3. Edit Admission Track (`/admin/admissions/tracks/[id]/edit`)
- Same form as create
- Pre-populated with existing data
- Show application statistics
- Warning if applications exist

##### 3.4. Track Detail View (`/admin/admissions/tracks/[id]`)
- Track Information Summary
- Application Statistics
  - Total Applications
  - By Status (pie chart)
  - Timeline (line chart)
- Recent Applications List
- Quick Actions:
  - Edit Track
  - View All Applications
  - Export Data
  - Close/Open Track

---

### 4. Modified Module: Applications

#### Enhanced Application List (`/admin/admissions/applications`)

**New Filters**:
- Admission Track (dropdown)
- Track Type (dropdown)
- Academic Year (dropdown)
- Program (existing)
- Status (existing)

**Enhanced Table Columns**:
- Application ID
- Applicant Name
- **Admission Track** (NEW)
- **Track Type** (NEW)
- Program
- Status
- Submitted Date
- Actions

#### Enhanced Application Form (Public)

**Step 1: Select Admission Track**
```
Available Admission Tracks for [Program Name]:

┌─────────────────────────────────────────┐
│ 🎯 Round 1: Quota Admission             │
│ รอบที่ 1 โควต้า                         │
│ Open: Jan 1 - Jan 31, 2024             │
│ Seats: 45/50 available                  │
│ Fee: 500 THB                            │
│ [Select This Track]                     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 📝 Round 2: Direct Admission            │
│ รอบที่ 2 รับตรง                         │
│ Open: Feb 1 - Feb 28, 2024             │
│ Seats: 28/30 available                  │
│ Fee: 500 THB                            │
│ [Select This Track]                     │
└─────────────────────────────────────────┘
```

**Step 2-N**: Existing application steps

---

### 5. File Structure Changes

#### Current Structure
```
/apps/web/app/admin/
├── program/
│   ├── dashboard/
│   ├── faculties/
│   ├── departments/
│   ├── programs/
│   └── courses/
└── admissions/
    ├── dashboard/
    ├── list/
    └── capacity/
```

#### Proposed New Structure
```
/apps/web/app/admin/
├── academic/                    # NEW: Renamed from "program"
│   ├── dashboard/
│   ├── programs/               # Moved from /program/programs
│   │   ├── page.tsx
│   │   ├── create/
│   │   ├── [id]/
│   │   ├── faculties/         # Nested under programs
│   │   └── departments/       # Nested under programs
│   └── courses/               # Moved from /program/courses
│       ├── page.tsx
│       ├── create/
│       └── [id]/
│
├── admissions/
│   ├── dashboard/
│   ├── tracks/                # NEW: Admission Tracks
│   │   ├── page.tsx          # List all tracks
│   │   ├── create/
│   │   │   └── page.tsx
│   │   └── [id]/
│   │       ├── page.tsx      # Track detail
│   │       └── edit/
│   │           └── page.tsx
│   ├── applications/          # Renamed from "list"
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── interviews/
│   │   ├── schedule/
│   │   ├── criteria/
│   │   └── evaluation/
│   └── reports/              # NEW: Admission reports
│       └── page.tsx
│
└── students/
    └── ... (unchanged)
```

---

### 6. Server Actions

#### New Actions: `/apps/web/actions/admission-track.ts`

```typescript
// Get all admission tracks
export async function getAdmissionTracks(filters?: {
  programId?: string;
  type?: AdmissionTrackType;
  academicYear?: string;
  isActive?: boolean;
})

// Get single track
export async function getAdmissionTrackById(id: string)

// Create track
export async function createAdmissionTrack(data: AdmissionTrackInput)

// Update track
export async function updateAdmissionTrack(id: string, data: AdmissionTrackInput)

// Delete/Archive track
export async function archiveAdmissionTrack(id: string)

// Get tracks by program
export async function getTracksByProgram(programId: string)

// Get active public tracks
export async function getPublicAdmissionTracks(programId?: string)

// Update seat count
export async function updateTrackSeats(trackId: string, increment: number)

// Check track availability
export async function checkTrackAvailability(trackId: string): Promise<{
  isOpen: boolean;
  hasSeats: boolean;
  message: string;
}>
```

#### Modified Actions: `/apps/web/actions/application.ts`

```typescript
// Update to include trackId
export async function createApplication(data: {
  applicantId: string;
  trackId: string;  // NEW: Required
  programId: string; // Keep for denormalization
  // ... other fields
})

// Get applications by track
export async function getApplicationsByTrack(trackId: string)

// Get application statistics by track
export async function getTrackStatistics(trackId: string)
```

---

### 7. Public-Facing Changes

#### Application Page (`/apply` or `/admissions/apply`)

**New Flow**:
1. **Select Program** (existing)
2. **Select Admission Track** (NEW)
   - Show available tracks for selected program
   - Display track details, deadlines, requirements
   - Show seat availability
3. **Fill Application** (existing, but track-specific requirements)
4. **Submit** (existing)

#### Track Information Page (`/admissions/tracks/[id]`)
- Public page showing track details
- Requirements
- Timeline
- How to apply
- FAQ

---

### 8. Migration Strategy

#### Phase 1: Database Migration (Week 1)
1. Create `AdmissionTrack` model
2. Add `trackId` to `Application` model (nullable initially)
3. Create default tracks for existing programs
4. Migrate existing applications to default tracks
5. Make `trackId` required

#### Phase 2: Backend Development (Week 2)
1. Create admission track server actions
2. Update application server actions
3. Create track validation logic
4. Update capacity management

#### Phase 3: Admin UI Development (Week 3-4)
1. Create admission track CRUD pages
2. Update navigation structure
3. Move program management to academic section
4. Update application list with track filters
5. Create track dashboard

#### Phase 4: Public UI Development (Week 5)
1. Update application flow
2. Create track selection step
3. Update public track information pages
4. Update application status check

#### Phase 5: Testing & Deployment (Week 6)
1. Integration testing
2. User acceptance testing
3. Data migration verification
4. Production deployment

---

### 9. Benefits of This Structure

#### For Administrators
✅ **Flexible Admission Management**
- Create multiple admission rounds per program
- Different criteria for different tracks
- Independent timelines and capacities

✅ **Better Organization**
- Clear separation of academic and admission functions
- Logical menu structure
- Easier to find and manage features

✅ **Enhanced Reporting**
- Track-specific statistics
- Compare performance across tracks
- Better capacity planning

#### For Applicants
✅ **Clear Options**
- See all available admission methods
- Understand requirements for each track
- Choose the best fit

✅ **Transparency**
- Real-time seat availability
- Clear deadlines
- Track-specific requirements

#### For System
✅ **Scalability**
- Easy to add new track types
- Flexible requirement system (JSON)
- Supports future enhancements

✅ **Data Integrity**
- Proper relationships
- Denormalized data for performance
- Audit trail

---

### 10. Example Use Cases

#### Use Case 1: Multiple Rounds for Same Program

**Program**: Bachelor of Computer Science

**Admission Tracks**:
1. **Round 1: Quota (โควต้า)**
   - Type: QUOTA
   - Seats: 50
   - Open: Jan 1-31
   - Requirements: GPAX ≥ 3.00, School recommendation
   - Fee: 500 THB

2. **Round 2: Direct (รับตรง)**
   - Type: DIRECT
   - Seats: 30
   - Open: Feb 1-28
   - Requirements: GPAX ≥ 2.75, Entrance exam
   - Fee: 500 THB

3. **Round 3: Portfolio**
   - Type: PORTFOLIO
   - Seats: 20
   - Open: Mar 1-31
   - Requirements: Portfolio submission, Interview
   - Fee: 1000 THB

#### Use Case 2: Special Admission Tracks

**Program**: Bachelor of Music

**Admission Tracks**:
1. **Regular Admission**
   - Type: DIRECT
   - Seats: 40
   - Requirements: Standard academic requirements

2. **Special Talent**
   - Type: SPECIAL_TALENT
   - Seats: 10
   - Requirements: Audition, Performance portfolio
   - Fee: 1500 THB

---

### 11. Technical Considerations

#### Performance
- Index on `trackId` in Application table
- Cache active tracks
- Denormalize programId in Application for quick queries

#### Security
- Validate track availability before application submission
- Check seat capacity atomically
- Prevent double applications to same track

#### Data Integrity
- Cascade delete protection (prevent deleting tracks with applications)
- Archive instead of delete
- Audit log for track changes

---

### 12. Future Enhancements

1. **Track Templates**
   - Save track configurations as templates
   - Quick creation from templates

2. **Automated Track Management**
   - Auto-close when deadline reached
   - Auto-publish at scheduled time
   - Email notifications

3. **Advanced Capacity Management**
   - Reserved seats by region/school
   - Waitlist management
   - Seat transfer between tracks

4. **Track Analytics**
   - Conversion rates
   - Application quality metrics
   - Predictive analytics

5. **Multi-Program Tracks**
   - Single track for multiple related programs
   - Cross-program admission

---

## 📊 Implementation Checklist

### Database
- [ ] Create AdmissionTrack model
- [ ] Add trackId to Application model
- [ ] Add admissionTracks relation to Program
- [ ] Create migration script
- [ ] Create seed data for testing

### Backend
- [ ] Create admission-track.ts server actions
- [ ] Update application.ts server actions
- [ ] Create validation functions
- [ ] Create capacity management functions
- [ ] Update program.ts actions

### Admin UI
- [ ] Update sidebar navigation
- [ ] Move /admin/program to /admin/academic
- [ ] Create /admin/admissions/tracks pages
- [ ] Update /admin/admissions/applications
- [ ] Create track dashboard
- [ ] Update application filters

### Public UI
- [ ] Update application flow
- [ ] Create track selection page
- [ ] Update track information pages
- [ ] Update application status check

### Testing
- [ ] Unit tests for server actions
- [ ] Integration tests for application flow
- [ ] E2E tests for complete admission process
- [ ] Performance testing
- [ ] Security testing

### Documentation
- [ ] Update requirement.md
- [ ] Create admission track user guide
- [ ] Create API documentation
- [ ] Update system architecture docs

---

## 🎯 Conclusion

This restructuring provides a robust, scalable solution for managing multiple admission tracks per program. The new structure:

1. **Logically organizes** academic and admission functions
2. **Provides flexibility** for various admission methods
3. **Maintains data integrity** through proper relationships
4. **Enhances user experience** for both administrators and applicants
5. **Supports future growth** with extensible architecture

**Recommended Timeline**: 6 weeks for full implementation
**Priority**: High - Foundational change that enables future features
**Risk Level**: Medium - Requires careful migration of existing data

---

**Document Version**: 1.0
**Created**: 2025-11-29
**Author**: System Architect
**Status**: Proposal - Pending Approval
