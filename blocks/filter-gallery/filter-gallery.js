export default function decorate(block) {
  const portfolioItems = [];
  const categories = new Set();
  // 1. Parse the authored rows
  [...block.children].forEach((row) => {
    const cols = [...row.children];
    if (cols.length < 4) return;
    const picture = cols[0].querySelector('picture');
    // Split categories by comma and clean up whitespace
    const itemCategories = cols[1].textContent.split(',').map(c => c.trim()).filter(c => c);
    const title = cols[2].textContent.trim();
    const subtitle = cols[3].textContent.trim();
    itemCategories.forEach(c => categories.add(c));
    portfolioItems.push({ picture, itemCategories, title, subtitle });
  });

  // Clear the block to rebuild the DOM
  block.textContent = '';
  // 2. Create Filter Navigation
  const filterNav = document.createElement('div');
  filterNav.className = 'gallery-filters';

  const allBtn = document.createElement('button');
  allBtn.textContent = 'All Work';
  allBtn.className = 'active';
  allBtn.dataset.filter = 'all';
  filterNav.append(allBtn);

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.dataset.filter = cat;
    filterNav.append(btn);
  });

  // 3. Create Gallery Grid
  const grid = document.createElement('div');
  grid.className = 'gallery-grid';

  portfolioItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.categories = item.itemCategories.join(',');

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'card-image';
    if (item.picture) imgWrapper.append(item.picture);

    const overlay = document.createElement('div');
    overlay.className = 'card-overlay';

    // Placeholder for the center icon (can be replaced with your SVG)
    const icon = document.createElement('div');
    icon.className = 'image-icon';
    icon.innerHTML = `<i class = "ti ti-image"></i>`;
    //icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`;

    const titleEl = document.createElement('p');
    titleEl.textContent = item.title;

    const subtitleEl = document.createElement('p');
    subtitleEl.textContent = item.subtitle;

    overlay.append(icon, titleEl, subtitleEl);
    card.append(imgWrapper, overlay);
    grid.append(card);
  });
  block.append(filterNav, grid);
  // 4. Add Filter Click Events
  handleClickEvents(filterNav, grid);
}

function handleClickEvents(filterNav, grid) {
  const buttons = filterNav.querySelectorAll('button');
  const cards = grid.querySelectorAll('.card');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Manage active state
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      // Filter cards
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.categories.includes(filter)) {
          card.classList.remove('hidden');
          // Slight delay to allow CSS opacity transition to trigger after display change
          setTimeout(() => card.classList.remove('fade-out'), 10);
        } else {
          card.classList.add('fade-out');
          card.addEventListener('transitionend', () => {
            if (card.classList.contains('fade-out')) {
              card.classList.add('hidden');
            }
          }, { once: true });
        }
      });
    });
  });
}
