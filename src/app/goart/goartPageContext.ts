import { getEffectsByCategory } from "@/mocks/fakeApi";

interface GoartPageStatusReactive {
  selectedCategory: string;
  showPreviousArrow: boolean;
  showNextArrow: boolean;
}

interface GoartPageContextParams {
  statusReactive: GoartPageStatusReactive;
  listReference: React.RefObject<HTMLUListElement | null>;
}

interface EffectItem {
  _id: string;
  title: string;
  thumbnailUrl: string;
  category: string;
}

interface CategoryDisplayData {
  category: string;
  effects: EffectItem[];
}

/**
 * Context class for managing GoArt page functionality.
 * Handles category selection, scroll behavior, and effect display logic.
 */
export default class GoartPageContext {
  statusReactive: GoartPageStatusReactive;
  listReference: React.RefObject<HTMLUListElement | null>;
  categories: string[];

  /**
   * Constructor for GoartPageContext.
   *
   * @param params - Parameters for this constructor.
   */
  constructor({ statusReactive, listReference }: GoartPageContextParams) {
    this.statusReactive = statusReactive;
    this.listReference = listReference;
    
    // Initialize categories list
    this.categories = [
      "Favorite",
      "All",
      "Popular",
      "Cartoon",
      "Sketch",
      "Watercolor",
      "Universal",
    ];
  }

  /**
   * Create a new instance of GoartPageContext.
   *
   * @param params - Parameters for this factory method.
   * @returns New instance of GoartPageContext.
   */
  static create({ statusReactive, listReference }: GoartPageContextParams): GoartPageContext {
    return new this({
      statusReactive,
      listReference,
    });
  }

  /**
   * Setup component initialization.
   * Initializes scroll listeners and arrow visibility.
   *
   * @returns This instance for method chaining.
   */
  setupComponent(): this {
    this.updateArrowVisibility();
    this.attachScrollListener();
    
    return this;
  }

  /**
   * Get current list element.
   *
   * @returns Current list element reference.
   */
  get currentListElement(): HTMLUListElement | null {
    return this.listReference.current;
  }

  /**
   * Get categories for display when "All" is selected.
   * Filters out "Favorite" and "All" categories.
   *
   * @returns List of display categories.
   */
  get displayCategories(): string[] {
    return this.categories.filter((category: string) => {
      return category !== "Favorite" && category !== "All";
    });
  }

  /**
   * Check if current view is "All" category view.
   *
   * @returns True if "All" category is selected.
   */
  get isAllCategoryView(): boolean {
    return this.statusReactive.selectedCategory === "All";
  }

  /**
   * Update arrow visibility based on scroll position.
   *
   * @returns void
   */
  updateArrowVisibility(): void {
    const element = this.currentListElement;
    
    if (!element) {
      return;
    }

    const scrollThreshold = 5;
    const shouldShowPrevious = element.scrollLeft > scrollThreshold;
    const shouldShowNext = 
      element.scrollLeft < element.scrollWidth - element.clientWidth - scrollThreshold;

    this.statusReactive.showPreviousArrow = shouldShowPrevious;
    this.statusReactive.showNextArrow = shouldShowNext;
  }

  /**
   * Attach scroll event listener to list element.
   *
   * @returns Cleanup function to remove listener.
   */
  attachScrollListener(): () => void {
    const element = this.currentListElement;
    
    if (!element) {
      return () => {};
    }

    const handleScroll = () => {
      this.updateArrowVisibility();
    };

    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }

  /**
   * Scroll list element in specified direction.
   *
   * @param params - Parameters for this method.
   * @returns void
   */
  scrollList({ direction }: { direction: "left" | "right" }): void {
    const element = this.currentListElement;
    
    if (!element) {
      return;
    }

    const scrollPercentage = 0.6;
    const scrollAmount = element.clientWidth * scrollPercentage;
    const scrollDistance = direction === "left" ? -scrollAmount : scrollAmount;

    element.scrollBy({
      left: scrollDistance,
      behavior: "smooth",
    });
  }

  /**
   * Handle category selection change.
   *
   * @param params - Parameters for this method.
   * @returns void
   */
  selectCategory({ category }: { category: string }): void {
    this.statusReactive.selectedCategory = category;
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
    const displayLimit = 6;

    return this.displayCategories.map((category: string) => {
      return {
        category,
        effects: this.getEffectsByCategory({ category, limit: displayLimit }),
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
      category: this.statusReactive.selectedCategory,
      effects: this.getEffectsByCategory({
        category: this.statusReactive.selectedCategory,
      }),
    };
  }
}

