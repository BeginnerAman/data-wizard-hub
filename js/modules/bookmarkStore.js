/**
 * LocalStorage Manager for Bookmarks & Preferences
 */

const STORAGE_KEY = 'dwh_bookmarks';
const THEME_KEY = 'dwh_theme';

export function getBookmarks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading bookmarks:', err);
    return [];
  }
}

export function isBookmarked(id) {
  const bookmarks = getBookmarks();
  return bookmarks.includes(id);
}

export function toggleBookmark(id) {
  const bookmarks = getBookmarks();
  const index = bookmarks.indexOf(id);
  let isSaved = false;

  if (index > -1) {
    bookmarks.splice(index, 1);
  } else {
    bookmarks.push(id);
    isSaved = true;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    window.dispatchEvent(new CustomEvent('dwh:bookmarks-changed', { detail: { bookmarks } }));
  } catch (err) {
    console.error('Error saving bookmark:', err);
  }

  return isSaved;
}

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'dark';
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
}
