"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import flaskImage from "@/assets/images/flask.png";
import "./goart.css";
import { ChevronRight } from "lucide-react";
import GoartPageContext from "./goartPageContext";

interface EffectItem {
  _id: string;
  title: string;
  thumbnailUrl: string;
  category: string;
}

export default function GoArtPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showPreviousArrow, setShowPreviousArrow] = useState<boolean>(false);
  const [showNextArrow, setShowNextArrow] = useState<boolean>(true);
  const listReference = useRef<HTMLUListElement>(null);

  const statusReactive = useRef({
    selectedCategory,
    showPreviousArrow,
    showNextArrow,
    setShowPreviousArrow,
    setShowNextArrow,
  });

  // Update statusReactive when state changes
  statusReactive.current.selectedCategory = selectedCategory;
  statusReactive.current.showPreviousArrow = showPreviousArrow;
  statusReactive.current.showNextArrow = showNextArrow;

  const context = useRef(
    GoartPageContext.create({
      statusReactive: statusReactive.current,
      listReference,
    }).setupComponent()
  ).current;

  useEffect(() => {
    const cleanup = context.attachScrollListener();
    return cleanup;
  }, [context]);

  return (
    <div className="unit-AiArt">
      <div className="effects">
        {/* tiều đề */}
        <div className="header-effects">
          <div className="header">
            <Image
              src={flaskImage}
              alt="Flask icon"
              width={24}
              height={24}
              className="flask-icon"
            />
            <span className="title">AI Art Effects</span>
          </div>
        </div>

        {/* search */}
        <div className="search-effect">
          <input
            type="text"
            name=""
            id=""
            placeholder="Tìm kiếm hiệu ứng"
            className="search-input"
          />
        </div>

        {/* List Category with Arrows */}
        <div className="list-effects">
          {/* Prev Arrow */}
          {showPreviousArrow && (
            <div
              className="container container-prev"
              onClick={() => context.scrollList({ direction: "left" })}
            >
              <div className="arrow">
                <ChevronRight style={{ color: "var(--text-icon-color-3)", width: "18px" }} />
              </div>
            </div>
          )}

          {/* Next Arrow */}
          {showNextArrow && (
            <div className="container container-next">
              <div
                className="arrow"
                onClick={() => context.scrollList({ direction: "right" })}
              >
                <ChevronRight style={{ color: "var(--text-icon-color-3)", width: "18px" }} />
              </div>
            </div>
          )}

          {/* Category List */}
          <ul ref={listReference} className="category">
            {context.categories.map((category: string) => (
              <li
                key={category}
                className={`item ${selectedCategory === category ? "active" : ""}`}
                onClick={() => {
                  context.selectCategory({ category });
                  setSelectedCategory(category);
                }}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Phần hiển thị ảnh */}
        <div className="category-sections">
          {context.isAllCategoryView ? (
            // Nếu đang ở chế độ All → hiển thị từng danh mục (trừ All & Favorite)
            context.getAllCategoriesDisplayData().map(({ category, effects }: { category: string; effects: EffectItem[] }) => {
              return (
                <div key={category} className="category-block">
                  <div className="category-header">
                    <h3 className="category-title">{category}</h3>
                    <button
                      className="see-all"
                      onClick={() => {
                        context.selectCategory({ category });
                        setSelectedCategory(category);
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
            // Nếu đang ở chế độ xem 1 danh mục cụ thể
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
                        setSelectedCategory("All");
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

      <div className="finish">
        abc
      </div>
    </div>
  );
}
