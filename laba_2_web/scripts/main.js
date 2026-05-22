
let currentSortOrder = 'pop';
const ITEMS_PER_PAGE = 6;
let itemsDisplayed = ITEMS_PER_PAGE;
let currentFilteredProducts = [];




function renderNews() {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    const sortedNews = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedNews.forEach(item => {
        let statusClass = 'news-normal';
        if (item.status === 'важливі') statusClass = 'news-important';
        if (item.status === 'дуже важливі') statusClass = 'news-very-important';

        const newsEl = document.createElement('div');
        newsEl.className = `news-item ${statusClass}`;
        newsEl.innerHTML = `
            <div class="news-header">${item.title}</div>
            <span class="news-date">${item.date} | Статус: ${item.status}</span>
            <div class="news-content hidden">${item.text}</div>
        `;
        newsEl.addEventListener('click', () => newsEl.querySelector('.news-content').classList.toggle('hidden'));
        newsContainer.appendChild(newsEl);
    });
}




function renderProducts(products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    if (products.length === 0) {
        productsContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 20px;">За обраними фільтрами відеокарт не знайдено.</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-media-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-desc-overlay">
                    <strong>Чип:</strong> ${product.vendor} (${product.family})<br>
                    <strong>Виробник:</strong> ${product.brand}<br>
                    <strong>Пам'ять:</strong> ${product.vram} ГБ<br>
                    <span style="color:var(--accent-color); font-size:11px;">Популярність: ${product.popularity}/100</span><br><br>
                    ${product.desc}
                </div>
            </div>
            <h3 class="product-title">${product.name}</h3>
            <button class="btn-more-info">Характеристики</button>
            <div class="product-price">${product.price} ₴</div>
            <button class="btn-buy" onclick="addToCart(${product.id})">В кошик</button>
        `;

        const moreBtn = card.querySelector('.btn-more-info');
        const descOverlay = card.querySelector('.product-desc-overlay');

        moreBtn.addEventListener('click', () => {
            descOverlay.classList.toggle('active');
            moreBtn.textContent = descOverlay.classList.contains('active') ? 'Приховати' : 'Характеристики';
        });

        productsContainer.appendChild(card);
    });
}




function updateProducts(resetPagination = true) {
    if (resetPagination) {
        itemsDisplayed = ITEMS_PER_PAGE;
    }

    let filteredProducts = [...productsData];

    const checkedVendors = Array.from(document.querySelectorAll('.vendor-filter:checked')).map(cb => cb.value);
    const checkedFamilies = Array.from(document.querySelectorAll('.family-filter:checked')).map(cb => cb.value);
    const checkedBrands = Array.from(document.querySelectorAll('.brand-filter:checked')).map(cb => cb.value);
    const selectedVram = document.getElementById('vram-filter').value;


    const minPriceStr = document.getElementById('price-min').value;
    const maxPriceStr = document.getElementById('price-max').value;
    const minPrice = minPriceStr ? parseFloat(minPriceStr) : 0;
    const maxPrice = maxPriceStr ? parseFloat(maxPriceStr) : Infinity;


    // if (checkedVendors.length > 0) 
    //     filteredProducts = filteredProducts.filter(p => checkedVendors.includes(p.vendor));
    // if (checkedFamilies.length > 0) 
    //     filteredProducts = filteredProducts.filter(p => checkedFamilies.includes(p.family));
    // if (checkedBrands.length > 0) 
    //     filteredProducts = filteredProducts.filter(p => checkedBrands.includes(p.brand));
    // if (selectedVram !== 'all') 
    //     filteredProducts = filteredProducts.filter(p => p.vram === selectedVram);
    // filteredProducts = filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);
    // if (currentSortOrder === 'pop') {
    //     filteredProducts.sort((a, b) => b.popularity - a.popularity);
    // } else if (currentSortOrder === 'asc') {
    //     filteredProducts.sort((a, b) => a.price - b.price);
    // } else if (currentSortOrder === 'desc') {
    //     filteredProducts.sort((a, b) => b.price - a.price);
    // }



    if (checkedVendors.length > 0) 
        filteredProducts = filteredProducts.filter(p => checkedVendors.includes(p.vendor));
    if (checkedFamilies.length > 0) 
        filteredProducts = filteredProducts.filter(p => checkedFamilies.includes(p.family));
    if (checkedBrands.length > 0) 
        filteredProducts = filteredProducts.filter(p => checkedBrands.includes(p.brand));
    if (selectedVram !== 'all') 
        filteredProducts = filteredProducts.filter(p => p.vram === selectedVram);

    filteredProducts = filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);

    if (currentSortOrder === 'pop') {
        filteredProducts.sort((a, b) => b.popularity - a.popularity);
    } else if (currentSortOrder === 'asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (currentSortOrder === 'desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    currentFilteredProducts = filteredProducts;
    const productsToShow = currentFilteredProducts.slice(0, itemsDisplayed);

    renderProducts(productsToShow);
    updateLoadMoreButton();
}

function updateLoadMoreButton() {
    const btnLoadMore = document.getElementById('btn-load-more');
    if (itemsDisplayed >= currentFilteredProducts.length) {
        btnLoadMore.classList.add('hidden');
    } else {
        btnLoadMore.classList.remove('hidden');
    }
}

function initLoadMore() {
    const btnLoadMore = document.getElementById('btn-load-more');
    btnLoadMore.addEventListener('click', () => {
        itemsDisplayed += ITEMS_PER_PAGE;
        updateProducts(false);
    });
}

function initSortingButtons() {
    const btnPop = document.getElementById('sort-pop');
    const btnAsc = document.getElementById('sort-asc');
    const btnDesc = document.getElementById('sort-desc');

    function setActiveBtn(activeBtn) {
        [btnPop, btnAsc, btnDesc].forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    btnPop.addEventListener('click', () => { currentSortOrder = 'pop'; setActiveBtn(btnPop); updateProducts(true); });
    btnAsc.addEventListener('click', () => { currentSortOrder = 'asc'; setActiveBtn(btnAsc); updateProducts(true); });
    btnDesc.addEventListener('click', () => { currentSortOrder = 'desc'; setActiveBtn(btnDesc); updateProducts(true); });
}

function initFilters() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.addEventListener('change', () => updateProducts(true)));

    document.getElementById('vram-filter').addEventListener('change', () => updateProducts(true));
    document.getElementById('price-min').addEventListener('input', () => updateProducts(true));
    document.getElementById('price-max').addEventListener('input', () => updateProducts(true));
}





window.onload = () => {
    renderNews();
    initFilters();
    initSortingButtons();
    initLoadMore();

    updateProducts(true);

    initModals();
    initCarousel();
    initSubscriptionBanner();
    
    initAdModal();
    initScrollTopButton();
};