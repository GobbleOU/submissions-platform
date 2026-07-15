# ⌨ Common Commands


# 📖 Introduction

Throughout development, you'll use the terminal to interact with the project.

This guide explains the commands you'll use most often while working on the Submissions Platform.

You don't need to memorise them all immediately—use this guide as a reference whenever you need it.

---

# 📦 Project Setup Commands

## Install Project Dependencies

```bash
npm install
```

### What does it do?

Downloads and installs all packages required for the project.

### When should I use it?

- The first time you set up the project.
- After pulling changes that include new packages.
- If the `node_modules` folder has been deleted.

### Expected Result

All required packages are installed into the `node_modules` folder.

---

## Update Project Dependencies

```bash
npm update
```

### What does it do?

Updates project dependencies to newer compatible versions.

### When should I use it?

- As part of scheduled maintenance.
- When instructed by the project owner.
- Approximately once per week if your team has agreed to do so.

### Important

Do **not** use:

```bash
npm audit fix --force
```

unless the team has discussed and approved it.

Using `--force` can introduce breaking changes.

---

# 🚀 Development Commands

## Start the Development Server

```bash
npm run dev
```

### What does it do?

Starts a local development version of the application.

### When should I use it?

Every time you begin working.

### Expected Result

The terminal displays a message indicating that the server is running.

You can then open:

```text
http://localhost:3000
```

---

# 🌿 Git Commands

## Download the Latest Changes

```bash
git pull
```

### What does it do?

Downloads the latest changes from GitHub.

### When should I use it?

Every time you begin work.

---

## Check the Status of Your Files

```bash
git status
```

### What does it do?

Shows:

- Modified files
- New files
- Deleted files
- Files ready to commit

### When should I use it?

Whenever you're unsure what has changed.

---

## Create a New Branch

```bash
git checkout -b feature/my-feature
```

### What does it do?

Creates a new branch and immediately switches to it.

### When should I use it?

Before beginning a new task or feature.

---

## Stage Your Changes

```bash
git add .
```

### What does it do?

Prepares all modified files for the next commit.

### When should I use it?

After you've finished making changes.

---

## Save Your Changes

```bash
git commit -m "Describe your changes"
```

### What does it do?

Creates a snapshot of your work with a descriptive message.

### When should I use it?

Whenever you've completed a meaningful piece of work.

---

## Upload Your Changes

```bash
git push origin feature/my-feature
```

### What does it do?

Uploads your branch to GitHub.

### When should I use it?

After committing your work.

---

# 🗄 Prisma Commands

## Create a Database Migration

```bash
npx prisma migrate dev
```

### What does it do?

Creates and applies database changes to your local development database.

### When should I use it?

Whenever you've changed the database schema.

---

## Generate the Prisma Client

```bash
npx prisma generate
```

### What does it do?

Regenerates Prisma's client code.

### When should I use it?

- After pulling schema changes.
- If instructed by another developer.
- When troubleshooting Prisma-related issues.

---

## Open Prisma Studio

```bash
npx prisma studio
```

### What does it do?

Opens a graphical interface for viewing and editing your local database.

### When should I use it?

Whenever you want to inspect or test data without writing SQL.

---

# ⚡ Useful VS Code Commands

## Open the Terminal

Shortcut:

```text
Ctrl + `
```

---

## Search the Entire Project

Shortcut:

```text
Ctrl + Shift + F
```

---

## Find a File

Shortcut:

```text
Ctrl + P
```

---

## Format the Current File

Shortcut:

```text
Alt + Shift + F
```

---

## Save the Current File

Shortcut:

```text
Ctrl + S
```

---

# 📋 Most Frequently Used Commands

If you only remember a few commands, these are the ones you'll use almost every day.

| Command | Purpose |
|----------|---------|
| `git pull` | Download the latest project changes. |
| `npm install` | Install project dependencies. |
| `npm run dev` | Start the development server. |
| `git status` | Check which files have changed. |
| `git add .` | Stage all changes. |
| `git commit -m "message"` | Save your work. |
| `git push origin <branch>` | Upload your work to GitHub. |

---

# 💡 Tips

- Read commands before pressing **Enter**.
- Make sure you're inside the project folder before running commands.
- If a command produces an error, read the error message carefully—it often explains what went wrong.
- Don't be afraid to ask for help if you're unsure what a command does.

---

# 📚 Next Guide

Now that you're familiar with the commands you'll use most often, let's look at how to solve common problems when something doesn't work as expected.

➡ **08-Troubleshooting.md**

---

## Need Help?

If a command returns an error that isn't covered in this guide, contact another member of the development team or refer to the Troubleshooting Guide.