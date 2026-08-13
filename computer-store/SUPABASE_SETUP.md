# 🚀 Supabase Image Storage Setup Guide

## Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up with GitHub (recommended) or email

## Step 2: Create New Project

1. Click **"New Project"**
2. Fill in:
   - **Name**: `computer-store` (or any name you like)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free (1GB storage, 2GB bandwidth)
3. Click **"Create new project"**
4. Wait 2-3 minutes for project setup

## Step 3: Create Storage Bucket

1. In your project dashboard, click **"Storage"** (left sidebar)
2. Click **"Create a new bucket"**
3. Fill in:
   - **Name**: `laptop-images`
   - **Public bucket**: ✅ **Check this box** (important!)
   - **File size limit**: Leave default or set to 5MB
4. Click **"Create bucket"**

## Step 4: Set Bucket Policies (Make Public)

1. Click on your **"laptop-images"** bucket
2. Go to **"Policies"** tab
3. Click **"New Policy"**
4. Choose template: **"Allow public read access"**
5. It will auto-generate this policy:

```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'laptop-images' );
```

6. Click **"Review"** then **"Save policy"**

**Or use this complete policy for full public access:**

1. Click **"New Policy"** → **"For full customization"**
2. Paste this:

```sql
CREATE POLICY "Public Upload and Read"
ON storage.objects
FOR ALL
USING ( bucket_id = 'laptop-images' );
```

## Step 5: Get Your Credentials

1. Go to **"Settings"** (left sidebar)
2. Click **"API"**
3. Copy these values:

   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (long string starting with eyJ)

## Step 6: Update Your .env File

Open `computer-store/.env` and update:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
```

⚠️ **Important**: Replace with YOUR actual values from Step 5!

## Step 7: Test the Upload

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to your admin panel
3. Try uploading an image
4. Check the browser console for success message
5. Verify image appears on your website

## Step 8: Verify in Supabase Dashboard

1. Go to **Storage** → **laptop-images**
2. Open the **"laptops"** folder
3. You should see your uploaded image!
4. Click on it to preview

## 🎉 You're Done!

Your images are now stored in Supabase with:
- ✅ Free 1GB storage
- ✅ CDN delivery (fast worldwide)
- ✅ Public URLs (no authentication needed)
- ✅ Automatic backups

## 📊 Monitor Usage

- Go to **Settings** → **Usage**
- Check storage and bandwidth used
- Free tier: 1GB storage, 2GB bandwidth/month

## 🛠️ Troubleshooting

### Images not showing?
- Check bucket is **public** (Step 3)
- Check policies allow **SELECT** (Step 4)
- Verify URLs in browser console

### Upload fails?
- Check `.env` values are correct
- Restart dev server after changing `.env`
- Check file size (max 5MB)
- Check file type (must be image)

### Need more storage?
- Free: 1GB storage, 2GB bandwidth
- Pro ($25/mo): 100GB storage, 200GB bandwidth
- Upgrade in **Settings** → **Billing**

## 🔗 Useful Links

- [Supabase Dashboard](https://app.supabase.com)
- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Pricing](https://supabase.com/pricing)
