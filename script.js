document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-tab');
    const grids = document.querySelectorAll('.shelf-content');
    const itemCount = document.getElementById('item-count');
    const searchInput = document.getElementById('shelf-search');

    /**
     * TAB SWITCHING LOGIC
     */
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 1. Update Active Tab UI Styling
            tabs.forEach(t => t.classList.remove('nav-tab-active'));
            tab.classList.add('nav-tab-active');

            // 2. Hide all grids and show the selected one
            const targetShelf = tab.getAttribute('data-shelf');
            grids.forEach(grid => {
                grid.classList.add('hidden');
                if (grid.id === `${targetShelf}-grid`) {
                    grid.classList.remove('hidden');
                }
            });

            // 3. Update the counter text based on selection
            // You can change these numbers to match your actual totals
            const labels = {
                'books': '131 BOOKS',
                'movies': '42 MOVIES',
                'travel': '12 LOCATIONS',
                'essays': '6 ESSAYS'
            };
            itemCount.innerText = labels[targetShelf];
            
            // 4. Clear search when switching tabs
            searchInput.value = '';
            filterItems('');
        });
    });

    /**
     * SEARCH FUNCTIONALITY
     */
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterItems(searchTerm);
    });

    function filterItems(term) {
        // Find the grid that is currently visible
        const activeGrid = document.querySelector('.shelf-content:not(.hidden)');
        const items = activeGrid.querySelectorAll('.item-container, .book-card, .aspect-[2/3], div[class*="border-b"]');

        items.forEach(item => {
            // Check text content or alt text of images
            const text = item.innerText.toLowerCase();
            const alt = item.querySelector('img')?.alt.toLowerCase() || '';
            
            if (text.includes(term) || alt.includes(term)) {
                item.style.display = ""; // Show
            } else {
                item.style.display = "none"; // Hide
            }
        });
    }
});
