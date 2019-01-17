let h1 = [];
let active = null;
const list = document.querySelector('menu-left');
const cmp = (a, b) => a.top == b.top ? 0 : a.top > b.top ? 1 : -1;

document.querySelectorAll('.section').forEach(section => {
    let headline = section.querySelector('h1');
    let item = document.createElement('item');
    item.innerHTML = `<label>${headline.innerHTML}</label>`;
    headline.id = headline.innerHTML.toLowerCase().replace(/\s/g, '_');
    h1.push({
        item: item,
        top: headline.getBoundingClientRect().top + window.scrollY + 40
    });
    item.addEventListener('click', _ => location.hash = `#${headline.id}`);

    let sub_headlines = [];
    section.childNodes.forEach(h2 => {
        if (h2.tagName !== 'H2') return;
        let sub_item = document.createElement('sub-item');
        sub_item.innerHTML = h2.innerHTML;
        h1.push({
            item: sub_item,
            top: h2.getBoundingClientRect().top + window.scrollY + 18
        });
        item.appendChild(sub_item);
    });

    list.appendChild(item);
});

window.onscroll = x => {
    if (!active) h1.sort(cmp);
    for (const h of h1) {
        if (x.pageY > h.top) continue;
        if (active && h.item !== active) {
            active.classList.remove('active');
            if (active.tagName === 'SUB-ITEM')
                active.parentNode.classList.remove('sub-active');
        }
        active = h.item;
        active.classList.add('active');
        if (active.tagName === 'SUB-ITEM')
            active.parentNode.classList.add('sub-active');
        break;
    }
};