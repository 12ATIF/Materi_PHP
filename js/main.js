// ========================================
// Website Pembelajaran PHP untuk SMK
// JavaScript Utilities
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initMobileMenu();
  initCopyButtons();
  initSmoothScroll();
  initProgressTracking();
});

// Navbar Scroll Effect
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');
  const closeBtn = document.getElementById('close-menu-btn');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeMenu = () => {
    mobileMenu.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
}

// Copy Code Button
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const codeBlock = btn.closest('.code-block');
      const code = codeBlock.querySelector('code').textContent;

      try {
        await navigator.clipboard.writeText(code);
        
        // Show success
        const originalText = btn.textContent;
        btn.textContent = '✓ Tersalin!';
        btn.classList.add('copied');

        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        btn.textContent = 'Gagal menyalin';
        setTimeout(() => {
          btn.textContent = 'Salin';
        }, 2000);
      }
    });
  });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Progress Tracking (localStorage)
function initProgressTracking() {
  // Get current page
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
  
  // Mark as visited
  if (currentPage && currentPage !== 'index') {
    markAsVisited(currentPage);
  }

  // Update progress UI
  updateProgressUI();
}

function markAsVisited(pageId) {
  let visited = JSON.parse(localStorage.getItem('php_progress') || '[]');
  if (!visited.includes(pageId)) {
    visited.push(pageId);
    localStorage.setItem('php_progress', JSON.stringify(visited));
  }
}

function getProgress() {
  const totalPages = 12; // Total materi
  const visited = JSON.parse(localStorage.getItem('php_progress') || '[]');
  return Math.round((visited.length / totalPages) * 100);
}

function updateProgressUI() {
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  
  if (progressFill) {
    const progress = getProgress();
    progressFill.style.width = `${progress}%`;
    if (progressText) {
      progressText.textContent = `${progress}%`;
    }
  }
}

// Checklist functionality
function initChecklist() {
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    const id = checkbox.id;
    
    // Load saved state
    const saved = localStorage.getItem(`checklist_${id}`);
    if (saved === 'true') {
      checkbox.checked = true;
    }

    // Save on change
    checkbox.addEventListener('change', () => {
      localStorage.setItem(`checklist_${id}`, checkbox.checked);
    });
  });
}

// Highlight.js initialization helper
function initCodeHighlight() {
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }
}

// Export functions for use in other scripts
window.PHPLearning = {
  markAsVisited,
  getProgress,
  updateProgressUI,
  initChecklist,
  initCodeHighlight
};
