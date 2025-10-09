// search.js - Logic untuk halaman search
class NewsSearch {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 5;
        this.currentCategory = 'semua';
        this.currentDateFilter = 'kapan-saja';
        this.searchQuery = '';
        this.filteredNews = [];
        
        this.init();
    }

    init() {
        // Get URL parameters
        this.getUrlParams();
        
        // Set search input value if query exists
        const searchInput = document.getElementById('searchInput');
        if (searchInput && this.searchQuery) {
            searchInput.value = this.searchQuery;
        }
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initial display
        this.performSearch();
    }

    getUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        const page = urlParams.get('page');
        
        if (query) {
            this.searchQuery = query;
        }
        
        if (page) {
            this.currentPage = parseInt(page) || 1;
        }
    }

    updateUrl() {
        const params = new URLSearchParams();
        
        if (this.searchQuery) {
            params.set('q', this.searchQuery);
        }
        
        if (this.currentPage > 1) {
            params.set('page', this.currentPage);
        }
        
        const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        window.history.replaceState({}, '', newUrl);
    }

    setupEventListeners() {
        const searchButton = document.getElementById('searchButton');
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const dateFilter = document.getElementById('dateFilter');

        // Search button click
        searchButton.addEventListener('click', () => {
            this.searchQuery = searchInput.value.trim();
            this.currentPage = 1;
            this.performSearch();
        });

        // Handle Enter key on search input
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchQuery = searchInput.value.trim();
                this.currentPage = 1;
                this.performSearch();
            }
        });

        // Category filter change
        categoryFilter.addEventListener('change', (e) => {
            this.currentCategory = e.target.value;
            this.currentPage = 1;
            this.performSearch();
        });

        // Date filter change
        dateFilter.addEventListener('change', (e) => {
            this.currentDateFilter = e.target.value;
            this.currentPage = 1;
            this.performSearch();
        });
    }

    performSearch() {
        // Filter news based on search query, category, and date
        this.filteredNews = newsDatabase.filter(news => {
            const matchesSearch = this.searchQuery === '' || 
                news.title.toLowerCase().includes(this.searchQuery.toLowerCase());
            
            const matchesCategory = this.currentCategory === 'semua' || 
                news.category === this.currentCategory;
            
            const matchesDate = this.filterByDate(news.date);
            
            return matchesSearch && matchesCategory && matchesDate;
        });

        // Update URL
        this.updateUrl();

        // Update search info
        this.updateSearchInfo();

        // Display results
        this.displayResults();

        // Display pagination
        this.displayPagination();
    }

    filterByDate(newsDate) {
        if (this.currentDateFilter === 'kapan-saja') {
            return true;
        }

        const today = new Date('2025-10-7');
        const articleDate = new Date(newsDate);
        const diffTime = today - articleDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (this.currentDateFilter) {
            case '24-jam':
                return diffDays <= 1;
            case 'minggu-ini':
                return diffDays <= 7;
            case 'bulan-ini':
                return diffDays <= 30;
            default:
                return true;
        }
    }

    updateSearchInfo() {
        const searchInfo = document.getElementById('searchInfo');
        
        if (this.searchQuery === '' && this.currentCategory === 'semua' && this.currentDateFilter === 'kapan-saja') {
            searchInfo.textContent = `Menampilkan semua berita (${this.filteredNews.length} berita)`;
            searchInfo.classList.remove('active');
        } else {
            let infoText = `Ditemukan ${this.filteredNews.length} berita`;
            
            if (this.searchQuery !== '') {
                infoText += ` untuk "${this.searchQuery}"`;
            }
            
            if (this.currentCategory !== 'semua') {
                infoText += ` di kategori ${this.currentCategory}`;
            }

            if (this.currentDateFilter !== 'kapan-saja') {
                const dateLabels = {
                    '24-jam': '24 jam terakhir',
                    'minggu-ini': 'minggu ini',
                    'bulan-ini': 'bulan ini'
                };
                infoText += ` dari ${dateLabels[this.currentDateFilter]}`;
            }
            
            searchInfo.textContent = infoText;
            searchInfo.classList.add('active');
        }
    }

    displayResults() {
        const resultsContainer = document.getElementById('resultsContainer');
        
        if (this.filteredNews.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>Tidak Ada Hasil Ditemukan</h3>
                    <p>Coba gunakan kata kunci yang berbeda atau ubah filter kategori</p>
                </div>
            `;
            return;
        }

        // Calculate pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedNews = this.filteredNews.slice(startIndex, endIndex);

        // Generate HTML for results
        let html = '';
        paginatedNews.forEach(news => {
            html += this.createNewsItem(news);
        });

        resultsContainer.innerHTML = html;

        // Scroll to top of results
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    createNewsItem(news) {
        return `
            <article class="news-result-item">
                <a href="${news.link}" style="text-decoration: none; color: inherit;">
                <div class="news-result-image">
                    <img src="${news.image}" alt="${news.title}">
                </div>
                <div class="news-result-content">
                    <h3>${news.title}</h3>
                    <div class="article-meta">
                        <span class="category-tag">${news.category}</span>
                        <span class="time-tag"><i class="far fa-clock"></i> ${news.time}</span>
                    </div>
                </div>
                </a>
            </article>
        `;
    }

    displayPagination() {
        const paginationContainer = document.getElementById('paginationContainer');
        
        if (this.filteredNews.length === 0) {
            paginationContainer.innerHTML = '';
            return;
        }

        const totalPages = Math.ceil(this.filteredNews.length / this.itemsPerPage);
        
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let html = `
            <button class="pagination-btn" id="prevBtn" ${this.currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i> Sebelumnya
            </button>
        `;

        // Page numbers
        const maxPagesToShow = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        if (startPage > 1) {
            html += `<button class="pagination-btn" data-page="1">1</button>`;
            if (startPage > 2) {
                html += `<span class="pagination-ellipsis">...</span>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            html += `<button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                html += `<span class="pagination-ellipsis">...</span>`;
            }
            html += `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
        }

        html += `
            <button class="pagination-btn" id="nextBtn" ${this.currentPage === totalPages ? 'disabled' : ''}>
                Berikutnya <i class="fas fa-chevron-right"></i>
            </button>
        `;

        paginationContainer.innerHTML = html;

        // Add event listeners for pagination buttons
        document.getElementById('prevBtn')?.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.performSearch();
            }
        });

        document.getElementById('nextBtn')?.addEventListener('click', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.performSearch();
            }
        });

        // Add event listeners for page number buttons
        document.querySelectorAll('.pagination-btn[data-page]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = parseInt(e.target.dataset.page);
                if (page !== this.currentPage) {
                    this.currentPage = page;
                    this.performSearch();
                }
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NewsSearch();
});