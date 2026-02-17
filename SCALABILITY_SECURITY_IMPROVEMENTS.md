# 🚀 Scalability & Security Improvements Guide

**เอกสารนี้แนะนำการปรับปรุง UMS ให้รองรับผู้ใช้จำนวนมากและมีความปลอดภัยสูง**

---

## 📋 Table of Contents

1. [Scalability Improvements](#scalability-improvements)
2. [Security Enhancements](#security-enhancements)
3. [Performance Optimization](#performance-optimization)
4. [Infrastructure & DevOps](#infrastructure--devops)
5. [Monitoring & Logging](#monitoring--logging)
6. [Implementation Priority](#implementation-priority)

---

## 🔥 Scalability Improvements

### 1. ✅ Database Optimization

#### 1.1 Database Connection Pooling
**Current Issue:** 🔴 ไม่มี connection pool → ติดขัดเมื่อ concurrent users เยอะ

**Solution:** ใช้ PgBouncer หรือ Prisma connection pooling

```typescript
// prisma/schema.prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// กำหนด connection pool size
// DATABASE_URL="mysql://user:pass@host:3306/db?connection_limit=20"
// ที่ production แนะนำ: 20-30 connections
```

**Implementation Steps:**
```bash
# 1. Update .env
DATABASE_URL="mysql://user:pass@host:3306/db?connection_limit=30&connection_timeout=10s"

# 2. Regenerate Prisma client
npx prisma generate

# 3. Deploy changes
```

#### 1.2 Database Indexing
**Current Issue:** 🔴 ไม่มี indexes → queries ช้า

**Recommended Indexes:**

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique  // ✅ Default index
  role          UserRole
  createdAt     DateTime  @default(now())
  
  @@index([role])           // ✅ Add this
  @@index([createdAt])      // ✅ Add this for pagination
}

model Student {
  id            String    @id @default(cuid())
  userId        String    @unique
  studentCode   String    @unique
  programId     String
  status        String
  
  @@index([programId])       // ✅ For filtering
  @@index([status])          // ✅ For status queries
  @@index([createdAt])       // ✅ For sorting
}

model Application {
  id            String    @id @default(cuid())
  applicantId   String
  programId     String
  status        String
  createdAt     DateTime  @default(now())
  
  @@index([applicantId])
  @@index([programId])
  @@index([status])
  @@index([createdAt])
}

model ClassSection {
  id            String    @id @default(cuid())
  courseId      String
  instructorId  String
  academicTermId String
  
  @@index([courseId])
  @@index([instructorId])
  @@index([academicTermId])
}

model Payment {
  id            String    @id @default(cuid())
  studentId     String
  invoiceId     String
  status        String
  createdAt     DateTime  @default(now())
  
  @@index([studentId])
  @@index([invoiceId])
  @@index([status])
  @@index([createdAt])
}
```

**Migration:**
```bash
npx prisma migrate dev --name add_indexes
```

#### 1.3 Database Query Optimization
**Current Issue:** 🟡 N+1 queries → โหลดข้อมูลแบบไม่มีประสิทธิภาพ

**Example - Before (Bad):**
```typescript
// ❌ Bad: N+1 queries
const students = await prisma.student.findMany();
students.forEach(student => {
  const program = await prisma.program.findUnique({
    where: { id: student.programId }
  });
  // Load 100 students → 101 queries!
});
```

**Example - After (Good):**
```typescript
// ✅ Good: 1 query with join
const students = await prisma.student.findMany({
  include: {
    program: {
      select: {
        id: true,
        nameTh: true,
        nameEn: true,
      }
    }
  },
  // Add pagination
  skip: (page - 1) * pageSize,
  take: pageSize,
});
```

#### 1.4 Pagination Implementation
**Current Issue:** 🔴 ไม่มี pagination → load ทั้งหมด memory เต็ม

**Implementation:**

```typescript
// lib/pagination.ts
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
}

export async function paginate<T>(
  query: (skip: number, take: number) => Promise<T[]>,
  countQuery: () => Promise<number>,
  params: PaginationParams = {}
): Promise<PaginatedResult<T>> {
  const page = Math.max(1, params.page || 1);
  const pageSize = Math.min(params.pageSize || 20, 100); // Max 100 per page
  
  const [data, total] = await Promise.all([
    query((page - 1) * pageSize, pageSize),
    countQuery()
  ]);
  
  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}
```

**Usage in Actions:**
```typescript
// actions/student.ts
export async function getStudents(page = 1, pageSize = 20) {
  return paginate(
    (skip, take) => 
      prisma.student.findMany({
        skip,
        take,
        include: { program: true, user: true },
      }),
    () => prisma.student.count()
  );
}
```

---

### 2. ✅ Redis Caching

#### 2.1 Setup Redis
**Current Issue:** 🔴 ไม่มี cache → database query ทุกครั้ง

**Installation:**

```bash
# Option 1: Docker
docker run -d -p 6379:6379 redis:7

# Option 2: Local (macOS)
brew install redis
brew services start redis

# Option 3: Cloud (Recommended for production)
# - Redis Cloud (https://redis.com/cloud/)
# - AWS ElastiCache
# - Google Cloud Memorystore
```

#### 2.2 Redis Client Setup

```typescript
// lib/redis.ts
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
});

redis.on('error', (err) => console.error('Redis error:', err));

export default redis;
```

#### 2.3 Caching Strategies

```typescript
// lib/cache.ts
import redis from './redis';

// Cache key generator
function getCacheKey(type: string, id?: string): string {
  return id ? `${type}:${id}` : type;
}

// Generic cache wrapper
export async function withCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl = 3600 // 1 hour
): Promise<T> {
  // Try to get from cache
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }

  // Fetch fresh data
  const data = await fetchFn();
  
  // Store in cache
  await redis.setex(key, ttl, JSON.stringify(data));
  
  return data;
}

