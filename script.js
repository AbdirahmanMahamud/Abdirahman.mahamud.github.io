document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Element Selectors ---
    const tabs = document.querySelectorAll('.nav-tab');
    const grids = document.querySelectorAll('.shelf-content');
    const itemCount = document.getElementById('item-count');
    const searchInput = document.getElementById('shelf-search');
    const filterAllBtn = document.getElementById('filter-all');
    const filterCoreBtn = document.getElementById('filter-core');
    
    let currentFilter = 'all'; // Tracks 'all' vs 'core'

    // --- 2. The Master Filter Function ---
    // This handles Tab, Search, and Core filtering all at once
    function applyMasterFilter() {
        const activeTab = document.querySelector('.nav-tab-active').getAttribute('data-shelf');
        const searchTerm = searchInput.value.toLowerCase();
        const allItems = document.querySelectorAll('.shelf-item');
        
        let visibleCount = 0;

        allItems.forEach(item => {
            const title = (item.getAttribute('data-title') || "").toLowerCase();
            const desc = (item.getAttribute('data-description') || "").toLowerCase();
            const isCore = item.querySelector('.absolute.top-2.right-2') !== null;
            const isInActiveTab = item.closest(`#${activeTab}-grid`) !== null || item.closest('#writing-section') !== null;

            // Logic: Must match search AND must match Core filter AND must be in active tab
            const matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm);
            const matchesCore = (currentFilter === 'all') || (currentFilter === 'core' && isCore);

            if (matchesSearch && matchesCore && isInActiveTab) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Update item count display (optional)
        if (itemCount) {
            const label = activeTab.toUpperCase();
            itemCount.innerText = `${visibleCount} ${label}`;
        }
    }

    // --- 3. Event Listeners ---

    // Search Input Listener
    searchInput.addEventListener('input', applyMasterFilter);

    // Tab Switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('nav-tab-active'));
            tab.classList.add('nav-tab-active');
            
            // Show only the relevant grid container
            const target = tab.getAttribute('data-shelf');
            grids.forEach(grid => grid.classList.add('hidden'));
            document.getElementById(`${target}-grid`).classList.remove('hidden');

            applyMasterFilter();
        });
    });

    // Core/All Filter Buttons
    filterAllBtn.addEventListener('click', () => {
        currentFilter = 'all';
        filterAllBtn.classList.add('bg-[#2d5a27]', 'text-white');
        filterCoreBtn.classList.remove('bg-[#2d5a27]', 'text-white');
        applyMasterFilter();
    });

    filterCoreBtn.addEventListener('click', () => {
        currentFilter = 'core';
        filterCoreBtn.classList.add('bg-[#2d5a27]', 'text-white');
        filterAllBtn.classList.remove('bg-[#2d5a27]', 'text-white');
        applyMasterFilter();
    });

    // --- 4. Modal (Pop-up) Logic ---
    const modal = document.getElementById('details-modal');
    const modalImg = document.getElementById('modal-img');
    const modalImgContainer = document.getElementById('modal-img-container');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.getElementById('close-modal');

    document.addEventListener('click', (e) => {
        const item = e.target.closest('.shelf-item');
        if (item) {
            const img = item.querySelector('img');
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-description');

            if (img) {
                modalImg.src = img.src;
                modalImgContainer.style.display = 'block';
            } else {
                modalImgContainer.style.display = 'none'; 
            }

            modalTitle.innerText = title || "Untitled";
            modalDesc.innerText = desc || "No description available.";
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; 
        }
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});
