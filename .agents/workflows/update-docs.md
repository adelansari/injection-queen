---
description: How to update README.md and AGENTS.md when making project changes
---

# Update Documentation Skill

When you make structural changes to the project (new routes, new components, new data patterns, updated project structure), you MUST update the project documentation files to keep them in sync.

## Files to Update

### 1. `AGENTS.md` (root)

This is the **primary project documentation** that serves as agent context. It must accurately reflect:

- **Project Structure** tree (the `├──` ASCII tree)
- **Routing Structure** table (all routes with their components)
- **Treatment Data System** (interface definitions, adding instructions)
- **Category Landing Pages** documentation
- **File Naming** conventions
- **Any new features or patterns**

### 2. `README.md` (root)

This is the **public-facing project README**. It must accurately reflect:

- **Features** list
- **Tech Stack** table with current versions
- **URL Structure** table
- **Project Structure** tree
- **Adding Content** instructions (treatments, blog posts)
- **Design System** tokens
- **Environment Variables**

## When to Trigger

Update these files when any of the following changes occur:

1. **New routes added** → Update routing tables in both files
2. **New components or pages created** → Update project structure tree
3. **Treatment data structure changes** → Update interface docs and adding instructions
4. **New category or treatment type added** → Update category tables
5. **Dependencies added or updated** → Update tech stack table
6. **New environment variables** → Update env vars section
7. **Design system changes** → Update colors, fonts, utilities

## Steps

1. View the current `AGENTS.md` to understand what sections need updating
2. View the current `README.md` to understand what sections need updating
3. Make targeted edits to both files reflecting the changes
4. Verify no broken references or outdated information remains
5. Commit both files with descriptive messages

## Important Notes

- **Prices are NOT in treatment files** — `Prijzen.tsx` is the single source of truth
- **Treatment content is bilingual in data files** (not via i18n keys)
- **Category content is inline** in `CategoryDetail.tsx` using the `categoryContent` object
- Keep the ASCII project structure tree up to date when adding new directories or files
