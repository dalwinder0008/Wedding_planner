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
        const label = item.category === 'haldi' ? 'Haldi & Mehendi' :
          item.category === 'sangeet' ? 'Sangeet & DJ' :
          item.category === 'birthday' ? 'Birthday Celebrations' : 'Wedding Ceremonies';
        div.innerHTML = `
          <img src="${item.url}" alt="${StorageModule.escapeHtml(label)}" loading="lazy">
          <div class="gallery-caption">
            <span>${StorageModule.escapeHtml(label)}</span>
            <i class="fa fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </div>`;
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