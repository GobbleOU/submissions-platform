# 🛠 Troubleshooting

# 📖 Before You Begin

Encountering errors during development is completely normal.

Even experienced developers regularly run into issues while working on software projects.

Before trying random solutions, take a moment to:

- Read the entire error message.
- Check which command caused the error.
- Think about what changed just before the problem started.
- Look through this guide for a matching issue.

Many problems can be solved in just a few minutes.

---

# 🔍 Quick Checklist

Before diving into a specific issue, ask yourself:

- Have you opened the project folder?
- Have you run `npm install`?
- Have you run `git pull`?
- Is your `.env` file present?
- Is the development server running?
- Did you restart VS Code after installing software?

If all of these are correct, continue to the relevant section below.

---

# ❌ "npm is not recognized"

## Problem

When running an npm command, you receive an error similar to:

```text
'npm' is not recognized as an internal or external command
```

## Cause

Node.js is either:

- Not installed.
- Installed incorrectly.
- Missing from your system's PATH.

## Solution

1. Download the latest **LTS** version of Node.js.
2. Install using the default settings.
3. Restart your computer.
4. Open Command Prompt.
5. Run:

```bash
node -v

npm -v
```

Both commands should display version numbers.

---

# ❌ "git is not recognized"

## Cause

Git has not been installed correctly.

## Solution

Download and install Git:

https://git-scm.com/downloads

Verify installation:

```bash
git --version
```

---

# ❌ Cannot Access the GitHub Repository

## Problem

Git reports:

```text
Repository not found
```

or

```text
Permission denied
```

## Possible Causes

- You're not signed into GitHub.
- Your account hasn't been granted access.
- The repository URL is incorrect.

## Solution

- Verify you're logged into GitHub.
- Check that you can open the repository in your browser.
- Contact the project owner if you don't have access.

---

# ❌ `code .` Doesn't Work

## Cause

VS Code hasn't been added to your system PATH.

## Solution

Open VS Code manually.

Select:

**File → Open Folder**

Choose the `submissions-platform` folder.

---

# ❌ Missing Packages

## Problem

The project reports missing modules or packages.

## Solution

Run:

```bash
npm install
```

This downloads all required dependencies.

---

# ❌ Port 3000 Is Already in Use

## Problem

The development server won't start because another application is already using port 3000.

## Solution 1 (Recommended)

Close the other application using port 3000.

Then restart:

```bash
npm run dev
```

## Solution 2

Run the project on another port.

```bash
npm run dev -- --port 3001
```

Then open:

```text
http://localhost:3001
```

---

# ❌ Database Connection Failed

## Possible Causes

- Incorrect `DATABASE_URL`
- Missing `.env`
- Database server unavailable
- Network connection issue

## Solution

Check that:

- Your `.env` file exists.
- `DATABASE_URL` is correct.
- You've copied the value exactly as provided.
- Your internet connection is working.

If the problem continues, contact the project owner.

---

# ❌ Prisma Errors

## Problem

Prisma reports schema or migration errors.

## Solution

Try:

```bash
npx prisma generate
```

If you've changed the schema:

```bash
npx prisma migrate dev
```

If the issue persists, review the latest database changes with your team before making additional modifications.

---

# ❌ The Website Won't Load

## Checklist

Verify that:

- `npm run dev` is still running.
- The terminal hasn't been closed.
- You're visiting:

```text
http://localhost:3000
```

If you're using another port, update the address accordingly.

---

# ❌ Git Merge Conflicts

## What Happened?

Two developers changed the same file before combining their work.

Git doesn't know which version should be kept.

## Solution

Do **not** panic.

Read the conflict carefully.

If you're unsure which changes should remain, ask another developer before resolving the conflict.

---

# ❌ I Accidentally Changed the Wrong File

Don't continue making changes.

Check your work using:

```bash
git status
```

If you haven't committed your changes yet, ask another developer before attempting to undo them.

---

# ❌ My Changes Disappeared

Check:

- Did you save the file?
- Did you switch branches?
- Did you accidentally discard changes?
- Did Git restore an older version?

If you're unsure, stop working and ask for assistance before making additional changes.

---

# 💡 General Tips

When something goes wrong:

- Read the error message completely.
- Don't ignore warnings.
- Solve one error at a time.
- Don't copy random commands from the internet.
- Ask for help if you're unsure.

Most errors have a simple explanation once you understand what's causing them.

---

# 📚 Still Need Help?

If your issue isn't covered here:

1. Read the full error message.
2. Search the project documentation.
3. Ask another member of the development team.
4. If needed, contact the project owner.

When asking for help, include:

- The command you ran.
- The complete error message.
- What you expected to happen.
- What actually happened.

Providing this information makes it much easier for someone else to help you.

---

# 📚 Next Guide

Now that you know how to solve common issues, let's look at the team's coding standards and development expectations.

➡ **09-Development-Rules.md**