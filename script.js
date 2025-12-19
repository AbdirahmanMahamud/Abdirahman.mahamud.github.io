document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-tab');
    const grids = document.querySelectorAll('.shelf-content');
    const itemCount = document.getElementById('item-count');
    const searchInput = document.getElementById('shelf-search');

    // Toggle Shelf Tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('nav-tab-active'));
            tab.classList.add('nav-tab-active');

            grids.forEach(grid => grid.classList.add('hidden'));
            
            const target = tab.getAttribute('data-shelf');
            const targetGrid = document.getElementById(`${target}-grid`);
            if (targetGrid) targetGrid.classList.remove('hidden');

            const labels = {
                'books': '131 BOOKS',
                'movies': '42 MOVIES',
                'travel': '12 LOCATIONS',
                'essays': '6 ESSAYS'
            };
            itemCount.innerText = labels[target] || "";
        });
    });

    // Search Filtering Logic
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const activeGrid = document.querySelector('.shelf-content:not(.hidden)');
        if (!activeGrid) return;

        const items = activeGrid.children;
        Array.from(items).forEach(item => {
            const text = item.innerText.toLowerCase();
            const imgAlt = item.querySelector('img')?.alt.toLowerCase() || "";
            
            if (text.includes(term) || imgAlt.includes(term)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
});
