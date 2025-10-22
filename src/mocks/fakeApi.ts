// Image URLs pool
const imageUrls = [
  "https://i.pinimg.com/1200x/dc/3a/86/dc3a8672c03f0872422837c7b96afa04.jpg",
  "https://i.pinimg.com/1200x/70/44/d8/7044d87aa9b3147a3629ddce317ba1cb.jpg",
  "https://i.pinimg.com/736x/e7/1d/02/e71d023d0aa88582c5bac8daeb508c05.jpg",
  "https://i.pinimg.com/736x/84/50/61/845061ac93930fc15420096f18f0190f.jpg",
  "https://i.pinimg.com/736x/e2/cb/ac/e2cbac85db3fab296a4f96fb3f200032.jpg",
  "https://i.pinimg.com/736x/6a/e6/2d/6ae62dc152c9db6299e563a6216a6d13.jpg",
  "https://i.pinimg.com/736x/9b/4a/f5/9b4af5f0a6e9e74c0be403097928538f.jpg",
  "https://i.pinimg.com/736x/c1/f3/72/c1f3728fb35311406d0db088e14aeefe.jpg",
  "https://i.pinimg.com/736x/20/b4/f7/20b4f7508fceb760589814f5ae8a2b8a.jpg",
  "https://i.pinimg.com/1200x/8b/4b/a7/8b4ba7f559bf1e0ac883d210ebe20be0.jpg",
  "https://i.pinimg.com/1200x/67/f6/f2/67f6f2651fed1a00a3aad12d89e5b550.jpg",
];

// Helper function to get random image URL
const getRandomImageUrl = () => imageUrls[Math.floor(Math.random() * imageUrls.length)];

