// /app/goart/fakeApi.ts

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
    thumbnailUrl: "https://i.pinimg.com/736x/5c/6b/c0/5c6bc05d84786668c7aeaf7b9fe93523.jpg",
    meta: { popularity: 95, isFavorite: true },
    createdAt: "2025-10-13T02:14:00.000Z",
    updatedAt: "2025-10-13T02:14:00.000Z",
  },
  {
    _id: "650c1f02",
    title: "Cartoon 3D 2",
    slug: "cartoon-3d-2",
    category: "Popular",
    description: "3D cartoon style",
    thumbnailUrl: "https://i.pinimg.com/736x/5c/6b/c0/5c6bc05d84786668c7aeaf7b9fe93523.jpg",
    meta: { popularity: 98, isFavorite: true },
    createdAt: "2025-10-13T02:14:00.000Z",
    updatedAt: "2025-10-13T02:14:00.000Z",
  },
  {
    _id: "650c1f03",
    title: "Cartoon 3D 3",
    slug: "cartoon-3d-3",
    category: "Popular",
    description: "3D cartoon style",
    thumbnailUrl: "https://i.pinimg.com/736x/5c/6b/c0/5c6bc05d84786668c7aeaf7b9fe93523.jpg",
    meta: { popularity: 91, isFavorite: false },
    createdAt: "2025-10-13T02:14:00.000Z",
    updatedAt: "2025-10-13T02:14:00.000Z",
  },
  {
    _id: "650c1f04",
    title: "Cartoon 3D 4",
    slug: "cartoon-3d-4",
    category: "Popular",
    description: "3D cartoon style",
    thumbnailUrl: "https://i.pinimg.com/736x/5c/6b/c0/5c6bc05d84786668c7aeaf7b9fe93523.jpg",
    meta: { popularity: 80, isFavorite: false },
    createdAt: "2025-10-13T02:14:00.000Z",
    updatedAt: "2025-10-13T02:14:00.000Z",
  },
  {
    _id: "650c1f05",
    title: "Cartoon 3D 5",
    slug: "cartoon-3d-5",
    category: "Popular",
    description: "3D cartoon style",
    thumbnailUrl: "https://i.pinimg.com/736x/5c/6b/c0/5c6bc05d84786668c7aeaf7b9fe93523.jpg",
    meta: { popularity: 85, isFavorite: true },
    createdAt: "2025-10-13T02:14:00.000Z",
    updatedAt: "2025-10-13T02:14:00.000Z",
  },
  {
    _id: "650c1f06",
    title: "Cartoon 3D 6",
    slug: "cartoon-3d-6",
    category: "Popular",
    description: "3D cartoon style",
    thumbnailUrl: "https://i.pinimg.com/736x/5c/6b/c0/5c6bc05d84786668c7aeaf7b9fe93523.jpg",
    meta: { popularity: 77, isFavorite: false },
    createdAt: "2025-10-13T02:14:00.000Z",
    updatedAt: "2025-10-13T02:14:00.000Z",
  },

  // CARTOON
  ...Array.from({ length: 6 }, (_, i) => ({
    _id: `650c2f${i}`,
    title: `Cartoon Effect ${i + 1}`,
    slug: `cartoon-effect-${i + 1}`,
    category: "Cartoon",
    description: "Cartoon illustration",
    thumbnailUrl: "https://i.pinimg.com/736x/5c/6b/c0/5c6bc05d84786668c7aeaf7b9fe93523.jpg",
    meta: { popularity: 70 + i, isFavorite: i % 2 === 0 },
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
    thumbnailUrl: "https://i.pinimg.com/736x/5c/6b/c0/5c6bc05d84786668c7aeaf7b9fe93523.jpg",
    meta: { popularity: 50 + i, isFavorite: i % 3 === 0 },
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
    thumbnailUrl: "https://i.pinimg.com/474x/2c/d8/39/2cd839c91eb09554643d9a8fcd149aeb.jpg",
    meta: { popularity: 60 + i, isFavorite: false },
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
    thumbnailUrl: "https://i.pinimg.com/736x/5c/6b/c0/5c6bc05d84786668c7aeaf7b9fe93523.jpg",
    meta: { popularity: 65 + i, isFavorite: i === 2 },
    createdAt: "2025-10-14T02:14:00.000Z",
    updatedAt: "2025-10-14T02:14:00.000Z",
  })),
];

// Danh mục All bao gồm tất cả
export const getEffectsByCategory = (cat: string) =>
  cat === "All" ? fakeEffectsData : fakeEffectsData.filter((i) => i.category === cat);
