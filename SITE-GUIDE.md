# PatelTales Photography — Site Guide

Hosted at **pateltales.com** via GitHub Pages.

---

## Site Structure

```
index.html          Landing page — mosaic of featured/best photos
galleries.html      All event galleries grid
gallery.html        Single template page for every gallery (reads ?id= from URL)
podcast.html        Podcast coming-soon page

galleries-data.js   ← Source of truth for all galleries (id, title, cover photo)
featured.js         ← Curated best photos shown on the landing page mosaic
gallery.js          Shared JS: fetches photos from S3, renders grid, handles pagination
gallery.css         Shared CSS for gallery.html and its nav/layout

pateltales_logo.png The current logo (black on white background)
```

---

## How to Add a New Gallery

### Step 1 — Upload to S3
Create a folder in the `pateltales-photography` S3 bucket (us-east-2) and upload photos.
Example folder name: `new-event-2026`

### Step 2 — Add one line to `galleries-data.js`
Add at the **top** of the `GALLERIES` array (most recent first):

```js
{ id: 'new-event-2026', title: 'My New Event 2026', cover: 'DSC00001.jpg' },
```

- `id` — must exactly match the S3 folder name
- `title` — display name shown in the gallery grid and page title
- `cover` — any photo filename from that folder, used as the thumbnail
- `category` — which tab it appears under on the Galleries page:
  - `'ana'` → ANA Track Coaching tab
  - `'orca'` → Orca Running tab
  - `'general'` → Gallery tab

That's it. The gallery is live at: `pateltales.com/gallery.html?id=new-event-2026`

### Adding a new tab/category
Edit the `TABS` array in `galleries-data.js`:
```js
const TABS = [
  { id: 'ana',      label: 'ANA Track Coaching' },
  { id: 'orca',     label: 'Orca Running'        },
  { id: 'general',  label: 'Gallery'             },
  { id: 'newcat',   label: 'New Category'        }, // ← add here
];
```
Then add a `<div class="gallery-section" id="section-newcat"></div>` in `galleries.html` and use `category: 'newcat'` on your gallery entries.

---

## How to Update the Landing Page Mosaic

Just upload photos to the S3 folder:

```
s3://pateltales-photography/artistic/
```

The homepage fetches all images from that folder automatically — no code changes needed.
The folder is configured in `featured.js` via `FEATURED_FOLDER = 'artistic'`.

---

## Key Design Decisions

- **Theme**: White background, dark charcoal (#1a1a1a) text and interactive elements
- **Font**: Poppins (Google Fonts)
- **Nav**: Fixed frosted-glass bar — Logo left, Galleries + Podcast right
- **Gallery photos**: Fetched live from S3 by listing the bucket prefix — no manual image list needed
- **Old gallery URLs** (e.g. `ana-track-011426.html`) are redirect stubs → `gallery.html?id=...` so shared/Instagram links keep working

---

## S3 Details

- **Bucket**: `pateltales-photography`
- **Region**: `us-east-2`
- **Base URL**: `https://pateltales-photography.s3.us-east-2.amazonaws.com`
- Bucket must have public read access and CORS enabled for the S3 listing fetch to work

---

## Deployment

Push to the `main` branch on GitHub — GitHub Pages auto-deploys.