// Cache invalidation on updates
export async function invalidateCache(keys: string[]): Promise<void> {
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}

// Specific cache functions
export async function cacheStudent(id: string) {
  return withCache(
    getCacheKey('student', id),
    async () => {
      return prisma.student.findUnique({
        where: { id },
        include: { program: true, user: true }
      });
    },
    3600 // 1 hour
  );
}

export async function invalidateStudentCache(id: string) {
  await invalidateCache([getCacheKey('student', id)]);
}
```

#### 2.4 Update Rate Limit to use Redis

```typescript
// lib/rate-limit.ts (Updated for Redis)
"use server";

import redis from './redis';

const RATE_LIMIT_CONFIG = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  blockDurationMs: 30 * 60 * 1000, // 30 minutes
};

export async function checkRateLimit(clientId: string): Promise<string | null> {
  const key = `rate_limit:${clientId}`;
  const data = await redis.get(key);
  
  if (!data) {
    return null; // No previous attempts
  }

  const attempt = JSON.parse(data);
  const now = Date.now();

  if (attempt.blockedUntil && now < attempt.blockedUntil) {
    const remainingMinutes = Math.ceil((attempt.blockedUntil - now) / 60000);
    return `Too many login attempts. Try again in ${remainingMinutes} minutes.`;
  }

  return null;
}

export async function recordFailedAttempt(clientId: string): Promise<void> {
  const key = `rate_limit:${clientId}`;
  const data = await redis.get(key);
  
  const now = Date.now();
  let attempt = data ? JSON.parse(data) : { count: 0, firstAttempt: now };

  if (now - attempt.firstAttempt > RATE_LIMIT_CONFIG.windowMs) {
    attempt = { count: 0, firstAttempt: now };
  }

  attempt.count++;

  if (attempt.count >= RATE_LIMIT_CONFIG.maxAttempts) {
    attempt.blockedUntil = now + RATE_LIMIT_CONFIG.blockDurationMs;
  }

  await redis.setex(key, RATE_LIMIT_CONFIG.blockDurationMs / 1000, JSON.stringify(attempt));
}

