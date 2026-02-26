// gallery.js

const IMAGES_PER_PAGE = 60;
let keys         = [];
let currentPage  = 1;
let galleryInstance;
let isRendering  = false;

// ── Skeleton ──────────────────────────────────────────────────
function buildSkeleton(count) {
    return Array(count).fill('<div class="skeleton-item"></div>').join('');
}

// ── Pagination helpers ────────────────────────────────────────
function setPaginationVisible(visible) {
    const display = visible ? 'flex' : 'none';
    document.getElementById('pagination-top').style.display    = display;
    document.getElementById('pagination-bottom').style.display = display;
}

function setPaginationButtons() {
    const atStart = currentPage === 1;
    const atEnd   = (currentPage * IMAGES_PER_PAGE) >= keys.length;
    ['top', 'bottom'].forEach(pos => {
        document.getElementById(`prevBtn-${pos}`).disabled = atStart;
        document.getElementById(`nextBtn-${pos}`).disabled = atEnd;
    });
}

// ── Load ──────────────────────────────────────────────────────
function loadGallery(prefix, bucket = 'pateltales-photography') {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = buildSkeleton(12);
    setPaginationVisible(false);

    fetch(`https://${bucket}.s3.us-east-2.amazonaws.com?list-type=2&prefix=${prefix}`)
        .then(res => res.text())
        .then(text => {
            const xml = new DOMParser().parseFromString(text, 'application/xml');
            keys = Array.from(xml.getElementsByTagName('Key'))
                .map(k => k.textContent)
                .filter(k => k.match(/\.(jpe?g|png|gif)$/i) && !k.endsWith('/'));

            if (keys.length === 0) {
                gallery.innerHTML = '<p class="gallery-empty">No photos found.</p>';
                return;
            }

            currentPage = 1;
            renderPage(bucket);
        })
        .catch(err => {
            console.error(err);
            document.getElementById('gallery').innerHTML = '<p class="gallery-empty">Error loading photos.</p>';
        });
}

// ── Render ────────────────────────────────────────────────────
function renderPage(bucket = 'pateltales-photography') {
    if (isRendering) return;
    isRendering = true;

    const gallery  = document.getElementById('gallery');
    const start    = (currentPage - 1) * IMAGES_PER_PAGE;
    const end      = Math.min(start + IMAGES_PER_PAGE, keys.length);
    const pageKeys = keys.slice(start, end);

    // Show skeleton while images load
    gallery.innerHTML = buildSkeleton(pageKeys.length);

    // Build DOM off-screen with DocumentFragment
    const fragment = document.createDocumentFragment();
    pageKeys.forEach((key, i) => {
        const filename = key.split('/').pop();
        const url      = `https://${bucket}.s3.us-east-2.amazonaws.com/${key}`;

        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('data-lg-size', '1600-1067');
        a.setAttribute('data-sub-html', `<h4>${filename}</h4>`);
        a.setAttribute('data-download-url', url);

        const img      = document.createElement('img');
        img.src        = url;
        img.alt        = filename;
        img.loading    = i < 12 ? 'eager' : 'lazy'; // eagerly load first row
        img.decoding   = 'async';

        a.appendChild(img);
        fragment.appendChild(a);
    });

    // Single DOM swap
    gallery.innerHTML = '';
    gallery.appendChild(fragment);

    // Re-init lightGallery
    if (galleryInstance) galleryInstance.destroy();
    galleryInstance = lightGallery(gallery, {
        plugins:       [lgZoom, lgThumbnail],
        speed:         250,
        preload:       2,
        download:      true,
        thumbnail:     true,
        animateThumb:  true,
        thumbWidth:    100,
        thumbHeight:   '80px',
        zoomFromOrigin: true,
        swipeToClose:  true,
        mobileSettings: {
            controls:      true,
            showCloseIcon: true,
            download:      true,
            rotate:        false,
        },
    });

    setPaginationVisible(keys.length > IMAGES_PER_PAGE);
    setPaginationButtons();
    isRendering = false;
}

// ── Pagination buttons ────────────────────────────────────────
['top', 'bottom'].forEach(pos => {
    document.getElementById(`prevBtn-${pos}`).addEventListener('click', () => {
        if (isRendering || currentPage <= 1) return;
        currentPage--;
        renderPage();
        window.scrollTo({ top: 0, behavior: 'instant' });
    });

    document.getElementById(`nextBtn-${pos}`).addEventListener('click', () => {
        if (isRendering || (currentPage * IMAGES_PER_PAGE) >= keys.length) return;
        currentPage++;
        renderPage();
        window.scrollTo({ top: 0, behavior: 'instant' });
    });
});
