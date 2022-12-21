import React, { useState, useEffect, useRef } from "react";

// Disclaimer, this entire Modal module was created using ChatGPT. I wanted to test out the possibilities with ChatGPT.

export default function ModalGallery({ photos }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef(null);

  const handleNextClick = () => {
    setCurrentImageIndex(currentImageIndex + 1);
    if (currentImageIndex === photos.length - 1) {
      setCurrentImageIndex(0);
    }
  };

  const handlePrevClick = () => {
    setCurrentImageIndex(currentImageIndex - 1);
    if (currentImageIndex === 0) {
      setCurrentImageIndex(photos.length - 1);
    }
  };

  const handleCloseClick = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "ArrowRight") {
        handleNextClick();
      } else if (event.key === "ArrowLeft") {
        handlePrevClick();
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentImageIndex]);

  function handleOutsideClick(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  return (
    <div>
      {isModalVisible && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-content" style={{ position: "relative" }}>
            <img
              src={photos[currentImageIndex]}
              className="modal-image"
              onClick={handleCloseClick}
              style={{
                display: "block",
                margin: "0 auto",
                width: "auto",
                height: "70vh",
              }}
            />

            <img
              src="/close.png"
              className="modal-close"
              style={{ position: "absolute", top: "5px", left: "5px" }}
              onClick={handleCloseClick}
            />
            <img
              src="/prev.png"
              className="modal-prev"
              style={{ position: "absolute", top: "50%", left: "5px" }}
              onClick={handlePrevClick}
            />
            <img
              src="/next.png"
              className="modal-next"
              style={{ position: "absolute", top: "50%", right: "5px" }}
              onClick={handleNextClick}
            />
          </div>
        </div>
      )}
      <div className="dogPhotos">
        {photos.map((photo) => {
          return (
            <img
              src={photo}
              className="dogPicture"
              onClick={() => setIsModalVisible(true)}
            />
          );
        })}
      </div>
    </div>
  );
}
