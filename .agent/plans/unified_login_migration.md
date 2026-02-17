# Unified Login Migration Plan (NextAuth.js)

## 🎯 Objective
Consolidate the current fragmented authentication system (Custom Auth with multiple cookies vs. NextAuth) into a single, robust **NextAuth.js** based system. This will simplify code, improve security, and resolve session consistency issues.

## 📊 Current State Analysis
- **Auth Methods:** Mixed. Custom cookie-based auth (`admin_session`, `student_session`, etc.) and NextAuth configuration exist side-by-side.
- **Middleware:** Manually checks specific cookies for different routes.
- **Client Side:** Layouts (`AdminLayout`) use custom `useEffect` to check sessions and redirect.
- **Server Actions:** Some actions parse cookies manually; others try to use `getServerSession`.

## 🚀 Implementation Phases

### Phase 1: NextAuth Configuration (Foundation)
Ensure `lib/auth.ts` is fully equipped to handle all user roles.
- [ ] Verify `authOptions` includes `UserRole` in Session and JWT callbacks.
- [ ] Ensure `CredentialsProvider` verifies passwords correctly (hashing).
- [ ] Configure `pages` option to point to a custom unified login page (optional) or use default for testing.

### Phase 2: Middleware Migration (The Gatekeeper)
Replace the custom cookie logic in `middleware.ts` with NextAuth token verification.
- [ ] Remove `admin_session`, `student_session`, etc. checks.
- [ ] Implement `withAuth` or manual token check using `getToken` from `next-auth/jwt`.
- [ ] Define Role-Based Access Control (RBAC) rules:
    - `/admin/**` -> Requires `ADMIN` or `STAFF` role.
    - `/instructor/**` -> Requires `INSTRUCTOR` role.
    - `/student/**` -> Requires `STUDENT` role.
    - `/admissions/**` -> Requires `APPLICANT` role.

### Phase 3: Client-Side Integration (Frontend)
Update Layouts and Pages to use `useSession` hook.
- [ ] **Admin Layout:** Replace `getAdminSession` call with `useSession()`. Handle loading state and redirect if `status === "unauthenticated"`.
- [ ] **Student/Instructor Layouts:** Apply similar updates.
- [ ] **Login Pages:** Update `/admin/login`, `/student/login`, etc. to call `signIn()` from `next-auth/react` instead of setting custom cookies.
    - *Option:* Create a single `/login` page that redirects based on role after success.

### Phase 4: Server-Side Integration (Backend)
Update Server Actions to trust `getServerSession`.
- [ ] Scan all `actions/*.ts` files.
- [ ] Replace manual cookie parsing (e.g., `cookies().get('admin_session')`) with:
    ```typescript
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'TARGET_ROLE') throw new Error("Unauthorized");
    ```

### Phase 5: Cleanup & Testing
- [ ] Remove old auth actions (`getAdminSession`, `loginAdmin`, etc. that set custom cookies).
- [ ] Remove unused cookie definitions.
- [ ] **Test Scenarios:**
    - Admin login -> Access Admin Dashboard -> Access Denied for Student pages.
    - Instructor login -> Access My Interviews -> Submit Score.
    - Logout clears NextAuth cookie correctly.

## 📅 Recommended Workflow
1. **Start with Phase 1 & 2:** Fix the core config and middleware. This might break the UI temporarily.
2. **Execute Phase 3:** Fix the UI Layouts to stop the infinite redirects.
3. **Execute Phase 4:** Fix the data fetching (Server Actions).
4. **Execute Phase 5:** Clean up.

---
**Note:** This migration requires a "Big Bang" approach for each section (e.g., once Middleware is changed, old logins will stop working immediately). It is best done in a dedicated session.
