# 🛠️ Step-by-Step Implementation Guide

**คู่มือการนำไปใช้งาน Scalability & Security improvements**

---

## Phase 1: Database Optimization (Week 1)

### Step 1: Add Database Indexes

```bash
# 1. Create migration file
npx prisma migrate dev --name add_performance_indexes

# 2. Edit the migration file (packages/lib/prisma/migrations/[timestamp]_add_performance_indexes/migration.sql)
```

**migration.sql:**

```sql
-- Add indexes for User model
CREATE INDEX `User_role_idx` ON `User`(`role`);
CREATE INDEX `User_createdAt_idx` ON `User`(`createdAt`);

-- Add indexes for Student model
CREATE INDEX `Student_programId_idx` ON `Student`(`programId`);
CREATE INDEX `Student_status_idx` ON `Student`(`status`);
CREATE INDEX `Student_createdAt_idx` ON `Student`(`createdAt`);

-- Add indexes for Application model
CREATE INDEX `Application_applicantId_idx` ON `Application`(`applicantId`);
CREATE INDEX `Application_programId_idx` ON `Application`(`programId`);
CREATE INDEX `Application_status_idx` ON `Application`(`status`);
CREATE INDEX `Application_createdAt_idx` ON `Application`(`createdAt`);

-- Add indexes for ClassSection model
CREATE INDEX `ClassSection_courseId_idx` ON `ClassSection`(`courseId`);
CREATE INDEX `ClassSection_instructorId_idx` ON `ClassSection`(`instructorId`);
CREATE INDEX `ClassSection_academicTermId_idx` ON `ClassSection`(`academicTermId`);

-- Add indexes for Payment model
CREATE INDEX `Payment_studentId_idx` ON `Payment`(`studentId`);
CREATE INDEX `Payment_invoiceId_idx` ON `Payment`(`invoiceId`);
CREATE INDEX `Payment_status_idx` ON `Payment`(`status`);
CREATE INDEX `Payment_createdAt_idx` ON `Payment`(`createdAt`);

-- Add indexes for Interview model
CREATE INDEX `Interview_applicantId_idx` ON `Interview`(`applicantId`);
CREATE INDEX `Interview_slotId_idx` ON `Interview`(`slotId`);
CREATE INDEX `Interview_createdAt_idx` ON `Interview`(`createdAt`);

-- Add indexes for Grade model
CREATE INDEX `Grade_studentId_idx` ON `Grade`(`studentId`);
CREATE INDEX `Grade_sectionId_idx` ON `Grade`(`sectionId`);
CREATE INDEX `Grade_createdAt_idx` ON `Grade`(`createdAt`);

-- Composite indexes for common queries
CREATE INDEX `Student_status_createdAt_idx` ON `Student`(`status`, `createdAt`);
CREATE INDEX `Application_status_createdAt_idx` ON `Application`(`status`, `createdAt`);
CREATE INDEX `Payment_status_studentId_idx` ON `Payment`(`status`, `studentId`);
```

```bash
# 3. Apply migration
npx prisma migrate deploy
```

### Step 2: Update .env for Connection Pooling

```bash
# .env
# Old:
# DATABASE_URL="mysql://user:pass@localhost:3306/ums"

# New - with connection pooling:
DATABASE_URL="mysql://user:pass@localhost:3306/ums?connection_limit=25&connection_timeout=10s"
```

```bash
# Regenerate Prisma client
npx prisma generate
```

### Step 3: Implement Pagination Utility

**Create file: `apps/web/lib/pagination.ts`**

