import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);

  // Replace social media text with icons
  const socialIcons = {
    facebook: 'fab fa-facebook-f',
    twitter: 'fab fa-x-twitter',
    instagram: 'fab fa-instagram',
    vmat: 'fab fa-vimeo-v'
  };

  block.querySelectorAll('.cards-card-body ul a').forEach((link) => {
    const text = link.textContent.trim().toLowerCase();

    if (socialIcons[text]) {
      link.innerHTML = `<i class="${socialIcons[text]}" aria-hidden="true"></i>`;
      link.setAttribute('aria-label', text);
      link.classList.add('social-icon');
    }
  });
}
