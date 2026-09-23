/**
 * Gallery Module: Category Filtering & Dynamic Image Loading
 */
const GalleryModule = (() => {
  let activeCategory = 'all';

  function render(category = activeCategory) {
    activeCategory = category;
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const items = StorageModule.getGallery();
    items.forEach(item => {
      if (activeCategory === 'all' || item.category === activeCategory) {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.setAttribute('data-category', item.category);
        div.innerHTML = `<img src="${item.url}" alt="${StorageModule.escapeHtml(item.category)}" loading="lazy">`;
        grid.appendChild(div);
      }
    });
  }

  function initFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', function() {
        buttons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const cat = this.getAttribute('data-category');
        render(cat);
      });
    });
  }

  return {
    init: () => {
      render();
      initFilters();
    },
    render
  };
})();