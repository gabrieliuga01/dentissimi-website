export const clinic = {
  name: "Clinica Dentissimi",
  phoneDisplay: "+40 724 565 527",
  phoneHref: "tel:+40724565527",
  whatsappHref: "https://wa.me/40724565527",
  street: "Bulevardul Republicii 134",
  locality: "Bârlad",
  region: "Vaslui",
  country: "RO",
  mapsQuery: "Dentissimi Dental Clinic, Bulevardul Republicii 134, Bârlad, Romania",
  facebook: "https://www.facebook.com/profile.php?id=61593489185426",
  instagram: "https://www.instagram.com/dentissimi_dental_clinic",
  tiktok: "https://www.tiktok.com/@dentissimidentalclinic",
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.mapsQuery)}`;

export const mapsEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(clinic.mapsQuery)}&hl=ro&z=16&output=embed`;
