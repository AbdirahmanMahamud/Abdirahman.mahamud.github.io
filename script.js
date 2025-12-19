function switchTab(shelfId) {
    // 1. Get all tabs and all content grids
    const tabs = document.querySelectorAll('.nav-tab');
    const grids = document.querySelectorAll('.shelf-content');
    const countLabel = document.getElementById('item-count');

    // 2. Remove active class from all tabs and hide all grids
    tabs.forEach(tab => tab.classList.remove('nav-tab-active'));
    grids.forEach(grid => grid.classList.remove('active'));

    // 3. Add active class to the clicked tab
    // We find the tab that contains the correct text or we can use event.target
    event.currentTarget.classList.add('nav-tab-active');

    // 4. Show the correct grid
    const activeGrid = document.getElementById(`${shelfId}-grid`);
    if (activeGrid) {
        activeGrid.classList.add('active');
    }

    // 5. Update the counter text
    const counts = {
        'books': '131 BOOKS',
        'movies': '42 MOVIES',
        'travel': '12 LOCATIONS',
        'essays': '8 ESSAYS'
    };
    countLabel.innerText = counts[shelfId];
}

// Search Functionality
document.getElementById('shelf-search')?.addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const activeGrid = document.querySelector('.shelf-content.active');
    const items = activeGrid.children;

    for (let item of items) {
        const text = item.innerText.toLowerCase();
        if (text.includes(term)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    }
});
