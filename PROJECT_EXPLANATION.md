# PENJELASAN LENGKAP PROJECT NEXT.JS + SUPABASE

## 1. KONSEP DASAR

### Apa itu Frontend vs Backend?

**Frontend** = Apa yang dilihat user (tampilan, tombol, form)
- File: `page.tsx`, `component.tsx`, UI, styling
- Contoh: Tombol login, form input, tampilan produk

**Backend** = Logic di balik layar (database, autentikasi, API)
- File: `route.ts`, `middleware.ts`, server actions
- Contoh: Cek password, simpan data ke database, kirim email

### Struktur File Next.js App Router

```
src/
├── app/                    # Frontend + Backend Routes
│   ├── page.tsx           # Halaman depan (frontend)
│   ├── login/page.tsx     # Halaman login (frontend)
│   ├── auth/callback/route.ts  # API route (backend)
│   └── layout.tsx         # Layout global
├── components/            # Komponen frontend
├── lib/                   # Utility functions
└── middleware.ts          # Backend (cek auth)
```

## 2. IMPORT/EXPORT LOGIC

### Import Types
```typescript
// Import default (bisa nama bebas)
import GoogleAuthButton from '@/components/GoogleAuthButton'

// Import named (harus sama persis)
import { createClient } from '@supabase/ssr'
import { useState, useEffect } from 'react'

// Import multiple
import { Button, Input, Card } from '@/components/ui'

// Import type (untuk TypeScript saja)
import type { NextRequest } from 'next/server'
```

### Export Types
```typescript
// Default export (satu per file)
export default function LoginPage() {}

// Named export (bisa banyak)
export function Button() {}
export const API_URL = '...'

// Export type
type User = { name: string }
export type { User }
```

## 3. CLASS, FUNCTION, CONST

### Function Declarations
```typescript
// Regular function
function LoginPage() {
  return <div>Login</div>
}

// Arrow function (lebih modern)
const LoginPage = () => {
  return <div>Login</div>
}

// Async function (untuk API calls)
async function handleLogin() {
  const response = await fetch('/api/login')
}
```

### Class (jarang dipakai di React)
```typescript
class AuthService {
  login() {}
  logout() {}
}
```

### Const (untuk nilai tetap)
```typescript
const API_URL = 'https://api.example.com'
const MAX_RETRY = 3
```

## 4. 'USE CLIENT' vs 'USE SERVER'

| Directive | Digunakan Di | Fungsi | Contoh Penggunaan |
|-----------|--------------|---------|-------------------|
| `'use client'` | Component files | Menandai client component | Form, button, UI interaktif |
| `'use server'` | Server actions | Menandai server function | Database operations, auth |

### Contoh 'use client':
```typescript
'use client'  // WAJIB di file komponen interaktif
import { useState } from 'react'

export default function GoogleAuthButton() {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleClick = () => {
    setIsLoading(true)  // Bisa akses browser APIs
  }
}
```

### Contoh 'use server':
```typescript
'use server'  // Untuk server actions
export async function createUser(data: FormData) {
  // Bisa akses database langsung
  await db.users.create(data)
}
```

## 5. ALUR AUTHENTIKASI GOOGLE (SUPABASE)

### Flow Lengkap:

```
1. User klik tombol Google → GoogleAuthButton.tsx
2. Redirect ke Google OAuth → Google login page
3. Google redirect ke /auth/callback?code=xxx
4. Callback route tuker code jadi session
5. Session disimpan di cookies
6. User redirect ke halaman tujuan
```

### Langkah Detail:

#### A. Frontend (Login Page)
```typescript
// src/app/login/page.tsx
import GoogleAuthButton from '@/components/GoogleAuthButton'

export default function LoginPage() {
  return <GoogleAuthButton />  // Tombol login Google
}
```

#### B. Component Google Auth
```typescript
// src/components/GoogleAuthButton.tsx
'use client'
import { createClient } from '@supabase/ssr'

export default function GoogleAuthButton() {
  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }
}
```

#### C. Backend Callback (Route Handler)
```typescript
// src/app/auth/callback/route.ts
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  
  // Tuker code jadi session
  const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)
  
  // Redirect ke halaman utama
  return NextResponse.redirect(new URL('/', request.url))
}
```

#### D. Middleware (Cek Auth)
```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const { data: { session } } = await supabase.auth.getSession()
  
  // Kalau gak ada session, redirect ke login
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
```

## 6. SUPABASE CLIENT TYPES

| Client Type | Digunakan Di | Kegunaan |
|-------------|--------------|----------|
| `createClientComponentClient()` | Client Components | Di browser, bisa useState |
| `createServerComponentClient()` | Server Components | Di server, akses cookies |
| `createRouteHandlerClient()` | API Routes | Di route handlers |
| `createMiddlewareClient()` | Middleware | Di middleware.ts |

### Contoh Penggunaan:
```typescript
// Client component
'use client'
const supabase = createClientComponentClient()

// Server component
const supabase = createServerComponentClient(cookies)

// API route
const supabase = createRouteHandlerClient(request, response)
```

## 7. TABEL PERBEDAAN LOGIC

### Frontend Logic vs Backend Logic

| Aspek | Frontend Logic | Backend Logic |
|-------|---------------|---------------|
| **Lokasi** | `.tsx` files | `.ts`, `route.ts`, `middleware.ts` |
| **Contoh** | Validasi form, toggle UI | Auth, database, API calls |
| **Akses** | Browser APIs | Database, server resources |
| **Security** | Tidak aman untuk data sensitif | Aman untuk credential |

### Component Types

| Type | Directive | Contoh | Bisa Akses |
|------|-----------|---------|------------|
| Client Component | `'use client'` | Button, Form | Browser APIs, useState |
| Server Component | (default) | Page layout | Database langsung |
| Server Action | `'use server'` | Form actions | Database, auth |

## 8. CARA MEMBACA PROJECT INI

### Start dari sini:
1. `src/app/page.tsx` - Halaman utama
2. `src/components/GoogleAuthButton.tsx` - Tombol login
3. `src/app/login/page.tsx` - Halaman login
4. `src/app/auth/callback/route.ts` - Callback handler
5. `middleware.ts` - Cek autentikasi

### Debug Flow:
```
1. Buka /login
2. Klik Google button
3. Cek console log di browser
4. Cek network tab untuk redirect
5. Cek callback route untuk error
```

## 9. TIPS MEMBACA CODE

### Urutan Membaca:
1. **Cari entry point** (biasanya `page.tsx`)
2. **Ikuti import** - komponen apa yang dipakai?
3. **Cek props** - data apa yang dikirim?
4. **Cek event handlers** - apa yang terjadi saat click/submit?
5. **Cek API routes** - kemana data dikirim?

### Tanda Bahaya:
- `console.error()` = Ada error
- `redirect()` = Akan pindah halaman
- `useState()` = Component punya state
- `async/await` = Ada API call

## 10. NEXT STEPS UNTUK BELAJAR

1. **Coba ubah text di login page**
2. **Tambah console.log di callback route**
3. **Cek apa yang tersimpan di cookies**
4. **Coba redirect ke halaman berbeda**
5. **Tambah loading state di button**

---

**Catatan:** Semua file `.tsx` adalah frontend (kecuali yang ada di `app/**/route.ts`), semua file `.ts` bisa jadi backend tergantung lokasinya!