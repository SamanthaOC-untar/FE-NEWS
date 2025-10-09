// article-detail.js - Script untuk render detail artikel 

document.addEventListener('DOMContentLoaded', function() {
    // Ambil article ID dari URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const contentEl = document.getElementById('article-content');

    // Jika tidak ada ID, tampilkan error
    if (!articleId) {
        showError();
        return;
    }

    // Ambil data artikel dari database
    const article = getArticleById(articleId);

    // Jika artikel tidak ditemukan, tampilkan error
    if (!article) {
        showError();
        return;
    }

    // Render artikel
    renderArticle(article);
});

function renderArticle(article) {
    const loadingEl = document.getElementById('loading');
    const contentEl = document.getElementById('article-content');

    loadingEl.style.display = 'none';
    contentEl.style.display = 'block';

    // Update document title
    document.title = `${article.headline} - FENEWS`;

    // Render headline
    document.getElementById('headline').textContent = article.headline;

    // Render category
    document.getElementById('category').textContent = article.category;

    // Render timestamp
    document.getElementById('timestamp').textContent = article.timestamp;

    // Render image
    const imageEl = document.getElementById('article-image');
    imageEl.src = article.image;
    imageEl.alt = article.headline;

    // Render excerpt
    document.getElementById('excerpt').textContent = article.excerpt;

    // Render content (HTML)
    document.getElementById('content').innerHTML = article.content;

}

function showError() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');

    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
}