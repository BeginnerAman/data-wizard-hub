/**
 * Main Controller Application for Data Wizard Hub
 * Manages 3-Tab Layout: Browser, Random Flashcards, and Roadmaps
 */

import { fetchAllTricks } from './modules/dataLoader.js';
import { getBookmarks, getTheme, setTheme } from './modules/bookmarkStore.js';
import { filterTricks } from './modules/searchEngine.js';
import { renderCards } from './modules/renderEngine.js';
import { copyToClipboard, showToast } from './modules/utils.js';

class DataWizardApp {
  constructor() {
    this.allTricks = [];
    this.searchDebounceTimer = null;
    this.state = {
      activeTab: 'browser', // 'browser', 'flashcard', 'roadmaps'
      activeModule: 'all',
      searchQuery: '',
      showBookmarksOnly: false,
      bookmarks: getBookmarks(),
      activeSubRoadmap: 'analyst' // 'analyst', 'scientist'
    };

    this.initElements();
    this.initTheme();
    this.bindEvents();
    this.start();
  }

  initElements() {
    // Layout Tab elements
    this.tabBrowserBtn = document.getElementById('btn-tab-browser');
    this.tabFlashcardBtn = document.getElementById('btn-tab-flashcard');
    this.tabRoadmapsBtn = document.getElementById('btn-tab-roadmaps');

    // Layout Containers
    this.browserView = document.getElementById('browser-view');
    this.flashcardView = document.getElementById('flashcard-view');
    this.roadmapsView = document.getElementById('roadmaps-view');

    // Header filters/search to toggle visibility
    this.headerSearchBar = document.getElementById('header-search-bar');
    this.headerNavFilters = document.getElementById('header-nav-filters');

    // Browser components
    this.container = document.getElementById('tricks-grid');
    this.searchInput = document.getElementById('search-input');
    this.clearSearchBtn = document.getElementById('clear-search-btn');
    this.navContainer = document.querySelector('nav[aria-label="Tech stack filters"]');
    this.modulePills = document.querySelectorAll('.module-pill');
    this.bookmarkTabBtn = document.getElementById('bookmark-tab-btn');
    this.bookmarkCountBadge = document.getElementById('bookmark-count-badge');
    this.themeToggleBtn = document.getElementById('theme-toggle-btn');
    this.tricksCounterText = document.getElementById('tricks-counter-text');

    // Flashcard components
    this.flashcardContainer = document.getElementById('flashcard-card-container');
    this.nextFlashcardBtn = document.getElementById('btn-next-flashcard');

    // Roadmap components
    this.subAnalystBtn = document.getElementById('btn-sub-analyst');
    this.subScientistBtn = document.getElementById('btn-sub-scientist');
    this.roadmapAnalyst = document.getElementById('roadmap-analyst-container');
    this.roadmapScientist = document.getElementById('roadmap-scientist-container');
  }

  initTheme() {
    const currentTheme = getTheme();
    setTheme(currentTheme);
  }

