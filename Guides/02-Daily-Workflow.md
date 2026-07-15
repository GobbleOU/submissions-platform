# 🔄 Daily Workflow

Now that you've completed the **Developer Setup Guide**, this document explains the recommended workflow to follow **every time you work on the Submissions Platform**.

Following the same routine each day helps prevent version conflicts, reduces bugs, and ensures you're always working with the latest version of the project.

**Estimated time before coding each day:** 2–5 minutes

---

# 🎯 Daily Workflow Checklist

Every day, follow these steps in order:

- ✅ Open the project
- ✅ Download the latest changes
- ✅ Start the development server
- ✅ Make your changes
- ✅ Test your work
- ✅ Save your changes using Git
- ✅ Upload your work to GitHub

---

# Step 1 — Open the Project

Open **Visual Studio Code**.

If you recently worked on the project, you can usually select it from **File → Open Recent**.

Otherwise:

1. Click **File**
2. Select **Open Folder**
3. Choose the `submissions-platform` folder
4. Click **Select Folder**

### Expected Result

The project opens in Visual Studio Code and you can see the project folders in the Explorer on the left.

---

# Step 2 — Open the Terminal

The terminal is where you'll run commands to interact with the project.

In Visual Studio Code:

1. Click **Terminal**
2. Select **New Terminal**

A terminal window should appear at the bottom of VS Code.

### Expected Result

The terminal should already be inside your project folder.

Example:

```text
D:\Work\submissions-platform>
```

If you're not inside the project folder, navigate to it before continuing.

---

# Step 3 — Download the Latest Changes

Before you start working, always make sure you have the newest version of the project.

Run:

```bash
git pull
```

## Why is this important?

Your teammates may have made changes since the last time you worked.

Running `git pull` downloads those changes to your computer and helps prevent merge conflicts later.

### Expected Result

You may see something like:

```text
Already up to date.
```

or

```text
Updating...
```

Both are normal.

---

# Step 4 — Start the Development Server

Run:

```bash
npm run dev
```

This starts a local copy of the website on your computer.

After a few moments, you'll see a message indicating that the server is running.

Open your web browser and go to:

```text
http://localhost:3000
```

### Expected Result

The Submissions Platform loads in your browser.

Leave the terminal open while you work. Closing it will stop the application.

---

# Step 5 — Make Your Changes

You can now begin working on your assigned task.

This might include:

- Creating new features
- Fixing bugs
- Updating styles
- Improving existing functionality
- Refactoring code
- Updating documentation

Save your work regularly using **Ctrl + S**.

---

# Step 6 — Test Your Changes

Before saving your work to GitHub, make sure everything still works.

Check that:

- The application starts without errors.
- Your changes behave as expected.
- Existing functionality still works.
- No new errors appear in the browser or terminal.

If something isn't working, fix it before continuing.

---

# Step 7 — Save Your Work

Once you're happy with your changes, you'll save them using Git.

The full Git process is explained in the **Git Workflow Guide**, but the basic steps are:

```bash
git add .

git commit -m "Describe your changes in between these quotation marks"

git push
```

If you're unsure what these commands do, don't worry—they're covered in detail in the next guide.

---

# Step 8 — End Your Session

When you've finished working:

- Save all files.
- Ensure your changes have been committed.
- Push your changes to GitHub if your work is ready.
- Close Visual Studio Code.

If you're leaving work unfinished, make sure your progress has been saved before shutting down your computer.

---

# 💡 Daily Best Practices

Following these habits will help keep the project healthy and make collaboration easier.

- Pull the latest changes before you begin.
- Keep your terminal open while developing.
- Save your work frequently.
- Test your changes before committing.
- Commit small, meaningful changes instead of one large commit.
- Write clear commit messages.
- Ask for help if something doesn't look right.

---

# 📋 Daily Checklist

Use this checklist each day until the workflow becomes second nature.

- [ ] Open the project
- [ ] Open the terminal
- [ ] Run `git pull`
- [ ] Run `npm run dev`
- [ ] Make changes
- [ ] Test everything
- [ ] Commit your changes
- [ ] Push to GitHub

---

# 📚 Next Guide

Now that you know the daily workflow, it's time to learn how your work is safely shared with the rest of the team.

➡ **03-Git-Workflow.md**

---

## Need Help?

If you encounter errors while starting the project or pulling changes, see:

➡ **08-Troubleshooting.md**