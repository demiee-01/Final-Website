# ⚡ Supabase Quick Start (5 Minutes)

## What Changed?

✅ **Installed**: `@supabase/supabase-js` package
✅ **Updated**: `ImageUpload.js` component (now uses Supabase)
✅ **Created**: `src/lib/supabase.js` (Supabase client)
✅ **Removed**: ImageKit API route (no longer needed)

## 🎯 What You Need to Do

### 1. Create Supabase Account (2 min)
- Go to [supabase.com](https://supabase.com)
- Sign up → Create project
- Choose **Free Plan** (1GB storage)

### 2. Create Storage Bucket (1 min)
- Go to **Storage**
- Create bucket: `laptop-images`
- ✅ **Check "Public bucket"** ← IMPORTANT!

### 3. Set Public Policy (1 min)
- Click bucket → **Policies** → **New Policy**
- Template: "Allow public read access"
- Save it

### 4. Get Your Keys (30 sec)
- **Settings** → **API**
- Copy:
  - Project URL: `https://xxxxx.supabase.co`
  - Anon key: `eyJhbGc...`

### 5. Update .env File (30 sec)

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 6. Restart Server

```bash
npm run dev
```

### 7. Test Upload! 🎉

Go to your admin panel and upload a laptop image!

---

## 📋 Checklist

- [ ] Supabase account created
- [ ] Project created
- [ ] `laptop-images` bucket created
- [ ] Bucket is **public** (checked)
- [ ] Policy allows public read
- [ ] `.env` updated with URL and key
- [ ] Server restarted
- [ ] Test upload works

---

## Need Help?

See **SUPABASE_SETUP.md** for detailed step-by-step guide with screenshots info!
