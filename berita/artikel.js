/* =========================================================
   ARTIKEL.JS — Halaman Detail Berita TPA AL MUSLIH AIK IJO
   Dipakai khusus di halaman template berita (berita.html dan
   salinan-salinannya). Hanya berisi logika Navbar & Footer,
   karena halaman ini tidak punya Galeri atau Modal Tambah Berita.
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
     2. FOOTER: tahun otomatis
  --------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
