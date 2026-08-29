# Deployment Guide for Hirpa SciML Academy

This guide will help you deploy Hirpa SciML Academy to Vercel and connect it to your subdomain `learn.hirpadata.com`.

## Prerequisites

- GitHub account (free)
- Vercel account (free)
- Domain `hirpadata.com` (managed through Wix)
- Project built and tested locally

## Step 1: Initialize Git Repository

```bash
cd ~/Desktop/ASU/projects/gradientgrove
git init
git add .
git commit -m "Initial commit: Gradient Grove prototype"
```

## Step 2: Push to GitHub

1. Create a new repository on GitHub (don't initialize with README).
2. Run these commands (replace `YOUR_USERNAME` with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/gradientgrove.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy on Vercel

1. Go to vercel.com and sign up (using GitHub).
2. Click "Add New Project".
3. Import your `gradientgrove` repository.
4. Vercel will auto-detect Next.js.
5. Click "Deploy" (no environmenvariables are needed for Phase 1).
6. Wait 2–3 minutes for deployment.

Your app is now live at `https://gradientgrove.vercel.app`.

## Step 4: Connect Custom Subdomain

### In Vercel Dashboard

1. Go to your project settings.
2. Click "Domains".
3. Add: `learn.hirpadata.com`.
4. Wait for SSL provisioning.

### In Wix Dashboard

1. Log in to Wix.
2. Go to Settings → Domains → hirpadata.com → Manage DNS.
3. Click "Add Record".
4. Create a CNAME record:
   - **Name:** `learn`
   - **Value:** `cname.vercel-dns.com`
   - **TTL:** `3600` (or default)
5. Save the record.

DNS changes can take 5–30 minutes. Check status at [whatsmydns.net](https://www.whatsmydns.net) by searching for `learn.hirpadata.com`.

## Step 5: Verify Deployment

1. Open `https://gradientgrove.vercel.app` and confirm the landing page loads.
2. After DNS propagates, open `https://learn.hirpadata.com`.
3. Confirm the site uses HTTPS (Vercel SSL).
