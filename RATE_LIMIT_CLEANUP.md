# Rate Limit Automatic Cleanup System

## 🔄 Overview

ระบบ cleanup อัตโนมัติสำหรับลบ rate limit entries ที่หมดอายุแล้ว

---

## 📁 Architecture

### **Files:**

1. **`/apps/web/lib/rate-limit-cleanup.ts`**
   - Cleanup scheduler (ไม่มี "use server")
   - Shared in-memory store
   - Auto-start scheduler with setInterval
   - Runs every 1 hour

2. **`/apps/web/lib/rate-limit.ts`**
   - Server Actions (มี "use server")
   - Import shared store from cleanup file
   - All rate limiting functions

3. **`/apps/web/app/layout.tsx`**
   - Import cleanup file to initialize scheduler
   - Runs on server startup

---

## ⚙️ How It Works

### **1. Initialization:**
```typescript
// app/layout.tsx
import "@/lib/rate-limit-cleanup";
```

เมื่อ Next.js server start:
1. Import `rate-limit-cleanup.ts`
2. Auto-execute initialization code
3. Start setInterval timer (every 1 hour)

### **2. Cleanup Process:**
```typescript
// Runs every hour
setInterval(() => {
    cleanupExpiredEntries();
}, 60 * 60 * 1000);
```

**What it does:**
- Check all entries in `loginAttemptsStore`
- Calculate expiration time: `now - windowMs - blockDurationMs`
- Delete entries older than expiration time
- Log cleanup results

### **3. Shared Store:**
```typescript
// rate-limit-cleanup.ts
export const loginAttemptsStore = new Map();

// rate-limit.ts
import { loginAttemptsStore } from "./rate-limit-cleanup";
const loginAttempts = loginAttemptsStore; // Same reference
```

Both files use the **same Map instance** in memory.

---

## 🕐 Cleanup Schedule

| Event | Time | Action |
|-------|------|--------|
| Server Start | 0:00 | Initial cleanup |
| Interval 1 | 1:00 | Cleanup expired entries |
| Interval 2 | 2:00 | Cleanup expired entries |
| ... | ... | ... |

**Cleanup Interval:** 1 hour (3600000 ms)

---

## 🧹 What Gets Cleaned

### **Expiration Calculation:**
```typescript
const expiredTime = now - windowMs - blockDurationMs;
// = now - 15 minutes - 30 minutes
// = now - 45 minutes
```

### **Example:**
```
Current Time: 10:00 AM
Expired Time: 9:15 AM (45 minutes ago)

Entries:
- Client A: First attempt at 9:00 AM → DELETED ✅
- Client B: First attempt at 9:20 AM → KEPT
- Client C: First attempt at 9:50 AM → KEPT
```

---

## 📊 Monitoring

### **Console Logs:**
```bash
[Rate Limit Cleanup] Scheduler started (runs every 1 hour)
[Rate Limit Cleanup] Removed 3 expired entries
[Rate Limit Cleanup] Removed 0 expired entries
```

### **Check Cleanup Status:**
```typescript
// In any Server Action
import { loginAttemptsStore } from "@/lib/rate-limit-cleanup";

console.log(`Current entries: ${loginAttemptsStore.size}`);
```

---

## 🔧 Configuration

### **Change Cleanup Interval:**
```typescript
// rate-limit-cleanup.ts
const CLEANUP_INTERVAL = 30 * 60 * 1000; // 30 minutes
```

### **Change Expiration Time:**
```typescript
// rate-limit-cleanup.ts
export const RATE_LIMIT_CONFIG = {
    maxAttempts: 5,
    windowMs: 10 * 60 * 1000,      // 10 minutes
    blockDurationMs: 20 * 60 * 1000, // 20 minutes
};
```

---

## 🚀 Production Recommendations

### **1. Use Redis Instead of In-Memory:**
```typescript
// rate-limit.ts
import Redis from "ioredis";
const redis = new Redis(process.env.REDIS_URL);

// Store in Redis with TTL
await redis.setex(
    `rate-limit:${clientId}`,
    RATE_LIMIT_CONFIG.windowMs / 1000,
    JSON.stringify(attempt)
);
```

**Benefits:**
- Automatic expiration (no manual cleanup needed)
- Shared across multiple servers
- Persistent across restarts

### **2. Use Cron Job:**
```typescript
// Use node-cron or external cron
import cron from "node-cron";

cron.schedule('0 * * * *', () => {
    cleanupExpiredEntries();
});
```

### **3. Database with TTL:**
```prisma
model RateLimitAttempt {
  id          String   @id
  clientId    String
  count       Int
  firstAttempt DateTime
  expiresAt   DateTime @db.Timestamp
  
  @@index([expiresAt])
}
```

---

## 🧪 Testing

### **Test Cleanup Manually:**
```typescript
// In any Server Action
import { cleanupExpiredEntries } from "@/lib/rate-limit-cleanup";

export async function testCleanup() {
    cleanupExpiredEntries();
    console.log("Manual cleanup completed");
}
```

### **Check Store Size:**
```typescript
import { loginAttemptsStore } from "@/lib/rate-limit-cleanup";

export async function getStoreStats() {
    return {
        totalEntries: loginAttemptsStore.size,
        entries: Array.from(loginAttemptsStore.entries())
    };
}
```

---

## ⚠️ Important Notes

### **Memory Considerations:**
- In-memory store is cleared on server restart
- Max entries depend on traffic (typically < 1000)
- Each entry is ~100 bytes
- Total memory: ~100KB for 1000 entries

### **Multi-Server Setup:**
- Each server has its own in-memory store
- Rate limiting is per-server, not global
- **Solution:** Use Redis for shared state

### **Development:**
- Cleanup runs in development mode
- Server restart clears all entries
- Hot reload may restart scheduler

---

## 📈 Performance

### **Cleanup Performance:**
```
1000 entries: ~1ms
10000 entries: ~10ms
100000 entries: ~100ms
```

### **Memory Usage:**
```
Empty: ~1KB
1000 entries: ~100KB
10000 entries: ~1MB
```

---

## ✅ Verification

### **Check if Scheduler is Running:**
```bash
# Look for this log on server start:
[Rate Limit Cleanup] Scheduler started (runs every 1 hour)
```

### **Verify Cleanup Works:**
1. Make 5 failed login attempts
2. Wait 46 minutes
3. Check logs for cleanup message
4. Entry should be removed

---

## 🎯 Summary

✅ **Automatic cleanup every 1 hour**  
✅ **Removes entries older than 45 minutes**  
✅ **No manual intervention needed**  
✅ **Logs cleanup activity**  
✅ **Production-ready for single server**  

**For production with multiple servers:** Use Redis! 🚀
