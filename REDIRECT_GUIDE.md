# 🎯 PANDUAN LENGKAP REDIRECT RULES UNTUK GOOGLE AUTH

## 📚 APA ITU REDIRECT RULES?

Redirect rules adalah **aturan tentang kemana user akan dibawa setelah login berhasil**. Bayakan kaya GPS: setelah user masuk (login), mereka mau dibawa kemana?

---

## 🗺️ ALUR REDIRECT LENGKAP

```
1. User klik tombol Google → handleGoogleSignIn()
2. Frontend tentukan redirect target → const next = '/dashboard'
3. Kirim target ke backend → /auth/callback?next=/dashboard
4. Backend proses login → exchangeCodeForSession()
5. Backend redirect user → NextResponse.redirect('/dashboard')
```

---

## 🧪 MACAM-MACAM REDIRECT RULES

### 1️⃣ **STATIC REDIRECT** (Tetap)
```typescript
// Mau redirect ke dashboard terus, gak peduli dari mana
const next = '/dashboard'
```

**Kegunaan:** Login page standar, user selalu ke dashboard utama

### 2️⃣ **DYNAMIC REDIRECT** (Berdasarkan Asal)
```typescript
// User dari halaman mana? Balik ke sana!
const next = window.location.pathname // "/products", "/about", dll
```

**Kegunaan:** User lagi baca halaman X, login biar tetep di X

### 3️⃣ **CONDITIONAL REDIRECT** (Berdasarkan Kondisi)
```typescript
// Cek dari mana user datang
const currentPath = window.location.pathname
let next = '/'

if (currentPath === '/login') {
  next = '/dashboard'      // Dari login → dashboard
} else if (currentPath === '/signup') {
  next = '/onboarding'     // Dari signup → tutorial
} else if (currentPath.includes('/checkout')) {
  next = '/payment'        // Dari checkout → payment
} else {
  next = currentPath       // Yang lain → balik ke asal
}
```

**Kegunaan:** Beda halaman, beda tujuan setelah login

### 4️⃣ **ROLE-BASED REDIRECT** (Berdasarkan Role)
```typescript
// Redirect berdasarkan role user (butuh backend)
const userRole = await getUserRole() // Dari database
let next = '/'

switch (userRole) {
  case 'admin':
    next = '/admin/dashboard'
    break
  case 'seller':
    next = '/seller/dashboard'
    break
  case 'customer':
    next = '/customer/dashboard'
    break
  default:
    next = '/dashboard'
}
```

### 5️⃣ **PARAMETER-BASED REDIRECT**
```typescript
// Tambah parameter untuk tracking
const redirectUrl = `${origin}/auth/callback?` +
  `next=${encodeURIComponent(next)}` +
  `&source=google` +
  `&campaign=summer2024` +
  `&timestamp=${Date.now()}`
```

---

## 💡 CONTOH-CONTOH REAL

### 📱 **E-Commerce App**
```typescript
// User login dari halaman checkout → ke payment
// User login dari homepage → ke product list
// User login dari account → ke profile

const path = window.location.pathname
let next = '/'

if (path.includes('/checkout')) {
  next = '/checkout/payment'
} else if (path.includes('/product')) {
  next = '/products'
} else if (path === '/account') {
  next = '/profile'
} else {
  next = '/dashboard'
}
```

### 🏢 **Company Dashboard**
```typescript
// Beda department, beda dashboard
const department = localStorage.getItem('department') // Simpan waktu register
let next = '/dashboard'

switch (department) {
  case 'hr':
    next = '/hr/dashboard'
    break
  case 'finance':
    next = '/finance/dashboard'
    break
  case 'marketing':
    next = '/marketing/dashboard'
    break
}
```

---

## 🛠️ CARA IMPLEMENTASI

### Step 1: Modifikasi GoogleAuthButton.tsx
```typescript
const handleGoogleSignIn = async () => {
  // ... code lain ...
  
  // 🎯 Tentukan redirect target
  const redirectRule = getRedirectRule() // Fungsi buat tentukan kemana
  const redirectUrl = `${origin}/auth/callback?next=${encodeURIComponent(redirectRule)}`
  
  // ... kirim ke supabase ...
}

// 🧠 Fungsi redirect pintar
function getRedirectRule() {
  const currentPath = window.location.pathname
  const savedPath = localStorage.getItem('redirectAfterLogin')
  
  // Prioritas 1: Ada path tersimpan?
  if (savedPath) {
    localStorage.removeItem('redirectAfterLogin') // Hapus setelah dipake
    return savedPath
  }
  
  // Prioritas 2: Berdasarkan halaman sekarang
  if (currentPath === '/login') return '/dashboard'
  if (currentPath === '/pricing') return '/subscribe'
  if (currentPath.includes('/product/')) return currentPath
  
  // Default: ke homepage
  return '/'
}
```

### Step 2: Simpan Path Sebelum Redirect (Optional)
```typescript
// Di halaman yang butuh login dulu
const handleProtectedAction = () => {
  if (!isLoggedIn) {
    // Simpan path ini, biar login langsung ke sini
    localStorage.setItem('redirectAfterLogin', window.location.pathname)
    router.push('/login')
  }
}
```

---

## 🧪 TESTING & DEBUG

### Console.log Penting:
```typescript
console.log('📍 Current path:', window.location.pathname)
console.log('🎯 Redirect target:', next)
console.log('🔗 Full redirect URL:', redirectUrl)
console.log('📦 Stored redirect:', localStorage.getItem('redirectAfterLogin'))
```

### Test Scenarios:
1. **Test 1:** Login dari homepage → harusnya ke dashboard
2. **Test 2:** Login dari halaman produk → harusnya balik ke produk
3. **Test 3:** Klik "Buy Now" (butuh login) → harusnya ke checkout setelah login

---

## 🚨 COMMON MISTAKES

| Kesalahan | Solusi |
|-----------|---------|
| Lupa `encodeURIComponent()` | Selalu encode parameter next |
| Redirect ke external URL | Cuma boleh internal path |
| Circular redirect | Jangan redirect ke halaman login lagi |
| Missing default case | Selalu ada fallback path |

---

## 🎯 BEST PRACTICES

1. **Selalu encode parameter** `encodeURIComponent(next)`
2. **Validasi path** sebelum redirect (jangan ke external site)
3. **Simpan redirect path** kalau user di-interupt
4. **Batasi waktu** redirect rule (jangan forever)
5. **Test semua scenario** sebelum deploy

---

## 📚 NEXT STEPS

1. **Coba ganti** `next = '/dashboard'` jadi `next = '/profile'`
2. **Tambahkan** console.log di setiap step
3. **Test** dengan cara:
   - Buka halaman produk
   - Klik login
   - Cek apakah balik ke produk
4. **Buat** redirect rule sendiri untuk use-case Anda

---

**💡 Ingat:** Redirect rules itu kaya GPS untuk user. Makin pintar GPS-nya, makin happy user journey-nya! 🚀