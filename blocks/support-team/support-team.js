export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'support-team-wrapper';

  rows.forEach((row) => {
    const cols = [...row.children];

    if (cols.length < 2) return;

    const image = cols[0]?.querySelector('picture');
    const contentItems = [...cols[1].children];

    const name = contentItems[0]?.textContent.trim() || '';
    const role = contentItems[1]?.textContent.trim() || '';
    const rating = contentItems[2]?.textContent.trim() || '';
    const description = contentItems[3]?.textContent.trim() || '';

    const card = document.createElement('div');
    card.className = 'support-team-card';

    const header = document.createElement('div');
    header.className = 'support-team-header';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'support-team-image';

    if (image) {
      imageWrapper.append(image);
    }

    const info = document.createElement('div');
    info.className = 'support-team-info';

    const nameElement = document.createElement('h3');
    nameElement.textContent = name;

    const roleElement = document.createElement('span');
    roleElement.textContent = role;

    info.append(nameElement, roleElement);
    header.append(imageWrapper, info);

    const ratingWrapper = document.createElement('div');
    ratingWrapper.className = 'support-team-rating';

    const stars = document.createElement('span');
    stars.className = 'stars';

    const starCount = Math.min(Math.max(Number(rating) || 0, 1), 5);

    for (let i = 0; i < starCount; i += 1) {
      const starIcon = document.createElement('i');
      starIcon.className = 'ti ti-star txbdbcolor';
      stars.append(starIcon);
    }

    const ratingText = document.createElement('span');
    ratingText.className = 'rating-text';

    const ratingLabels = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent',
    };

    ratingText.textContent = ratingLabels[starCount];

    ratingWrapper.append(stars, ratingText);

    const descriptionElement = document.createElement('p');
    descriptionElement.className = 'support-team-description';
    descriptionElement.textContent = description;

    card.append(header, ratingWrapper, descriptionElement);

    cardsWrapper.append(card);
  });
  block.replaceChildren(cardsWrapper);
}
