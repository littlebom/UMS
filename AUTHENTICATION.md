# Authentication & Authorization System

## Overview
ระบบ UMS ใช้ **Session-based Authentication** ผ่าน **HTTP-only Cookies** และมีการป้องกันหน้าเพจด้วย **Next.js Middleware**

---

## User Roles

```typescript
enum UserRole {
  ADMIN      // ผู้ดูแลระบบ
  STAFF      // เจ้าหน้าที่
  INSTRUCTOR // อาจารย์
  STUDENT    // นักศึกษา
  APPLICANT  // ผู้สมัคร
}
```

---

## Protected Routes

### 1. Admin Routes (`/admin/*`)
- **Required Role:** `ADMIN`
- **Cookie:** `admin_session`
- **Login Page:** `/admin/login`
- **Redirect:** Unauthorized users → `/admin/login`

### 2. Student Routes (`/student/*`)
- **Required Role:** `STUDENT`
- **Cookie:** `student_session`
- **Login Page:** `/student/login`
- **Redirect:** Unauthorized users → `/student/login`

### 3. Instructor Routes (`/instructor/*`)
- **Required Role:** `INSTRUCTOR`
- **Cookie:** `instructor_session`
- **Login Page:** `/instructor/login`
- **Redirect:** Unauthorized users → `/instructor/login`

### 4. Applicant Routes (`/admissions/*`)
- **Required Role:** `APPLICANT`
- **Cookie:** `applicant_session`
- **Login Page:** `/admissions/login`
- **Redirect:** Unauthorized users → `/admissions/login`
- **Public Pages:** `/admissions/login`, `/admissions/register`

### 5. Public Routes
- Homepage (`/`)
- Help Center (`/help`)
- AI Chatbot Widget
- Application Status Check

---

## Security Layers

### Layer 1: Middleware (Server-side)
**File:** `/apps/web/middleware.ts`

- ตรวจสอบ cookies ก่อนเข้าถึงหน้าเพจ
- Redirect ผู้ใช้ที่ไม่มีสิทธิ์ไปหน้า login
- ป้องกันผู้ที่ login แล้วเข้าหน้า login ซ้ำ

```typescript
// ตัวอย่างการตรวจสอบ Admin
if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const adminSession = request.cookies.get('admin_session');
    
    if (!adminSession) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }
}
```

### Layer 2: Layout Protection (Client-side)
**Files:** 
- `/apps/web/app/admin/layout.tsx`
- `/apps/web/app/student/layout.tsx`

- ตรวจสอบ session ด้วย `getAdminSession()` / `getStudentSession()`
- แสดง loading state ระหว่างตรวจสอบ
- Redirect ถ้า session ไม่ถูกต้อง

```typescript
useEffect(() => {
    if (!isLoginPage) {
        getAdminSession()
            .then((session) => {
                if (!session || session.role !== "ADMIN") {
                    router.push("/admin/login");
                } else {
                    setIsLoading(false);
                }
            })
            .catch(() => {
                router.push("/admin/login");
            });
    }
}, [isLoginPage, router]);
```

### Layer 3: Server Actions
**Files:** 
- `/apps/web/actions/admin-auth.ts`
- `/apps/web/actions/student-auth.ts`
- `/apps/web/actions/instructor-auth.ts`
- `/apps/web/actions/auth.ts`

- ตรวจสอบ credentials (email/password)
- สร้าง session cookie
- Redirect ไปหน้า dashboard

---

## Session Structure

### Admin Session
```json
{
  "userId": "cuid",
  "role": "ADMIN",
  "personnelId": "cuid"
}
```

### Student Session
```json
{
  "userId": "cuid",
  "role": "STUDENT",
  "studentId": "cuid",
  "studentCode": "66010001"
}
```

### Instructor Session
```json
{
  "userId": "cuid",
  "role": "INSTRUCTOR",
  "instructorId": "cuid",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Applicant Session
```json
{
  "userId": "cuid",
  "role": "APPLICANT",
  "applicantId": "cuid"
}
```

---

## Cookie Configuration

```typescript
{
    httpOnly: true,                              // ป้องกัน XSS
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    maxAge: 60 * 60 * 24 * 7,                   // 7 days
    path: "/",
}
```

---

## Testing Authentication

### Test Admin Access
1. ไปที่ `http://localhost:3000/admin/settings` (ไม่ login)
2. ระบบจะ redirect ไป `/admin/login`
3. Login ด้วย admin credentials
4. ระบบจะ redirect กลับไป `/admin`

### Test Student Access
1. ไปที่ `http://localhost:3000/student/dashboard` (ไม่ login)
2. ระบบจะ redirect ไป `/student/login`
3. Login ด้วย student credentials
4. ระบบจะ redirect กลับไป `/student/dashboard`

---

## Security Best Practices

✅ **Implemented:**
- HTTP-only cookies (ป้องกัน XSS)
- Server-side validation (Middleware)
- Client-side validation (Layout)
- Password hashing (bcrypt)
- Session expiration (7 days)
- Role-based access control

⚠️ **Recommendations for Production:**
- Enable HTTPS (set `secure: true`)
- Add CSRF protection
- Implement rate limiting
- Add 2FA for admin accounts
- Use environment variables for secrets
- Implement session refresh tokens
- Add audit logging

---

## Troubleshooting

### Problem: ยังเข้าหน้า admin ได้โดยไม่ login
**Solution:** 
1. ตรวจสอบว่ามีไฟล์ `middleware.ts` ใน `/apps/web/`
2. Restart development server
3. Clear browser cookies
4. ลองเข้าใหม่

### Problem: Redirect loop
**Solution:**
1. ตรวจสอบว่า login page ไม่ถูก protect
2. ตรวจสอบ `matcher` config ใน middleware
3. Clear cookies และลองใหม่

### Problem: Session หายหลัง refresh
**Solution:**
1. ตรวจสอบ cookie `maxAge` setting
2. ตรวจสอบว่า `httpOnly` และ `path` ถูกต้อง
3. ตรวจสอบว่า browser ไม่ block cookies

---

## Files Modified

1. ✅ `/apps/web/middleware.ts` - NEW (Route protection)
2. ✅ `/apps/web/app/admin/layout.tsx` - UPDATED (Session validation)
3. ✅ `/apps/web/app/student/layout.tsx` - UPDATED (Session validation)

---

## Next Steps

- [ ] Add protection to `/instructor` layout
- [ ] Add protection to `/admissions` layout  
- [ ] Add session refresh mechanism
- [ ] Add "Remember me" functionality
- [ ] Implement CSRF tokens
- [ ] Add rate limiting to login endpoints
