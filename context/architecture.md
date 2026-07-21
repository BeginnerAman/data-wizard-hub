# Architecture & Technical Design: Data Wizard Hub

## System Architecture Overview
Data Wizard Hub operates as a **100% Static Single Page Application (SPA)** utilizing native browser capabilities. It eliminates server-side dependencies and build bundlers, relying on modern native ES6 modules for modular code execution.

```
[ Browser Client ]
       │
       ├─► index.html (Static HTML5 Skeleton + Tailwind & Prism CDN)
       │
       ├─► /js/app.js (ES6 Module Root & Router)
       │     ├─► /js/modules/dataLoader.js   (Fetch & Cache JSON Datasets)
       │     ├─► /js/modules/searchEngine.js (Client-side Fuzzy/Keyword Filtering)
       │     ├─► /js/modules/bookmarkStore.js (LocalStorage Management)
       │     └─► /js/modules/renderEngine.js (DOM Construction & Prism Highlights)
       │
       └─► /data/*.json (Static Data Stores: python, pandas, numpy, matplotlib, sql)
```

---

## Directory & File Structure

```
Data-Wizard-Hub/
│
├── index.html                  # Single Entrypoint Page
├── favicon.ico                 # App Favicon
│
├── css/
│   └── styles.css              # Custom CSS Overrides & Prism Dark Theme Tweaks
│
├── js/
│   ├── app.js                  # Main Application Controller
│   └── modules/
│       ├── dataLoader.js       # Asynchronous Data Fetcher with In-Memory Cache
│       ├── searchEngine.js     # Multi-field Search & Tag Filter Logic
│       ├── bookmarkStore.js    # LocalStorage CRUD Operations
│       ├── renderEngine.js     # Component Generator & Card DOM Renderer
│       └── utils.js            # Clipboard, Toast Notifications, & Helpers
│
├── data/                       # Modular Static JSON Content Engine
│   ├── python-tricks.json
│   ├── numpy-tricks.json
│   ├── pandas-tricks.json
│   ├── matplotlib-tricks.json
│   └── sql-tricks.json
│
└── context/                    # Architectural & AI Documentation Context
    ├── project-overview.md
    ├── architecture.md
    ├── code-standards.md
    ├── ui-context.md
    ├── ai-workflow-rules.md
    └── progress-tracker.md
```

---

## Static Data Engine & JSON Schema Specification

All trick items are stored as validated static JSON datasets inside the `/data/` folder. Every record strictly enforces the following schema:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "TrickItem",
  "type": "object",
  "required": [
    "id",
    "module",
    "title",
    "category",
    "level",
    "tags",
    "naive_code",
    "wizard_code",
    "hinglish_explanation",
    "ai_prompt"
  ],
  "properties": {
    "id": { "type": "string", "example": "py-001" },
    "module": { 
      "type": "string", 
      "enum": ["python", "numpy", "pandas", "matplotlib", "sql"] 
    },
    "title": { "type": "string" },
    "category": { "type": "string" },
    "level": { 
      "type": "string", 
      "enum": ["Beginner", "Intermediate", "Pro Wizard"] 
    },
    "tags": { 
      "type": "array", 
      "items": { "type": "string" } 
    },
    "naive_code": { "type": "string" },
    "wizard_code": { "type": "string" },
    "hinglish_explanation": { "type": "string" },
    "ai_prompt": { "type": "string" }
  }
}
```

---

## Component Data Flow & State Management

Data Wizard Hub uses a **Unidirectional Data Flow** powered by a lightweight PubSub/Event-driven state manager (`appState`).

```
[ Page Load / User Action ]
       │
       ▼
 [ User Input ] ──► (Filter Click / Search Input / Bookmark Toggle)
       │
       ▼
 [ State Update ] ──► Updates appState (activeModule, searchQuery, bookmarks)
       │
       ▼
 [ Data Filtering ] ──► searchEngine.filterData(allData, state)
       │
       ▼
 [ DOM Render ] ──► renderEngine.renderCards(filteredItems)
       │
       ▼
 [ Post-Render Trigger ] ──► Prism.highlightAll() & lucide.createIcons()
```

---

## Local Storage Strategy (Bookmarks & Preferences)

- **Key `dwh_bookmarks`**: Stores an array of trick IDs `["py-001", "pd-004", "sql-002"]`.
- **Key `dwh_theme`**: Stores `'dark'` or `'light'` mode user preference.
- **Sync Mechanism**: Every bookmark action mutates `localStorage` immediately and dispatches a custom event `dwh:bookmarks-updated` to keep the UI tabs in sync without page reloads.

---

## Performance & Hosting Strategy

1. **GitHub Pages Deployment**: Hosted entirely from the `main` branch root directory (`./`) or `/docs`.
2. **Zero Dependencies Bundling**: All scripts loaded as native ES Modules (`<script type="module" src="js/app.js">`).
3. **CDN Resource Allocation**:
   - Tailwind CSS: Minified CDN version (`cdn.tailwindcss.com`).
   - Prism.js: Minified JS + Tomorrow Night Theme CSS from cdnjs.
   - Lucide Icons: CDN bundle loaded globally.
4. **Caching & Asynchronous Loading**:
   - JSON datasets loaded concurrently via `Promise.all()` on application boot and cached in memory.
