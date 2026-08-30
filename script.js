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
const modalSub = document.getElementById('modalSub');
const modalRoles = document.getElementById('modalRoles');
const modalVideo = document.getElementById('modalVideo');
const projectCards = document.querySelectorAll('.project-card');

// Elemen Gallery
const galleryHeading = document.getElementById('galleryHeading');
const modalGallery = document.getElementById('modalGallery');
const mImg1 = document.getElementById('modalImg1');
const mImg2 = document.getElementById('modalImg2');
const mImg3 = document.getElementById('modalImg3');

if (projectCards.length > 0) {
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const vidId = card.getAttribute('data-vid');
            const title = card.getAttribute('data-title');
            const sub = card.getAttribute('data-sub');
            const roles = card.getAttribute('data-roles').split(',');
            
            // Ambil data gambar
            const img1 = card.getAttribute('data-img1');
            const img2 = card.getAttribute('data-img2');
            const img3 = card.getAttribute('data-img3');

            // 1. Ganti Gambar Banner
            modalBanner.src = `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`;
            
            // 2. Ganti Teks Judul & Deskripsi
            modalTitle.textContent = title;
            modalSub.textContent = sub;
            
            // 3. Masukkan Tags/Roles
            modalRoles.innerHTML = '';
            roles.forEach(role => {
                const span = document.createElement('span');
                span.textContent = role.trim();
                modalRoles.appendChild(span);
            });

            // 4. Atur Gambar Screenshot (Hanya munculin jika ada data gambarnya)
            if (img1 || img2 || img3) {
                galleryHeading.style.display = 'block';
                modalGallery.style.display = 'flex';
                
                if(img1) { mImg1.src = img1; mImg1.style.display = 'block'; } else { mImg1.style.display = 'none'; }
                if(img2) { mImg2.src = img2; mImg2.style.display = 'block'; } else { mImg2.style.display = 'none'; }
                if(img3) { mImg3.src = img3; mImg3.style.display = 'block'; } else { mImg3.style.display = 'none'; }
            } else {
                // Kalau kartunya gak punya data foto, bagian gallery kita sembunyikan!
                galleryHeading.style.display = 'none';
                modalGallery.style.display = 'none';
            }

            // 5. Putar Video
            modalVideo.src = `https://www.youtube.com/embed/${vidId}?autoplay=1&rel=0&modestbranding=1`;

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

    closeModalBtn.addEventListener('click', closePopup);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) { closePopup(); }
    });
}