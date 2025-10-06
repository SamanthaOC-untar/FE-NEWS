/* Inisialisasi (Mulai) */
const avatarImg = document.getElementById('avatarPreview');
/* Inisialisasi (Selesai) */

/* Avatar Placeholder (Mulai) */
const placeholderSVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
       <rect width="100%" height="100%" fill="#121620"/>
       <circle cx="90" cy="70" r="36" fill="#2a313e"/>
       <rect x="40" y="120" width="100" height="28" rx="14" fill="#2a313e"/>
     </svg>`
  );

avatarImg.src = placeholderSVG;
/* Avatar Placeholder (Selesai) */
