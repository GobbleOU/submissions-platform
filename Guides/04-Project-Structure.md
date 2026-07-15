# 🏗 Project Structure


# 📖 Introduction

Every software project is organised into folders and files.

Understanding where things belong is just as important as understanding how to write code. A well-organised project makes it easier for developers to find files, fix bugs, and add new features.

This guide explains the purpose of each major folder in the Submissions Platform.

---

# 📂 Project Overview

```text
submissions-platform/

├── docs/
├── prisma/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── services/
│   └── types/
│
├── .env
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

Don't worry if some of these names are unfamiliar. Each section below explains what they do.

---

# 📁 The `src` Folder

The **src** (short for **source**) folder contains almost all of the application's code.

Whenever you add a new feature, fix a bug, or update the user interface, you'll usually be working somewhere inside this folder.

Think of it as the "main workspace" for the project.

---

# 📁 app/

The **app** folder contains the pages that make up the website.

Each page a user visits is typically defined here.

Examples include:

- Login page
- Dashboard
- Submission form
- Settings page

If you're creating a brand-new page, this is usually where you'll begin.

---

# 📁 components/

Components are reusable pieces of the user interface.

Instead of creating the same button or form multiple times, developers create it once and reuse it throughout the application.

Examples include:

- Buttons
- Navigation bars
- Cards
- Tables
- Forms
- Dialog boxes
- Modals

Using components keeps the project consistent and easier to maintain.

---

# 📁 services/

The **services** folder contains business logic.

Business logic is the code responsible for performing tasks behind the scenes.

Examples include:

- Retrieving data from the database
- Saving information
- Calling external APIs
- Processing user submissions
- Authentication

Most services don't display anything on the screen—they simply perform work for the application.

---

# 📁 lib/

The **lib** folder contains shared utilities and helper functions.

These are pieces of code that can be reused throughout the project.

Examples include:

- Database connections
- Utility functions
- Validation helpers
- Date formatting
- Configuration files

Rather than copying the same code into multiple places, it's stored here so everyone can reuse it.

---

# 📁 types/

This folder contains TypeScript type definitions.

Types help the editor understand what kind of data the application is working with.

For example, they describe what information belongs to a user, a submission, or another object.

Even if you're new to TypeScript, you'll eventually become familiar with these files as you work on the project.

---

# 📁 prisma/

This folder contains everything related to the project's database.

Examples include:

- Database schema
- Database migrations
- Generated database files

Whenever the database structure changes, this folder is usually updated.

More information can be found in the **Database Guide**.

---

# 📁 public/

The **public** folder stores static files.

These files can be accessed directly by the website.

Examples include:

- Images
- Logos
- Icons
- PDFs
- Downloadable files

Unlike code files, these assets are delivered directly to the user's browser.

---

# 📁 docs/

This folder contains the project's documentation.

Everything you're currently reading is stored here.

Keeping documentation inside the repository ensures it stays up to date alongside the code.

---

# 📄 package.json

The **package.json** file describes the project.

It tells Node.js:

- Which packages are required.
- Which scripts can be run.
- Project metadata.
- Version information.

Whenever you run commands like:

```bash
npm install

npm run dev
```

Node.js reads information from this file.

---

# 📄 .env

The **.env** file stores environment variables.

These include information such as:

- Database connection strings
- API keys
- Secret values

Because this information is sensitive, the `.env` file should **never** be uploaded to GitHub.

---

# 📄 README.md

The README is the project's homepage.

It provides:

- A project overview.
- Quick setup instructions.
- Links to documentation.

Whenever someone visits the repository, this is usually the first file they'll read.

---

# 💡 How Everything Works Together

A simplified view of the project looks like this:

```text
User
 │
 ▼
Pages (app)
 │
 ▼
Components
 │
 ▼
Services
 │
 ▼
Database (Prisma / Supabase)
```

Although many more things happen behind the scenes, this flow shows the general path a request follows through the application.

---

# 📋 Tips for New Developers

When working on a task, ask yourself:

- Am I creating a new page?
  → Look in `app/`

- Am I creating a reusable UI element?
  → Look in `components/`

- Am I working with the database?
  → Look in `prisma/`

- Am I writing helper functions?
  → Look in `lib/`

- Am I creating backend logic?
  → Look in `services/`

Knowing where code belongs keeps the project organised and makes it easier for everyone to collaborate.

---

# 📚 Next Guide

Now that you understand the project structure, it's time to learn how the database works.

➡ **05-Database-Guide.md**

---

## Need Help?

If you're unsure where new files should be placed, ask another developer before creating new folders or reorganising the project.