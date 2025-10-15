"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import flaskImage from "@/assets/images/flask.png";
import "./goart.css";
import { ChevronRight, Heart } from "lucide-react";
import { getEffectsByCategory } from "@/mocks/fakeApi";
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

  // Lấy danh sách các category để hiển thị khi All được chọn (loại bỏ Favorite + All)
  const displayCategories = categories.filter((cat) => cat !== "Favorite" && cat !== "All");

  // Nếu chọn All → hiển thị từng section theo danh mục
  // Nếu chọn danh mục cụ thể → hiển thị toàn bộ ảnh của danh mục đó
  const isAllView = selectedCategory === "All";

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
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Phần hiển thị ảnh */}
        <div className="category-sections">
          {isAllView ? (
            // Nếu đang ở chế độ All → hiển thị từng danh mục (trừ All & Favorite)
            displayCategories.map((cat) => {
              const data = getEffectsByCategory(cat).slice(0, 6);
              return (
                <div key={cat} className="category-block">
                  <div className="category-header">
                    <h3 className="category-title">{cat}</h3>
                    <button className="see-all" onClick={() => setSelectedCategory(cat)}>
                      See all
                    </button>
                  </div>

                  <div className="image-grid">
                    {data.map((item) => (
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
            <div className="category-block">
              <div className="category-header">
                <h3 className="category-title">{selectedCategory}</h3>
                <button className="see-all" onClick={() => setSelectedCategory("All")}>
                  Back
                </button>
              </div>

              <div className="image-grid">
                {getEffectsByCategory(selectedCategory).map((item) => (
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
          )}
        </div>
      </div>

      <div className="finish"></div>
    </div>
  );
}
