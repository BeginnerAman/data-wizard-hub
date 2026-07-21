/**
 * Client-Side Filtering & Search Engine
 * Sorted: Module Stack Order (Python -> Pandas -> NumPy -> SQL -> Matplotlib) & Level Order (Beginner -> Intermediate -> Pro Wizard)
 */

const MODULE_ORDER = {
  'python': 1,
  'pandas': 2,
  'numpy': 3,
  'sql': 4,
  'matplotlib': 5
};

const LEVEL_ORDER = {
  'Beginner': 1,
  'Intermediate': 2,
  'Pro Wizard': 3
};

export function filterTricks(allTricks, { activeModule = 'all', searchQuery = '', showBookmarksOnly = false, bookmarks = [] }) {
  let filtered = [...allTricks];

  // 1. Filter by Bookmarks tab
  if (showBookmarksOnly) {
    filtered = filtered.filter(item => bookmarks.includes(item.id));
  }

  // 2. Filter by Active Stack Module
  if (activeModule && activeModule.toLowerCase() !== 'all') {
    const targetModule = activeModule.toLowerCase().trim();
    filtered = filtered.filter(item => item.module && item.module.toLowerCase().trim() === targetModule);
  }

  // 3. Filter by Keyword Search Query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchCategory = item.category.toLowerCase().includes(query);
      const matchTags = item.tags.some(tag => tag.toLowerCase().includes(query));
      const matchExplanation = item.hinglish_explanation.toLowerCase().includes(query);
      const matchCode = item.wizard_code.toLowerCase().includes(query) || item.naive_code.toLowerCase().includes(query);

      return matchTitle || matchCategory || matchTags || matchExplanation || matchCode;
    });
  }

  // 4. Sort: In "All Stack" view, show Python first, then Pandas, NumPy, SQL, Matplotlib
  filtered.sort((a, b) => {
    if (activeModule === 'all') {
      const modA = MODULE_ORDER[a.module.toLowerCase()] || 99;
      const modB = MODULE_ORDER[b.module.toLowerCase()] || 99;
      if (modA !== modB) {
        return modA - modB;
      }
    }

    const rankA = LEVEL_ORDER[a.level] || 99;
    const rankB = LEVEL_ORDER[b.level] || 99;
    if (rankA !== rankB) {
      return rankA - rankB;
    }

    return a.id.localeCompare(b.id);
  });

  return filtered;
}