  bindEvents() {
    // 1. Main Tab Switching Event Listeners
    this.tabBrowserBtn?.addEventListener('click', () => this.switchTab('browser'));
    this.tabFlashcardBtn?.addEventListener('click', () => this.switchTab('flashcard'));
    this.tabRoadmapsBtn?.addEventListener('click', () => this.switchTab('roadmaps'));

    // 2. Debounced Search Input
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        const value = e.target.value;
        if (this.clearSearchBtn) {
          this.clearSearchBtn.classList.toggle('hidden', !value);
        }

        clearTimeout(this.searchDebounceTimer);
        this.searchDebounceTimer = setTimeout(() => {
          this.state.searchQuery = value;
          this.scheduleRender();
        }, 120);
      });
    }

    if (this.clearSearchBtn) {
      this.clearSearchBtn.addEventListener('click', () => {
        this.searchInput.value = '';
        this.state.searchQuery = '';
        this.clearSearchBtn.classList.add('hidden');
        this.searchInput.focus();
        this.scheduleRender();
      });
    }

    // Keyboard Shortcuts (Ctrl+K)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.switchTab('browser');
        this.searchInput?.focus();
      }
    });

    // 3. Event Delegation for Tech Stack Pills (Handles clicks on icon SVG & text span)
    if (this.navContainer) {
      this.navContainer.addEventListener('click', (e) => {
        const pill = e.target.closest('.module-pill');
        if (!pill) return;

        const module = pill.dataset.module;
        if (module) {
          this.state.activeModule = module;
          this.state.showBookmarksOnly = false;
          this.updatePillStyles();
          this.scheduleRender();
        }
      });
    }

    // 4. Bookmark Filter Tab
    if (this.bookmarkTabBtn) {
      this.bookmarkTabBtn.addEventListener('click', () => {
        this.state.showBookmarksOnly = !this.state.showBookmarksOnly;
        this.bookmarkTabBtn.classList.toggle('bg-amber-500/20', this.state.showBookmarksOnly);
        this.bookmarkTabBtn.classList.toggle('border-amber-500/50', this.state.showBookmarksOnly);
        this.bookmarkTabBtn.classList.toggle('text-amber-300', this.state.showBookmarksOnly);
        this.updatePillStyles();
        this.scheduleRender();
      });
    }

    // 5. Bookmark Sync Event
    window.addEventListener('dwh:bookmarks-changed', () => {
      this.state.bookmarks = getBookmarks();
      this.updateBookmarkBadge();
      if (this.state.showBookmarksOnly && this.state.activeTab === 'browser') {
        this.scheduleRender();
      }
    });

    // 6. Theme Switcher
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => {
        const nextTheme = getTheme() === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
      });
    }

    // 7. Flashcard Roll Event
    this.nextFlashcardBtn?.addEventListener('click', () => this.rollFlashcard());

    // 8. Roadmap Sub-tabs Switching
    this.subAnalystBtn?.addEventListener('click', () => this.switchSubRoadmap('analyst'));
    this.subScientistBtn?.addEventListener('click', () => this.switchSubRoadmap('scientist'));

    // 9. Roadmap Blueprint Code Copy Buttons
    document.querySelectorAll('.btn-copy-blueprint').forEach(btn => {
      btn.addEventListener('click', async () => {
        const targetId = btn.dataset.target;
        const codeElement = document.getElementById(targetId);
        if (codeElement) {
          const success = await copyToClipboard(codeElement.textContent);
          if (success) {
            showToast('Blueprint code copied!', 'emerald');
            const span = btn.querySelector('span');
            const originalText = span.textContent;
            span.textContent = '✓ Copied';
            setTimeout(() => span.textContent = originalText, 2000);
          }
        }
      });
    });
  }

  switchTab(tabName) {
    this.state.activeTab = tabName;

    // Toggle active style configurations on Tabs
    const activeClass = 'bg-indigo-600 text-white shadow-lg font-semibold';
    const inactiveClass = 'text-slate-400 hover:text-slate-200 font-medium';

    [
      { btn: this.tabBrowserBtn, name: 'browser' },
      { btn: this.tabFlashcardBtn, name: 'flashcard' },
      { btn: this.tabRoadmapsBtn, name: 'roadmaps' }
    ].forEach(item => {
      if (item.btn) {
        const isSel = item.name === tabName;
        item.btn.className = `flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs md:text-sm transition-all cursor-pointer ${isSel ? activeClass : inactiveClass}`;
      }
    });

    // Toggle view containers visibility
    this.browserView?.classList.toggle('hidden', tabName !== 'browser');
    this.browserView?.classList.toggle('block', tabName === 'browser');

    this.flashcardView?.classList.toggle('hidden', tabName !== 'flashcard');
    this.flashcardView?.classList.toggle('block', tabName === 'flashcard');

    this.roadmapsView?.classList.toggle('hidden', tabName !== 'roadmaps');
    this.roadmapsView?.classList.toggle('block', tabName === 'roadmaps');

    // Hide search inputs/pills in non-browser views to keep interface clean
    const isBrowser = tabName === 'browser';
    this.headerSearchBar?.classList.toggle('hidden', !isBrowser);
    this.headerNavFilters?.classList.toggle('hidden', !isBrowser);

    if (tabName === 'flashcard') {
      this.rollFlashcard();
    } else if (tabName === 'roadmaps') {
      // Highlight roadmaps code syntax
      if (window.Prism) {
        document.querySelectorAll('#roadmaps-view code[class*="language-"]').forEach(codeEl => {
          window.Prism.highlightElement(codeEl);
        });
      }
    }

    this.scheduleRender();
  }

  switchSubRoadmap(subName) {
    this.state.activeSubRoadmap = subName;

    const activeSubStyle = 'bg-slate-800 text-slate-200 border border-slate-700/50 shadow font-semibold';
    const inactiveSubStyle = 'text-slate-400 hover:text-slate-200 font-medium';

    if (this.subAnalystBtn && this.subScientistBtn) {
      const isAnalyst = subName === 'analyst';
      this.subAnalystBtn.className = `flex-1 py-1.5 px-3 rounded-lg text-xs transition-all cursor-pointer ${isAnalyst ? activeSubStyle : inactiveSubStyle}`;
      this.subScientistBtn.className = `flex-1 py-1.5 px-3 rounded-lg text-xs transition-all cursor-pointer ${!isAnalyst ? activeSubStyle : inactiveSubStyle}`;
    }

    this.roadmapAnalyst?.classList.toggle('hidden', subName !== 'analyst');
    this.roadmapAnalyst?.classList.toggle('block', subName === 'analyst');

    this.roadmapScientist?.classList.toggle('hidden', subName !== 'scientist');
    this.roadmapScientist?.classList.toggle('block', subName === 'scientist');
  }

  rollFlashcard() {
    if (!this.allTricks || this.allTricks.length === 0) return;

    // Pick random item from dataset
    const randomIndex = Math.floor(Math.random() * this.allTricks.length);
    const randomItem = this.allTricks[randomIndex];

    if (this.flashcardContainer) {
      renderCards(this.flashcardContainer, [randomItem]);
    }
  }

  updatePillStyles() {
    this.modulePills.forEach(pill => {
      const isSelected = pill.dataset.module === this.state.activeModule && !this.state.showBookmarksOnly;
      if (isSelected) {
        pill.className = 'module-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-semibold bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/50 transition-all cursor-pointer';
      } else {
        pill.className = 'module-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-all cursor-pointer';
      }
    });

    if (this.bookmarkTabBtn && !this.state.showBookmarksOnly) {
      this.bookmarkTabBtn.classList.remove('bg-amber-500/20', 'border-amber-500/50', 'text-amber-300');
    }
  }

  updateBookmarkBadge() {
    if (this.bookmarkCountBadge) {
      this.bookmarkCountBadge.textContent = this.state.bookmarks.length;
    }
  }

  async start() {
    this.allTricks = await fetchAllTricks();
    this.updateBookmarkBadge();
    this.scheduleRender();
  }

  scheduleRender() {
    window.requestAnimationFrame(() => {
      this.render();
    });
  }

  render() {
    if (this.state.activeTab !== 'browser') return;

    const filtered = filterTricks(this.allTricks, this.state);
    renderCards(this.container, filtered);

    if (this.tricksCounterText) {
      if (this.state.showBookmarksOnly) {
        this.tricksCounterText.textContent = `Showing ${filtered.length} Bookmarked Tricks`;
      } else if (this.state.activeModule !== 'all') {
        const moduleNames = {
          python: 'Python',
          numpy: 'NumPy',
          pandas: 'Pandas',
          matplotlib: 'Matplotlib',
          sql: 'SQL'
        };
        const name = moduleNames[this.state.activeModule] || this.state.activeModule;
        this.tricksCounterText.textContent = `Showing ${filtered.length} ${name} Tricks`;
      } else if (this.state.searchQuery.trim()) {
        this.tricksCounterText.textContent = `Showing ${filtered.length} Matching Tricks`;
      } else {
        this.tricksCounterText.textContent = `Showing ${filtered.length} of ${this.allTricks.length} Pro Tricks`;
      }
    }
  }
}

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  new DataWizardApp();
});
