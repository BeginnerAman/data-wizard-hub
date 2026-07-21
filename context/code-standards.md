# Code Standards & Design Conventions: Data Wizard Hub

## Overview
To maintain high code quality, speed, and standard aesthetics across Data Wizard Hub, all code contributions must follow strict vanilla JavaScript, HTML5, CSS, and JSON formatting guidelines.

---

## JavaScript (ES6+ Native Modules)

### Naming Conventions
- **Files & Directories**: `kebab-case.js` (e.g., `data-loader.js`, `search-engine.js`).
- **Classes**: `PascalCase` (e.g., `BookmarkManager`, `RenderEngine`).
- **Functions & Variables**: `camelCase` (e.g., `fetchTricks()`, `activeModuleFilter`).
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `DEFAULT_THEME`, `MAX_RESULTS`).

### Syntax & Patterns
1. **ES6 Module Standard**: Always export named functions or classes. Never leak global variables to `window`.
2. **Async/Await Handling**: Use `try/catch` blocks for all asynchronous operations (e.g., loading JSON data).
3. **Immutability First**: Use `const` by default; only use `let` when reassigning state variables. Never use `var`.
4. **DOM Manipulations**: Use `document.createElement()` or template literals wrapped in safe sanitizers before inserting HTML.

```javascript
// Good Example (ES6 Module)
export async function loadModuleData(moduleName) {
  try {
    const response = await fetch(`./data/${moduleName}-tricks.json`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to load data for module ${moduleName}:`, error);
    return [];
  }
}
```

---

## HTML5 & Accessibility (a11y)

1. **Semantic Structure**: Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` appropriately.
2. **Interactive Elements**: Buttons must always use `<button>` tags with visible label or `aria-label` attribute for screen readers.
3. **Code Accessibility**: Code blocks must be enclosed within `<pre><code class="language-python">...</code></pre>` for Prism.js parser compatibility.
4. **Theme Toggles**: Ensure contrast ratios strictly pass WCAG AA standards in both Dark and Light modes.

---

## CSS & Tailwind Standards

1. **Tailwind First**: Use Tailwind utility classes directly in DOM structure templates for styling.
2. **Custom Overrides**: Keep `styles.css` strictly for:
   - Prism syntax highlighter overrides.
   - Custom scrollbar styling.
   - Custom glassmorphism or backdrop-filter utility classes.
3. **Color Palette Mapping**:
   - Backgrounds: Dark Obsidian (`#0B0F19` / `bg-slate-950`), Card Surface (`bg-slate-900/80`).
   - Text Colors: Primary (`text-slate-100`), Muted (`text-slate-400`).
   - Accents: Emerald/Cyan (`text-emerald-400`, `border-emerald-500/30`) for Wizard code; Rose/Amber (`text-rose-400`) for Naive code.

---

## JSON Data Formatting Rules

Every static dataset file inside `/data/*.json` MUST follow these strict formatting guidelines:

1. **Clean Escaping**: Newlines in multi-line code string fields must use standard `\n` escaping.
2. **Hinglish Explainer Tone**: Must maintain professional, encouraging Hinglish tone emphasizing practical utility.
3. **AI Prompt Quality**: The `ai_prompt` must be a high-leverage ready-to-use prompt designed to copy directly into ChatGPT/Claude.

### Valid JSON Sample:
```json
{
  "id": "pd-001",
  "module": "pandas",
  "title": "Use df.query() for Ultra-Clean Filtering",
  "category": "Data Manipulation",
  "level": "Intermediate",
  "tags": ["pandas", "filtering", "clean-code", "speed"],
  "naive_code": "# Slow & Hard to read multi-condition filtering\nfiltered_df = df[(df['age'] > 25) & (df['salary'] > 50000) & (df['department'] == 'Tech')]",
  "wizard_code": "# Smart Wizard Query String\nfiltered_df = df.query('age > 25 and salary > 50000 and department == \"Tech\"')",
  "hinglish_explanation": "Jab Multiple conditions combine karni ho, toh bracketed indexing `df[(...)]` messy ho jaati hai. `df.query()` use karne se code SQL jaisa clean aur human-readable ban jata hai, plus lagbhag 15% fast execute hota hai memory optimization ki wajah se!",
  "ai_prompt": "Act as a Senior Python Data Engineer. Refactor the following pandas code to use df.query() with dynamic parameter variables using `@variable` syntax and demonstrate performance difference."
}
```
