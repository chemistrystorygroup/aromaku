/* ============================================================
   AROMAKU — PT CHEMISTRY STORY GROUP
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ===== MOBILE MENU — ELEGANT & ANIMATED =====
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const body = document.body;

  if (navToggle && navMenu) {
    const openMenu = () => {
      navMenu.classList.add('open');
      navToggle.classList.add('active');
      body.classList.add('menu-open');
      navToggle.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      body.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
    };

    navToggle.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navMenu.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    navMenu.addEventListener('click', (e) => {
      if (e.target === navMenu) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // ===== HERO SLIDESHOW =====
  const heroSlideshow = document.getElementById('heroSlideshow');
  const heroDots = document.getElementById('heroDots');

  if (heroSlideshow) {
    const slides = heroSlideshow.querySelectorAll('.hero__slide');
    const dots = heroDots ? heroDots.querySelectorAll('.hero__dot') : [];
    let currentSlide = 0;
    let slideInterval = null;
    const SLIDE_DURATION = 5000;

    const goToSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      currentSlide = index;
    };

    const nextSlide = () => {
      const next = (currentSlide + 1) % slides.length;
      goToSlide(next);
    };

    const startSlideshow = () => {
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, SLIDE_DURATION);
    };

    const stopSlideshow = () => {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    };

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index, 10);
        goToSlide(index);
        startSlideshow();
      });
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopSlideshow();
      } else {
        startSlideshow();
      }
    });

    const productImg = document.querySelector('.hero__product-img');
    if (productImg) {
      productImg.addEventListener('mouseenter', stopSlideshow);
      productImg.addEventListener('mouseleave', startSlideshow);
    }

    startSlideshow();
  }

  // ===== FADE-IN ON SCROLL =====
  const fadeElements = document.querySelectorAll(
    '.feature-item, .product-card, .featured__inner, .about__grid, .partner-card, .trust-item, .cta-box, .contact__grid, .page-header'
  );

  fadeElements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));

  // ===== PARTNER FORM → WHATSAPP =====
  const partnerForm = document.getElementById('partnerForm');

  if (partnerForm) {
    partnerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nama = document.getElementById('nama').value.trim();
      const alamat = document.getElementById('alamat').value.trim();
      const wa = document.getElementById('wa').value.trim();
      const kemitraan = document.getElementById('kemitraan').value;

      if (!nama || !alamat || !wa || !kemitraan) {
        alert('Mohon lengkapi semua data terlebih dahulu.');
        return;
      }

      const pesan = `Halo AROMAKU, saya ingin mendaftar sebagai mitra.

*Nama Lengkap:* ${nama}
*Alamat Domisili:* ${alamat}
*Nomor WhatsApp:* ${wa}
*Pilihan Kemitraan:* ${kemitraan}

Mohon informasi selanjutnya. Terima kasih.`;

      const nomorTujuan = '6281247637106';
      const url = `https://wa.me/${nomorTujuan}?text=${encodeURIComponent(pesan)}`;

      window.open(url, '_blank');
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================================
  // MODAL SYSTEM (VISI, MISI, PRODUK)
  // ============================================================
  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  // Close via overlay atau tombol X
  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', () => {
      closeModal(el.closest('.modal'));
    });
  });

  // Close dengan tombol Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.open').forEach(closeModal);
    }
  });

  // ===== MODAL VISI & MISI =====
  const modalTriggers = document.querySelectorAll('[data-modal]');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const key = trigger.dataset.modal;
      const targetId = 'modal' + key.charAt(0).toUpperCase() + key.slice(1);
      openModal(document.getElementById(targetId));
    });
  });

  // ===== MODAL DETAIL PRODUK =====
  const PRODUCT_DATA = {
    'sabun-cuci-piring': {
      title: 'Sabun Cuci Piring',
      category: 'Pembersih Dapur',
      image: 'assets/produk/sabun-cuci-piring.jpg',
      desc: 'Sabun cuci piring Aromaku diformulasikan untuk mengangkat lemak dan kotoran membandel dengan cepat. Lembut di tangan namun kuat membersihkan, cocok untuk penggunaan sehari-hari. Tersedia dalam 3 tingkatan kualitas: Ekonomi, Standar, dan Premium.',
      highlights: [
        'Formula anti lemak',
        'Lembut di tangan',
        'Busa melimpah',
        'Aroma segar tahan lama'
      ],
      packs: [
        { tier: 'Ekonomi', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Standar', sizes: ['20 ml', '50 ml', '250 ml', '500 ml', '750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Premium', sizes: ['750 ml', '1000 ml', '5000 ml'] }
      ]
    },

    'sabun-laundry': {
      title: 'Sabun Laundry',
      category: 'Perawatan Pakaian',
      image: 'assets/produk/sabun-laundry.jpg',
      desc: 'Deterjen cair Aromaku dirancang untuk membersihkan pakaian secara maksimal, menjaga warna tetap cerah, dan mudah dibilas. Cocok untuk laundry kiloan maupun rumahan. Tersedia dalam 3 tingkatan kualitas: Ekonomi, Standar, dan Premium.',
      highlights: [
        'Bersih maksimal',
        'Warna tetap cerah',
        'Mudah dibilas',
        'Hemat & ekonomis'
      ],
      packs: [
        { tier: 'Ekonomi', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Standar', sizes: ['20 ml', '50 ml', '250 ml', '500 ml', '750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Premium', sizes: ['750 ml', '1000 ml', '5000 ml'] }
      ]
    },

    'sampo-mobil': {
      title: 'Sampo Mobil',
      category: 'Perawatan Kendaraan',
      image: 'assets/produk/sampo-mobil.jpg',
      desc: 'Sampo mobil Aromaku memberikan hasil mengkilap, melindungi cat, dan mudah digunakan. Aman untuk semua jenis warna kendaraan. Tersedia dalam 3 tingkatan kualitas: Ekonomi, Standar, dan Premium.',
      highlights: [
        'Mengkilap & bersih',
        'Melindungi cat',
        'Aman untuk semua warna',
        'Kaya busa'
      ],
      packs: [
        { tier: 'Ekonomi', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Standar', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Premium', sizes: ['750 ml', '1000 ml', '5000 ml'] }
      ]
    },

    'parfum-laundry': {
      title: 'Parfum Laundry',
      category: 'Perawatan Pakaian',
      image: 'assets/produk/parfum-laundry.jpg',
      desc: 'Parfum laundry dengan aroma tahan lama yang menyegarkan. Cocok untuk laundry, butik, maupun penggunaan pribadi. Tersedia dalam 3 tingkatan kualitas: Ekonomi, Standar, dan Premium.',
      highlights: [
        'Aroma tahan lama',
        'Pilihan aroma beragam',
        'Tidak merusak kain',
        'Cocok untuk usaha laundry'
      ],
      packs: [
        { tier: 'Ekonomi', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Standar', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Premium', sizes: ['750 ml', '1000 ml', '5000 ml'] }
      ]
    },

    'sabun-cuci-galon': {
      title: 'Sabun Cuci Galon',
      category: 'Pembersih Dapur',
      image: 'assets/produk/sabun-cuci-galon.jpg',
      desc: 'Sabun khusus untuk mencuci galon air minum, dirancang untuk membersihkan tanpa meninggalkan residu berbahaya. Tersedia dalam 3 tingkatan kualitas: Ekonomi, Standar, dan Premium.',
      highlights: [
        'Aman untuk galon air minum',
        'Tidak meninggalkan residu',
        'Cepat mengering',
        'Higienis & bersih'
      ],
      packs: [
        { tier: 'Ekonomi', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Standar', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Premium', sizes: ['750 ml', '1000 ml', '5000 ml'] }
      ]
    },

    'pembersih-lantai': {
      title: 'Pembersih Lantai',
      category: 'Pembersih Rumah',
      image: 'assets/produk/pembersih-lantai.jpg',
      desc: 'Pembersih lantai Aromaku hadir dengan pilihan aroma yang menyegarkan, membantu menjaga kebersihan dan kenyamanan ruangan. Tersedia dalam 3 tingkatan kualitas: Ekonomi, Standar, dan Premium.',
      highlights: [
        'Bersih maksimal',
        'Wangi tahan lama',
        'Aman & lembut',
        'Ekonomis & hemat'
      ],
      packs: [
        { tier: 'Ekonomi', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Standar', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Premium', sizes: ['750 ml', '1000 ml', '5000 ml'] }
      ]
    },

    'shampoo-motor': {
      title: 'Shampoo Motor',
      category: 'Perawatan Kendaraan',
      image: 'assets/produk/shampoo-motor.jpg',
      desc: 'Shampoo khusus motor Aromaku membersihkan body, mesin, dan bagian motor lainnya secara maksimal tanpa merusak cat. Tersedia dalam 3 tingkatan kualitas: Ekonomi, Standar, dan Premium.',
      highlights: [
        'Bersih maksimal',
        'Aman untuk cat',
        'Anti karat',
        'Kaya busa'
      ],
      packs: [
        { tier: 'Ekonomi', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Standar', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Premium', sizes: ['750 ml', '1000 ml', '5000 ml'] }
      ]
    },

    'deodoran-spray': {
      title: 'Deodoran Spray',
      category: 'Perawatan Ruangan',
      image: 'assets/produk/deodoran-spray.jpg',
      desc: 'Deodoran spray Aromaku memberikan keharuman tahan lama untuk ruangan, kendaraan, dan berbagai kebutuhan lainnya. Tersedia dalam 3 tingkatan kualitas: Ekonomi, Standar, dan Premium.',
      highlights: [
        'Aroma tahan lama',
        'Mudah digunakan',
        'Cepat mengering',
        'Aneka pilihan aroma'
      ],
      packs: [
        { tier: 'Ekonomi', sizes: ['150 ml', '250 ml', '750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Standar', sizes: ['150 ml', '250 ml', '750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Premium', sizes: ['150 ml', '250 ml', '750 ml', '1000 ml', '5000 ml'] }
      ]
    },

    'pembersih-toilet': {
      title: 'Pembersih Toilet',
      category: 'Pembersih Kamar Mandi',
      image: 'assets/produk/pembersih-toilet.jpg',
      desc: 'Pembersih toilet Aromaku efektif mengangkat kerak dan noda membandel, membunuh kuman, dan meninggalkan aroma segar. Tersedia dalam 3 tingkatan kualitas: Ekonomi, Standar, dan Premium.',
      highlights: [
        'Mengangkat kerak',
        'Membunuh kuman',
        'Aroma segar',
        'Aman untuk keramik'
      ],
      packs: [
        { tier: 'Ekonomi', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Standar', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Premium', sizes: ['750 ml', '1000 ml', '5000 ml'] }
      ]
    },

    'sabun-perlengkapan-bayi': {
      title: 'Sabun Perlengkapan Bayi',
      category: 'Perawatan Bayi',
      image: 'assets/produk/sabun-bayi.jpg',
      desc: 'Sabun khusus untuk mencuci perlengkapan bayi seperti botol, dot, dan peralatan makan. Formula lembut, aman, dan higienis. Tersedia dalam 3 tingkatan kualitas: Ekonomi, Standar, dan Premium.',
      highlights: [
        'Aman untuk bayi',
        'Formula lembut',
        'Higienis & bersih',
        'Tidak meninggalkan residu'
      ],
      packs: [
        { tier: 'Ekonomi', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Standar', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Premium', sizes: ['750 ml', '1000 ml', '5000 ml'] }
      ]
    },

    'pembersih-kaca': {
      title: 'Pembersih Kaca',
      category: 'Pembersih Rumah',
      image: 'assets/produk/pembersih-kaca.jpg',
      desc: 'Pembersih kaca Aromaku menghasilkan permukaan kaca yang bersih, mengkilap, dan bebas goresan. Cocok untuk kaca jendela, cermin, dan kaca kendaraan. Tersedia dalam 3 tingkatan kualitas: Ekonomi, Standar, dan Premium.',
      highlights: [
        'Bening & mengkilap',
        'Tanpa goresan',
        'Cepat mengering',
        'Anti kabut'
      ],
      packs: [
        { tier: 'Ekonomi', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Standar', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Premium', sizes: ['750 ml', '1000 ml', '5000 ml'] }
      ]
    },

    'pembersih-serbaguna': {
      title: 'Pembersih Serbaguna',
      category: 'Pembersih Rumah',
      image: 'assets/produk/pembersih-serbaguna.jpg',
      desc: 'Pembersih serbaguna Aromaku (kemasan JERGENAN) dapat digunakan untuk berbagai kebutuhan pembersihan rumah tangga, dapur, kamar mandi, dan area lainnya. Tersedia dalam 3 tingkatan kualitas: Ekonomi, Standar, dan Premium.',
      highlights: [
        'Serbaguna',
        'Bersih maksimal',
        'Aneka pilihan aroma',
        'Ekonomis'
      ],
      packs: [
        { tier: 'Ekonomi', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Standar', sizes: ['750 ml', '1000 ml', '5000 ml'] },
        { tier: 'Premium', sizes: ['750 ml', '1000 ml', '5000 ml'] }
      ]
    },

    'handsoap': {
      title: 'Handsoap',
      category: 'Perawatan Tubuh',
      image: 'assets/produk/Handsoap.jpg',
      desc: 'Sabun cuci tangan Aromaku dengan formula lembut yang efektif membunuh kuman dan menjaga kelembapan kulit.',
      highlights: [
        'Membunuh kuman',
        'Lembut di kulit',
        'Aroma segar',
        'Mudah dibilas'
      ],
      packs: [
        { tier: 'Standar', sizes: ['500 ml (botol pump)'] }
      ]
    },

    'softener': {
      title: 'Softener',
      category: 'Perawatan Pakaian',
      image: 'assets/produk/Softener.png',
      desc: 'Pelembut pakaian Aromaku membuat pakaian terasa lebih lembut, wangi tahan lama, dan nyaman dipakai seharian.',
      highlights: [
        'Pakaian lebih lembut',
        'Wangi tahan lama',
        'Mudah disetrika',
        'Aman untuk semua kain'
      ],
      packs: [
        { tier: 'Standar', sizes: ['1 L', '5 L'] }
      ]
    }
  };

  const productCards = document.querySelectorAll('.product-card[data-product]');
  const modalProduct = document.getElementById('modalProduct');

  if (modalProduct && productCards.length) {
    const modalImg = document.getElementById('modalProductImg');
    const modalCat = document.getElementById('modalProductCat');
    const modalTitle = document.getElementById('modalProductTitle');
    const modalDesc = document.getElementById('modalProductDesc');
    const modalHighlights = document.getElementById('modalProductHighlights');
    const modalPack = document.getElementById('modalProductPack');
    const modalWa = document.getElementById('modalProductWa');

    const tierColors = {
      'Ekonomi': '#5A6270',
      'Standar': '#07182D',
      'Premium': '#D4A72C'
    };

    const fillProductModal = (data) => {
      if (!data) return;

      // Image & title
      modalImg.src = data.image;
      modalImg.alt = data.title;
      modalCat.textContent = data.category;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;

      // Highlights
      modalHighlights.innerHTML = '';
      data.highlights.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        modalHighlights.appendChild(li);
      });

      // Packs (kemasan)
      modalPack.innerHTML = '';
      if (Array.isArray(data.packs) && data.packs.length) {
        data.packs.forEach(group => {
          const row = document.createElement('div');
          row.className = 'pack-row';

          const tierLabel = document.createElement('span');
          tierLabel.className = 'pack-row__tier';
          tierLabel.textContent = group.tier;
          tierLabel.style.background = tierColors[group.tier] || '#07182D';
          row.appendChild(tierLabel);

          const sizesWrap = document.createElement('div');
          sizesWrap.className = 'pack-row__sizes';

          group.sizes.forEach(size => {
            const tag = document.createElement('span');
            tag.className = 'pack-tag';
            tag.textContent = size;
            sizesWrap.appendChild(tag);
          });

          row.appendChild(sizesWrap);
          modalPack.appendChild(row);
        });
      } else {
        modalPack.textContent = '—';
      }

      // WhatsApp link dinamis per produk
      if (modalWa) {
        const nomorTujuan = '6281247637106';
        const pesan = `Halo AROMAKU, saya ingin bertanya tentang produk *${data.title}* (${data.category}). Mohon informasi harga dan ketersediaan kemasan. Terima kasih.`;
        modalWa.href = `https://wa.me/${nomorTujuan}?text=${encodeURIComponent(pesan)}`;
      }
    };

    productCards.forEach(card => {
      card.addEventListener('click', () => {
        const key = card.dataset.product;
        const data = PRODUCT_DATA[key];
        if (data) {
          fillProductModal(data);
          openModal(modalProduct);
        }
      });
    });
  }

  // ============================================================
  // PRODUCT FILTER — KHUSUS HALAMAN PRODUK
  // ============================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const allProductCards = document.querySelectorAll('.product-card[data-product]');
  const productsEmpty = document.getElementById('productsEmpty');

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        let visibleCount = 0;

        allProductCards.forEach(card => {
          const category = card.dataset.category;
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        // Show/hide empty state
        if (productsEmpty) {
          productsEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
        }
      });
    });
  }

});
