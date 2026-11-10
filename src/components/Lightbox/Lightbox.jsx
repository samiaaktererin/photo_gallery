import { useEffect } from "react";

export const Lightbox = ({ photo, onClose }) => {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = originalOverflow;
        };
    }, [onClose]);

    if (!photo) return null;

    const fullImage = photo.url || photo.thumbnailUrl;

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <div
                className="lightbox-card"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="lightbox-close"
                    onClick={onClose}
                    aria-label="Close image"
                >
                    &times;
                </button>

                <div className="lightbox-image-wrap">
                    <img
                        src={photo.url || photo.thumbnailUrl}
                        alt={photo.title}
                    />

                </div>

                <div className="lightbox-details">
                    <h2>{photo.title}</h2>
                    <p>Photo ID: {photo.id}</p>
                    <p>Album: {photo.albumId}</p>
                </div>
            </div>
        </div>
    );

};