```typescript
"use server";

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export async function paginate<T>(
  query: (skip: number, take: number) => Promise<T[]>,
  countQuery: () => Promise<number>,
  params: PaginationParams = {}
): Promise<PaginatedResult<T>> {
  const page = Math.max(1, params.page || 1);
  const pageSize = Math.min(params.pageSize || 20, 100); // Max 100 per page

  // Execute both queries in parallel
  const [data, total] = await Promise.all([
    query((page - 1) * pageSize, pageSize),
    countQuery(),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

// Validation helper
export function validatePaginationParams(params: any): PaginationParams {
  const page = Math.max(1, parseInt(params.page) || 1);
  const pageSize = Math.min(Math.max(1, parseInt(params.pageSize) || 20), 100);

  return {
    page,
    pageSize,
    sortBy: params.sortBy || 'createdAt',
    sortOrder: params.sortOrder === 'asc' ? 'asc' : 'desc',
  };
}
```

### Step 4: Update Student Action with Pagination

**File: `apps/web/actions/student.ts` (updated)**

```typescript
"use server";

import { prisma } from "@ums/lib";
import { paginate, validatePaginationParams, PaginationParams } from "@/lib/pagination";

export async function getStudents(params: PaginationParams = {}) {
  const validParams = validatePaginationParams(params);

  return paginate(
    (skip, take) =>
      prisma.student.findMany({
        skip,
        take,
        select: {
          id: true,
          studentCode: true,
          firstName: true,
          lastName: true,
          status: true,
          program: {
            select: {
              id: true,
              nameTh: true,
              nameEn: true,
            },
          },
          user: {
            select: {
              email: true,
            },
          },
        },
        orderBy: {
          [validParams.sortBy || 'createdAt']: validParams.sortOrder,
        },
      }),
    () => prisma.student.count(),
    validParams
  );
}

export async function searchStudents(
  query: string,
  params: PaginationParams = {}
) {
  const validParams = validatePaginationParams(params);

  return paginate(
    (skip, take) =>
      prisma.student.findMany({
        where: {
          OR: [
            { studentCode: { contains: query } },
            { firstName: { contains: query } },
            { lastName: { contains: query } },
            { user: { email: { contains: query } } },
          ],
        },
        skip,
        take,
        select: {
          id: true,
          studentCode: true,
          firstName: true,
          lastName: true,
          status: true,
          program: { select: { nameTh: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
    () =>
      prisma.student.count({
        where: {
          OR: [
            { studentCode: { contains: query } },
            { firstName: { contains: query } },
            { lastName: { contains: query } },
            { user: { email: { contains: query } } },
          ],
        },
      }),
    validParams
  );
}
```

---

## Phase 1: Redis Setup (Week 1)

### Step 1: Install Redis

```bash
# Option 1: Docker (recommended)
docker run -d --name ums-redis -p 6379:6379 redis:7

# Option 2: Homebrew (macOS)
brew install redis
brew services start redis

# Option 3: Cloud Redis
# Go to https://redis.com/cloud/
# Create free tier account
# Copy connection string to .env
```

### Step 2: Install ioredis

```bash
npm install ioredis
npm install --save-dev @types/ioredis
```

### Step 3: Create Redis Client

**File: `apps/web/lib/redis.ts`**

```typescript
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: 0,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
  enableOfflineQueue: true,
});

redis.on('connect', () => {
  console.log('✅ Redis connected');
});

redis.on('error', (err) => {
  console.error('❌ Redis error:', err);
});

redis.on('close', () => {
  console.log('Redis disconnected');
});

export default redis;
```

### Step 4: Update .env

```bash
# .env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=  # Leave empty if no password

# For cloud Redis (Redis Cloud):
# REDIS_URL=redis://default:password@host:port
```

### Step 5: Test Redis Connection

**File: `apps/web/app/api/test-redis/route.ts`**

```typescript
import redis from '@/lib/redis';

export async function GET() {
  try {
    // Test connection
    await redis.set('test', 'connection', 'EX', 10);
    const value = await redis.get('test');

    return Response.json({
      status: 'success',
      message: 'Redis connected',
      value,
    });
  } catch (error) {
    return Response.json(
      { status: 'error', error: String(error) },
      { status: 500 }
    );
  }
}
```

