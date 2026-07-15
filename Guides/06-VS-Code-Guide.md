# 💻 Visual Studio Code Guide


# 📖 What is Visual Studio Code?

Visual Studio Code (VS Code) is the program used to write, edit, and manage the code for the Submissions Platform.

Think of it as your primary workspace.

Almost everything you do during development—editing files, running commands, viewing errors, and using Git—will happen inside VS Code.

---

# Opening the Project

If the project isn't already open:

1. Open Visual Studio Code.
2. Select **File → Open Folder**.
3. Navigate to your `submissions-platform` folder.
4. Click **Select Folder**.

### Expected Result

The project opens and you'll see the project folders in the **Explorer** panel on the left.

---

# Understanding the VS Code Layout

When you first open the project, you'll notice several areas of the interface.

## 📁 Explorer

The Explorer displays every folder and file in the project.

You'll use it to:

- Browse folders
- Open files
- Create new files
- Rename or delete files

This is where you'll spend most of your time navigating the project.

---

## ✏️ Editor

The editor is the large area in the center of the screen.

Whenever you open a file, it appears here.

You can have multiple files open at the same time using tabs.

---

## 💻 Terminal

The terminal allows you to run commands without leaving VS Code.

Open it by selecting:

**Terminal → New Terminal**

You'll use the terminal for commands such as:

```bash
npm run dev
git pull
git commit
npm install
```

---

## 🌿 Source Control

The Source Control panel is VS Code's built-in Git interface.

Click the branch icon on the left sidebar.

Here you can:

- View changed files
- Stage changes
- Write commit messages
- Commit changes
- Push to GitHub

If you're comfortable using the terminal, you can continue using Git commands instead.

---

## 🔍 Search

Instead of opening files one by one, use Search.

Shortcut:

```text
Ctrl + Shift + F
```

Search allows you to find:

- Text
- Variables
- Function names
- Component names
- Error messages

Searching the project is often much faster than manually browsing folders.

---

# Opening Multiple Files

VS Code allows you to have multiple files open simultaneously.

Simply click another file in the Explorer.

Each file opens as a tab across the top of the editor.

This makes it easy to compare files while working.

---

# Saving Your Work

Always save your changes regularly.

Shortcut:

```text
Ctrl + S
```

Although VS Code can automatically save files, manually saving is still good practice.

---

# Recommended Extensions

Extensions add extra functionality to VS Code.

The following extensions are recommended for this project.

| Extension | Purpose |
|-----------|---------|
| ESLint | Detects potential coding issues. |
| Prettier | Automatically formats your code. |
| Tailwind CSS IntelliSense | Autocompletes Tailwind CSS classes. |
| Prisma | Syntax highlighting for Prisma schema files. |
| GitLens | Provides additional Git information. |
| Error Lens *(Optional)* | Displays errors directly in the editor. |
| Path Intellisense *(Optional)* | Autocompletes file paths. |

To install extensions:

1. Click the **Extensions** icon.
2. Search for the extension name.
3. Click **Install**.

---

# Running the Project

Most development sessions begin by opening the terminal and running:

```bash
npm run dev
```

Leave the terminal open while working.

Closing it will stop the development server.

---

# Finding Files Quickly

Instead of browsing folders manually, press:

```text
Ctrl + P
```

Start typing the filename.

VS Code will instantly locate matching files.

This is one of the fastest ways to navigate large projects.

---

# Renaming Symbols

If you rename a variable, function, or component, VS Code can automatically update every reference.

Shortcut:

```text
F2
```

Whenever possible, use this feature instead of manually editing each occurrence.

---

# Useful Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + S` | Save current file |
| `Ctrl + P` | Find a file |
| `Ctrl + Shift + F` | Search the project |
| `Ctrl + /` | Comment or uncomment a line |
| `Alt + Shift + F` | Format the current file |
| `F2` | Rename a variable, function, or file reference |
| `Ctrl + \`` | Open or close the terminal |

Learning these shortcuts will significantly improve your productivity.

---

# Best Practices

- Keep the Explorer organised.
- Save your work regularly.
- Keep the terminal open while developing.
- Install the recommended extensions.
- Read warnings shown by ESLint.
- Let Prettier format your code.
- Use Search instead of manually browsing large folders.

---

# Common Questions

### Why are some words underlined in red?

Usually because of:

- A spelling mistake.
- A coding error.
- Missing imports.
- Incorrect syntax.

Hover your mouse over the underline to see the explanation.

---

### Why doesn't my code look like everyone else's?

The project uses **Prettier** to automatically format code.

Run:

```text
Alt + Shift + F
```

or save the file if Format on Save is enabled.

---

### Why can't I see the terminal?

Open it from:

**Terminal → New Terminal**

or press:

```text
Ctrl + `
```

---

# 📚 Next Guide

Now that you're comfortable using Visual Studio Code, it's time to learn the commands you'll use most often during development.

➡ **07-Common-Commands.md**

---

## Need Help?

If VS Code isn't behaving as expected or you can't start the project, see:

➡ **08-Troubleshooting.md**