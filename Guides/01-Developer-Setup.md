# 📖 Developer Setup Guide

Welcome to the **Submissions Platform Developer Setup Guide**.

This guide will walk you through everything needed to set up the project on your computer for the first time.

If this is your first time working on the project, **follow every step in order**. Do not skip ahead, as later steps depend on software installed earlier in the guide.

---

## 🎯 Goal

By the end of this guide, you will have:

- Installed all required software
- Downloaded the project from GitHub
- Configured the project correctly
- Started the application on your computer
- Verified everything is working correctly

Estimated completion time:

**20–40 minutes**

---

# 📋 Before You Begin

Before starting, make sure you have the following:

- A Windows computer
- A stable internet connection
- A GobbleIP GitHub account
- Access to the Submissions Platform repository
- The required GobbleIP login credentials (see the CocaCola documentation if needed)

If you don't have access to the repository, contact the project owner before continuing.

---

# 🛠 Software You'll Need

Before you can work on the project, a few programs need to be installed.

Don't worry if you've never used them before—each one is explained below.

| Software | Purpose |
|----------|---------|
| Visual Studio Code | The program you'll use to view and edit the project's code. |
| Node.js | Allows your computer to run the application locally. |
| Git | Tracks changes made to the project and lets developers work together safely. |
| GitHub | Stores the project's source code online. |

---

# Step 1 — Install Visual Studio Code

## What is Visual Studio Code?

Visual Studio Code (often called **VS Code**) is the editor you'll use to work on the project.

Think of it as Microsoft Word—but instead of editing documents, you're editing software.

---

### Download

Visit:

https://code.visualstudio.com

Click:

**Download for Windows**

---

### Install

Run the installer.

The default installation settings are recommended.

Continue clicking **Next** until the installation finishes.

---

### Verify

Open Visual Studio Code.

If VS Code opens successfully, this step is complete.

---

# Step 2 — Install Node.js

## What is Node.js?

Node.js allows your computer to run JavaScript applications outside of a web browser.

Without Node.js, the project cannot start.

---

### Download

Visit:

https://nodejs.org

Download the latest **LTS (Long-Term Support)** version.

---

### Install

Run the installer using the default settings.

Restart your computer if prompted.

---

### Verify Installation

Open **Command Prompt** (not PowerShell).

Run:

```bash
node -v

npm -v
```

You should see something similar to:

```text
v22.x.x

10.x.x
```

If both commands return version numbers, Node.js has been installed correctly.

---

# Step 3 — Install Git

## What is Git?

Git keeps track of every change made to the project.

Instead of emailing files back and forth, every developer works from the same repository using Git.

---

### Download

https://git-scm.com/downloads

---

### Install

Run the installer.

Leave all options as their default values.

---

### Verify Installation

Open Command Prompt.

Run:

```bash
git --version
```

Example output:

```text
git version 2.xx.x
```

---

# Step 4 — Verify GitHub Access

Before continuing, make sure you can access:

https://github.com/GobbleOU/submissions-platform

If you receive an access denied message, contact the project owner before continuing.

---

# Step 5 — Download the Project

Open **Command Prompt**.

Navigate to the folder where you'd like to store the project.

Example:

```bash
cd D:\Work
```

Clone the repository.

```bash
git clone https://github.com/GobbleOU/submissions-platform.git
```

Once complete, move into the project folder.

```bash
cd submissions-platform
```

Expected result:

You are now inside the project folder.

---

# Step 6 — Open the Project

There are two ways to open the project.

## Option A (Recommended)

Run:

```bash
code .
```

VS Code should automatically open.

---

## Option B

Open Visual Studio Code manually.

Select:

File → Open Folder

Choose:

```
submissions-platform
```

---

# Step 7 — Install Project Dependencies

## What are Dependencies?

Dependencies are additional pieces of software that the project needs in order to work.

Instead of writing every feature ourselves, we use trusted libraries created by the community.

---

Run:

```bash
npm install
```

This may take several minutes.

Expected result:

A new folder called:

```
node_modules
```

will appear inside the project.

---

# Step 8 — Configure Environment Variables

The project requires a file named:

```
.env
```

This file contains settings that should never be uploaded to GitHub.

Create the file if it doesn't already exist.

Inside it, add:

```text
DATABASE_URL="YOUR_SUPABASE_DATABASE_URL"
```

The project owner will provide the correct value.

⚠ Never commit the `.env` file.

---

# Step 9 — Start the Project

Run:

```bash
npm run dev
```

Wait until the terminal reports that the server has started.

Open your browser and visit:

http://localhost:3000

If everything has been configured correctly, you should see the Submissions Platform homepage.

Congratulations!

Your development environment is now ready.

---

# ✅ Next Steps

Now that the project is running, continue to:

➡ **02-Daily-Workflow.md**

This guide explains what to do every day before beginning development.

---

## Need Help?

If you encounter any errors during setup, see:

➡ **08-Troubleshooting.md**