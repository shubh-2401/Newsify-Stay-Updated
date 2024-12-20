import React from "react";

const Card = ({ data }) => {
  return (
    <div className="cardContainer">
      {data.map((curItem, index) => {
        if (curItem.content === "[Removed]" || !curItem.urlToImage) {
          return null;
        }

        return (
          <div className="card" key={index}>
            <img src={curItem.urlToImage} alt="News" />
            <div className="content">
              <a  className = "title" onClick={() => window.open(curItem.url, "_blank")}>
                {curItem.title}
              </a>
              <p>{curItem.description}</p>
              <button onClick={() => window.open(curItem.url, "_blank")}>
                Read More
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;

