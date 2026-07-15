# 🗄 Database Guide

# 📖 What is a Database?

A database is where the application stores information.

Think of it as a digital filing cabinet.

Instead of saving information in Word documents or Excel spreadsheets, the application stores it inside a database so it can be searched, updated, and shared efficiently.

Examples of information stored in the database include:

- User accounts
- Login information
- Submissions
- Film information
- Settings
- Application data

Without a database, the application would "forget" everything every time it restarted.

---

# 📖 What is Supabase?

Supabase is the service that hosts our PostgreSQL database.

Instead of running a database on our own computers or servers, Supabase securely stores our data in the cloud.

The application communicates with Supabase whenever it needs to:

- Read information
- Save new information
- Update existing information
- Delete information

As developers, we usually don't interact directly with Supabase. Instead, we use Prisma.

---

# 📖 What is Prisma?

Prisma is an **Object Relational Mapper (ORM).**

That sounds complicated, but the idea is simple.

Normally, databases understand SQL.

Developers write JavaScript and TypeScript.

Prisma acts as the translator between your code and the database.

Instead of writing SQL queries manually, Prisma allows us to work with the database using TypeScript.

---

# 📂 Database Files

Most database-related files are located here:

```text
prisma/
```

Inside this folder you'll commonly find:

```text
prisma/

├── schema.prisma
└── migrations/
```

---

# 📄 schema.prisma

This file describes the structure of the database.

Think of it as the blueprint for every table, column, and relationship.

Examples include:

- Users
- Roles
- Submissions
- Categories

If you need to add a new field or create a new table, you'll usually begin here.

---

# 📁 migrations/

Whenever the database structure changes, Prisma creates a migration.

A migration is a set of instructions explaining how to safely update the database.

For example:

- Add a new table
- Rename a column
- Remove an old field
- Create a relationship

Rather than editing the database manually, developers create migrations so everyone stays in sync.

---

# 📖 What is a Migration?

Imagine building a house.

Changing the blueprint doesn't automatically rebuild the house.

The builders still need instructions explaining what changed.

A migration is those instructions.

It tells Prisma exactly how to update the database to match the latest schema.

---

# Creating a Migration

If you've changed the database schema, create a migration.

Run:

```bash
npx prisma migrate dev
```

Prisma will:

- Compare the current database with your schema.
- Generate a migration.
- Update your local database.
- Generate updated Prisma files.

Only create migrations when you've intentionally changed the database structure.

---

# Generating the Prisma Client

Sometimes Prisma needs to regenerate its client.

Run:

```bash
npx prisma generate
```

This updates Prisma's generated code so your application understands the latest database structure.

You don't usually need to run this manually after `prisma migrate dev`, but it's useful if you're troubleshooting or after pulling database changes from GitHub.

---

# Viewing the Database

Prisma includes a visual tool called **Prisma Studio**.

Open it by running:

```bash
npx prisma studio
```

A browser window will open showing the contents of your local database.

You can:

- Browse tables
- Search records
- Edit values (carefully)
- Delete records
- Create new records

This is much easier than writing SQL queries manually.

---

# Environment Variables

The application connects to the database using the `DATABASE_URL` stored in your `.env` file.

Example:

```text
DATABASE_URL="your_database_connection_string"
```

If this value is incorrect, the application won't be able to connect to the database.

Never share or upload this value publicly.

---

# ⚠ Important Rules

Follow these rules whenever working with the database.

### Never edit the production database directly.

Always test changes using your local development environment first.

---

### Never commit your `.env` file.

It contains sensitive information such as database credentials.

---

### Only create migrations when necessary.

Database changes affect the entire team.

Avoid creating unnecessary migrations.

---

### Review database changes carefully.

Small mistakes can cause data loss or application errors.

If you're unsure, ask another developer before changing the schema.

---

# Common Database Commands

| Command | Purpose |
|----------|---------|
| `npx prisma migrate dev` | Create and apply a database migration. |
| `npx prisma generate` | Generate the Prisma client. |
| `npx prisma studio` | Open Prisma Studio. |

---

# Frequently Asked Questions

### Why doesn't everyone just edit the database manually?

Because manual changes can't easily be shared with the rest of the team.

Migrations ensure everyone's database stays identical.

---

### Can I delete migration files?

No.

Migration history is important and should remain in the repository unless the team agrees otherwise.

---

### Do I need to understand SQL?

Not immediately.

Prisma handles most database operations for you.

Learning SQL is still valuable as you become a more experienced developer.

---

# 📚 Next Guide

Now that you understand the database, let's look at the main tool you'll use every day.

➡ **06-VS-Code-Guide.md**

---

## Need Help?

Having trouble connecting to the database?

See:

➡ **08-Troubleshooting.md**