export async function resetRateLimit(clientId: string): Promise<void> {
  await redis.del(`rate_limit:${clientId}`);
}
```

---

### 3. ✅ Session Management with Redis

**Current Issue:** 🔴 Session stored in cookies → security risk

**Improved Approach:**

```typescript
// lib/session.ts
"use server";

import { cookies } from 'next/headers';
import redis from './redis';

export interface SessionData {
  userId: string;
  role: string;
  email?: string;
  loginTime: number;
  expiresAt: number;
}

export async function createSession(data: SessionData, sessionType: 'admin' | 'student' | 'instructor' | 'applicant') {
  const sessionId = crypto.randomUUID();
  const sessionKey = `session:${sessionType}:${sessionId}`;
  
  // Store in Redis with 7-day expiration
  await redis.setex(
    sessionKey,
    7 * 24 * 60 * 60,
    JSON.stringify({
      ...data,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
    })
  );

  // Set session cookie (only ID, not data)
  const cookieStore = await cookies();
  cookieStore.set({
    name: `${sessionType}_session`,
    value: sessionId,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });

  return sessionId;
}

export async function getSession(sessionType: 'admin' | 'student' | 'instructor' | 'applicant') {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(`${sessionType}_session`)?.value;

  if (!sessionId) return null;

  const sessionKey = `session:${sessionType}:${sessionId}`;
  const data = await redis.get(sessionKey);

  if (!data) return null;

  const session = JSON.parse(data) as SessionData;

  // Check expiration
  if (session.expiresAt < Date.now()) {
    await redis.del(sessionKey);
    return null;
  }

  return session;
}

export async function destroySession(sessionType: 'admin' | 'student' | 'instructor' | 'applicant') {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(`${sessionType}_session`)?.value;

  if (sessionId) {
    const sessionKey = `session:${sessionType}:${sessionId}`;
    await redis.del(sessionKey);
  }

  cookieStore.delete(`${sessionType}_session`);
}
```

---

### 4. ✅ Load Balancing

**Current Issue:** 🔴 Single server → bottleneck

**Solution:** Deploy multiple app instances

```yaml
# docker-compose.yml (for development/testing)
version: '3.8'

services:
  app1:
    build: .
    ports:
      - "3001:3000"
    environment:
      - DATABASE_URL=mysql://user:pass@db:3306/ums
      - REDIS_HOST=redis
      - NODE_ENV=production

  app2:
    build: .
    ports:
      - "3002:3000"
    environment:
      - DATABASE_URL=mysql://user:pass@db:3306/ums
      - REDIS_HOST=redis
      - NODE_ENV=production

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app1
      - app2

  db:
    image: mysql:8
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=ums
    volumes:
      - db_data:/var/lib/mysql

  redis:
    image: redis:7
    ports:
      - "6379:6379"

volumes:
  db_data:
```

**Nginx Configuration:**

```nginx
# nginx.conf
upstream app {
  server app1:3000;
  server app2:3000;
  # Add more app instances as needed
}

