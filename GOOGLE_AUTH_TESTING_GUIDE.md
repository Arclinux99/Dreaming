# 🧪 Panduan Testing Google Authentication Lengkap

## ✅ Status Saat Ini
- ✅ Server development berjalan di `http://localhost:3000`
- ✅ Halaman test Google Auth: `http://localhost:3000/test-google-auth`
- ✅ Tidak ada error di browser
- ⚠️ Ada warning di terminal (tidak kritis)

## 🚀 Langkah Testing Google Auth

### 1. Persiapan Environment
Pastikan environment variables ter-set:
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Test Halaman Login
Buka `http://localhost:3000/test-google-auth`

### 3. Klik Tombol Google
Klik tombol **"Continue with Google"**

### 4. Monitor Console Log
Buka browser console (F12 → Console) dan perhatikan:
```
🚀 Starting Google OAuth flow...
📍 Redirect config:
  - Current path: /test-google-auth
  - Target path: /dashboard
✅ OAuth initiated, redirecting to Google...
```

### 5. Monitor Network Tab
Buka Network tab (F12 → Network) dan perhatikan:
- Request ke Supabase auth endpoint
- Redirect ke Google OAuth
- Response status codes

### 6. Test dari Halaman Berbeda
Coba test dari halaman lain:
- `http://localhost:3000/login` (redirect ke dashboard)
- `http://localhost:3000/signup` (redirect ke onboarding)

## 🔍 Error Handling

### Jika Google Auth Gagal:
1. **Cek Console Log** untuk error messages
2. **Cek Network Tab** untuk failed requests
3. **Cek Environment Variables**
4. **Cek Supabase Dashboard** untuk OAuth settings

### Common Error Messages:

#### "Invalid provider"
**Solusi:** Pastikan Google OAuth enabled di Supabase

#### "Invalid redirect URL"
**Solusi:** Tambahkan `http://localhost:3000/auth/callback` ke allowed URLs

#### "Authorization server error"
**Solusi:** Cek Google Cloud Console untuk OAuth credentials

## 📊 Debug Checklist

### Browser Console:
- [ ] Ada log "🚀 Starting Google OAuth flow..."
- [ ] Ada log "📍 Redirect config"
- [ ] Tidak ada error merah
- [ ] Ada redirect ke Google

### Network Tab:
- [ ] Request ke Supabase auth endpoint (200)
- [ ] Redirect ke Google OAuth URL
- [ ] Tidak ada failed requests

### Terminal:
- [ ] Server running tanpa error kritis
- [ ] Tidak ada module import errors

### Supabase Dashboard:
- [ ] Google OAuth enabled
- [ ] Callback URLs configured
- [ ] Authentication logs showing attempts

## 🎯 Test Scenarios

### Scenario 1: Login dari Homepage
1. Buka `/test-google-auth`
2. Klik Google button
3. Harusnya redirect ke Google, lalu ke `/dashboard`

### Scenario 2: Login dari Halaman Signup
1. Buka `/signup` (jika ada)
2. Klik Google button
3. Harusnya redirect ke Google, lalu ke `/onboarding`

### Scenario 3: Login dengan Saved Redirect
1. Klik protected action yang membutuhkan login
2. Sistem harusnya save redirect URL
3. Setelah login, redirect ke action yang dimaksud

## 🛠️ Tools untuk Debug

1. **Browser DevTools:**
   - Console: Lihat log dan error
   - Network: Monitor HTTP requests
   - Application: Cek localStorage dan cookies

2. **Supabase Dashboard:**
   - Authentication settings
   - User management
   - OAuth providers

3. **Terminal:**
   - Server logs
   - Build errors
   - Environment check

## 📝 Catatan Penting

- Google OAuth membutuhkan HTTPS di production
- Localhost hanya untuk development
- Pastikan callback URLs match dengan konfigurasi
- User harus punya Google account yang valid
- Beberapa corporate Google accounts mungkin diblokir

## 🚀 Next Steps

Setelah testing berhasil:
1. Implementasi error handling yang lebih detail
2. Tambahkan loading states
3. Implementasi session management
4. Tambahkan user profile handling
5. Setup proper redirect logic

## 📞 Troubleshooting

Jika masih ada masalah:
1. Cek dokumentasi error di `ERROR_DOCUMENTATION.md`
2. Bandingkan dengan kode di `GoogleAuthButtonSimple.tsx`
3. Cek Supabase community forums
4. Review Google OAuth documentation