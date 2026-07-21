# AI Workflow & Content Generation Rules: Data Wizard Hub

## Overview
This document defines the strict rules and guidelines for AI Agents (and human contributors) generating new content, code snippets, or features for **Data Wizard Hub**.

---

## 1. Content Philosophy & Selection Criteria

All tricks added to the datasets must focus on **Underground Utilities, Memory Savers, and High-Leverage Idioms**. Trivial tutorials (e.g., how to declare a list or simple `df.head()`) are STRICTLY FORBIDDEN.

### Focus Areas by Module:
- **Python**: `collections.Counter`, `collections.defaultdict`, `itertools.groupby/chain/product`, `zip(* matrix)` transpose, `dataclasses`, `__slots__` for memory optimization, `sys.getsizeof()`.
- **NumPy**: `np.select()`, `np.where()`, vectorized matrix logic, `np.c_` / `np.r_`, strided memory tricks, `np.einsum()`.
- **Pandas**: `df.query()`, `df.eval()`, `crosstab()`, memory-saving dtype conversions (`category`, `int32`), `pipe()`, `df.explode()`, `memory_usage(deep=True)`.
- **Matplotlib / Seaborn**: Clean minimalist themes (`sns.set_theme(style="ticks")`), removing top/right spines, subplots layout grids (`plt.subplots_constrained()`), preventing memory leaks with `plt.close()`.
- **SQL**: Window Functions (`ROW_NUMBER()`, `RANK()`, `LEAD()`, `LAG()`), `QUALIFY` clause, `COALESCE()`, `CASE WHEN` conditional aggregates, CTEs vs Subquery optimizations.

---

## 2. Standard Content Item Template (JSON)

When generating new JSON entries for `/data/*.json`, AI agents must populate all fields according to this exact standard:

```json
{
  "id": "{module-shortcode}-{number}",
  "module": "{python|numpy|pandas|matplotlib|sql}",
  "title": "{Catchy, Action-Oriented Title}",
  "category": "{Category Name}",
  "level": "{Beginner|Intermediate|Pro Wizard}",
  "tags": ["{tag1}", "{tag2}", "{tag3}"],
  "naive_code": "{Traditional / Slow / Verbose Code}",
  "wizard_code": "{Smart / Vectorized / Smart Shortcut Code}",
  "hinglish_explanation": "{Relatable Hinglish Breakdown Explaining WHY It's Better}",
  "ai_prompt": "{High-Leverage Ready-to-Use Prompt for ChatGPT / Claude}"
}
```

---

## 3. Hinglish Explanation Tone & Style Guidelines

- **Tone**: Energetic, practical, encouraging, and clear (like a senior tech mentor explaining a trick during pair programming).
- **Structure**:
  1. Identify the pain point of the naive approach.
  2. Explain what the wizard shortcut does under the hood.
  3. Highlight real-world impact (e.g., "RAM 80% bachaata hai", "code 10x fast execute hota hai", "SQL query clean ho jaati hai").
- **Language Blend**: Maintain technical English terms (`Dataframe`, `Vectorization`, `Memory Footprint`, `Index`, `Window Function`) mixed with conversational Hinglish structure.

---

## 4. Code Quality & Execution Guarantees

1. **Executable Syntax**: Every code snippet MUST be valid, syntactically correct Python (or SQL) code. No pseudocode allowed.
2. **Side-by-Side Clarity**: Naive code and Wizard code MUST solve the exact same problem so the user can easily see the direct comparison.
3. **No Unnecessary Imports**: Keep imports minimal and focused strictly on the standard library or primary module (`import pandas as pd`, `import numpy as np`, `import matplotlib.pyplot as plt`).

---

## 5. Development & File Editing Safety Rules

1. **No External Server Dependencies**: Do NOT introduce Node.js backend endpoints, API servers, or external build steps.
2. **GitHub Pages Compatibility**: Ensure all static paths are relative (`./data/...`, `./js/...`, `./css/...`) so the site functions seamlessly on subpath GitHub Pages URLs (`username.github.io/repository-name/`).
3. **Strict Validation**: Always parse generated JSON files using a JSON validator before committing to prevent static data loading failures.