Visit `http://localhost:3000/api/test-redis` to verify.

---

## Phase 2: Session Management with Redis

### Step 1: Update Session Library

**File: `apps/web/lib/session.ts` (completely rewrite)**

```typescript
"use server";

import { cookies } from 'next/headers';
import redis from './redis';

export interface SessionData {
  userId: string;
  role: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  loginTime: number;
}

export async function createSession(
  data: SessionData,
  sessionType: 'admin' | 'student' | 'instructor' | 'applicant',
  expiresInDays = 7
) {
  const sessionId = crypto.randomUUID();
  const sessionKey = `session:${sessionType}:${sessionId}`;
  const ttl = expiresInDays * 24 * 60 * 60;

  // Store in Redis
  await redis.setex(
    sessionKey,
    ttl,
    JSON.stringify({
      ...data,
      createdAt: Date.now(),
      expiresAt: Date.now() + ttl * 1000,
    })
  );

  // Set session cookie
  const cookieStore = await cookies();
  cookieStore.set({
    name: `${sessionType}_session`,
    value: sessionId,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: ttl,
    path: '/',
  });

  return sessionId;
}

export async function getSession(
  sessionType: 'admin' | 'student' | 'instructor' | 'applicant'
): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(`${sessionType}_session`)?.value;

  if (!sessionId) return null;

  const sessionKey = `session:${sessionType}:${sessionId}`;
  const data = await redis.get(sessionKey);

  if (!data) return null;

  return JSON.parse(data) as SessionData;
}

export async function destroySession(
  sessionType: 'admin' | 'student' | 'instructor' | 'applicant'
) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(`${sessionType}_session`)?.value;

  if (sessionId) {
    const sessionKey = `session:${sessionType}:${sessionId}`;
    await redis.del(sessionKey);
  }

  cookieStore.delete(`${sessionType}_session`);
}

export async function invalidateAllSessions(userId: string) {
  // Find all sessions for this user and delete them
  const keys = await redis.keys(`session:*:*`);
  
  for (const key of keys) {
    const data = await redis.get(key);
    if (data) {
      const session = JSON.parse(data);
      if (session.userId === userId) {
        await redis.del(key);
      }
    }
  }
}

export async function refreshSession(
  sessionType: 'admin' | 'student' | 'instructor' | 'applicant',
  expiresInDays = 7
) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(`${sessionType}_session`)?.value;

  if (!sessionId) return null;

  const sessionKey = `session:${sessionType}:${sessionId}`;
  const data = await redis.get(sessionKey);

  if (!data) return null;

  const ttl = expiresInDays * 24 * 60 * 60;

  // Reset TTL in Redis
  await redis.expire(sessionKey, ttl);

  // Update cookie
  cookieStore.set({
    name: `${sessionType}_session`,
    value: sessionId,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: ttl,
  });

  return JSON.parse(data) as SessionData;
}
```

### Step 2: Update Middleware

**File: `apps/web/middleware.ts` (update session validation)**

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import redis from './lib/redis';

async function getSessionFromRedis(request: NextRequest, sessionType: string) {
  const sessionId = request.cookies.get(`${sessionType}_session`)?.value;
  if (!sessionId) return null;

  const sessionKey = `session:${sessionType}:${sessionId}`;
  const data = await redis.get(sessionKey);
  
  return data ? JSON.parse(data) : null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes protection
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const session = await getSessionFromRedis(request, 'admin');

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Similar for student, instructor, applicant routes...

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/student/:path*',
    '/instructor/:path*',
    '/admissions/:path*',
  ],
};
```

---

## Phase 2: Rate Limiting with Redis

### Step 1: Update Rate Limit Library

**File: `apps/web/lib/rate-limit.ts` (rewrite for Redis)**

```typescript
"use server";

import { cookies } from "next/headers";
import redis from "./redis";

