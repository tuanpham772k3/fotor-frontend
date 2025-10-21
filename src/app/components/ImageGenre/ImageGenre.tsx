"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import ImageGenreContext from "./ImageGenreContext";
import "./ImageGenre.css";
import diamond from "@/assets/images/diamond.svg";
import starFavorite from "@/assets/images/star-favorite.svg";
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
    const context = useMemo(
        () =>
            ImageGenreContext.create({
                selectedCategory,
                onCategoryChange,
                displayCategories,
            }).setupComponent(),
        [selectedCategory, onCategoryChange, displayCategories]
    );

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
                                                    width={60}
                                                    height={60}
                                                    className="thumb"
                                                    unoptimized
                                                />
                                                {item.meta.isPro && (
                                                    <div className="pro-icon">
                                                        <Image
                                                            src={diamond}
                                                            alt="diamond"
                                                            width={12}
                                                            height={12}
                                                        />
                                                        <span className="pro-text">PRO</span>
                                                    </div>
                                                )}
                                                <div className="favorite-icon">
                                                    <Image
                                                        src={starFavorite}
                                                        alt="star favorite"
                                                        width={17}
                                                        height={17}
                                                    />
                                                </div>
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
                                                    width={60}
                                                    height={60}
                                                    className="thumb"
                                                    unoptimized
                                                />
                                                {item.meta.isPro && (
                                                    <div className="pro-icon">
                                                        <Image
                                                            src={diamond}
                                                            alt="diamond"
                                                            width={12}
                                                            height={12}
                                                        />
                                                        <span className="pro-text">PRO</span>
                                                    </div>
                                                )}
                                                <div className="favorite-icon">
                                                    <Image
                                                        src={starFavorite}
                                                        alt="star favorite"
                                                        width={17}
                                                        height={17}
                                                    />
                                                </div>
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
