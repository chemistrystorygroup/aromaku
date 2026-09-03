// ===== DATA PRODUK =====
const products = [
    { 
        id: 1, 
        nama: "Sabun Cuci Piring", 
        kategori: "Sabun Cuci Piring", 
        palingDicari: true, 
        varian: ["750ml", "1000ml", "5000ml"],
        gambar: "sabun-cuci-piring.jpg"
    },
    { 
        id: 2, 
        nama: "Sabun Laundry", 
        kategori: "Sabun Laundry", 
        palingDicari: true, 
        varian: ["750ml", "1000ml", "5000ml"],
        gambar: "sabun-laundry.jpg"
    },
    { 
        id: 3, 
        nama: "Sampo Mobil", 
        kategori: "Sampo Mobil", 
        palingDicari: true, 
        varian: ["750ml", "1000ml", "5000ml"],
        gambar: "sampo-mobil.jpg"
    },
    { 
        id: 4, 
        nama: "Parfum Laundry", 
        kategori: "Parfum Laundry", 
        palingDicari: true, 
        varian: ["750ml", "1000ml", "5000ml"],
        gambar: "parfum-laundry.jpg"
    },
    { 
        id: 5, 
        nama: "Shampo Motor", 
        kategori: "Shampo Motor", 
        palingDicari: false, 
        varian: ["750ml", "1000ml", "5000ml"],
        gambar: "shampo-motor.jpg"
    },
    { 
        id: 6, 
        nama: "Pembersih Lantai", 
        kategori: "Pembersih Lantai", 
        palingDicari: true, 
        varian: ["750ml", "1000ml", "5000ml"],
        gambar: "pembersih-lantai.jpg"
    },
    { 
        id: 7, 
        nama: "Deodoran Spray", 
        kategori: "Deodoran Spray", 
        palingDicari: false, 
        varian: ["150ml", "250ml", "750ml"],
        gambar: "deodoran-spray.jpg"
    },
    { 
        id: 8, 
        nama: "Pembersih Toilet", 
        kategori: "Pembersih Toilet", 
        palingDicari: false, 
        varian: ["750ml", "1000ml", "5000ml"],
        gambar: "pembersih-toilet.jpg"
    },
    { 
        id: 9, 
        nama: "Sabun Cuci Galon", 
        kategori: "Sabun Cuci Galon", 
        palingDicari: false, 
        varian: ["750ml", "1000ml", "5000ml"],
        gambar: "sabun-cuci-galon.jpg"
    },
    { 
        id: 10, 
        nama: "Perlengkapan Bayi", 
        kategori: "Perlengkapan Bayi", 
        palingDicari: false, 
        varian: ["750ml", "1000ml", "5000ml"],
        gambar: "perlengkapan-bayi.jpg"
    },
    { 
        id: 11, 
        nama: "Pembersih Kaca", 
        kategori: "Pembersih Kaca", 
        palingDicari: false, 
        varian: ["750ml", "1000ml", "5000ml"],
        gambar: "pembersih-kaca.jpg"
    },
    { 
        id: 12, 
        nama: "Pembersih Serbaguna", 
        kategori: "Pembersih Serbaguna", 
        palingDicari: false, 
        varian: ["750ml", "1000ml", "5000ml"],
        gambar: "pembersih-serbaguna.jpg"
    }
];

