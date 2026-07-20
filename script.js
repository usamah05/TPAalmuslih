/* =========================================================
   SCRIPT.JS — TPA AL MUSLIH AIK IJO
   Semua logika interaktif website (Vanilla JS, tanpa framework).
   Struktur file ini dibagi menjadi 4 bagian:
   1. Navbar (efek scroll + menu mobile)
   2. Galeri (carousel 11 foto)
   3. Sistem Berita (render, tambah, localStorage)
   4. Footer (tahun otomatis)
========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------
     1. NAVBAR: efek scroll + toggle menu mobile
  --------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const iconOpen = document.getElementById('iconOpen');
  const iconClose = document.getElementById('iconClose');

  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('bg-islamic-900/95', 'backdrop-blur', 'shadow-lg');
    } else {
      navbar.classList.remove('bg-islamic-900/95', 'backdrop-blur', 'shadow-lg');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  function toggleMobileMenu() {
    const isHidden = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    iconOpen.classList.toggle('hidden', isHidden);
    iconClose.classList.toggle('hidden', !isHidden);
  }
  hamburgerBtn.addEventListener('click', toggleMobileMenu);

  // Tutup menu mobile ketika salah satu tautan diklik
  document.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.add('hidden');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    });
  });

  /* ---------------------------------------------------------
     2. GALERI: carousel 11 foto + navigasi + indikator titik
  --------------------------------------------------------- */
  const galleryPhotos = [
    // { url: 'assets/Mtto.jpeg', caption: 'Mengaji bersama di kelas' },
    { url: 'assets/foto1.jpeg', caption: 'Santri TPQ Al Muslih Aik Ijo' },
    { url: 'assets/foto2.jpeg', caption: 'Kegiatan Santri  },
    { url: 'assets/foto3.jpeg', caption: 'Halaman Depan TPQ Al Muslih Aik Ijo },
    { url: 'assets/foto4.jpeg', caption: 'Suasana kelas TPQ' },
    { url: 'assets/foto5.jpeg', caption: 'Pemberian Setifikat Lulus Ujian Iqro 1-6' },
    { url: 'assets/foto6.jpeg', caption: 'Kebersamaan santri' },
    { url: 'assets/foto7.jpeg', caption: 'Kegiatan Sebelum Setoran Santri TPQ' },
    { url: 'assets/foto8.jpeg', caption: 'Rizwan Hadi Santri Lulus Ujian Iqro 1-6' },
    { url: 'assets/foto9.jpeg', caption: 'Kegiatan Tahfiz Santri TPQ },
    { url: 'assets/foto10.jpeg', caption: 'Ujian Tahfiz Santriwati atas nama Maria Surah An-Nas-Adh Dhuha' },
  ];

  const carouselTrack = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('dotsContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentSlide = 0;

  // Render slide & dot untuk setiap foto
  galleryPhotos.forEach(function (photo, index) {
    const slide = document.createElement('div');
    slide.className = 'snap-center shrink-0 w-[85%] sm:w-[60%] md:w-[32%] lg:w-[30%] rounded-2xl overflow-hidden relative group';
    slide.innerHTML =
      '<img src="' + photo.url + '" alt="' + photo.caption + '" loading="lazy" ' +
      'class="w-full h-64 md:h-72 object-cover transition duration-500 group-hover:scale-110" />' +
      '<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent"></div>' +
      '<p class="absolute bottom-3 left-3 right-3 text-white text-sm font-medium">' + photo.caption + '</p>';
    carouselTrack.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'w-2.5 h-2.5 rounded-full bg-white/30 hover:bg-gold-400 transition dot-item';
    dot.setAttribute('aria-label', 'Ke foto ' + (index + 1));
    dot.addEventListener('click', function () { goToSlide(index); });
    dotsContainer.appendChild(dot);
  });

  const slideElements = carouselTrack.children;
  const dotElements = dotsContainer.children;

  function updateActiveDot() {
    Array.from(dotElements).forEach(function (dot, i) {
      dot.classList.toggle('bg-gold-500', i === currentSlide);
      dot.classList.toggle('w-6', i === currentSlide);
      dot.classList.toggle('bg-white/30', i !== currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = (index + slideElements.length) % slideElements.length;

    const slide = slideElements[currentSlide];

    carouselTrack.scrollTo({
        left: slide.offsetLeft,
        behavior: "smooth"
    });

    updateActiveDot();
}

  prevBtn.addEventListener('click', function () { goToSlide(currentSlide - 1); });
  nextBtn.addEventListener('click', function () { goToSlide(currentSlide + 1); });
  updateActiveDot();

  // Autoplay carousel setiap 5 detik (berhenti saat pointer di atas area galeri)
  let autoplayInterval = setInterval(function () { goToSlide(currentSlide + 1); }, 5000);
  carouselTrack.addEventListener('mouseenter', function () { clearInterval(autoplayInterval); });
  carouselTrack.addEventListener('mouseleave', function () {
    autoplayInterval = setInterval(function () { goToSlide(currentSlide + 1); }, 5000);
  });

  // /* ---------------------------------------------------------
  //    3. SISTEM BERITA: render, tambah berita, simpan localStorage
  // --------------------------------------------------------- */
  // const NEWS_STORAGE_KEY = 'tpaAlMuslihNews';

  // const defaultNews = [
  //   {
  //     title: 'Khataman Al-Qur\'an Santri Angkatan 2026',
  //     category: 'Kegiatan',
  //     summary: 'Sebanyak 15 santri TPA Al Muslih Aik Ijo mengikuti acara khataman Al-Qur\'an yang berlangsung khidmat dan penuh kebahagiaan bersama orang tua santri.',
  //     date: '12 Juli 2026'
  //   },
  //   {
  //     title: 'Pendaftaran Santri Baru Tahun Ajaran Ini Dibuka',
  //     category: 'Pengumuman',
  //     summary: 'TPA Al Muslih Aik Ijo membuka pendaftaran santri baru untuk kelas Iqro dan Al-Qur\'an. Segera daftarkan putra-putri Anda sebelum kuota penuh.',
  //     date: '05 Juli 2026'
  //   },
  //   {
  //     title: 'Santri Raih Juara di Lomba Tilawah Tingkat Kecamatan',
  //     category: 'Prestasi',
  //     summary: "Ananda Fatimah berhasil meraih juara 1 lomba tilawah Al-Qur'an tingkat kecamatan, membanggakan seluruh keluarga besar TPA.",
  //     date: '28 Juni 2026'
  //   }
  // ];

  // function loadNews() {
  //   try {
  //     const stored = localStorage.getItem(NEWS_STORAGE_KEY);
  //     return stored ? JSON.parse(stored) : defaultNews;
  //   } catch (e) {
  //     console.error('Gagal memuat data berita:', e);
  //     return defaultNews;
  //   }
  // }

  // function saveNews(newsArray) {
  //   try {
  //     localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(newsArray));
  //   } catch (e) {
  //     console.error('Gagal menyimpan data berita:', e);
  //   }
  // }

  // let newsData = loadNews();

  // const categoryStyles = {
  //   'Kegiatan':    'bg-emerald-100 text-emerald-700',
  //   'Pengumuman':  'bg-amber-100 text-amber-700',
  //   'Prestasi':    'bg-blue-100 text-blue-700',
  //   'Kajian':      'bg-purple-100 text-purple-700',
  // };

  // const newsGrid = document.getElementById('newsGrid');
  // const emptyState = document.getElementById('emptyState');

  // function renderNews() {
  //   newsGrid.innerHTML = '';

  //   if (newsData.length === 0) {
  //     emptyState.classList.remove('hidden');
  //     return;
  //   }
  //   emptyState.classList.add('hidden');

  //   // Tampilkan berita terbaru di urutan paling atas
  //   newsData.slice().reverse().forEach(function (item, i) {
  //     const badgeClass = categoryStyles[item.category] || 'bg-gray-100 text-gray-700';
  //     const card = document.createElement('article');
  //     card.className = 'bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fadeUp';
  //     card.style.animationDelay = (i * 0.05) + 's';
  //     card.innerHTML =
  //       '<div class="flex items-center justify-between mb-4">' +
  //         '<span class="text-xs font-semibold px-3 py-1 rounded-full ' + badgeClass + '">' + item.category + '</span>' +
  //         '<span class="text-xs text-gray-400">' + item.date + '</span>' +
  //       '</div>' +
  //       '<h3 class="font-display text-lg text-islamic-900 mb-2 leading-snug">' + item.title + '</h3>' +
  //       '<p class="text-gray-600 text-sm leading-relaxed">' + item.summary + '</p>';
  //     newsGrid.appendChild(card);
  //   });
  // }

  // renderNews();

  // // Modal: buka / tutup
  // const newsModal = document.getElementById('newsModal');
  // const openModalBtn = document.getElementById('openModalBtn');
  // const closeModalBtn = document.getElementById('closeModalBtn');
  // const newsForm = document.getElementById('newsForm');

  // function openModal() {
  //   newsModal.classList.remove('hidden');
  //   document.body.style.overflow = 'hidden';
  // }
  // function closeModal() {
  //   newsModal.classList.add('hidden');
  //   document.body.style.overflow = '';
  //   newsForm.reset();
  // }

  // openModalBtn.addEventListener('click', openModal);
  // closeModalBtn.addEventListener('click', closeModal);
  // newsModal.addEventListener('click', function (e) {
  //   if (e.target === newsModal) closeModal();
  // });
  // document.addEventListener('keydown', function (e) {
  //   if (e.key === 'Escape' && !newsModal.classList.contains('hidden')) closeModal();
  // });

  // // Submit form tambah berita
  // newsForm.addEventListener('submit', function (e) {
  //   e.preventDefault();

  //   const title = document.getElementById('newsTitle').value.trim();
  //   const category = document.getElementById('newsCategory').value;
  //   const summary = document.getElementById('newsSummary').value.trim();

  //   if (!title || !summary) return;

  //   const today = new Date();
  //   const formattedDate = today.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

  //   newsData.push({ title: title, category: category, summary: summary, date: formattedDate });
  //   saveNews(newsData);
  //   renderNews();
  //   closeModal();

  //   // Scroll agar berita baru terlihat
  //   document.getElementById('berita').scrollIntoView({ behavior: 'smooth' });
  // });

  /* ---------------------------------------------------------
     4. FOOTER: tahun otomatis
  --------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
