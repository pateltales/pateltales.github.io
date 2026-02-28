// ============================================================
// PatelTales — Gallery Data
//
// To add a new gallery, add one entry to this array.
// Put the most recent galleries at the top.
//
// Fields:
//   id       — the S3 folder name (also used in the URL)
//   title    — display name shown in the gallery grid and page title
//   cover    — filename of the cover/thumbnail photo
//   category — which tab it appears under:
//                'ana'     → ANA Run Coaching
//                'orca'    → Orca Running
//                'general' → Gallery
// ============================================================

const S3_BASE = 'https://pateltales-photography.s3.us-east-2.amazonaws.com';

const GALLERIES = [
  { id: 'nati-aelred',        title: 'Proposal Feb 25th 2026',          cover: '20260225-DSC02359.jpg', category: 'general'  },
  { id: 'tank-wedding',       title: 'M&M Wedding 2025',                cover: 'DSC05452.jpg',          category: 'general'  },
  { id: 'ana-track-011426',   title: 'ANA Run Coaching Jan 14th 2026', cover: 'DSC04697.jpg', category: 'ana'     },
  { id: 'ana-track-102925',   title: 'ANA Run Coaching Oct 29th',       cover: 'DSC09480.jpg', category: 'ana'     },
  { id: 'tom-halloween-2025', title: "Tom's Halloween 2025",            cover: 'DSC09421.jpg', category: 'general' },
  { id: 'diwali-mela-2025',   title: 'Live2Dance Diwali Mela 2025',     cover: 'DSC00975.jpg', category: 'general' },
  { id: 'ana-track-101525',   title: 'ANA Run Coaching Oct 15th',       cover: 'DSC00356.jpg', category: 'ana'     },
  { id: 'ana-track-100125',   title: 'ANA Run Coaching Oct 1st',        cover: 'DSC09097.jpg', category: 'ana'     },
  { id: 'ana-track-092425',   title: 'ANA Run Coaching Sep 24th',       cover: 'DSC07632.jpg', category: 'ana'     },
  { id: 'ana-track-090325',   title: 'ANA Run Coaching Sep 3rd',        cover: 'DSC04810.jpg', category: 'ana'     },
  { id: 'ana-track-080625',   title: 'ANA Run Coaching Aug 8th',        cover: 'DSC08690.jpg', category: 'ana'     },
  { id: 'ana-track-073025',   title: 'ANA Run Coaching Jul 30th',       cover: 'DSC02417.jpg', category: 'ana'     },
  { id: 'ana-track-072425',   title: 'ANA Run Coaching Jul 23rd',       cover: 'DSC02288.jpg', category: 'ana'     },
  { id: 'ana-track-070925',   title: 'ANA Run Coaching Jul 9th',        cover: 'DSC08875.jpg', category: 'ana'     },
  { id: 'ana-track-061825',   title: 'ANA Run Coaching Jun 18th',       cover: 'DSC07295.jpg', category: 'ana'     },
  { id: 'soaring-eagle-2025', title: 'Soaring Eagle 2025',              cover: 'DSC05423.jpg', category: 'orca'    },
  { id: 'iron-horse-2025',   title: 'Iron Horse 2025',                 cover: '1-DSC04638.jpg', category: 'orca'  },
  { id: 'huskies',            title: 'Huskies Graduation',              cover: 'DSC06336.jpg', category: 'general' },
  { id: 'gaga-graduation',    title: 'Gaga Graduation',                 cover: 'DSC06744.jpg', category: 'general' },
];

const TABS = [
  { id: 'ana',     label: 'ANA Run Coaching' },
  { id: 'orca',    label: 'Orca Running'        },
  { id: 'general', label: 'Gallery'             },
];
