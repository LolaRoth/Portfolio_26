// Utilitaires pour le portfolio

/**
 * Génère un slug à partir d'une chaîne de caractères
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .replace(/[^a-z0-9 -]/g, "") // Supprime les caractères spéciaux
    .replace(/\s+/g, "-") // Remplace les espaces par des tirets
    .replace(/-+/g, "-") // Supprime les tirets consécutifs
    .replace(/^-+/, "") // Supprime les tirets au début
    .replace(/-+$/, ""); // Supprime les tirets à la fin
}

/**
 * Formate une date en français
 */
export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("fr-FR", options || defaultOptions);
}

/**
 * Formate une date courte (mois année)
 */
export function formatShortDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("fr-FR", {
    month: "short",
    year: "numeric",
  });
}

/**
 * Tronque un texte avec des points de suspension
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + "...";
}

/**
 * Capitalise la première lettre d'une chaîne
 */
export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Génère une couleur aléatoire pastel
 */
export function randomPastelColor(): string {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 85%)`;
}

/**
 * Vérifie si une URL est externe
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

/**
 * Extrait l'ID d'une vidéo YouTube
 */
export function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/,
  );
  return match?.[1] ?? null;
}

/**
 * Extrait l'ID d'une vidéo Vimeo
 */
export function extractVimeoId(url: string): string | null {
  const match = url.match(/(?:vimeo\.com\/)(\d+)/);
  return match?.[1] ?? null;
}

/**
 * Calcule le temps de lecture estimé
 */
export function readingTime(
  text: string,
  wordsPerMinute: number = 200,
): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Formatte un nombre avec séparateur de milliers
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("fr-FR").format(num);
}

/**
 * Retourne l'année courante
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Vérifie si une image existe (côté client)
 */
export function imageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
