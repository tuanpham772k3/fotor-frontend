"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import flaskImage from "@/assets/images/flask.png";
import "./goart.css";
import { ChevronRight } from "lucide-react";
export default function GoArtPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const listRef = useRef<HTMLUListElement>(null);

  const categories = ["Favorite", "All", "Popular", "Cartoon", "Sketch", "Watercolor", "Universal"];

  // Kiểm tra vị trí scroll để ẩn/hiện nút
  const updateArrows = () => {
    const el = listRef.current;
    if (!el) return;
    setShowPrev(el.scrollLeft > 5);
    setShowNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  // Chạy khi mount và khi cuộn
  useEffect(() => {
    updateArrows();
    const el = listRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows);
    return () => el.removeEventListener("scroll", updateArrows);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = listRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };
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
          {showPrev && (
            <div className="container container-prev" onClick={() => scroll("left")}>
              <div className="arrow">
                <ChevronRight style={{ color: "var(--text-icon-color-3)", width: "18px" }} />
              </div>
            </div>
          )}

          {/* Next Arrow */}
          {showNext && (
            <div className="container container-next">
              <div className="arrow" onClick={() => scroll("right")}>
                <ChevronRight style={{ color: "var(--text-icon-color-3)", width: "18px" }} />
              </div>
            </div>
          )}

          {/* Category List */}
          <ul ref={listRef} className="category">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`item ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "Favorite"
                  ? "Favorite"
                  : cat === "All"
                  ? "All"
                  : cat === "Popular"
                  ? "Popular"
                  : cat === "Cartoon"
                  ? "Cartoon"
                  : cat === "Sketch"
                  ? "Sketch"
                  : cat === "Watercolor"
                  ? "Watercolor"
                  : cat === "Universal"
                  ? "Universal"
                  : cat}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="finish"></div>
    </div>
  );
}
