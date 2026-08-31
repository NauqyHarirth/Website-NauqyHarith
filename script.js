// Toggle Dark/Light Mode
const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeToggleBtn.textContent = '🌙'; 
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = '🌙'; 
        } else {
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = '☀️'; 
        }
    });
}

// ================= LOGIC POPUP MODAL =================
const modal = document.getElementById('projectModal');
const closeModalBtn = document.querySelector('.close-modal');
const modalBanner = document.getElementById('modalBanner');
const modalTitle = document.getElementById('modalTitle');
const modalYear = document.getElementById('modalYear');
const modalSub = document.getElementById('modalSub');
const modalRoles = document.getElementById('modalRoles');
const modalVideo = document.getElementById('modalVideo');
const projectCards = document.querySelectorAll('.project-card');

// Elemen Gallery
const galleryHeading = document.getElementById('galleryHeading');
const modalGallery = document.getElementById('modalGallery');
const galleryWrapper = document.querySelector('.gallery-wrapper');
const galleryHeaderRow = document.querySelector('.gallery-header-row');

if (projectCards.length > 0) {
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const vidId = card.getAttribute('data-vid');
            const title = card.getAttribute('data-title');
            const sub = card.getAttribute('data-sub');
            const date = card.getAttribute('data-date') || card.getAttribute('data-year');
            const rolesAttr = card.getAttribute('data-roles');
            const roles = rolesAttr ? rolesAttr.split(',') : [];

            // 1. Ganti Gambar Banner
            if (vidId) {
                modalBanner.src = `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`;
                modalBanner.onerror = () => {
                    modalBanner.src = `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`;
                };
            }
            
            // 2. Ganti Teks Judul, Tanggal/Tahun & Deskripsi
            modalTitle.textContent = title;
            modalSub.textContent = sub;

            if (modalYear) {
                if (date) {
                    modalYear.textContent = date;
                    modalYear.style.display = 'inline-block';
                } else {
                    modalYear.style.display = 'none';
                }
            }
            
            // 3. Masukkan Tags/Roles
            modalRoles.innerHTML = '';
            roles.forEach(role => {
                const span = document.createElement('span');
                span.textContent = role.trim();
                modalRoles.appendChild(span);
            });

            // 4. Ambil Semua Screenshot (Dinamis: 3, 4, 5, atau lebih)
            let images = [];
            const imgsAttr = card.getAttribute('data-imgs');
            if (imgsAttr) {
                images = imgsAttr.split('|').map(s => s.trim()).filter(Boolean);
            } else {
                for (let i = 1; i <= 20; i++) {
                    const imgPath = card.getAttribute(`data-img${i}`);
                    if (imgPath) images.push(imgPath);
                }
            }

            if (images.length > 0) {
                if (galleryHeaderRow) galleryHeaderRow.style.display = 'flex';
                if (galleryWrapper) galleryWrapper.style.display = 'block';
                if (modalGallery) {
                    modalGallery.style.display = 'flex';
                    modalGallery.innerHTML = '';
                    images.forEach((src, idx) => {
                        const img = document.createElement('img');
                        img.src = src;
                        img.alt = `Screenshot ${idx + 1}`;
                        img.loading = 'lazy';
                        modalGallery.appendChild(img);
                    });
                    // Reset posisi scroll galeri ke awal
                    modalGallery.scrollLeft = 0;
                }
            } else {
                if (galleryHeaderRow) galleryHeaderRow.style.display = 'none';
                if (galleryWrapper) galleryWrapper.style.display = 'none';
                if (modalGallery) {
                    modalGallery.style.display = 'none';
                    modalGallery.innerHTML = '';
                }
            }

            // 5. Putar Video
            if (vidId) {
                modalVideo.src = `https://www.youtube.com/embed/${vidId}?autoplay=1&rel=0&modestbranding=1`;
                const videoWrapper = document.querySelector('.modal-video-wrapper');
                if (videoWrapper) videoWrapper.style.display = 'block';
            } else {
                modalVideo.src = '';
                const videoWrapper = document.querySelector('.modal-video-wrapper');
                if (videoWrapper) videoWrapper.style.display = 'none';
            }

            // Tampilkan Modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; 
        });
    });

    const closePopup = () => {
        modal.classList.remove('show');
        modalVideo.src = ''; 
        document.body.style.overflow = 'auto'; 
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closePopup);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) { closePopup(); }
        });
    }

    // Keyboard ESC untuk menutup modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            closePopup();
        }
    });
}

// ================= FITUR SCROLL HORIZONTAL GALLERY (MOUSE WHEEL & DRAG) =================
if (modalGallery) {
    // 1. Scrolling horizontal menggunakan Wheel Mouse
    modalGallery.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            modalGallery.scrollLeft += e.deltaY * 1.5;
        }
    }, { passive: false });

    // 2. Drag to scroll dengan mouse
    let isDown = false;
    let startX;
    let scrollLeft;

    modalGallery.addEventListener('mousedown', (e) => {
        isDown = true;
        modalGallery.style.cursor = 'grabbing';
        startX = e.pageX - modalGallery.offsetLeft;
        scrollLeft = modalGallery.scrollLeft;
    });

    modalGallery.addEventListener('mouseleave', () => {
        isDown = false;
        modalGallery.style.cursor = 'default';
    });

    modalGallery.addEventListener('mouseup', () => {
        isDown = false;
        modalGallery.style.cursor = 'default';
    });

    modalGallery.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - modalGallery.offsetLeft;
        const walk = (x - startX) * 1.5;
        modalGallery.scrollLeft = scrollLeft - walk;
    });
}

// ================= LOGIC FILTER 5 KATEGORI =================
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter').toLowerCase();
            
            projectCards.forEach(card => {
                const cardCategory = (card.getAttribute('data-category') || card.getAttribute('data-roles') || '').toLowerCase();
                if (filterValue === 'all' || cardCategory.includes(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
