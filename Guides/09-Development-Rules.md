# ✅ Development Rules & Best Practices

# 📖 Introduction

Developing software is a team effort.

Following the same standards makes the project easier to maintain, reduces bugs, and allows developers to understand each other's work more easily.

These guidelines are not about restricting developers—they're about keeping the project consistent and making collaboration easier for everyone.

---

# 🌿 Git Rules

## Always Pull Before You Start

Before writing any code, run:

```bash
git pull
```

### Why?

Other developers may have updated the project since the last time you worked.

Starting with the latest version reduces the chance of merge conflicts.

---

## Always Work on a Feature Branch

Never develop directly on the `main` branch.

Instead, create a new branch for every task.

Example:

```bash
git checkout -b feature/add-dashboard
```

### Why?

Feature branches isolate your work and allow it to be reviewed before becoming part of the main project.

---

## Commit Frequently

Create commits whenever you've completed a logical piece of work.

Good examples:

- Finished a new page
- Fixed a bug
- Updated documentation
- Completed a feature

Avoid waiting until the end of the day to create one large commit.

Small commits are easier to review and easier to undo if something goes wrong.

---

## Write Meaningful Commit Messages

Your commit message should describe **what changed**.

Good examples:

```text
Added user dashboard

Fixed login validation

Updated film submission form
```

Avoid:

```text
Changes

Update

Stuff

Test
```

---

# 💻 Coding Standards

## Keep Your Code Readable

Write code that another developer can understand.

Good code is not just code that works—it should also be easy to read and maintain.

---

## Reuse Existing Components

Before creating a new component, check whether a similar one already exists.

Reusing components keeps the application consistent and reduces duplicate code.

---

## Keep Functions Focused

Each function should perform one clear task.

Large functions are harder to understand, test, and maintain.

---

## Use Meaningful Names

Variable and function names should describe what they represent.

Good examples:

```text
userProfile

filmSubmission

calculateScore
```

Avoid:

```text
x

data1

temp

thing
```

---

## Let Prettier Format Your Code

Don't manually adjust spacing or indentation to match personal preferences.

Use the project's formatting rules so every file has a consistent style.

---

# 🗄 Database Rules

## Never Edit the Production Database Directly

Always test database changes locally before they reach production.

Direct edits can lead to unexpected issues or data loss.

---

## Only Create Migrations When Needed

Changing the database affects the entire team.

Only create migrations when you've intentionally modified the database schema.

---

## Never Commit Your `.env` File

The `.env` file contains sensitive information such as:

- Database credentials
- API keys
- Secret configuration values

These should never be uploaded to GitHub.

---

# 🧪 Testing

Before committing your work, verify that:

- The application starts successfully.
- Your changes work as expected.
- Existing functionality still works.
- No new errors appear in the terminal or browser.

Never assume code works without testing it.

---

# 🤝 Working as a Team

## Communicate

If you're making significant changes that may affect other developers, let the team know.

Communication helps avoid duplicated work and unexpected conflicts.

---

## Ask Questions

If you're unsure about something, ask.

It's better to clarify before making changes than to spend hours fixing avoidable mistakes.

---

## Review Existing Code

Before writing new code, look at how similar features have already been implemented.

Following existing patterns keeps the project consistent.

---

# 📋 Before You Push

Before uploading your work, check the following:

- [ ] I pulled the latest changes before starting.
- [ ] My work is on a feature branch.
- [ ] The project still runs correctly.
- [ ] I tested my changes.
- [ ] My commit message clearly describes my work.
- [ ] I did not commit my `.env` file.
- [ ] I am confident my changes are ready for review.

---

# 🚫 Things to Avoid

Avoid these common mistakes:

- Pushing directly to `main`
- Committing unfinished work without explanation
- Leaving commented-out code
- Uploading passwords or secrets
- Creating unnecessary duplicate components
- Ignoring warnings or errors
- Making large unrelated changes in a single commit

---

# 🎯 Our Goal

Every contribution should leave the project in a better state than it was before.

That doesn't always mean adding new features.

Sometimes improving documentation, fixing a bug, simplifying code, or cleaning up existing files is just as valuable.

Working consistently as a team helps ensure the project remains reliable, maintainable, and enjoyable to work on.

---

# 📚 Next Guide

You're almost finished!

The final guide answers the questions that new developers ask most often.

➡ **10-FAQ.md**