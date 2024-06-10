import React from "react";
import "./loadingSkeleton.css";

const LoadingSkeleton = () => {
  return (
    <div className="user-side-loading-main">
      <div className="user-side-loading-container">
        <div className="user-side-loading-text">
          <span>G</span>
          <span>Y</span>
          <span>M</span>
          <span>_</span>
          <span>H</span>
          <span>U</span>
          <span>B</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
