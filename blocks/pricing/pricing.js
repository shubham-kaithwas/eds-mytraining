export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'pricing-cards';

  rows.forEach((row) => {
    const cols = [...row.children];

    const title = cols[0]?.textContent.trim();
    const price = cols[1]?.textContent.trim().replace('$', '');
    const duration = cols[2]?.textContent.trim();
    const features = cols[3]?.querySelector('ul');
    const cta = cols[4]?.querySelector('a');

    const card = document.createElement('div');
    card.className = 'pricing-card';

    const titleElement = document.createElement('h3');
    titleElement.className = 'pricing-title';
    titleElement.textContent = title;

    const priceCircle = document.createElement('div');
    priceCircle.className = 'pricing-circle';

    const priceElement = document.createElement('div');
    priceElement.className = 'pricing-price';
    priceElement.innerHTML = `<span class="pricing-symbol">$</span>${price}`;

    const durationElement = document.createElement('div');
    durationElement.className = 'pricing-duration';
    durationElement.textContent = duration;

    priceCircle.append(priceElement, durationElement);
    card.append(titleElement, priceCircle);

    if (features) {
      features.classList.add('pricing-features');

      features.querySelectorAll('li').forEach((item) => {
        const icon = document.createElement('i');
        icon.className = 'icofont icofont-circled-right';
        icon.setAttribute('aria-hidden', 'true');
        item.prepend(icon);
      });
      card.append(features);
    }
    card.append(cta);
    cardsWrapper.append(card);
  });
  block.replaceChildren(cardsWrapper);
}
