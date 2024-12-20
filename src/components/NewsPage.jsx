import { useEffect, useState } from "react";
import React from "react";
import "../App.css";
import Card from "./Card";

function NewsPage() {
  const apiKey = "4b75e81929254252af962c06298298b5";
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors

  const fetchNews = async (query) => {
    try {
      setIsLoading(true);
      setError(null); // Clear previous errors
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch news. Please try again.");
      }
      const jsonData = await response.json();
      setNewsData(jsonData.articles || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(search);
  }, [search]);

  const handleSearchClick = () => {
    if (search.trim()) {
      fetchNews(search);
    }
  };

  const handleCategoryClick = (e) => {
    const category = e.target.value;
    setSearch(category); // Update search term and fetch news
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div>
        <nav>
          <div>
            <h2>Newsify</h2>
          </div>
          <ul>
            <a>All news</a>
            <a>Trending</a>
          </ul>
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search News"
              onChange={handleInputChange}
              value={search}
            />
            <button onClick={handleSearchClick}>Search</button>
          </div>
        </nav>

        <div>
          <p className="head">Stay updated with Newsify</p>
        </div>

        <div className="categoryBtn">
          <button onClick={handleCategoryClick} value="sports">
            Sports
          </button>
          <button onClick={handleCategoryClick} value="health">
            Health
          </button>
          <button onClick={handleCategoryClick} value="entertainment">
            Entertainment
          </button>
          <button onClick={handleCategoryClick} value="fitness">
            Fitness
          </button>
          <button onClick={handleCategoryClick} value="politics">
            Politics
          </button>
        </div>

        <div>
          {isLoading ? (
            <p>Loading news...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : newsData.length > 0 ? (
            <Card data={newsData} />
          ) : (
            <p>No news found for "{search}".</p>
          )}
        </div>
      </div>
    </>
  );
}

export default NewsPage;
