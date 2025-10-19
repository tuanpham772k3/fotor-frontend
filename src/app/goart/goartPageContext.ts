interface GoartPageStatusReactive {
  selectedCategory: string;
  showPreviousArrow: boolean;
  showNextArrow: boolean;
  setShowPreviousArrow?: (value: boolean) => void;
  setShowNextArrow?: (value: boolean) => void;
}

interface GoartPageContextParams {
  statusReactive: GoartPageStatusReactive;
  listReference: React.RefObject<HTMLUListElement | null>;
}

/**
 * Context class for managing GoArt page functionality.
 * Handles category navigation and scroll behavior for category list.
 */
export default class GoartPageContext {
  // Scroll behavior constants
  private static readonly SCROLL_THRESHOLD_PIXELS = 5;
  private static readonly SCROLL_DISTANCE_PERCENTAGE = 0.6;

  // Category constants
  private static readonly SPECIAL_CATEGORIES = ["Favorite", "All"] as const;
  private static readonly AVAILABLE_CATEGORIES = [
    "Favorite",
    "All",
    "Popular",
    "Cartoon",
    "Sketch",
    "Watercolor",
    "Universal",
  ] as const;

  statusReactive: GoartPageStatusReactive;
  listReference: React.RefObject<HTMLUListElement | null>;

  /**
   * Constructor for GoartPageContext.
   *
   * @param params - Parameters for this constructor.
   */
  constructor({ statusReactive, listReference }: GoartPageContextParams) {
    this.statusReactive = statusReactive;
    this.listReference = listReference;
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
   * Get all categories for navigation.
   *
   * @returns Array of all available categories.
   */
  get categories(): readonly string[] {
    return GoartPageContext.AVAILABLE_CATEGORIES;
  }

  /**
   * Get categories for display when "All" is selected.
   * Filters out special categories (Favorite and All).
   *
   * @returns List of regular display categories.
   */
  get displayCategories(): string[] {
    return GoartPageContext.AVAILABLE_CATEGORIES.filter((category: string) => {
      return !this.isSpecialCategory({ category });
    });
  }

  /**
   * Check if a category is a special category.
   *
   * @param params - Parameters for this method.
   * @returns True if category is special (Favorite or All).
   */
  isSpecialCategory({ category }: { category: string }): boolean {
    return (GoartPageContext.SPECIAL_CATEGORIES as readonly string[]).includes(category);
  }

  /**
   * Check if list can scroll to previous position.
   *
   * @param params - Parameters for this method.
   * @returns True if can scroll left.
   */
  canScrollToPrevious({ element }: { element: HTMLUListElement }): boolean {
    return element.scrollLeft > GoartPageContext.SCROLL_THRESHOLD_PIXELS;
  }

  /**
   * Check if list can scroll to next position.
   *
   * @param params - Parameters for this method.
   * @returns True if can scroll right.
   */
  canScrollToNext({ element }: { element: HTMLUListElement }): boolean {
    const maximumScrollPosition = element.scrollWidth - element.clientWidth;
    const currentScrollPosition = element.scrollLeft;
    const remainingScrollDistance = maximumScrollPosition - currentScrollPosition;

    return remainingScrollDistance > GoartPageContext.SCROLL_THRESHOLD_PIXELS;
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

    const shouldShowPrevious = this.canScrollToPrevious({ element });
    const shouldShowNext = this.canScrollToNext({ element });

    if (this.statusReactive.setShowPreviousArrow) {
      this.statusReactive.setShowPreviousArrow(shouldShowPrevious);
    } else {
      this.statusReactive.showPreviousArrow = shouldShowPrevious;
    }

    if (this.statusReactive.setShowNextArrow) {
      this.statusReactive.setShowNextArrow(shouldShowNext);
    } else {
      this.statusReactive.showNextArrow = shouldShowNext;
    }
  }

  /**
   * Attach scroll event listener to list element.
   *
   * @returns Cleanup function to remove listener.
   */
  attachScrollListener(): () => void {
    const element = this.currentListElement;

    if (!element) {
      return () => { };
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
   * Calculate scroll distance based on element width.
   *
   * @param params - Parameters for this method.
   * @returns Scroll distance in pixels.
   */
  calculateScrollDistance({ element }: { element: HTMLUListElement }): number {
    return element.clientWidth * GoartPageContext.SCROLL_DISTANCE_PERCENTAGE;
  }

  /**
   * Scroll list element to previous position.
   *
   * @returns void
   */
  scrollToPrevious(): void {
    const element = this.currentListElement;

    if (!element) {
      return;
    }

    const scrollDistance = this.calculateScrollDistance({ element });

    element.scrollBy({
      left: -scrollDistance,
      behavior: "smooth",
    });
  }

  /**
   * Scroll list element to next position.
   *
   * @returns void
   */
  scrollToNext(): void {
    const element = this.currentListElement;

    if (!element) {
      return;
    }

    const scrollDistance = this.calculateScrollDistance({ element });

    element.scrollBy({
      left: scrollDistance,
      behavior: "smooth",
    });
  }

  /**
   * Scroll list element in specified direction.
   *
   * @param params - Parameters for this method.
   * @returns void
   */
  scrollList({ direction }: { direction: "left" | "right" }): void {
    if (direction === "left") {
      this.scrollToPrevious();
      return;
    }

    this.scrollToNext();
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
}

