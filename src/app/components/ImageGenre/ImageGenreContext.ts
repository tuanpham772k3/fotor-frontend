import { getEffectsByCategory } from "@/mocks/fakeApi";

interface EffectItem {
  _id: string;
  title: string;
  thumbnailUrl: string;
  category: string;
  meta: {
    popularity: number;
    isFavorite: boolean;
    isPro: boolean;
  };
}

interface CategoryDisplayData {
  category: string;
  effects: EffectItem[];
}

interface ImageGenreContextParams {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  displayCategories: string[];
}

/**
 * Context class for managing ImageGenre component functionality.
 * Handles effect display logic based on selected category.
 */
export default class ImageGenreContext {
  private static readonly EFFECTS_PREVIEW_LIMIT = 6;

  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  displayCategories: string[];

  /**
   * Constructor for ImageGenreContext.
   *
   * @param params - Parameters for this constructor.
   */
  constructor({ selectedCategory, onCategoryChange, displayCategories }: ImageGenreContextParams) {
    this.selectedCategory = selectedCategory;
    this.onCategoryChange = onCategoryChange;
    this.displayCategories = displayCategories;
  }

  /**
   * Create a new instance of ImageGenreContext.
   *
   * @param params - Parameters for this factory method.
   * @returns New instance of ImageGenreContext.
   */
  static create({ selectedCategory, onCategoryChange, displayCategories }: ImageGenreContextParams): ImageGenreContext {
    return new this({
      selectedCategory,
      onCategoryChange,
      displayCategories,
    });
  }

  /**
   * Setup component initialization.
   *
   * @returns This instance for method chaining.
   */
  setupComponent(): this {
    return this;
  }

  /**
   * Check if current view is "All" category view.
   *
   * @returns True if "All" category is selected.
   */
  get isAllCategoryView(): boolean {
    return this.selectedCategory === "All";
  }

  /**
   * Get effects by category with optional limit.
   *
   * @param params - Parameters for this method.
   * @returns List of effects for the category.
   */
  getEffectsByCategory({ category, limit }: { category: string; limit?: number }): EffectItem[] {
    const effects = getEffectsByCategory(category) as EffectItem[];

    if (!limit) {
      return effects;
    }

    return effects.slice(0, limit);
  }

  /**
   * Get display data for all categories view.
   * Returns limited effects for each category.
   *
   * @returns Display data for all categories.
   */
  getAllCategoriesDisplayData(): CategoryDisplayData[] {
    return this.displayCategories.map((category: string) => {
      return {
        category,
        effects: this.getEffectsByCategory({
          category,
          limit: ImageGenreContext.EFFECTS_PREVIEW_LIMIT,
        }),
      };
    });
  }

  /**
   * Get display data for single category view.
   *
   * @returns Display data for selected category.
   */
  getSingleCategoryDisplayData(): CategoryDisplayData {
    return {
      category: this.selectedCategory,
      effects: this.getEffectsByCategory({
        category: this.selectedCategory,
      }),
    };
  }

  /**
   * Handle category selection change.
   *
   * @param params - Parameters for this method.
   * @returns void
   */
  selectCategory({ category }: { category: string }): void {
    this.onCategoryChange(category);
  }
}

