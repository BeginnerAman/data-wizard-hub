# Data Wizard Hub (500+ Pro Tricks Engine & Production Blueprints)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python&logoColor=white)](https://www.python.org/)
[![Pandas 2.0+](https://img.shields.io/badge/Pandas-2.0%2B-150458?logo=pandas&logoColor=white)](https://pandas.pydata.org/)
[![NumPy](https://img.shields.io/badge/NumPy-Vectorized-013243?logo=numpy&logoColor=white)](https://numpy.org/)
[![SQL Windowing](https://img.shields.io/badge/SQL-Window%20Functions-CC292B?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

**Data Wizard Hub** is an ultra-fast, zero-dependency data science reference engine featuring **500 high-leverage tricks** across **Python, NumPy, Pandas, Matplotlib, and SQL**, coupled with spaced-repetition **Flashcards** and end-to-end **Production Masterclass Frameworks**.

---

## Key Overview

Traditional cheatsheets are full of basic syntax (`df.head()`, `df.describe()`). **Data Wizard Hub** focuses exclusively on **hidden gems, vectorized speedups, memory optimizations, and real-world production code** used by Senior Data Analysts & Machine Learning Engineers at top tech companies.

```
DATA WIZARD HUB AT A GLANCE
├── Python (100 Tricks)     -> Walrus operator, match-case, functools.lru_cache, itertools, structural pattern matching
├── NumPy (100 Tricks)      -> Vectorized broadcasting, np.select, strided arrays, memory views, fast math
├── Pandas (100 Tricks)     -> Query engine, eval numexpr, categorical downcasting, explode, transform, pipe
├── Matplotlib (100 Tricks) -> Subplot mosaics, custom colormaps, inset axes, locator formatting, high-DPI exports
└── SQL (100 Tricks)        -> Window functions (LAG, LEAD, NTILE), CTE hierarchies, PIVOT, recursive queries
```

---

## Features

- **500 Curated Production Tricks Engine**: 100 high-leverage snippets for every tech stack.
- **Side-by-Side Naive vs. Wizard Code**: Standard baseline vs. 10x faster/cleaner Smart Wizard alternatives.
- **Spaced-Repetition Flashcard Mode**: Interactive single-card random generator with rolling dice animations for daily memory retention.
- **10-Stage Real-World Data Analyst Blueprint**: End-to-end pipeline covering Pandas configuration, multi-source ingestion, relational join validation (`validate='many_to_one'`), IQR outlier capping, RFM segmentation, Pandas SQL windowing, and multi-tab Excel reporting (`pd.ExcelWriter`).
- **8-Stage Machine Learning Production Pipeline**: Leakage-free Scikit-Learn `ColumnTransformer` preprocessing, stratified splitting (`stratify=y`), 5-Fold cross-validation, `GridSearchCV` hyperparameter tuning, ROC-AUC diagnostics, and `joblib` binary serialization for cloud APIs.
- **Simple Hinglish Guides**: Concise **Kab & Kyun?** callouts explaining the exact business rationale behind every line of code.
- **Obsidian Dark Glassmorphism UI**: Built with Vanilla JavaScript ES6 and Tailwind CSS for instant 60fps responsiveness without heavy frameworks.

---

## 10-Stage Real-World Data Analyst Pipeline

```
END-TO-END DATA ANALYST PRODUCTION WORKFLOW
│
├── STAGE 1: Production Setup & Display Configuration (pd.set_option('display.max_columns', None))
├── STAGE 2: Multi-Source Ingestion (CSV Encodings, Multi-Tab Excel, SQL Warehouses, REST APIs & Parquet)
├── STAGE 3: Relational Data Merging & Join Validation (validate='many_to_one', indicator=True)
├── STAGE 4: Data Health Audit & Quality Assertions (Missing % tables & assert value constraints)
├── STAGE 5: Data Hygiene & Sanitization (Snake_case headers, symbol stripping $, %, , & datetime parsing)
├── STAGE 6: Outlier Capping & Missing Imputation (IQR Winsorization capping Q1, Q3, IQR & median fill)
├── STAGE 7: Advanced Feature Engineering & RFM Scoring (Datetime signals, np.select & Recency-Frequency-Monetary scoring)
├── STAGE 8: Pandas SQL Window Functions (Lead/Lag shift(), Partition rank(), cumsum() & moving averages)
├── STAGE 9: EDA, Pivoting & Cohort Analytics (Multi-metric agg(), 2D pivot matrices with grand totals)
└── STAGE 10: Production Exports & Multi-Sheet Excel Workbooks (pd.ExcelWriter multi-tab, to_clipboard, SQL & Parquet)
```

---

## 8-Stage Production Machine Learning Pipeline

```
END-TO-END MACHINE LEARNING LIFECYCLE
│
├── STAGE 1: Feature Matrix (X) & Target Vector (y) Isolation
├── STAGE 2: Crash-Proof Sklearn ColumnTransformers (StandardScaler & OneHotEncoder handle_unknown='ignore')
├── STAGE 3: Data-Leakage Safe Scikit-Learn Pipelines (Unified Pipeline bundling preprocessor + classifier)
├── STAGE 4: Stratified Train / Test Partitioning (80-20 split preserving target class ratio via stratify=y)
├── STAGE 5: Pipeline Fitting & 5-Fold Stratified Cross-Validation (cv=5 ROC-AUC evaluation)
├── STAGE 6: Automated Hyperparameter Tuning (GridSearchCV with 5-Fold CV ROC-AUC optimization)
├── STAGE 7: Model Diagnostic Metrics & ROC-AUC Evaluation (Classification reports & probability calibration)
└── STAGE 8: Production Serialization & Inference Script (joblib.dump() & real-time REST API scoring)
```

---

## Tech Stack & Architecture

- **Frontend**: Vanilla HTML5, JavaScript ES6 Modules, Tailwind CSS CDN
- **Icons**: Lucide SVG Vector Icons
- **Syntax Highlighting**: Prism.js (Tomorrow Night Theme)
- **Data Engine**: Asynchronous JSON Loader (`Promise.all()`) with reactive event bus
- **State Management**: LocalStorage for bookmarks and theme preferences
- **Performance**: Zero-bundle overhead, `requestAnimationFrame` debouncing, GPU-accelerated repaints (`contain: content`)

---

## Local Development & Quickstart

No complex Node/NPM build tools required! Serve the root directory with any HTTP server:

### Option 1: Python HTTP Server (Recommended)
```bash
git clone https://github.com/BeginnerAman/data-wizard-hub.git
cd data-wizard-hub
python -m http.server 8000
```
Open `http://localhost:8000` in your browser.

### Option 2: VS Code Live Server
1. Open the repository folder in **VS Code**.
2. Click **Go Live** via the Live Server extension.

---

## Topics & Keywords

- Aman Vishwakarma (BeginnerAman / AV / AK)
- Data Science Cheatsheet
- Python Tricks
- Pandas Speedups
- NumPy Vectorization
- Matplotlib Custom Plots
- SQL Window Functions
- Data Analyst Roadmap
- Machine Learning Pipeline
- Scikit-Learn ColumnTransformer
- Data Cleaning Framework
- RFM Customer Segmentation
- IQR Outlier Capping
- Joblib Model Deployment
- Data Science Tutorials

---

## Author & Credits

Created & Maintained by **Aman Vishwakarma** (**BeginnerAman** / **AV** / **AK**).

---

## License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

Made by **Aman Vishwakarma (BeginnerAman)** | Star this repository if it helped your data workflow.
