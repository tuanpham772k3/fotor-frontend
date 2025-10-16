"use client";

import React, { useRef } from "react";
import Image from "next/image";
import ImageGenreContext from "./ImageGenreContext";
import "./ImageGenre.css";

interface EffectItem {
    _id: string;
    title: string;
    thumbnailUrl: string;
    category: string;
}

interface ImageGenreProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    displayCategories: string[];
}

/**
 * ImageGenre component displays effects organized by categories.
 * Supports both "All categories" view and single category view.
 */
export default function ImageGenre({
    selectedCategory,
    onCategoryChange,
    displayCategories,
}: ImageGenreProps) {
    const context = useRef(
        ImageGenreContext.create({
            selectedCategory,
            onCategoryChange,
            displayCategories,
        }).setupComponent()
    ).current;

    // Update context when props change
    context.selectedCategory = selectedCategory;
    context.onCategoryChange = onCategoryChange;
    context.displayCategories = displayCategories;

    return (
        <div className="unit-image-genre">
            <div className="category-sections">
                {context.isAllCategoryView ? (
                    // All categories view - display each category with limited effects
                    context.getAllCategoriesDisplayData().map(({ category, effects }: { category: string; effects: EffectItem[] }) => {
                        return (
                            <div key={category} className="category-block">
                                <div className="category-header">
                                    <h3 className="category-title">{category}</h3>
                                    <button
                                        className="see-all"
                                        onClick={() => {
                                            context.selectCategory({ category });
                                        }}
                                    >
                                        See all
                                    </button>
                                </div>

                                <div className="image-grid">
                                    {effects.map((item: EffectItem) => (
                                        <div key={item._id} className="effect-card">
                                            <div className="image-wrapper">
                                                <Image
                                                    src={item.thumbnailUrl}
                                                    alt={item.title}
                                                    width={100}
                                                    height={100}
                                                    className="thumb"
                                                />
                                            </div>
                                            <p className="effect-title">{item.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    // Single category view - display all effects for selected category
                    (() => {
                        const { category, effects } = context.getSingleCategoryDisplayData();
                        return (
                            <div className="category-block">
                                <div className="category-header">
                                    <h3 className="category-title">{category}</h3>
                                    <button
                                        className="see-all"
                                        onClick={() => {
                                            context.selectCategory({ category: "All" });
                                        }}
                                    >
                                        Back
                                    </button>
                                </div>

                                <div className="image-grid">
                                    {effects.map((item: EffectItem) => (
                                        <div key={item._id} className="effect-card">
                                            <div className="image-wrapper">
                                                <Image
                                                    src={item.thumbnailUrl}
                                                    alt={item.title}
                                                    width={100}
                                                    height={100}
                                                    className="thumb"
                                                />
                                            </div>
                                            <p className="effect-title">{item.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })()
                )}
            </div>
        </div>
    );
}
