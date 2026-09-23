const ReviewsModule = (() => {
  function render() {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;
    container.innerHTML = '';

    const list = StorageModule.getReviews();
    list.forEach(r => {
      let stars = '';
      for (let i = 0; i < r.rating; i++) stars += '<i class="fa fa-star"></i>';

      const card = document.createElement('div');
      card.className = 'testimonial-card';
      card.innerHTML = `
        <div class="stars">${stars}</div>
        <p>"${StorageModule.escapeHtml(r.comment)}"</p>
        <span class="client-name serif-font">- ${StorageModule.escapeHtml(r.author)} (${StorageModule.escapeHtml(r.city)})</span>
      `;
      container.appendChild(card);
    });
  }

  function initForm() {
    const form = document.getElementById('userReviewForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = document.getElementById('reviewAuthor').value.trim();
      const city = document.getElementById('reviewCity').value.trim();
      const rating = parseInt(document.getElementById('reviewRating').value);
      const comment = document.getElementById('reviewComment').value.trim();

      const reviews = StorageModule.getReviews();
      reviews.unshift({ id: Date.now(), author, city, rating, comment });
      StorageModule.saveReviews(reviews);

      render();
      form.reset();
      alert('Thank you! Your review has been submitted.');
    });
  }

  return {
    init: () => {
      render();
      initForm();
    },
    render
  };
})();