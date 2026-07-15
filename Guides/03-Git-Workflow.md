# 🌿 Git Workflow


# 📖 What is Git?

Git is a **Version Control System**.

Think of Git as a timeline of your work. Every time you save important changes, Git creates a snapshot that you can return to later if something goes wrong.

Instead of developers emailing files to one another, everyone works from the same project while Git keeps track of every change.

Git helps developers:

- Work together without overwriting each other's work.
- Restore previous versions if mistakes are made.
- Track who made each change.
- Review code before it becomes part of the project.

---

# 📖 What is GitHub?

GitHub is a website that stores Git repositories online.

Think of GitHub as a shared cloud storage location for the project's source code.

Your local computer contains your own copy of the project, while GitHub stores the team's shared version.

---

# 📖 Understanding the Workflow

Every task follows the same process.

```text
Pull Latest Changes
        │
        ▼
Create a Feature Branch
        │
        ▼
Make Your Changes
        │
        ▼
Test Your Work
        │
        ▼
Commit Changes
        │
        ▼
Push to GitHub
        │
        ▼
Open a Pull Request
        │
        ▼
Code Review
        │
        ▼
Merge into Main
```

Following this workflow helps keep the project stable and prevents developers from accidentally overwriting each other's work.

---

# Step 1 — Download the Latest Changes

Before creating a new branch, make sure your project is up to date.

Run:

```bash
git pull
```

### Why?

This downloads any work your teammates have completed since you last worked on the project.

---

# Step 2 — Create a Feature Branch

Never work directly on the `main` branch.

Instead, create a new branch for each task.

Example:

```bash
git checkout -b feature/add-film-dashboard
```

### What is a Branch?

A branch is your own workspace.

It allows you to make changes without affecting the main project until your work has been reviewed.

You can think of it like making a copy of a document before editing it.

---

# Step 3 — Make Your Changes

You can now begin working on your assigned task.

Examples include:

- Adding new features
- Fixing bugs
- Updating documentation
- Improving performance
- Refactoring code

Save your files regularly while working.

---

# Step 4 — Check Your Changes

Before committing your work, it's useful to see what has changed.

Run:

```bash
git status
```

### Expected Result

Git will show:

- Files you've modified.
- New files you've created.
- Files ready to be committed.

---

# Step 5 — Stage Your Changes

Once you're happy with your work, tell Git which files you want to save.

Run:

```bash
git add .
```

### What does this do?

This prepares all changed files to be included in your next commit.

---

# Step 6 — Commit Your Changes

A commit is a saved snapshot of your work.

Run:

```bash
git commit -m "Added film dashboard"
```

### Writing Good Commit Messages

Good commit messages describe **what changed**, not how long it took.

Good examples:

```text
Added login validation

Fixed navbar alignment

Updated user dashboard

Improved loading performance
```

Avoid messages like:

```text
Stuff

Changes

Update

asdf
```

Future developers (including yourself) should be able to understand what each commit contains.

---

# Step 7 — Upload Your Work

Once you've committed your changes, upload them to GitHub.

Run:

```bash
git push origin feature/add-film-dashboard
```

GitHub will now contain your latest work.

---

# Step 8 — Create a Pull Request

After pushing your branch, open the repository on GitHub.

Create a **Pull Request (PR)**.

### What is a Pull Request?

A Pull Request asks the rest of the team to review your work before it becomes part of the project.

This helps:

- Catch bugs.
- Improve code quality.
- Ensure coding standards are followed.
- Share knowledge across the team.

After your Pull Request has been approved, it can be merged into the `main` branch.

---

# 🌟 Branch Naming Convention

To keep the repository organised, use descriptive branch names.

Examples:

```text
feature/add-user-management

feature/improve-dashboard

feature/update-navbar

bugfix/login-error

bugfix/image-upload

hotfix/database-timeout
```

Avoid branch names like:

```text
new

test

branch1

johns-work
```

---

# 💡 Best Practices

- Pull before creating a branch.
- Create one branch per task.
- Commit small changes frequently.
- Write descriptive commit messages.
- Test your changes before pushing.
- Never push directly to `main`.
- Open a Pull Request for every completed task.

---

# 📚 Common Git Commands

| Command | Purpose |
|----------|---------|
| `git pull` | Download the latest changes. |
| `git status` | Show the current status of your files. |
| `git checkout -b <branch>` | Create and switch to a new branch. |
| `git add .` | Stage all changes. |
| `git commit -m "message"` | Save a snapshot of your work. |
| `git push origin <branch>` | Upload your branch to GitHub. |

---

# 📚 Next Guide

Now that you understand how your work is shared with the team, it's time to learn how the project itself is organised.

➡ **04-Project-Structure.md**

---

## Need Help?

Having issues with Git?

See:

➡ **08-Troubleshooting.md**