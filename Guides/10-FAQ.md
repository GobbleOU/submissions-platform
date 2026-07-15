# ❓ Frequently Asked Questions (FAQ)

# 📖 Introduction

This guide answers some of the questions developers ask most often while working on the Submissions Platform.

If your question isn't answered here, check the relevant guide or ask another member of the development team.

---

# 🚀 Getting Started

## Where should I begin if I'm new to the project?

Start with the **Developer Setup Guide**.

Once the project is running, continue through the guides in order.

---

## How long does the initial setup take?

Most developers can complete the initial setup in approximately **20–40 minutes**, depending on internet speed and whether the required software is already installed.

---

## Do I need previous experience with Next.js or Prisma?

No.

Basic knowledge of HTML, CSS, JavaScript, or TypeScript is helpful, but the documentation is designed to help developers get started even if they're unfamiliar with the technologies used in this project.

---

# 🌿 Git Questions

## Should I work directly on the `main` branch?

No.

Always create a feature branch for each task.

This keeps the main branch stable and allows your work to be reviewed before it is merged.

---

## How often should I commit?

Commit whenever you've completed a meaningful piece of work.

Small, focused commits are easier to review and easier to undo if necessary.

---

## I forgot to run `git pull`. What should I do?

Run:

```bash
git pull
```

If Git reports a merge conflict, resolve the conflict before continuing. If you're unsure how to resolve it, ask another developer for assistance.

---

# 💻 Development Questions

## Do I need to run `npm install` every day?

No.

Only run `npm install` when:

- Setting up the project for the first time.
- New dependencies have been added to the project.
- The `node_modules` folder has been removed.

---

## Why isn't the website updating after I save a file?

Check that:

- `npm run dev` is still running.
- The file has been saved.
- Your browser has refreshed.

If the issue continues, try restarting the development server.

---

## Can I move files into different folders?

Only if there's a clear reason to do so.

Changing the project structure can affect other developers, so discuss significant reorganisations with the team first.

---

# 🗄 Database Questions

## Do I need to understand SQL?

Not immediately.

Prisma handles most interactions with the database using TypeScript.

Learning SQL is still recommended as you become more experienced.

---

## Can I edit the production database?

No.

Always test database changes locally first.

Production changes should follow your team's deployment process.

---

## Should I delete old migration files?

No.

Migration history should remain in the repository unless the team has agreed to remove or replace it.

---

# 🔐 Security Questions

## Should I upload my `.env` file?

No.

The `.env` file contains sensitive information and should never be committed to GitHub.

---

## Can I share database credentials with another developer?

Only through approved internal methods and only if you're authorised to do so.

Never post credentials in public chats, emails, or GitHub repositories.

---

# 🧰 General Questions

## Where should I add a new page?

Most pages belong in:

```text
src/app/
```

See the **Project Structure Guide** for more information.

---

## Where should reusable UI components go?

Reusable components belong in:

```text
src/components/
```

---

## Where should helper functions go?

Shared helper functions usually belong in:

```text
src/lib/
```

---

## Where should business logic go?

Business logic is typically stored in:

```text
src/services/
```

---

## What should I do if I don't understand something?

Ask.

It's always better to ask a question than to make changes you're unsure about.

Software development is a collaborative process, and everyone benefits when questions are shared and answered.

---

# 📚 Documentation Map

If you need more detailed information, refer to the appropriate guide.

| Guide | Covers |
|--------|--------|
| `README.md` | Project overview and documentation links |
| `01-Developer-Setup.md` | Installing and configuring the project |
| `02-Daily-Workflow.md` | Daily development routine |
| `03-Git-Workflow.md` | Using Git and GitHub |
| `04-Project-Structure.md` | Understanding the project layout |
| `05-Database-Guide.md` | Prisma and Supabase |
| `06-VS-Code-Guide.md` | Working in Visual Studio Code |
| `07-Common-Commands.md` | Frequently used terminal commands |
| `08-Troubleshooting.md` | Solving common issues |
| `09-Development-Rules.md` | Team standards and best practices |

---

# 🎉 Congratulations!

You've reached the end of the documentation.

You now have everything you need to:

- Set up the project.
- Understand the project structure.
- Work with Git.
- Run the application locally.
- Work with the database.
- Follow the team's development standards.
- Troubleshoot common issues.

Welcome to the project, and happy coding! 🚀