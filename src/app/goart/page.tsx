"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import flaskImage from "@/assets/images/flask.png";
import "./goart.css";
import { ChevronDown, ChevronRight, ImagePlus, } from "lucide-react";
import GoartPageContext from "./goartPageContext";
import ImageGenre from "../components/ImageGenre/ImageGenre";
import mainImage from "@/assets/images/mainImage.png";
import starImage from "@/assets/images/star.svg";


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

  const context = useRef<ReturnType<typeof GoartPageContext.create> | null>(null);

  if (context.current === null) {
    context.current = GoartPageContext.create({
      statusReactive: statusReactive.current,
      listReference,
    }).setupComponent();
  }

  useEffect(() => {
    // Update statusReactive when state changes
    statusReactive.current.selectedCategory = selectedCategory;
    statusReactive.current.showPreviousArrow = showPreviousArrow;
    statusReactive.current.showNextArrow = showNextArrow;
  }, [selectedCategory, showPreviousArrow, showNextArrow]);

  useEffect(() => {
    const cleanup = context.current?.attachScrollListener();
    return cleanup;
  }, []);

  return (
    <div className="unit-AiArt">
      <div className="effects">
        {/* tiều đề */}
        <div className="header-effects">
          <div className="header">
            <Image
              src={flaskImage}
              alt="Flask icon"
              width={16}
              height={16}
              className="flask-icon"
            />
            <span className="title">AI Art Effects</span>
          </div>
        </div>

        {/* search */}
        <div className="search-effect">
          <input
            type="text"
            placeholder="Search effects"
            className="search-input"
          />
        </div>

        {/* List Category with Arrows */}
        <div className="list-effects">
          {/* Prev Arrow */}
          <div
            className={`container container-prev ${!showPreviousArrow ? "hidden" : ""}`}
            onClick={() => context.current?.scrollList({ direction: "left" })}
          >
            <div className="arrow">
              <ChevronRight style={{ color: "var(--text-icon-color-3)", width: "18px" }} />
            </div>
          </div>

          {/* Next Arrow */}
          <div
            className={`container container-next ${!showNextArrow ? "hidden" : ""}`}
          >
            <div
              className="arrow"
              onClick={() => context.current?.scrollList({ direction: "right" })}
            >
              <ChevronRight style={{ color: "var(--text-icon-color-3)", width: "18px" }} />
            </div>
          </div>

          {/* Category List */}
          <ul ref={listReference} className="category">
            {context.current?.categories.map((category: string) => (
              <li
                key={category}
                className={`item ${selectedCategory === category ? "active" : ""}`}
                onClick={() => {
                  context.current?.selectCategory({ category });
                  setSelectedCategory(category);
                }}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Phần hiển thị ảnh */}
        <ImageGenre
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          displayCategories={context.current?.displayCategories ?? []}
        />
      </div>

      <div className="finish">
        <div className="main-image-container">
          <Image
            src={mainImage}
            alt="Main image"
            className="main-image"
          />
        </div>
        <h1><span>Transform Your Photo into Artwork  <Image
          src={starImage}
          alt="Star image"
          className="star-image"
        /></span>
        </h1>
        <div className="update-image-container">
          <button className="update-image-button">
            <ImagePlus />
            Update Image
            <div className="road" />
            <ChevronDown className="angle-down" />
          </button>
          <div className="image-format">
            <span className="image-format-title">Image format:</span>
            <div className="image-format-options">
              <div className="bt-category">JPG</div>
              <div className="bt-category">PNG</div>
              <div className="bt-category">GIF</div>
              <div className="bt-category">WEBP</div>
              <div className="bt-category">SVG</div>
              <div className="bt-category">TIFF</div>
              <div className="bt-category">PDF</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
