/**
 * High-Performance DOM Rendering Engine for Data Wizard Hub Cards
 * Neutral Standard Code styling (Slate/Indigo-Grey) vs Smart Wizard (Glowing Emerald)
 */

import { isBookmarked, toggleBookmark } from './bookmarkStore.js';
import { copyToClipboard, showToast } from './utils.js';

const MODULE_BADGE_HTML = {
  python: '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-yellow-950/40 text-yellow-300 border border-yellow-800/40"><i data-lucide="code-2" class="w-3.5 h-3.5 text-yellow-400"></i> Python</span>',
  numpy: '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-950/40 text-blue-300 border border-blue-800/40"><i data-lucide="binary" class="w-3.5 h-3.5 text-blue-400"></i> NumPy</span>',
  pandas: '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-cyan-950/40 text-cyan-300 border border-cyan-800/40"><i data-lucide="table-properties" class="w-3.5 h-3.5 text-cyan-400"></i> Pandas</span>',
  matplotlib: '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-800/40"><i data-lucide="bar-chart-3" class="w-3.5 h-3.5 text-emerald-400"></i> Matplotlib</span>',
  sql: '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-950/40 text-purple-300 border border-purple-800/40"><i data-lucide="database" class="w-3.5 h-3.5 text-purple-400"></i> SQL</span>'
};

const LEVEL_CLASSES = {
  'Beginner': 'bg-cyan-950/60 text-cyan-400 border-cyan-800/60',
  'Intermediate': 'bg-indigo-950/60 text-indigo-400 border-indigo-800/60',
  'Pro Wizard': 'bg-purple-950/60 text-amber-300 border-amber-500/40'
};

