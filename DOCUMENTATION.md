# StateURL Example Documentation Index

**All documentation for building applications with StateURL**

---

## 📚 Documentation Files

### 1. README.md (856 lines) ⭐ **START HERE**

**Purpose:** Complete development guide  
**Audience:** Developers and LLMs  
**Content:**
- Quick start
- Project structure
- Core concepts
- Building blocks (Router, Routes, Navigation)
- Component patterns (Layout, List, Detail, Query, Features)
- API reference
- Common mistakes
- Troubleshooting

**When to use:** Learning StateURL, building new apps

---

### 2. QUICK_REFERENCE.md (315 lines) ⚡ **USE WHILE CODING**

**Purpose:** Quick lookup for common patterns  
**Audience:** Developers with basic knowledge  
**Content:**
- DO/DON'T rules
- Navigation function comparison
- Route definition template
- 5 essential component patterns
- State management quick ref
- Common errors & fixes

**When to use:** Quick lookups, copy-paste patterns

---

### 3. UPDATED.md (218 lines) 🔧 **FIXES APPLIED**

**Purpose:** Summary of all fixes to make this app work  
**Audience:** Developers debugging issues  
**Content:**
- All 6 fixes applied (Counter, Settings, routes, helpers, etc.)
- Working URLs list
- Key learnings
- API summary

**When to use:** Understanding what was fixed, debugging similar issues

---

## 🎯 Which Document Should I Read?

### I'm new to StateURL
→ **Start with README.md**  
Complete walkthrough from setup to advanced patterns

### I know StateURL, need quick pattern
→ **Use QUICK_REFERENCE.md**  
Copy-paste component patterns, look up API

### My routes/query/features aren't working
→ **Check UPDATED.md**  
See common issues and how they were fixed

### I want to see working code
→ **Read the source files**  
`src/components/*.tsx` - All patterns implemented

---

## 📁 Example App Structure

```
stateurl-example/
├── DOCUMENTATION.md       ← You are here
├── README.md              ← Complete guide (START HERE)
├── QUICK_REFERENCE.md     ← Quick patterns
├── UPDATED.md             ← Fixes applied
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx           ← Entry point
    ├── App.tsx            ← Router config
    ├── routes.ts          ← Route definitions ⭐
    ├── main.css
    └── components/
        ├── Layout.tsx     ← Navigation pattern ⭐
        ├── Home.tsx
        ├── Counter.tsx    ← Query params ⭐
        ├── Products.tsx   ← List/detail ⭐
        ├── ProductDetail.tsx
        ├── Users.tsx      ← List/detail
        ├── UserDetail.tsx
        ├── Settings.tsx   ← Features ⭐
        └── About.tsx
```

**⭐ = Essential files to study**

---

## 🚀 Quick Start

```bash
# 1. Install
pnpm install

# 2. Run
pnpm dev

# 3. Visit
http://localhost:8000/app

# 4. Study
- Read README.md
- Browse source code
- Test all routes
- Modify and experiment
```

---

## 🔑 Key Concepts (1-Minute Summary)

### URL Structure
```
/app/v1/light/products/item/123?sort=price
 └─┬┘└┬┘└──┬─┘└──────┬───────┘└────┬────┘
basename│ theme      route       query
     feature      (with param)
```

### Navigation Functions
- `go(path)` - Raw navigation, exact URL
- `to(path)` - Add basePattern
- `via(expr)` - Smart route search

### State Types
- **Params:** Resource IDs (`/user/:id`)
- **Query:** UI state (`?sort=price`)
- **Features:** App config (`:theme=light`)

### Critical Rules
1. Always use `to()` for href
2. Always use `handleHref` onClick
3. Register query params first
4. Features use `.set()` method
5. Params need slash: `item/:id` and `/item/${id}`

---

## 📞 Need Help?

1. **README.md** - Detailed explanations
2. **QUICK_REFERENCE.md** - Fast lookups
3. **UPDATED.md** - Common fixes
4. **Source code** - Working examples

---

**Last Updated:** December 8, 2025  
**StateURL Version:** 2.0