export interface EffectItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  meta: {
    popularity: number;
    isFavorite: boolean;
    isPro: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export const fakeEffectsData: EffectItem[] = [
  // POPULAR
  {
    _id: "650c1f01",
    title: "Cartoon 3D 1",
    slug: "cartoon-3d-1",
    category: "Popular",
    description: "3D cartoon style",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 95, isFavorite: true, isPro: true },
    createdAt: "2025-10-13T02:14:00.000Z",
    updatedAt: "2025-10-13T02:14:00.000Z",
  },
  {
    _id: "650c1f02",
    title: "Cartoon 3D 2",
    slug: "cartoon-3d-2",
    category: "Popular",
    description: "3D cartoon style",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 98, isFavorite: true, isPro: false },
    createdAt: "2025-10-13T02:14:00.000Z",
    updatedAt: "2025-10-13T02:14:00.000Z",
  },
  {
    _id: "650c1f03",
    title: "Cartoon 3D 3",
    slug: "cartoon-3d-3",
    category: "Popular",
    description: "3D cartoon style",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 91, isFavorite: false, isPro: true },
    createdAt: "2025-10-13T02:14:00.000Z",
    updatedAt: "2025-10-13T02:14:00.000Z",
  },
  {
    _id: "650c1f04",
    title: "Cartoon 3D 4",
    slug: "cartoon-3d-4",
    category: "Popular",
    description: "3D cartoon style",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 80, isFavorite: false, isPro: false },
    createdAt: "2025-10-13T02:14:00.000Z",
    updatedAt: "2025-10-13T02:14:00.000Z",
  },
  {
    _id: "650c1f05",
    title: "Cartoon 3D 5",
    slug: "cartoon-3d-5",
    category: "Popular",
    description: "3D cartoon style",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 85, isFavorite: true, isPro: true },
    createdAt: "2025-10-13T02:14:00.000Z",
    updatedAt: "2025-10-13T02:14:00.000Z",
  },
  {
    _id: "650c1f06",
    title: "Cartoon 3D 6",
    slug: "cartoon-3d-6",
    category: "Popular",
    description: "3D cartoon style",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 77, isFavorite: false, isPro: false },
    createdAt: "2025-10-13T02:14:00.000Z",
    updatedAt: "2025-10-13T02:14:00.000Z",
  },

  // CARTOON
  ...Array.from({ length: 9 }, (_, i) => ({
    _id: `650c2f${i}`,
    title: `Cartoon Effect ${i + 1}`,
    slug: `cartoon-effect-${i + 1}`,
    category: "Cartoon",
    description: "Cartoon illustration",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 70 + i, isFavorite: i % 2 === 0, isPro: i % 3 === 0 },
    createdAt: "2025-10-14T02:14:00.000Z",
    updatedAt: "2025-10-14T02:14:00.000Z",
  })),

  // SKETCH
  ...Array.from({ length: 6 }, (_, i) => ({
    _id: `650c3f${i}`,
    title: `Sketch Style ${i + 1}`,
    slug: `sketch-style-${i + 1}`,
    category: "Sketch",
    description: "Pencil sketch effect",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 50 + i, isFavorite: i % 3 === 0, isPro: i % 2 === 1 },
    createdAt: "2025-10-14T02:14:00.000Z",
    updatedAt: "2025-10-14T02:14:00.000Z",
  })),

  // WATERCOLOR
  ...Array.from({ length: 6 }, (_, i) => ({
    _id: `650c4f${i}`,
    title: `Watercolor ${i + 1}`,
    slug: `watercolor-${i + 1}`,
    category: "Watercolor",
    description: "Soft watercolor painting",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 60 + i, isFavorite: false, isPro: i < 3 },
    createdAt: "2025-10-14T02:14:00.000Z",
    updatedAt: "2025-10-14T02:14:00.000Z",
  })),

  // UNIVERSAL
  ...Array.from({ length: 6 }, (_, i) => ({
    _id: `650c5f${i}`,
    title: `Universal Effect ${i + 1}`,
    slug: `universal-effect-${i + 1}`,
    category: "Universal",
    description: "Versatile effect",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 65 + i, isFavorite: i === 2, isPro: false },
    createdAt: "2025-10-14T02:14:00.000Z",
    updatedAt: "2025-10-14T02:14:00.000Z",
  })),

  // ANIME
  ...Array.from({ length: 8 }, (_, i) => ({
    _id: `650c6f${i}`,
    title: `Anime Style ${i + 1}`,
    slug: `anime-style-${i + 1}`,
    category: "Anime",
    description: "Japanese anime art style",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 88 + i, isFavorite: i % 2 === 1, isPro: i > 4 },
    createdAt: "2025-10-14T02:14:00.000Z",
    updatedAt: "2025-10-14T02:14:00.000Z",
  })),

  // OIL PAINTING
  ...Array.from({ length: 7 }, (_, i) => ({
    _id: `650c7f${i}`,
    title: `Oil Painting ${i + 1}`,
    slug: `oil-painting-${i + 1}`,
    category: "Oil Painting",
    description: "Classic oil painting effect",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 72 + i, isFavorite: i === 3, isPro: i % 2 === 0 },
    createdAt: "2025-10-14T02:14:00.000Z",
    updatedAt: "2025-10-14T02:14:00.000Z",
  })),

  // PIXEL ART
  ...Array.from({ length: 5 }, (_, i) => ({
    _id: `650c8f${i}`,
    title: `Pixel Art ${i + 1}`,
    slug: `pixel-art-${i + 1}`,
    category: "Pixel Art",
    description: "Retro pixel art style",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 55 + i, isFavorite: i === 0, isPro: i > 2 },
    createdAt: "2025-10-14T02:14:00.000Z",
    updatedAt: "2025-10-14T02:14:00.000Z",
  })),

  // ABSTRACT
  ...Array.from({ length: 6 }, (_, i) => ({
    _id: `650c9f${i}`,
    title: `Abstract Art ${i + 1}`,
    slug: `abstract-art-${i + 1}`,
    category: "Abstract",
    description: "Modern abstract art",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 68 + i, isFavorite: i % 4 === 0, isPro: i % 3 === 0 },
    createdAt: "2025-10-14T02:14:00.000Z",
    updatedAt: "2025-10-14T02:14:00.000Z",
  })),

  // REALISTIC
  ...Array.from({ length: 7 }, (_, i) => ({
    _id: `650caf${i}`,
    title: `Realistic ${i + 1}`,
    slug: `realistic-${i + 1}`,
    category: "Realistic",
    description: "Photorealistic effect",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 82 + i, isFavorite: i === 1 || i === 4, isPro: true },
    createdAt: "2025-10-14T02:14:00.000Z",
    updatedAt: "2025-10-14T02:14:00.000Z",
  })),

  // FANTASY
  ...Array.from({ length: 8 }, (_, i) => ({
    _id: `650cbf${i}`,
    title: `Fantasy World ${i + 1}`,
    slug: `fantasy-world-${i + 1}`,
    category: "Fantasy",
    description: "Magical fantasy art",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 75 + i, isFavorite: i % 3 === 0, isPro: i % 2 === 1 },
    createdAt: "2025-10-14T02:14:00.000Z",
    updatedAt: "2025-10-14T02:14:00.000Z",
  })),

  // CYBERPUNK
  ...Array.from({ length: 6 }, (_, i) => ({
    _id: `650ccf${i}`,
    title: `Cyberpunk ${i + 1}`,
    slug: `cyberpunk-${i + 1}`,
    category: "Cyberpunk",
    description: "Futuristic cyberpunk style",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 79 + i, isFavorite: i === 2 || i === 5, isPro: i < 4 },
    createdAt: "2025-10-14T02:14:00.000Z",
    updatedAt: "2025-10-14T02:14:00.000Z",
  })),

  // VINTAGE
  ...Array.from({ length: 5 }, (_, i) => ({
    _id: `650cdf${i}`,
    title: `Vintage ${i + 1}`,
    slug: `vintage-${i + 1}`,
    category: "Vintage",
    description: "Classic vintage style",
    thumbnailUrl: getRandomImageUrl(),
    meta: { popularity: 63 + i, isFavorite: i === 1, isPro: i === 0 || i === 4 },
    createdAt: "2025-10-14T02:14:00.000Z",
    updatedAt: "2025-10-14T02:14:00.000Z",
  })),
];

// Danh mục All bao gồm tất cả
export const getEffectsByCategory = (cat: string) =>
  cat === "All" ? fakeEffectsData : fakeEffectsData.filter((i) => i.category === cat);
