/**
 * Utility functions for Clipboard operations and Toast Notifications
 */

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
}

export function showToast(message, type = 'indigo') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bgColors = {
    indigo: 'bg-indigo-950/90 border-indigo-500/50 text-indigo-200',
    emerald: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200',
    rose: 'bg-rose-950/90 border-rose-500/50 text-rose-200'
  };

  const borderClass = bgColors[type] || bgColors.indigo;

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl ${borderClass} toast-animate text-sm font-medium transition-all duration-300`;
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full ${type === 'emerald' ? 'bg-emerald-400' : 'bg-indigo-400'} animate-pulse"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
