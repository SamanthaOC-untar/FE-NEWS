const slidesData = [
    {
        image: '../Pictures/img/Moon.jpeg',
        title: 'FOTO: Harvestmoon, Supermoon Pertama 2025 Tampil Memesona di Langit',
        category: 'Teknologi'
    },
    {
        image: '../Pictures/img/Alpine.jpeg',
        title: 'FOTO: Gelombang Panas Picu Pencairan Gletser di Pegunungan Alpen',
        category: 'Teknologi'
    },
    {
        image: '../Pictures/img/Mosquito.jpeg',
        title: "FOTO: 'Pabrik' Nyamuk Terbesar Dunia Lawan Demam Berdarah di Brasil",
        category: 'Teknologi'
    }
];

const slidesContainer = document.querySelector('.slides-container');
const dotsContainer = document.querySelector('.slider-dots');
const nextBtn = document.querySelector('.slider-nav.next');
const prevBtn = document.querySelector('.slider-nav.prev');
let currentSlide = 0;

// Fungsi untuk membuat slide dan dots
function renderSlider() {
    slidesContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    slidesData.forEach((slide, index) => {
        // Membuat elemen slide
        const slideElement = document.createElement('div');
        slideElement.classList.add('slide');
        if (index === 0) slideElement.classList.add('active');
        slideElement.innerHTML = `
            <img src="${slide.image}" alt="${slide.title}">
            <div class="slider-caption">
                <h3>${slide.title}</h3>
                <span class="caption-category">${slide.category}</span>
            </div>
        `;
        slidesContainer.appendChild(slideElement);

        // Membuat elemen dot
        const dotElement = document.createElement('span');
        dotElement.classList.add('dot');
        if (index === 0) dotElement.classList.add('active');
        dotElement.addEventListener('click', () => showSlide(index));
        dotsContainer.appendChild(dotElement);
    });
}

// Fungsi untuk menampilkan slide tertentu
function showSlide(index) {
    const allSlides = document.querySelectorAll('.slide');
    const allDots = document.querySelectorAll('.dot');

    allSlides.forEach(slide => slide.classList.remove('active'));
    allDots.forEach(dot => dot.classList.remove('active'));

    allSlides[index].classList.add('active');
    allDots[index].classList.add('active');
    currentSlide = index;
}

// Event listener untuk tombol next dan prev
nextBtn.addEventListener('click', () => {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slidesData.length) {
        nextIndex = 0; 
    }
    showSlide(nextIndex);
});

prevBtn.addEventListener('click', () => {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
        prevIndex = slidesData.length - 1;
    }
    showSlide(prevIndex);
});

// Mulai slider
renderSlider();