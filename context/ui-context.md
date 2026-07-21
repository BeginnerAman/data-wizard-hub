# UI & UX Context Specification: Data Wizard Hub

## Design Vision & Aesthetics
Data Wizard Hub is crafted with a **modern, high-tech, futuristic obsidian design**. It emphasizes visual clarity, dark-mode elegance, and immediate accessibility. Users should feel like they are entering a high-leverage "Data Science Command Center."

---

## Visual Design System & Color Tokens

### Color Palette (Obsidian Theme)
- **Background Root**: `bg-slate-950` (`#0B0F19`)
- **Card Background**: `bg-slate-900/90` with backdrop glass effect `backdrop-blur-md`
- **Card Border**: `border-slate-800/80` with hover state `hover:border-indigo-500/50`
- **Accent Primary**: Vibrant Indigo (`#6366F1`) / Electric Cyan (`#06B6D4`)
- **Naive Code Highlight**: Dark Slate Red Header (`bg-rose-950/30`), Crimson Accent (`text-rose-400`), Soft Red Border (`border-rose-900/40`).
- **Wizard Code Highlight**: Glowing Emerald Header (`bg-emerald-950/30`), Mint Green Accent (`text-emerald-400`), Emerald Border (`border-emerald-500/40`).
- **Badge Styling**:
  - `Beginner`: Soft Cyan badge (`bg-cyan-950/50 text-cyan-400 border-cyan-800`)
  - `Intermediate`: Indigo badge (`bg-indigo-950/50 text-indigo-400 border-indigo-800`)
  - `Pro Wizard`: Purple/Amber gradient glow badge (`bg-purple-950/50 text-amber-300 border-amber-500/40`)

---

## Key Page Components & Wireframe Layout

### 1. Navigation Header (`<header>`)
- **Logo & Title**: Glowing Wizard Hat Icon + "Data Wizard Hub" (Gradient text: `from-indigo-400 via-cyan-400 to-emerald-400`).
- **Global Search Bar**: Instant real-time filter input with magnifying glass Lucide icon and clear shortcut (`Ctrl + K`).
- **Bookmark Filter Counter**: Quick toggle tab `[ 🔖 Bookmarked (0) ]`.
- **Theme Switcher**: Dark/Light mode toggle button.

### 2. Module Filter Navigation Pills (`<nav>`)
Horizontal scrolling pills allowing users to instantly select target technology stacks:
- `All Stack` | `🐍 Python Core` | `🔢 NumPy` | `🐼 Pandas` | `📊 Matplotlib` | `🗄️ SQL`

### 3. Trick Item Card (`<article class="trick-card">`)

```
┌────────────────────────────────────────────────────────────────────────┐
│  [ 🐼 PANDAS ]  [ Pro Wizard ]  Use df.query() for Clean Filtering     │
│  Tags: #pandas #filtering #speed                                🔖 Bookmark │
├────────────────────────────────────────────────────────────────────────┤
│  🔴 NAIVE / TRADITIONAL WAY                       [ 📋 Copy ]           │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ filtered_df = df[(df['age'] > 25) & (df['salary'] > 50000)]       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  🟢 SMART WIZARD WAY                              [ 📋 Copy ]           │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ filtered_df = df.query('age > 25 and salary > 50000')            │  │
│  └──────────────────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────┤
│  💡 KYUN USE KAREIN? (HINGLISH EXPLAINER)                             │
│  Multi-condition filtering me bracketed syntax messy lagti hai.        │
│  df.query() se code clean, readable aur 15% fast hota hai!            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Micro-Interactions & Feedback UI

1. **Copy Code Action**:
   - On click: Button changes to `✓ Copied!` with emerald flash animation for 2 seconds.
   - Text copied: Exactly the clean `wizard_code` snippet.
2. **Copy Prompt Action**:
   - On click: Button turns `✓ Prompt Copied!` with indigo flash animation.
   - Generates toast notification at bottom-right corner: *"AI Prompt copied to clipboard! Paste into ChatGPT/Claude."*
3. **Bookmark Action**:
   - Toggles solid bookmark icon 🔖 with subtle scale keyframe animation. Updates counter dynamically.
4. **Instant Search & Filter Animation**:
   - Cards filter dynamically using smooth CSS opacity and transform transitions.

---

## Responsive Breakpoints
- **Mobile (`< 648px`)**: Single column stacked naive & wizard code snippets. Sticky top search bar.
- **Tablet (`648px - 1024px`)**: 1-column cards with responsive code blocks.
- **Desktop (`> 1024px`)**: 2-column or full-width structured side-by-side code comparisons.
