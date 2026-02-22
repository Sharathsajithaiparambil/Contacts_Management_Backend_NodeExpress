# Running the Project - TypeScript vs JavaScript

## Quick Answer

- **Development**: Runs **TypeScript (.ts)** files directly using `ts-node`
- **Production**: Runs **compiled JavaScript (.js)** files from `dist/` folder

## Commands Explained

### 1. `npm run dev` 
**Runs: TypeScript files (.ts) directly**
```bash
npm run dev
# Executes: ts-node server.ts
```
- Runs `server.ts` directly (no compilation needed)
- Uses `ts-node` to execute TypeScript on-the-fly
- **Fast for development** - no build step required
- Changes are picked up manually (restart needed)

### 2. `npm run dev:watch` ⭐ **Recommended for Development**
**Runs: TypeScript files (.ts) directly with auto-reload**
```bash
npm run dev:watch
# Executes: nodemon --exec ts-node server.ts
```
- Runs `server.ts` directly using `ts-node`
- **Auto-reloads** when you change any `.ts` file
- Watches: `server.ts`, `config/`, `controllers/`, `middleware/`, `models/`, `routes/`, `types/`
- **Best for active development**

### 3. `npm run build`
**Compiles: TypeScript → JavaScript**
```bash
npm run build
# Executes: tsc (TypeScript compiler)
```
- Compiles all `.ts` files to `.js` files
- Output goes to `dist/` folder
- Creates: `dist/server.js`, `dist/controllers/`, etc.
- **Required before production**

### 4. `npm start`
**Runs: Compiled JavaScript files (.js) from dist/**
```bash
npm start
# Executes: node dist/server.js
```
- Runs the **compiled JavaScript** from `dist/server.js`
- Requires `npm run build` first
- **Used for production deployment**

## File Flow Diagram

```
Development:
  server.ts → ts-node → Runs directly (no compilation)

Production:
  server.ts → tsc (build) → dist/server.js → node → Runs
```

## Which Files Are Actually Used?

### During Development (`npm run dev` or `npm run dev:watch`)
✅ **Uses TypeScript files:**
- `server.ts`
- `controllers/*.ts`
- `models/*.ts`
- `middleware/*.ts`
- `routes/*.ts`
- `config/*.ts`

❌ **Ignores:**
- All `.js` files in root (old files)
- `dist/` folder (compiled output)

### During Production (`npm start`)
✅ **Uses compiled JavaScript files:**
- `dist/server.js`
- `dist/controllers/*.js`
- `dist/models/*.js`
- etc.

❌ **Ignores:**
- All `.ts` source files
- Old `.js` files in root

## Current Project State

You have **both** `.ts` and `.js` files:
- ✅ **TypeScript files (.ts)** - These are the active source files
- 📦 **Old JavaScript files (.js)** - Can be deleted (kept for reference)
- 📁 **dist/** folder - Contains compiled JavaScript (auto-generated)

## Recommendation

**For Development:**
```bash
npm run dev:watch
```
This runs TypeScript directly with auto-reload - perfect for coding!

**For Production:**
```bash
npm run build
npm start
```
This compiles TypeScript to JavaScript first, then runs the compiled version.

## Summary Table

| Command | Runs | Files Used | Auto-Reload |
|---------|------|------------|-------------|
| `npm run dev` | TypeScript | `.ts` files | ❌ No |
| `npm run dev:watch` | TypeScript | `.ts` files | ✅ Yes |
| `npm run build` | Compiles | `.ts` → `.js` | N/A |
| `npm start` | JavaScript | `dist/*.js` | ❌ No |

## Can I Delete Old .js Files?

**Yes!** The old `.js` files (like `server.js`, `controllers/*.js`, etc.) are no longer needed. They're just taking up space. The TypeScript files (`.ts`) are your source code now.

**Safe to delete:**
- `server.js`
- `constants.js`
- `controllers/*.js`
- `models/*.js`
- `middleware/*.js`
- `routes/*.js`
- `config/*.js`

**Keep:**
- All `.ts` files (your source code)
- `dist/` folder (auto-generated, but needed for production)

