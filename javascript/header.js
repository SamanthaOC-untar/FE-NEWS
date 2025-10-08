// header.js - Script untuk penanganan fungsi search
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('headerSearchForm');
    const searchInput = document.getElementById('headerSearchInput');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const query = searchInput.value.trim();
            
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            } else {
                window.location.href = 'search.html';
            }
        });
    }
});