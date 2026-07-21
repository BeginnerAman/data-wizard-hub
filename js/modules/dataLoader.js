/**
 * Asynchronous Data Loader module with in-memory caching
 */

const MODULES = ['python', 'numpy', 'pandas', 'matplotlib', 'sql'];
let cache = null;

export async function fetchAllTricks() {
  if (cache) return cache;

  try {
    const promises = MODULES.map(module =>
      fetch(`./data/${module}-tricks.json`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status} for ${module}`);
          return res.json();
        })
        .catch(err => {
          console.error(`Error loading ${module} tricks:`, err);
          return [];
        })
    );

    const results = await Promise.all(promises);
    cache = results.flat();
    return cache;
  } catch (error) {
    console.error('Failed to load datasets:', error);
    return [];
  }
}

export function clearCache() {
  cache = null;
}