const RATE_LIMIT_CONFIG = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  blockDurationMs: 30 * 60 * 1000, // 30 minutes
};

async function getClientId(): Promise<string> {
  const clientCookie = (await cookies()).get("client_id");

  if (clientCookie) {
    return clientCookie.value;
  }

  const newClientId = crypto.randomUUID();
  (await cookies()).set({
    name: "client_id",
    value: newClientId,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return newClientId;
}

export async function checkRateLimit(identifier?: string): Promise<string | null> {
  const clientId = identifier || await getClientId();
  const key = `rate_limit:${clientId}`;
  const now = Date.now();

  const data = await redis.get(key);
  if (!data) {
    return null;
  }

  const attempt = JSON.parse(data);

  // Check if blocked
  if (attempt.blockedUntil && now < attempt.blockedUntil) {
    const remainingMinutes = Math.ceil((attempt.blockedUntil - now) / 60000);
    return `Too many login attempts. Try again in ${remainingMinutes} minutes.`;
  }

  return null;
}

export async function recordFailedAttempt(identifier?: string): Promise<void> {
  const clientId = identifier || await getClientId();
  const key = `rate_limit:${clientId}`;
  const now = Date.now();

  const data = await redis.get(key);
  let attempt = data ? JSON.parse(data) : { count: 0, firstAttempt: now };

  if (now - attempt.firstAttempt > RATE_LIMIT_CONFIG.windowMs) {
    attempt = { count: 0, firstAttempt: now };
  }

  attempt.count++;

  if (attempt.count >= RATE_LIMIT_CONFIG.maxAttempts) {
    attempt.blockedUntil = now + RATE_LIMIT_CONFIG.blockDurationMs;
  }

  const ttl = Math.ceil(RATE_LIMIT_CONFIG.blockDurationMs / 1000);
  await redis.setex(key, ttl, JSON.stringify(attempt));
}

export async function resetRateLimit(identifier?: string): Promise<void> {
  const clientId = identifier || await getClientId();
  const key = `rate_limit:${clientId}`;
  await redis.del(key);
}

export async function getRemainingAttempts(identifier?: string): Promise<number> {
  const clientId = identifier || await getClientId();
  const key = `rate_limit:${clientId}`;

  const data = await redis.get(key);
  if (!data) {
    return RATE_LIMIT_CONFIG.maxAttempts;
  }

  const attempt = JSON.parse(data);
  const now = Date.now();

  if (now - attempt.firstAttempt > RATE_LIMIT_CONFIG.windowMs) {
    return RATE_LIMIT_CONFIG.maxAttempts;
  }

  return Math.max(0, RATE_LIMIT_CONFIG.maxAttempts - attempt.count);
}
```

---

## Phase 2: Caching Strategy

### Step 1: Create Cache Utility

**File: `apps/web/lib/cache.ts`**

```typescript
"use server";

import redis from "./redis";

function getCacheKey(type: string, id?: string): string {
  return id ? `${type}:${id}` : type;
}

export async function withCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl = 3600 // 1 hour
): Promise<T> {
  // Try cache
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }

  // Fetch data
  const data = await fetchFn();

  // Cache it
  await redis.setex(key, ttl, JSON.stringify(data));

  return data;
}

export async function invalidateCache(keys: string[]): Promise<void> {
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}

// Specific caching functions
export async function cacheStudent(id: string, ttl = 3600) {
  return withCache(
    getCacheKey('student', id),
    async () => {
      const { prisma } = await import('@ums/lib');
      return prisma.student.findUnique({
        where: { id },
        include: { program: true, user: true },
      });
    },
    ttl
  );
}

export async function invalidateStudentCache(id: string) {
  await invalidateCache([getCacheKey('student', id)]);
}

export async function cacheProgram(id: string, ttl = 7200) {
  return withCache(
    getCacheKey('program', id),
    async () => {
      const { prisma } = await import('@ums/lib');
      return prisma.program.findUnique({
        where: { id },
        include: { faculty: true, department: true },
      });
    },
    ttl
  );
}

