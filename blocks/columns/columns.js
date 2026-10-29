export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
  
  // FAQ Variation Specific Logic
  if (block.classList.contains('faq-variation')) {
    const faqList = block.querySelector('ul');
    if (!faqList) return;
    faqList.classList.add('faq-list');

    const faqItems = [...faqList.children];
    faqItems[0]?.classList.add('active');

    faqItems.forEach((item) => {
      const trigger = item.querySelector('p > a');
      if (!trigger) return;

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const isActive = item.classList.contains('active');
        faqItems.forEach((faq) => faq.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }
}