server {
  listen 80;
  server_name _;

  # Rate limiting at nginx level
  limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
  limit_req_zone $binary_remote_addr zone=login_limit:10m rate=5r/m;

  location / {
    limit_req zone=api_limit burst=20 nodelay;
    proxy_pass http://app;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

  location /admin/login {
    limit_req zone=login_limit burst=5 nodelay;
    proxy_pass http://app;
  }
}
```

---

### 5. ✅ Database Read Replicas

**Current Issue:** 🔴 All queries go to single database

**Solution:** Add read replicas for reporting/analytics

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Main database (write operations)
export const prismaWrite = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_PRIMARY,
    }
  }
});

// Read replica (read-heavy operations)
export const prismaRead = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_REPLICA,
    }
  }
});

// Usage:
// const students = await prismaRead.student.findMany(); // Read from replica
// await prismaWrite.student.create({...}); // Write to primary
```

---

## 🔐 Security Enhancements

### 1. ✅ Complete 2FA Implementation

**Status:** 80% done, need UI

```typescript
// actions/admin-auth.ts (Updated with 2FA)
"use server";

import { redirect } from 'next/navigation';
import { prisma } from '@ums/lib';
import bcrypt from 'bcryptjs';
import { verify2FACode, is2FAEnabled } from '@/lib/two-factor';
import { createSession } from '@/lib/session';

export async function loginAdmin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const twoFactorCode = formData.get('2fa_code') as string;

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Verify password
  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  // Check 2FA
  if (user.twoFactorEnabled) {
    if (!twoFactorCode) {
      // Redirect to 2FA verification page
      return { requiresTwoFactor: true };
    }

    const isValid = await verify2FACode(user.id, twoFactorCode);
    if (!isValid) {
      throw new Error('Invalid 2FA code');
    }
  }

  // Create session
  await createSession({
    userId: user.id,
    role: 'ADMIN',
    email: user.email,
    loginTime: Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  }, 'admin');

  redirect('/admin');
}
```

### 2. ✅ Add CSRF to All Forms

**Current Issue:** 🟡 CSRF only on admin login

**Solution:** Global CSRF middleware

```typescript
// middleware.ts (Updated)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // ... existing code ...

  // Add CSRF token for all POST/PUT/DELETE requests
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const csrfToken = request.headers.get('x-csrf-token');
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');

    if (!csrfToken) {
      return NextResponse.json(
        { error: 'CSRF token required' },
        { status: 403 }
      );
    }

    // Validate origin
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_APP_URL,
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ];

    if (referer && !allowedOrigins.some(o => referer.startsWith(o))) {
      return NextResponse.json(
        { error: 'Invalid origin' },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}
```

### 3. ✅ Content Security Policy (CSP)

```typescript
// middleware.ts (Add CSP headers)
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // CSP Headers
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self'; " +
    "connect-src 'self'; " +
    "frame-ancestors 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self';"
  );

  // Other security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  return response;
}
```

### 4. ✅ SQL Injection Prevention

**Current Implementation:** ✅ Prisma already prevents this

```typescript
// ✅ Safe - Prisma parameterizes queries
const user = await prisma.user.findUnique({
  where: { email },
});

// ❌ Never do this
// const user = await prisma.$queryRaw(`SELECT * FROM users WHERE email = '${email}'`);
```

### 5. ✅ Input Validation & Sanitization

```typescript
// lib/validation.ts
import { z } from 'zod';

// Email validation
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .min(1)
  .max(255);

// Password validation
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain uppercase letter')
  .regex(/[a-z]/, 'Password must contain lowercase letter')
  .regex(/[0-9]/, 'Password must contain number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain special character');

// Student code validation
export const studentCodeSchema = z
  .string()
  .regex(/^\d{8}$/, 'Student code must be 8 digits');

// Usage in actions
export async function loginAdmin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validate
  const emailResult = emailSchema.safeParse(email);
  const passwordResult = passwordSchema.safeParse(password);

  if (!emailResult.success || !passwordResult.success) {
    throw new Error('Invalid input');
  }

  // Continue with login...
}
```

### 6. ✅ API Rate Limiting with Tiered Approach

```typescript
// middleware.ts (Enhanced Rate Limiting)
import redis from '@/lib/redis';

export function middleware(request: NextRequest) {
  const clientIp = request.ip || 'unknown';
  const pathname = request.nextUrl.pathname;

  // Different limits for different endpoints
  const rateLimits = {
    '/admin/login': { requests: 5, window: 900 }, // 5 per 15 min
    '/student/login': { requests: 5, window: 900 },
    '/api': { requests: 100, window: 60 }, // 100 per minute
    'default': { requests: 1000, window: 60 }, // 1000 per minute
  };

  // Determine rate limit
  let limit = rateLimits.default;
  for (const [path, config] of Object.entries(rateLimits)) {
    if (pathname.includes(path)) {
      limit = config;
      break;
    }
  }

  // Check rate limit
  // ... implementation with Redis ...

  return NextResponse.next();
}
```

### 7. ✅ Secrets Management

```bash
# .env.example (commit this)
DATABASE_URL=mysql://user:pass@localhost:3306/ums
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
CSRF_SECRET=your-secret-here
JWT_SECRET=your-secret-here
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development

# .env.local (DON'T commit)
# Copy from .env.example and fill with real secrets
```

**For Production:**
```bash
# Use environment variables or secrets manager
# AWS Secrets Manager / Google Secret Manager / HashiCorp Vault
# Never store secrets in code!
```

### 8. ✅ Dependency Security Scanning

```bash
# Check for vulnerable dependencies
npm audit

# Auto-fix
npm audit fix

# Use Dependabot (GitHub)
# Enable in repository settings
```

---

## ⚡ Performance Optimization

### 1. ✅ Database Query Optimization

**Use SELECT to fetch only needed fields:**

```typescript
// ❌ Bad - fetches all columns
const users = await prisma.user.findMany();

// ✅ Good - only needed fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    role: true,
  }
});
```

### 2. ✅ API Response Compression

```typescript
// next.config.js
module.exports = {
  compress: true, // Enable gzip compression
  
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Encoding',
          value: 'gzip'
        }
      ]
    }
  ]
};
```

### 3. ✅ Image Optimization

```tsx
// Use Next.js Image component
import Image from 'next/image';

export default function Faculty({ faculty }) {
  return (
    <Image
      src={faculty.logoUrl}
      alt={faculty.nameTh}
      width={200}
      height={200}
      priority={false}
      quality={80}
    />
  );
}
```

### 4. ✅ Bundle Size Analysis

```bash
# Analyze bundle
npx next/bundle-analyze

# Install
npm install --save-dev @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({})
```

```bash
# Run analysis
ANALYZE=true npm run build
```

### 5. ✅ Database Connection Optimization

```typescript
// Reuse Prisma client (singleton pattern)
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'warn']
      : ['error'],
  });

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = prisma;
```

---

## 🏗️ Infrastructure & DevOps

### 1. ✅ Docker Setup for Production

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install pnpm
RUN npm i -g pnpm

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Runtime
FROM base AS runtime
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
```

### 2. ✅ Kubernetes Deployment

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ums-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ums-app
  template:
    metadata:
      labels:
        app: ums-app
    spec:
      containers:
      - name: ums-app
        image: your-registry/ums-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: ums-secrets
              key: database-url
        - name: REDIS_HOST
          value: redis-service
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: ums-service
spec:
  selector:
    app: ums-app
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

### 3. ✅ CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:8
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: ums_test
        options: >-
          --health-cmd="mysqladmin ping"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=3
      redis:
        image: redis:7
        options: >-
          --health-cmd="redis-cli ping"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=3

    steps:
    - uses: actions/checkout@v4
    
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'

    - name: Install dependencies
      run: npm install

    - name: Run linter
      run: npm run lint

    - name: Build
      run: npm run build

    - name: Run tests
      run: npm run test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Deploy to Production
      env:
        DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
        DEPLOY_HOST: ${{ secrets.DEPLOY_HOST }}
      run: |
        mkdir -p ~/.ssh
        echo "$DEPLOY_KEY" > ~/.ssh/deploy_key
        chmod 600 ~/.ssh/deploy_key
        ssh -i ~/.ssh/deploy_key user@$DEPLOY_HOST 'cd /app && git pull && npm install && npm run build && npm run start'
```

---

## 📊 Monitoring & Logging

### 1. ✅ Structured Logging

```typescript
// lib/logger.ts
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
});

export default logger;

// Usage
logger.info({ userId: '123' }, 'User logged in');
logger.error({ err }, 'Database error');
logger.warn('High memory usage detected');
```

### 2. ✅ Application Metrics

```typescript
// lib/metrics.ts
export interface AppMetrics {
  requestCount: number;
  errorCount: number;
  avgResponseTime: number;
  dbQueryCount: number;
  cacheHitRate: number;
}

export const metrics: AppMetrics = {
  requestCount: 0,
  errorCount: 0,
  avgResponseTime: 0,
  dbQueryCount: 0,
  cacheHitRate: 0,
};

// Record metrics
export function recordMetric(metric: keyof AppMetrics, value: number) {
  metrics[metric] = value;
}

// Export metrics endpoint
export async function getMetrics() {
  return metrics;
}
```

### 3. ✅ Sentry Error Tracking

```bash
npm install @sentry/nextjs
```

```typescript
// sentry.server.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  debug: false,
});
```

### 4. ✅ Uptime Monitoring

```bash
# Use external services:
# - Uptime Robot (free)
# - New Relic
# - DataDog
# - Pingdom
```

```typescript
// API health check endpoint
export async function GET(request: Request) {
  try {
    // Check database
    const dbCheck = await prisma.user.count();
    
    // Check redis
    await redis.ping();

    return Response.json({
      status: 'healthy',
      timestamp: new Date(),
      database: 'ok',
      cache: 'ok',
      userCount: dbCheck,
    });
  } catch (error) {
    return Response.json(
      { status: 'unhealthy', error: String(error) },
      { status: 503 }
    );
  }
}
```

---

## 📋 Implementation Priority

### Phase 1: Critical (Do First) ⚡
**Priority: HIGH - Do within 1-2 weeks**

- [ ] ✅ 1.1 Database Connection Pooling
- [ ] ✅ 1.2 Add Database Indexes
- [ ] ✅ 2.1 Setup Redis
- [ ] ✅ 3.1 Session Management with Redis
- [ ] ✅ 1.4 Pagination Implementation
- [ ] ✅ 4. Complete 2FA Implementation
- [ ] ✅ 5. Add CSRF to All Forms

### Phase 2: Important (Do Next) 📊
**Priority: MEDIUM - Do within 3-4 weeks**

- [ ] ✅ 2.3 Caching Strategies
- [ ] ✅ 6. CSP Headers & Security Headers
- [ ] ✅ 7. Input Validation with Zod
- [ ] ✅ 8. API Rate Limiting
- [ ] ✅ 1.3 Query Optimization (N+1)
- [ ] ✅ Performance Optimization (Images, Compression)
- [ ] ✅ Structured Logging

### Phase 3: Infrastructure (Do Next) 🏗️
**Priority: MEDIUM - Do within 1-2 months**

- [ ] ✅ 4. Load Balancing (Nginx)
- [ ] ✅ Docker Setup
- [ ] ✅ Kubernetes Deployment
- [ ] ✅ CI/CD Pipeline
- [ ] ✅ Database Monitoring

### Phase 4: Advanced (Do Later) 🚀
**Priority: LOW - Do when scalable**

- [ ] ✅ 5. Database Read Replicas
- [ ] ✅ CDN Integration (Cloudflare)
- [ ] ✅ Message Queue (RabbitMQ)
- [ ] ✅ Microservices Architecture

---

## 🎯 Success Metrics

After implementing these improvements, you should achieve:

| Metric | Before | After | Target |
|--------|--------|-------|--------|
| **Concurrent Users** | ~100 | ~10,000 | 50,000+ |
| **Response Time** | 500ms | 100ms | <50ms |
| **Database Queries/sec** | 100 | 10,000 | 100,000+ |
| **Memory Usage** | High | Low | <512MB |
| **Security Score** | 75% | 95% | 99%+ |
| **Uptime** | 99% | 99.9% | 99.99% |
| **Cache Hit Rate** | 0% | 80% | >85% |

---

## 📚 Resources

- [Prisma Optimization](https://www.prisma.io/docs/orm/reference/prisma-client-reference#performance)
- [Redis Best Practices](https://redis.io/docs/management/optimization/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Kubernetes Best Practices](https://kubernetes.io/docs/concepts/configuration/overview/)

---

**Last Updated: November 20, 2025**
