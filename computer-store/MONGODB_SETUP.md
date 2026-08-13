# MongoDB Setup Guide for Vercel Deployment

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new cluster (choose the FREE tier - M0)
4. Wait for cluster to be created (2-3 minutes)

## Step 2: Configure Database Access

1. In MongoDB Atlas dashboard, go to **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Create a username and strong password
5. Set **Database User Privileges** to "Read and write to any database"
6. Click **Add User**

## Step 3: Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
   - This is needed for Vercel deployment
4. Click **Confirm**

## Step 4: Get Connection String

1. Go to **Database** (left sidebar)
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Select **Driver: Node.js** and **Version: 5.5 or later**
5. Copy the connection string, it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 5: Update .env File

1. Open `computer-store/.env`
2. Replace the MONGODB_URI with your connection string
3. Replace `<username>` with your database username
4. Replace `<password>` with your database password
5. Add database name after `.net/`: `.net/computer-store?retryWrites...`

Example:
```env
MONGODB_URI=mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/computer-store?retryWrites=true&w=majority
```

## Step 6: Seed Initial Data (Optional)

Run this script to populate your database with initial laptop data:

```bash
node computer-store/scripts/seed-database.js
```

Or manually insert data through MongoDB Atlas:
1. Go to **Database** → **Browse Collections**
2. Create database: `computer-store`
3. Create collection: `laptops`
4. Click **Insert Document** and add your laptop data

## Step 7: Install MongoDB Package

```bash
cd computer-store
npm install mongodb
```

## Step 8: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and check if laptops are loading.

## Step 9: Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add Environment Variable:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB connection string
5. Add other environment variables (CLERK keys)
6. Click **Deploy**

## Step 10: Verify Deployment

1. Visit your deployed site
2. Test adding/editing/deleting laptops in admin panel
3. Changes should persist across refreshes

## Troubleshooting

**Error: "MongoServerError: Authentication failed"**
- Check username and password in connection string
- Verify database user was created with correct permissions

**Error: "MongoServerError: IP address not allowed"**
- Add 0.0.0.0/0 to Network Access whitelist in MongoDB Atlas

**Data not persisting:**
- Verify MONGODB_URI is set in Vercel environment variables
- Check Vercel deployment logs for errors

**Can't connect locally:**
- Make sure your IP is whitelisted in MongoDB Atlas
- Check if .env file has correct MONGODB_URI

## Useful MongoDB Atlas Features

- **Metrics**: Monitor database usage
- **Alerts**: Set up alerts for performance issues
- **Backup**: Free tier includes point-in-time backups
- **Data Explorer**: View and edit documents directly

## Security Best Practices

✅ Use strong passwords for database users
✅ Never commit .env files to Git
✅ Rotate credentials periodically
✅ Use read-only users for non-admin operations
✅ Enable IP whitelisting for production (not 0.0.0.0/0)

## Need Help?

- MongoDB Docs: https://docs.mongodb.com/
- Vercel Docs: https://vercel.com/docs
- GitHub Issues: Create an issue in your repo