export function renderCards(container, items) {
  container.innerHTML = '';

  if (!items || items.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-400 glass-card rounded-2xl p-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/80 mb-4 text-indigo-400">
          <i data-lucide="sparkles" class="w-8 h-8"></i>
        </div>
        <h3 class="text-xl font-semibold text-slate-200 mb-2">No Wizard Tricks Found</h3>
        <p class="text-sm text-slate-400 max-w-md mx-auto">Try clearing your search query or selecting a different tech stack filter.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  const fragment = document.createDocumentFragment();

  items.forEach(item => {
    const card = createCardElement(item);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);

  // Scoped Highlighting & Icons
  if (window.Prism) {
    const codeBlocks = container.querySelectorAll('code[class*="language-"]');
    codeBlocks.forEach(codeEl => window.Prism.highlightElement(codeEl));
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function createCardElement(item) {
  const card = document.createElement('article');
  card.className = 'glass-card rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-between';
  card.dataset.id = item.id;

  const bookmarked = isBookmarked(item.id);
  const langClass = item.module === 'sql' ? 'language-sql' : 'language-python';
  const badgeHtml = MODULE_BADGE_HTML[item.module] || `<span class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300">${item.module}</span>`;

  card.innerHTML = `
    <div>
      <!-- Card Header -->
      <div class="flex items-start justify-between gap-3 mb-3">
        <div class="flex flex-wrap items-center gap-2">
          ${badgeHtml}
          <span class="px-2 py-0.5 text-[11px] font-medium rounded-lg border ${LEVEL_CLASSES[item.level] || 'bg-slate-800 text-slate-300'}">
            ${item.level}
          </span>
          <span class="text-xs text-slate-400 font-mono flex items-center gap-1">
            <i data-lucide="folder" class="w-3 h-3 text-slate-500"></i> ${escapeHtml(item.category)}
          </span>
        </div>
        <button class="bookmark-btn p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-amber-400 transition-colors focus:outline-none"
                aria-label="Bookmark ${escapeHtml(item.title)}" title="Bookmark trick">
          <i data-lucide="bookmark" class="w-4 h-4 ${bookmarked ? 'fill-amber-400 text-amber-400' : ''}"></i>
        </button>
      </div>

      <!-- Title & Tags -->
      <h3 class="text-base md:text-lg font-bold text-slate-100 mb-2 leading-snug">
        ${escapeHtml(item.title)}
      </h3>
      
      <div class="flex flex-wrap gap-1.5 mb-4">
        ${item.tags.map(tag => `<span class="text-[11px] font-mono text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/40">#${escapeHtml(tag)}</span>`).join('')}
      </div>

      <!-- Code Comparison Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-4">
        
        <!-- Standard / Traditional Code Box (Neutral Slate-Grey) -->
        <div class="rounded-xl border border-slate-700/70 bg-slate-900/90 overflow-hidden flex flex-col min-w-0">
          <div class="px-3 py-1.5 bg-slate-800/80 border-b border-slate-700/70 flex items-center justify-between text-xs font-medium text-slate-300">
            <span class="flex items-center gap-1.5 font-semibold text-slate-300">
              <i data-lucide="terminal" class="w-3.5 h-3.5 text-indigo-400"></i> Standard / Traditional
            </span>
            <button class="copy-naive-btn flex items-center gap-1 px-2 py-0.5 rounded bg-slate-700/60 hover:bg-slate-600/80 text-slate-200 text-[11px] transition-all active:scale-95 border border-slate-600/50"
                    aria-label="Copy standard code">
              <i data-lucide="copy" class="w-3 h-3 text-slate-300"></i>
              <span>Copy</span>
            </button>
          </div>
          <div class="p-1 flex-1 bg-slate-950/90 overflow-x-auto">
            <pre><code class="${langClass}">${escapeHtml(item.naive_code)}</code></pre>
          </div>
        </div>

        <!-- Smart Wizard Code Box (Glowing Emerald) -->
        <div class="rounded-xl border border-emerald-500/40 bg-emerald-950/20 overflow-hidden flex flex-col min-w-0">
          <div class="px-3 py-1.5 bg-emerald-950/60 border-b border-emerald-500/40 flex items-center justify-between text-xs font-medium text-emerald-300">
            <span class="flex items-center gap-1.5 font-semibold">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-emerald-400"></i> Smart Wizard
            </span>
            <button class="copy-wizard-btn flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-900/50 hover:bg-emerald-800/80 text-emerald-200 text-[11px] transition-all active:scale-95 border border-emerald-600/40"
                    aria-label="Copy wizard code">
              <i data-lucide="copy" class="w-3 h-3"></i>
              <span>Copy</span>
            </button>
          </div>
          <div class="p-1 flex-1 bg-slate-950/90 overflow-x-auto">
            <pre><code class="${langClass}">${escapeHtml(item.wizard_code)}</code></pre>
          </div>
        </div>

      </div>

      <!-- Hinglish Explainer Box -->
      <div class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 relative overflow-hidden">
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-cyan-500 to-emerald-500"></div>
        <h4 class="text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-1 flex items-center gap-1.5">
          <i data-lucide="lightbulb" class="w-3.5 h-3.5 text-amber-400"></i> Kyun Use Karein? (Hinglish Explainer)
        </h4>
        <p class="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
          ${escapeHtml(item.hinglish_explanation)}
        </p>
      </div>
    </div>
  `;

  // Attach Event Listeners
  const bookmarkBtn = card.querySelector('.bookmark-btn');
  bookmarkBtn.addEventListener('click', () => {
    const saved = toggleBookmark(item.id);
    const icon = bookmarkBtn.querySelector('i');
    if (saved) {
      icon.classList.add('fill-amber-400', 'text-amber-400');
      showToast(`Saved "${item.title}" to bookmarks!`, 'emerald');
    } else {
      icon.classList.remove('fill-amber-400', 'text-amber-400');
      showToast(`Removed from bookmarks`, 'rose');
    }
  });

  // 1-Click Copy Standard Code
  const copyNaiveBtn = card.querySelector('.copy-naive-btn');
  copyNaiveBtn.addEventListener('click', async () => {
    const success = await copyToClipboard(item.naive_code);
    if (success) {
      showToast('Standard code copied!', 'indigo');
      const span = copyNaiveBtn.querySelector('span');
      const originalText = span.textContent;
      span.textContent = '✓ Copied';
      setTimeout(() => span.textContent = originalText, 2000);
    }
  });

  // 1-Click Copy Wizard Code
  const copyWizardBtn = card.querySelector('.copy-wizard-btn');
  copyWizardBtn.addEventListener('click', async () => {
    const success = await copyToClipboard(item.wizard_code);
    if (success) {
      showToast('Wizard code copied!', 'emerald');
      const span = copyWizardBtn.querySelector('span');
      const originalText = span.textContent;
      span.textContent = '✓ Copied';
      setTimeout(() => span.textContent = originalText, 2000);
    }
  });

  return card;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
