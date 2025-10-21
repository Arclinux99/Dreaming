# PROJECT EXPLANATION TABLE

## 🔍 TABEL PERBEDAAN LOGIC TYPES

### A. TypeScript Syntax

| Keyword | Fungsi | Contoh | Digunakan Di |
|---------|---------|---------|--------------|
| `class` | Membuat blueprint object | `class User { login() {} }` | Backend (jarang di React) |
| `function` | Deklarasi fungsi | `function LoginPage() {}` | Frontend & Backend |
| `const` | Variabel tidak bisa diubah | `const API_URL = '...'` | Frontend & Backend |
| `import` | Mengambil code dari file lain | `import { Button } from './ui'` | Semua file |
| `export` | Menyediakan code ke file lain | `export default LoginPage` | Semua file |

### B. Next.js Component Types

| Type | Lokasi File | Directive | Contoh Fungsi | Bisa Akses |
|------|-------------|-----------|---------------|------------|
| **Client Component** | `components/*.tsx` | `'use client'` | Tombol, Form, UI | Browser APIs, useState |
| **Server Component** | `app/**/page.tsx` | (default) | Layout, Data fetching | Database langsung |
| **Route Handler** | `app/**/route.ts` | (none) | API endpoints | Request/Response |
| **Middleware** | `middleware.ts` | (none) | Auth checking | Request headers |
| **Server Action** | `actions/*.ts` | `'use server'` | Form submission | Database, auth |

### C. Supabase Client Types

| Client Function | Digunakan Di | Kegunaan | Contoh |
|-----------------|--------------|----------|---------|
| `createClientComponentClient()` | Client Components | Browser auth | `const supabase = createClientComponentClient()` |
| `createServerComponentClient()` | Server Components | Server-side data | `const supabase = createServerComponentClient(cookies)` |
| `createRouteHandlerClient()` | API Routes | Route handlers | `const supabase = createRouteHandlerClient(req, res)` |
| `createMiddlewareClient()` | Middleware | Auth middleware | `const supabase = createMiddlewareClient(req)` |

### D. Import/Export Patterns

| Import Type | Sintaks | Kegunaan | Catatan |
|-------------|---------|----------|---------|
| **Default Import** | `import Button from './Button'` | Import utama | Bisa nama bebas |
| **Named Import** | `import { Button } from './ui'` | Import spesifik | Nama harus sama |
| **Type Import** | `import type { User }` | TypeScript types | Hanya untuk types |
| **Wildcard** | `import * as Utils` | Semua exports | Jarang dipakai |

### E. Frontend vs Backend Logic

| Aspek | Frontend Logic | Backend Logic |
|-------|---------------|---------------|
| **Contoh Code** | `const [count, setCount] = useState(0)` | `await supabase.auth.signInWithOAuth()` |
| **Security** | ❌ Tidak aman untuk credential | ✅ Aman untuk credential |
| **Browser APIs** | ✅ Bisa akses window, document | ❌ Tidak bisa |
| **Database** | ❌ Tidak langsung | ✅ Langsung akses |
| **File Location** | `*.tsx` di `components/`, `app/` | `route.ts`, `middleware.ts`, `actions/` |

## 🚀 ALUR AUTHENTIKASI GOOGLE LENGKAP

### 1. User Klik Tombol (Frontend)
```typescript
// components/GoogleAuthButton.tsx
'use client'
const handleGoogleSignIn = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/auth/callback` }
  })
}
```

### 2. Google Redirect (Backend)
```typescript
// app/auth/callback/route.ts
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  await supabase.auth.exchangeCodeForSession(code)
  return NextResponse.redirect(new URL('/', request.url))
}
```

### 3. Middleware Check (Backend)
```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
```

## 📁 STRUKTUR PROJECT EXPLAINED

```
src/
├── app/
│   ├── page.tsx              # Halaman utama (Server Component)
│   ├── login/page.tsx        # Halaman login (Server Component)
│   ├── auth/callback/route.ts # Callback handler (Backend)
│   └── layout.tsx           # Root layout (Server Component)
├── components/
│   ├── GoogleAuthButton.tsx # Tombol login (Client Component)
│   └── ui/                  # UI components (Client)
├── lib/
│   ├── supabase/           # Supabase clients
│   └── utils.ts            # Helper functions
└── middleware.ts           # Auth middleware (Backend)
```

## 🎯 CARA MEMBACA CODE

### Step 1: Cari Entry Point
```typescript
// Mulai dari app/login/page.tsx
export default function LoginPage() {
  return <GoogleAuthButton />  // Lihat komponen ini
}
```

### Step 2: Ikuti Component Tree
```
LoginPage → GoogleAuthButton → supabase.auth.signInWithOAuth
```

### Step 3: Cek Data Flow
```
User Click → Google OAuth → /auth/callback → Session → Redirect
```

### Step 4: Debug dengan Console.log
```typescript
// Tambah di setiap step
console.log('Step 1: User clicked')
console.log('Step 2: OAuth response:', data)
```

## 🔧 COMMON MISTAKES

| Kesalahan | Solusi |
|-----------|---------|
| Lupa `'use client'` | Tambahkan di component interaktif |
| Salah client type | Gunakan table di atas |
| Direct database di client | Pindah ke server component |
| Missing redirect | Tambahkan return NextResponse.redirect |

## 📚 NEXT STEPS

1. **Coba modifikasi** `login/page.tsx`
2. **Tambahkan console.log** di `auth/callback/route.ts`
3. **Cek cookies** di browser dev tools
4. **Test middleware** dengan akses `/dashboard`
5. **Lihat network tab** untuk redirect flow

---

**💡 Tips:** Frontend = Apa yang dilihat user, Backend = Logic di balik layar. Kalau ada `useState`, `onClick`, atau DOM manipulation = Frontend. Kalau ada database, auth, atau API calls = Backend!