export async function invalidateProgramCache(id: string) {
  await invalidateCache([getCacheKey('program', id)]);
}

export async function cacheFacultyList(ttl = 7200) {
  return withCache(
    getCacheKey('faculties'),
    async () => {
      const { prisma } = await import('@ums/lib');
      return prisma.faculty.findMany({
        select: { id: true, nameTh: true, nameEn: true, code: true },
      });
    },
    ttl
  );
}

export async function invalidateFacultyCache() {
  await invalidateCache([getCacheKey('faculties')]);
}
```

### Step 2: Update Actions to Use Cache

```typescript
// actions/student.ts (add caching)
import { cacheStudent, invalidateStudentCache } from '@/lib/cache';

export async function getStudent(id: string) {
  return cacheStudent(id, 1800); // Cache for 30 minutes
}

export async function updateStudent(id: string, data: any) {
  const result = await prisma.student.update({
    where: { id },
    data,
  });

  // Invalidate cache
  await invalidateStudentCache(id);

  return result;
}
```

---

## Phase 3: Input Validation

### Step 1: Install Zod

```bash
npm install zod
```

### Step 2: Create Validation Schemas

**File: `apps/web/lib/validation.ts`**

```typescript
import { z } from 'zod';

// Common validators
export const emailSchema = z
  .string()
  .email('Invalid email address')
  .min(1)
  .max(255);

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain uppercase letter')
  .regex(/[a-z]/, 'Must contain lowercase letter')
  .regex(/[0-9]/, 'Must contain number')
  .regex(/[^A-Za-z0-9]/, 'Must contain special character');

export const studentCodeSchema = z
  .string()
  .regex(/^\d{8}$/, 'Student code must be 8 digits');

export const thaiNameSchema = z
  .string()
  .min(1, 'Thai name required')
  .max(255);

export const englishNameSchema = z
  .string()
  .min(1, 'English name required')
  .max(255);

// Login schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password required'),
});

// Student creation
export const createStudentSchema = z.object({
  userId: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  studentCode: studentCodeSchema,
  programId: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'GRADUATED']).default('ACTIVE'),
});

// Faculty creation
export const createFacultySchema = z.object({
  nameTh: thaiNameSchema,
  nameEn: englishNameSchema,
  code: z.string().regex(/^\d{2}$/, 'Faculty code must be 2 digits'),
  description: z.string().optional(),
});
```

### Step 3: Use Validation in Actions

```typescript
// actions/admin-auth.ts
import { loginSchema } from '@/lib/validation';

export async function loginAdmin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validate input
  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    throw new Error('Invalid input: ' + result.error.message);
  }

  // Continue with login logic...
}
```

---

## 📝 Checklist for Each Phase

### Phase 1 Checklist (Week 1-2)
- [ ] Add database indexes
- [ ] Update connection pooling config
- [ ] Implement pagination utility
- [ ] Update key actions with pagination
- [ ] Setup Redis (local/cloud)
- [ ] Test Redis connection
- [ ] Update session management with Redis
- [ ] Update rate limiting with Redis

### Phase 2 Checklist (Week 3-4)
- [ ] Implement caching strategies
- [ ] Add CSRF to all forms
- [ ] Add security headers
- [ ] Install and configure Zod
- [ ] Create validation schemas
- [ ] Update critical actions with validation
- [ ] Setup error logging
- [ ] Create health check endpoint

### Phase 3 Checklist (Week 5-8)
- [ ] Setup Nginx load balancing
- [ ] Create Docker configuration
- [ ] Setup CI/CD pipeline (GitHub Actions)
- [ ] Database monitoring setup
- [ ] Implement metrics collection
- [ ] Setup error tracking (Sentry)
- [ ] Performance testing

---

**Ready to start implementation? Pick Phase 1 and let's go! 🚀**
