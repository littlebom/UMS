---
description: Admissions System Development Roadmap
---

# Admissions System Development Roadmap

This document outlines the step-by-step plan to build a complete Admissions system for UMS.

## Phase 1: Application Submission (Priority: High)
**Goal:** Enable students to submit applications for open admission tracks.

- [ ] **Create Application Form Page** (`/admissions/apply/[trackId]`)
    - [ ] Implement Multi-step Wizard UI (Steps: Personal, Education, Documents, Review).
    - [ ] Fetch `AdmissionTrack` details to display requirements.
- [ ] **Develop Server Actions**
    - [ ] `createApplication`: Initialize a draft application.
    - [ ] `updateApplicationStep`: Save progress for each step.
    - [ ] `submitApplication`: Finalize submission and change status to `SUBMITTED`.
- [ ] **Document Upload System**
    - [ ] Implement file upload component (Drag & Drop).
    - [ ] Secure file storage logic.

## Phase 2: Applicant Dashboard (Priority: Medium)
**Goal:** Provide a central hub for applicants to track their status.

- [ ] **Update Applicant Dashboard** (`/applicant/dashboard`)
    - [ ] Fetch and display user's applications.
    - [ ] Show status badges (Draft, Submitted, Under Review, Interview, etc.).
    - [ ] Add "Resume Application" button for drafts.

## Phase 3: Staff Review & Screening (Priority: Medium)
**Goal:** Streamline the application review process for staff.

- [ ] **Application Detail View** (`/admin/admissions/applications/[id]`)
    - [ ] Display full applicant profile and uploaded documents.
    - [ ] Add "Review Actions" panel (Approve, Reject, Request Changes).
- [ ] **Bulk Actions**
    - [ ] Allow selecting multiple applicants to change status (e.g., "Pass Screening").

## Phase 4: Interview & Announcement (Priority: Low - Future)
**Goal:** Manage interviews and final selection.

- [ ] **Interview Booking System**
    - [ ] Allow applicants to select available slots from their dashboard.
- [ ] **Interview Scoring**
    - [ ] Digital score sheet for interviewers.
- [ ] **Final Announcement**
    - [ ] System to publish results and notify students.
