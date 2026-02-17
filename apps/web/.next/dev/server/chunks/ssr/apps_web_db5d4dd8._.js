module.exports = [
"[project]/apps/web/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDate",
    ()=>formatDate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}
function formatCurrency(amount) {
    return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB"
    }).format(amount);
}
}),
"[project]/apps/web/components/sub-navigation.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubNavigation",
    ()=>SubNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function SubNavigation({ items }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-b border-gray-200 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "flex space-x-8 px-6",
            "aria-label": "Sub navigation",
            children: items.map((item)=>{
                // Exact match first
                let isActive = pathname === item.href;
                // Then check if it's a parent route with children
                // But only if there are no other exact matches
                if (!isActive) {
                    const exactMatch = items.some((i)=>i.href === pathname);
                    if (!exactMatch && pathname.startsWith(item.href + "/")) {
                        isActive = true;
                    }
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: item.href,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("border-b-2 py-4 px-1 text-sm font-medium transition-colors", isActive ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"),
                    children: item.label
                }, item.href, false, {
                    fileName: "[project]/apps/web/components/sub-navigation.tsx",
                    lineNumber: 36,
                    columnNumber: 25
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/apps/web/components/sub-navigation.tsx",
            lineNumber: 21,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/components/sub-navigation.tsx",
        lineNumber: 20,
        columnNumber: 9
    }, this);
}
}),
"[project]/apps/web/actions/data:41dca8 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"7091e5953dcde9bbb0966c6271f24d2e4c0446e522":"approveLeaveRequest"},"apps/web/actions/leave-requests.ts",""] */ __turbopack_context__.s([
    "approveLeaveRequest",
    ()=>approveLeaveRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var approveLeaveRequest = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("7091e5953dcde9bbb0966c6271f24d2e4c0446e522", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "approveLeaveRequest"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vbGVhdmUtcmVxdWVzdHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc2VydmVyXCI7XG5cbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAdW1zL2xpYlwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBHZXQgYWxsIGxlYXZlIHJlcXVlc3RzIHdpdGggZmlsdGVycyAgXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGVhdmVSZXF1ZXN0cyhmaWx0ZXJzPzoge1xuICAgIHN0YXR1cz86IFwiUEVORElOR1wiIHwgXCJBUFBST1ZFRFwiIHwgXCJSRUpFQ1RFRFwiO1xuICAgIGZhY3VsdHlJZD86IHN0cmluZztcbiAgICBwcm9ncmFtSWQ/OiBzdHJpbmc7XG59KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgd2hlcmU6IGFueSA9IHt9O1xuXG4gICAgICAgIGlmIChmaWx0ZXJzPy5zdGF0dXMpIHtcbiAgICAgICAgICAgIHdoZXJlLnN0YXR1cyA9IGZpbHRlcnMuc3RhdHVzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbHRlcnM/LnByb2dyYW1JZCkge1xuICAgICAgICAgICAgd2hlcmUuc3R1ZGVudCA9IHtcbiAgICAgICAgICAgICAgICBwcm9ncmFtSWQ6IGZpbHRlcnMucHJvZ3JhbUlkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXJzPy5mYWN1bHR5SWQpIHtcbiAgICAgICAgICAgIHdoZXJlLnN0dWRlbnQgPSB7XG4gICAgICAgICAgICAgICAgcHJvZ3JhbToge1xuICAgICAgICAgICAgICAgICAgICBmYWN1bHR5SWQ6IGZpbHRlcnMuZmFjdWx0eUlkLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVxdWVzdHMgPSBhd2FpdCBwcmlzbWEubGVhdmVSZXF1ZXN0LmZpbmRNYW55KHtcbiAgICAgICAgICAgIHdoZXJlLFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIHN0dWRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0dWRlbnRJZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZUltYWdlVXJsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3JhbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lRW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY3VsdHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVFbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmV2aWV3ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yZGVyQnk6IFtcbiAgICAgICAgICAgICAgICB7IHN0YXR1czogXCJhc2NcIiB9LCAvLyBQRU5ESU5HIGZpcnN0XG4gICAgICAgICAgICAgICAgeyBjcmVhdGVkQXQ6IFwiZGVzY1wiIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIHJlcXVlc3RzLFxuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBsZWF2ZSByZXF1ZXN0czpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggbGVhdmUgcmVxdWVzdHNcIixcbiAgICAgICAgICAgIHJlcXVlc3RzOiBbXSxcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8vIEdldCBzaW5nbGUgbGVhdmUgcmVxdWVzdFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExlYXZlUmVxdWVzdChpZDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IHByaXNtYS5sZWF2ZVJlcXVlc3QuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBpZCB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIHN0dWRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0dWRlbnRJZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZUltYWdlVXJsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmFtOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVFbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjdWx0eToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZUVuOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZXZpZXdlcjoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IFwiTGVhdmUgcmVxdWVzdCBub3QgZm91bmRcIixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGxlYXZlIHJlcXVlc3Q6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGxlYXZlIHJlcXVlc3RcIixcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8vIEFwcHJvdmUgbGVhdmUgcmVxdWVzdFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFwcHJvdmVMZWF2ZVJlcXVlc3QoXG4gICAgaWQ6IHN0cmluZyxcbiAgICByZXZpZXdlZEJ5OiBzdHJpbmcsXG4gICAgcmV2aWV3Tm90ZT86IHN0cmluZ1xuKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gR2V0IHRoZSByZXF1ZXN0IGZpcnN0XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBwcmlzbWEubGVhdmVSZXF1ZXN0LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQgfSxcbiAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICBzdHVkZW50OiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVycm9yOiBcIkxlYXZlIHJlcXVlc3Qgbm90IGZvdW5kXCIsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSBcIlBFTkRJTkdcIikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogXCJPbmx5IHBlbmRpbmcgcmVxdWVzdHMgY2FuIGJlIGFwcHJvdmVkXCIsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlIHJlcXVlc3QgYW5kIHN0dWRlbnQgc3RhdHVzIGluIGEgdHJhbnNhY3Rpb25cbiAgICAgICAgYXdhaXQgcHJpc21hLiR0cmFuc2FjdGlvbihbXG4gICAgICAgICAgICBwcmlzbWEubGVhdmVSZXF1ZXN0LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJBUFBST1ZFRFwiLFxuICAgICAgICAgICAgICAgICAgICByZXZpZXdlZEJ5LFxuICAgICAgICAgICAgICAgICAgICByZXZpZXdlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgICAgICByZXZpZXdOb3RlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHByaXNtYS5zdHVkZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcXVlc3Quc3R1ZGVudElkIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiT05fTEVBVkVcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSksXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluL3VzZXJzL3N0dWRlbnRzL2xlYXZlLW1hbmFnZW1lbnRcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluL3VzZXJzL3N0dWRlbnRzL2FsbC1zdHVkZW50c1wiKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTGVhdmUgcmVxdWVzdCBhcHByb3ZlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYXBwcm92aW5nIGxlYXZlIHJlcXVlc3Q6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIGFwcHJvdmUgbGVhdmUgcmVxdWVzdFwiLFxuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8gUmVqZWN0IGxlYXZlIHJlcXVlc3RcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWplY3RMZWF2ZVJlcXVlc3QoXG4gICAgaWQ6IHN0cmluZyxcbiAgICByZXZpZXdlZEJ5OiBzdHJpbmcsXG4gICAgcmV2aWV3Tm90ZTogc3RyaW5nXG4pIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gYXdhaXQgcHJpc21hLmxlYXZlUmVxdWVzdC5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogXCJMZWF2ZSByZXF1ZXN0IG5vdCBmb3VuZFwiLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gXCJQRU5ESU5HXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IFwiT25seSBwZW5kaW5nIHJlcXVlc3RzIGNhbiBiZSByZWplY3RlZFwiLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmV2aWV3Tm90ZSB8fCByZXZpZXdOb3RlLnRyaW0oKSA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogXCJSZXZpZXcgbm90ZSBpcyByZXF1aXJlZCBmb3IgcmVqZWN0aW9uXCIsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgcHJpc21hLmxlYXZlUmVxdWVzdC51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQgfSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFwiUkVKRUNURURcIixcbiAgICAgICAgICAgICAgICByZXZpZXdlZEJ5LFxuICAgICAgICAgICAgICAgIHJldmlld2VkQXQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgcmV2aWV3Tm90ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluL3VzZXJzL3N0dWRlbnRzL2xlYXZlLW1hbmFnZW1lbnRcIik7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkxlYXZlIHJlcXVlc3QgcmVqZWN0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJlamVjdGluZyBsZWF2ZSByZXF1ZXN0OlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBcIkZhaWxlZCB0byByZWplY3QgbGVhdmUgcmVxdWVzdFwiLFxuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8gR2V0IHN0YXRpc3RpY3NcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMZWF2ZVJlcXVlc3RTdGF0cygpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBbcGVuZGluZywgYXBwcm92ZWQsIHJlamVjdGVkLCB0b3RhbF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBwcmlzbWEubGVhdmVSZXF1ZXN0LmNvdW50KHsgd2hlcmU6IHsgc3RhdHVzOiBcIlBFTkRJTkdcIiB9IH0pLFxuICAgICAgICAgICAgcHJpc21hLmxlYXZlUmVxdWVzdC5jb3VudCh7IHdoZXJlOiB7IHN0YXR1czogXCJBUFBST1ZFRFwiIH0gfSksXG4gICAgICAgICAgICBwcmlzbWEubGVhdmVSZXF1ZXN0LmNvdW50KHsgd2hlcmU6IHsgc3RhdHVzOiBcIlJFSkVDVEVEXCIgfSB9KSxcbiAgICAgICAgICAgIHByaXNtYS5sZWF2ZVJlcXVlc3QuY291bnQoKSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBzdGF0czoge1xuICAgICAgICAgICAgICAgIHBlbmRpbmcsXG4gICAgICAgICAgICAgICAgYXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgcmVqZWN0ZWQsXG4gICAgICAgICAgICAgICAgdG90YWwsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBsZWF2ZSByZXF1ZXN0IHN0YXRzOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBzdGF0aXN0aWNzXCIsXG4gICAgICAgICAgICBzdGF0czoge1xuICAgICAgICAgICAgICAgIHBlbmRpbmc6IDAsXG4gICAgICAgICAgICAgICAgYXBwcm92ZWQ6IDAsXG4gICAgICAgICAgICAgICAgcmVqZWN0ZWQ6IDAsXG4gICAgICAgICAgICAgICAgdG90YWw6IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiK1NBbUpzQiJ9
}),
"[project]/apps/web/actions/data:5bb228 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"70695d11b149d1621e45e5572311b91ebf5bb68ca8":"rejectLeaveRequest"},"apps/web/actions/leave-requests.ts",""] */ __turbopack_context__.s([
    "rejectLeaveRequest",
    ()=>rejectLeaveRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var rejectLeaveRequest = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("70695d11b149d1621e45e5572311b91ebf5bb68ca8", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "rejectLeaveRequest"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vbGVhdmUtcmVxdWVzdHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc2VydmVyXCI7XG5cbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAdW1zL2xpYlwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuXG4vLyBHZXQgYWxsIGxlYXZlIHJlcXVlc3RzIHdpdGggZmlsdGVycyAgXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGVhdmVSZXF1ZXN0cyhmaWx0ZXJzPzoge1xuICAgIHN0YXR1cz86IFwiUEVORElOR1wiIHwgXCJBUFBST1ZFRFwiIHwgXCJSRUpFQ1RFRFwiO1xuICAgIGZhY3VsdHlJZD86IHN0cmluZztcbiAgICBwcm9ncmFtSWQ/OiBzdHJpbmc7XG59KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgd2hlcmU6IGFueSA9IHt9O1xuXG4gICAgICAgIGlmIChmaWx0ZXJzPy5zdGF0dXMpIHtcbiAgICAgICAgICAgIHdoZXJlLnN0YXR1cyA9IGZpbHRlcnMuc3RhdHVzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbHRlcnM/LnByb2dyYW1JZCkge1xuICAgICAgICAgICAgd2hlcmUuc3R1ZGVudCA9IHtcbiAgICAgICAgICAgICAgICBwcm9ncmFtSWQ6IGZpbHRlcnMucHJvZ3JhbUlkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXJzPy5mYWN1bHR5SWQpIHtcbiAgICAgICAgICAgIHdoZXJlLnN0dWRlbnQgPSB7XG4gICAgICAgICAgICAgICAgcHJvZ3JhbToge1xuICAgICAgICAgICAgICAgICAgICBmYWN1bHR5SWQ6IGZpbHRlcnMuZmFjdWx0eUlkLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVxdWVzdHMgPSBhd2FpdCBwcmlzbWEubGVhdmVSZXF1ZXN0LmZpbmRNYW55KHtcbiAgICAgICAgICAgIHdoZXJlLFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIHN0dWRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0dWRlbnRJZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZUltYWdlVXJsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3JhbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lRW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY3VsdHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVFbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmV2aWV3ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yZGVyQnk6IFtcbiAgICAgICAgICAgICAgICB7IHN0YXR1czogXCJhc2NcIiB9LCAvLyBQRU5ESU5HIGZpcnN0XG4gICAgICAgICAgICAgICAgeyBjcmVhdGVkQXQ6IFwiZGVzY1wiIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIHJlcXVlc3RzLFxuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBsZWF2ZSByZXF1ZXN0czpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggbGVhdmUgcmVxdWVzdHNcIixcbiAgICAgICAgICAgIHJlcXVlc3RzOiBbXSxcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8vIEdldCBzaW5nbGUgbGVhdmUgcmVxdWVzdFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExlYXZlUmVxdWVzdChpZDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IHByaXNtYS5sZWF2ZVJlcXVlc3QuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBpZCB9LFxuICAgICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgICAgIHN0dWRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0dWRlbnRJZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZUltYWdlVXJsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmFtOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVFbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjdWx0eToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZUVuOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZXZpZXdlcjoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IFwiTGVhdmUgcmVxdWVzdCBub3QgZm91bmRcIixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGxlYXZlIHJlcXVlc3Q6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGxlYXZlIHJlcXVlc3RcIixcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8vIEFwcHJvdmUgbGVhdmUgcmVxdWVzdFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFwcHJvdmVMZWF2ZVJlcXVlc3QoXG4gICAgaWQ6IHN0cmluZyxcbiAgICByZXZpZXdlZEJ5OiBzdHJpbmcsXG4gICAgcmV2aWV3Tm90ZT86IHN0cmluZ1xuKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gR2V0IHRoZSByZXF1ZXN0IGZpcnN0XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBwcmlzbWEubGVhdmVSZXF1ZXN0LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQgfSxcbiAgICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgICAgICBzdHVkZW50OiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVycm9yOiBcIkxlYXZlIHJlcXVlc3Qgbm90IGZvdW5kXCIsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSBcIlBFTkRJTkdcIikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogXCJPbmx5IHBlbmRpbmcgcmVxdWVzdHMgY2FuIGJlIGFwcHJvdmVkXCIsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlIHJlcXVlc3QgYW5kIHN0dWRlbnQgc3RhdHVzIGluIGEgdHJhbnNhY3Rpb25cbiAgICAgICAgYXdhaXQgcHJpc21hLiR0cmFuc2FjdGlvbihbXG4gICAgICAgICAgICBwcmlzbWEubGVhdmVSZXF1ZXN0LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJBUFBST1ZFRFwiLFxuICAgICAgICAgICAgICAgICAgICByZXZpZXdlZEJ5LFxuICAgICAgICAgICAgICAgICAgICByZXZpZXdlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgICAgICByZXZpZXdOb3RlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHByaXNtYS5zdHVkZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcXVlc3Quc3R1ZGVudElkIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiT05fTEVBVkVcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSksXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluL3VzZXJzL3N0dWRlbnRzL2xlYXZlLW1hbmFnZW1lbnRcIik7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluL3VzZXJzL3N0dWRlbnRzL2FsbC1zdHVkZW50c1wiKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTGVhdmUgcmVxdWVzdCBhcHByb3ZlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYXBwcm92aW5nIGxlYXZlIHJlcXVlc3Q6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIGFwcHJvdmUgbGVhdmUgcmVxdWVzdFwiLFxuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8gUmVqZWN0IGxlYXZlIHJlcXVlc3RcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWplY3RMZWF2ZVJlcXVlc3QoXG4gICAgaWQ6IHN0cmluZyxcbiAgICByZXZpZXdlZEJ5OiBzdHJpbmcsXG4gICAgcmV2aWV3Tm90ZTogc3RyaW5nXG4pIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gYXdhaXQgcHJpc21hLmxlYXZlUmVxdWVzdC5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogXCJMZWF2ZSByZXF1ZXN0IG5vdCBmb3VuZFwiLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gXCJQRU5ESU5HXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IFwiT25seSBwZW5kaW5nIHJlcXVlc3RzIGNhbiBiZSByZWplY3RlZFwiLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmV2aWV3Tm90ZSB8fCByZXZpZXdOb3RlLnRyaW0oKSA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogXCJSZXZpZXcgbm90ZSBpcyByZXF1aXJlZCBmb3IgcmVqZWN0aW9uXCIsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgcHJpc21hLmxlYXZlUmVxdWVzdC51cGRhdGUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQgfSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFwiUkVKRUNURURcIixcbiAgICAgICAgICAgICAgICByZXZpZXdlZEJ5LFxuICAgICAgICAgICAgICAgIHJldmlld2VkQXQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgcmV2aWV3Tm90ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluL3VzZXJzL3N0dWRlbnRzL2xlYXZlLW1hbmFnZW1lbnRcIik7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkxlYXZlIHJlcXVlc3QgcmVqZWN0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJlamVjdGluZyBsZWF2ZSByZXF1ZXN0OlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBcIkZhaWxlZCB0byByZWplY3QgbGVhdmUgcmVxdWVzdFwiLFxuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8gR2V0IHN0YXRpc3RpY3NcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMZWF2ZVJlcXVlc3RTdGF0cygpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBbcGVuZGluZywgYXBwcm92ZWQsIHJlamVjdGVkLCB0b3RhbF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBwcmlzbWEubGVhdmVSZXF1ZXN0LmNvdW50KHsgd2hlcmU6IHsgc3RhdHVzOiBcIlBFTkRJTkdcIiB9IH0pLFxuICAgICAgICAgICAgcHJpc21hLmxlYXZlUmVxdWVzdC5jb3VudCh7IHdoZXJlOiB7IHN0YXR1czogXCJBUFBST1ZFRFwiIH0gfSksXG4gICAgICAgICAgICBwcmlzbWEubGVhdmVSZXF1ZXN0LmNvdW50KHsgd2hlcmU6IHsgc3RhdHVzOiBcIlJFSkVDVEVEXCIgfSB9KSxcbiAgICAgICAgICAgIHByaXNtYS5sZWF2ZVJlcXVlc3QuY291bnQoKSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBzdGF0czoge1xuICAgICAgICAgICAgICAgIHBlbmRpbmcsXG4gICAgICAgICAgICAgICAgYXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgcmVqZWN0ZWQsXG4gICAgICAgICAgICAgICAgdG90YWwsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBsZWF2ZSByZXF1ZXN0IHN0YXRzOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBzdGF0aXN0aWNzXCIsXG4gICAgICAgICAgICBzdGF0czoge1xuICAgICAgICAgICAgICAgIHBlbmRpbmc6IDAsXG4gICAgICAgICAgICAgICAgYXBwcm92ZWQ6IDAsXG4gICAgICAgICAgICAgICAgcmVqZWN0ZWQ6IDAsXG4gICAgICAgICAgICAgICAgdG90YWw6IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOFNBbU5zQiJ9
}),
"[project]/apps/web/components/leave-requests/leave-request-card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeaveRequestCard",
    ()=>LeaveRequestCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$data$3a$41dca8__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/apps/web/actions/data:41dca8 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$data$3a$5bb228__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/apps/web/actions/data:5bb228 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$differenceInDays$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/differenceInDays.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function LeaveRequestCard({ request }) {
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransition"])();
    const [showApproveDialog, setShowApproveDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showRejectDialog, setShowRejectDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [approveNote, setApproveNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [rejectNote, setRejectNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const duration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$differenceInDays$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["differenceInDays"])(new Date(request.endDate), new Date(request.startDate)) + 1;
    const handleApprove = ()=>{
        startTransition(async ()=>{
            // TODO: Get current user ID
            const reviewerId = "temp-admin-id"; // Replace with actual user ID
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$data$3a$41dca8__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["approveLeaveRequest"])(request.id, reviewerId, approveNote);
            if (result.success) {
                setShowApproveDialog(false);
                setApproveNote("");
            } else {
                alert(result.error);
            }
        });
    };
    const handleReject = ()=>{
        if (!rejectNote.trim()) {
            alert("Please provide a reason for rejection");
            return;
        }
        startTransition(async ()=>{
            //TODO: Get current user ID
            const reviewerId = "temp-admin-id"; // Replace with actual user ID
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$data$3a$5bb228__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["rejectLeaveRequest"])(request.id, reviewerId, rejectNote);
            if (result.success) {
                setShowRejectDialog(false);
                setRejectNote("");
            } else {
                alert(result.error);
            }
        });
    };
    const statusColors = {
        PENDING: "bg-orange-100 text-orange-800",
        APPROVED: "bg-green-100 text-green-800",
        REJECTED: "bg-red-100 text-red-800"
    };
    const status = request.status;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border bg-card p-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            className: "h-5 w-5 text-blue-600"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 71,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-semibold",
                                                    children: [
                                                        request.student.firstName,
                                                        " ",
                                                        request.student.lastName
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                                    lineNumber: 73,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: [
                                                        request.student.studentId,
                                                        " | ",
                                                        request.student.program?.nameEn,
                                                        " | ",
                                                        request.student.program?.faculty?.nameEn
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 72,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                    lineNumber: 70,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                            className: "h-5 w-5 text-gray-600"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 84,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(request.startDate), "MMM d, yyyy")
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                                    lineNumber: 86,
                                                    columnNumber: 33
                                                }, this),
                                                " - ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(request.endDate), "MMM d, yyyy")
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground ml-2",
                                                    children: [
                                                        "(",
                                                        duration,
                                                        " days)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 85,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                    lineNumber: 83,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                            className: "h-5 w-5 text-gray-600 mt-0.5"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 99,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium",
                                                    children: "Reason:"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-muted-foreground mt-1",
                                                    children: request.reason
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 100,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                    lineNumber: 98,
                                    columnNumber: 25
                                }, this),
                                request.status !== "PENDING" && request.reviewedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-3 pt-2 border-t",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                            className: "h-5 w-5 text-gray-600 mt-0.5"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 109,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: "Reviewed by:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                                            lineNumber: 112,
                                                            columnNumber: 41
                                                        }, this),
                                                        " ",
                                                        request.reviewer ? `${request.reviewer.firstName} ${request.reviewer.lastName}` : "Unknown"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(request.reviewedAt), "MMM d, yyyy 'at' HH:mm")
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 37
                                                }, this),
                                                request.reviewNote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-muted-foreground mt-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: "Note:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                                            lineNumber: 120,
                                                            columnNumber: 45
                                                        }, this),
                                                        " ",
                                                        request.reviewNote
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 110,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                    lineNumber: 108,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                            lineNumber: 68,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-end gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${statusColors[status]}`,
                                    children: request.status
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                    lineNumber: 130,
                                    columnNumber: 25
                                }, this),
                                request.status === "PENDING" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowApproveDialog(true),
                                            disabled: isPending,
                                            className: "inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 37
                                                }, this),
                                                "Approve"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 136,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowRejectDialog(true),
                                            disabled: isPending,
                                            className: "inline-flex items-center gap-1 rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 37
                                                }, this),
                                                "Reject"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 144,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                    lineNumber: 135,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                            lineNumber: 129,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                    lineNumber: 67,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                lineNumber: 66,
                columnNumber: 13
            }, this),
            showApproveDialog && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md rounded-lg bg-white p-6 shadow-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold mb-4",
                            children: "Approve Leave Request"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                            lineNumber: 162,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground mb-4",
                            children: [
                                "This will approve the leave request for ",
                                request.student.firstName,
                                " ",
                                request.student.lastName,
                                " and change their status to ON_LEAVE."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                            lineNumber: 163,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-2",
                                            children: "Note (Optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 168,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: approveNote,
                                            onChange: (e)=>setApproveNote(e.target.value),
                                            className: "w-full rounded-md border border-input px-3 py-2 text-sm",
                                            rows: 3,
                                            placeholder: "Add any notes for approval..."
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 171,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                    lineNumber: 167,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 justify-end",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowApproveDialog(false),
                                            className: "rounded-md border px-4 py-2 text-sm hover:bg-gray-50",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 180,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleApprove,
                                            disabled: isPending,
                                            className: "rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50",
                                            children: isPending ? "Approving..." : "Approve"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 186,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                    lineNumber: 179,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                            lineNumber: 166,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                    lineNumber: 161,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                lineNumber: 160,
                columnNumber: 17
            }, this),
            showRejectDialog && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md rounded-lg bg-white p-6 shadow-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold mb-4",
                            children: "Reject Leave Request"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                            lineNumber: 203,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground mb-4",
                            children: [
                                "This will reject the leave request for ",
                                request.student.firstName,
                                " ",
                                request.student.lastName,
                                "."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                            lineNumber: 204,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-2",
                                            children: [
                                                "Reason for Rejection ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-600",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 58
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 209,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: rejectNote,
                                            onChange: (e)=>setRejectNote(e.target.value),
                                            className: "w-full rounded-md border border-input px-3 py-2 text-sm",
                                            rows: 3,
                                            placeholder: "Please provide a reason for rejection...",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 212,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                    lineNumber: 208,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 justify-end",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowRejectDialog(false),
                                            className: "rounded-md border px-4 py-2 text-sm hover:bg-gray-50",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 222,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleReject,
                                            disabled: isPending || !rejectNote.trim(),
                                            className: "rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50",
                                            children: isPending ? "Rejecting..." : "Reject"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                            lineNumber: 228,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                                    lineNumber: 221,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                            lineNumber: 207,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                    lineNumber: 202,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/leave-requests/leave-request-card.tsx",
                lineNumber: 201,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=apps_web_db5d4dd8._.js.map