// ===== ELEMEN DOM =====
const grid = document.getElementById('productGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const productsCount = document.getElementById('productsCount');

// ===== STATE =====
let currentFilter = 'all';
let currentSearch = '';

// ===== FUNGSI BANTU =====
function createImageElement(product, className, placeholderClass) {
    const wrapper = document.createElement('div');
    wrapper.className = className;

    const img = document.createElement('img');
    img.className = 'product-image';
    img.src = `assets/produk/${product.gambar}`;
    img.alt = product.nama;
    img.style.display = 'none';

    const placeholder = document.createElement('div');
    placeholder.className = placeholderClass || 'product-image-placeholder';
    placeholder.innerHTML = '<i class="fas fa-box"></i>';

    img.onload = function() {
        img.style.display = 'block';
        placeholder.style.display = 'none';
    };

    img.onerror = function() {
        img.style.display = 'none';
        placeholder.style.display = 'flex';
    };

    wrapper.appendChild(img);
    wrapper.appendChild(placeholder);

    return wrapper;
}

// ===== RENDER PRODUK =====
function renderProducts() {
    const filtered = products.filter(p => {
        const matchFilter = currentFilter === 'all' || p.kategori === currentFilter;
        const matchSearch = p.nama.toLowerCase().includes(currentSearch.toLowerCase()) ||
                            p.kategori.toLowerCase().includes(currentSearch.toLowerCase());
        return matchFilter && matchSearch;
    });

    grid.innerHTML = '';
    productsCount.textContent = `Menampilkan ${filtered.length} produk`;

    if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-state';
        empty.innerHTML = `
            <i class="fas fa-search"></i>
            <h3>Produk tidak ditemukan</h3>
            <p>Coba ubah filter atau kata kunci pencarian Anda.</p>
        `;
        grid.appendChild(empty);
        return;
    }

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const imageWrapper = createImageElement(p, 'product-image-wrapper', 'product-image-placeholder');
        card.appendChild(imageWrapper);

        const badge = document.createElement('div');
        badge.className = 'product-badge';
        badge.textContent = p.palingDicari ? '🔥 Paling Dicari' : '';
        if (!p.palingDicari) badge.style.display = 'none';

        const name = document.createElement('div');
        name.className = 'product-name';
        name.textContent = p.nama;

        const category = document.createElement('div');
        category.className = 'product-category';
        category.textContent = p.kategori;

        const variants = document.createElement('div');
        variants.className = 'product-variants';
        variants.textContent = p.varian.join(' • ');

        const waBtn = document.createElement('button');
        waBtn.className = 'product-wa-btn';
        waBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Tanya via WA';
        waBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const msg = `Halo, saya tertarik dengan produk ${p.nama}. Apakah tersedia?`;
            window.open(`https://wa.me/6288881226472?text=${encodeURIComponent(msg)}`, '_blank');
        });

        card.append(badge, name, category, variants, waBtn);

        card.addEventListener('click', () => {
            openModal(p);
        });

        grid.appendChild(card);
    });
}

// ===== MODAL =====
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const variantOptions = document.getElementById('variantOptions');
const modalWaBtn = document.getElementById('modalWaBtn');
const modalClose = document.getElementById('modalClose');
const modalImageWrapper = document.getElementById('modalImageWrapper');

let selectedProduct = null;
let selectedVariant = '';

function openModal(product) {
    selectedProduct = product;
    selectedVariant = product.varian[0] || '';

    // Render gambar modal
    modalImageWrapper.innerHTML = '';
    const img = document.createElement('img');
    img.className = 'modal-product-image';
    img.src = `assets/produk/${product.gambar}`;
    img.alt = product.nama;
    img.style.display = 'none';

    const placeholder = document.createElement('div');
    placeholder.className = 'modal-product-image-placeholder';
    placeholder.innerHTML = '<i class="fas fa-box"></i>';

    img.onload = function() {
        img.style.display = 'block';
        placeholder.style.display = 'none';
    };

    img.onerror = function() {
        img.style.display = 'none';
        placeholder.style.display = 'flex';
    };

    modalImageWrapper.appendChild(img);
    modalImageWrapper.appendChild(placeholder);

    modalTitle.textContent = product.nama;
    modalCategory.textContent = product.kategori;

    // Render varian
    variantOptions.innerHTML = '';
    product.varian.forEach(v => {
        const btn = document.createElement('button');
        btn.className = 'variant-btn' + (v === selectedVariant ? ' active' : '');
        btn.textContent = v;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedVariant = v;
        });
        variantOptions.appendChild(btn);
    });

    // Set WA button
    modalWaBtn.onclick = () => {
        const msg = `Halo, saya tertarik dengan produk ${product.nama} ukuran ${selectedVariant}. Apakah tersedia?`;
        window.open(`https://wa.me/6288881226472?text=${encodeURIComponent(msg)}`, '_blank');
    };

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// ===== FILTER =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderProducts();
    });
});

// ===== SEARCH =====
searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderProducts();
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

if (mobileOverlay) {
    mobileOverlay.addEventListener('click', toggleMobileMenu);
}

// Tutup menu saat link diklik
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) {
            toggleMobileMenu();
        }
    });
});

// ===== FADE-UP =====
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));

// ===== NAVBAR SCROLL =====
let lastScrollY = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollY = currentScrollY;
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
});