import { useState } from "react";
import { usePhotos } from "../PhotoContext/PhotoContext";
import "./AddNewPhoto.css";

export const AddNewPhoto = () => {
  const { addPhoto } = usePhotos();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [albumId, setAlbumId] = useState("1");
  const [previewError, setPreviewError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !imageUrl.trim()) {
      alert("Please enter both photo title and image URL.");
      return;
    }

    if (previewError) {
      alert("Please provide a valid image URL.");
      return;
    }

    const newPhoto = {
      title: title.trim(),
      url: imageUrl.trim(),
      thumbnailUrl: imageUrl.trim(),
      albumId: Number(albumId),
    };

    addPhoto(newPhoto);

    
    setTitle("");
    setImageUrl("");
    setAlbumId("1");
    setPreviewError(false);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTitle("");
    setImageUrl("");
    setAlbumId("1");
    setPreviewError(false);
  };

  return (
    <div className="add-photo-container">
      <button
        type="button"
        className="add-photo-button"
        onClick={() => setIsOpen(true)}
      >
        <span>+</span> Add New Photo
      </button>

     
      {isOpen && (
        <div className="add-photo-overlay" onClick={handleClose}>
          <form
            className="add-photo-form"
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="add-photo-form-header">
              <div>
                <span className="add-photo-subtitle">PHOTO GALLERY</span>
                <h2>Add a New Photo</h2>
                <p>Upload a photo using its image URL and add its details.</p>
              </div>

              <button
                type="button"
                className="add-photo-close"
                onClick={handleClose}
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            
            <div className="add-photo-field">
              <label htmlFor="photo-title">Photo Title</label>
              <input
                id="photo-title"
                type="text"
                placeholder="Enter your photo title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

          
            <div className="add-photo-field">
              <label htmlFor="photo-url">Image URL</label>
              <input
                id="photo-url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setPreviewError(false);
                }}
                required
              />
              <small>
                Paste a direct image URL to display your photo.
              </small>
            </div>

          
            <div className="add-photo-field">
              <label htmlFor="album-id">Album ID</label>
              <select
                id="album-id"
                value={albumId}
                onChange={(e) => setAlbumId(e.target.value)}
              >
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    Album {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="add-photo-preview">
              <label>Photo Preview</label>

              {imageUrl.trim() && !previewError ? (
                <img
                  src={imageUrl}
                  alt="Photo preview"
                  onError={() => setPreviewError(true)}
                  onLoad={() => setPreviewError(false)}
                />
              ) : (
                <div className="add-photo-preview-placeholder">
                  {previewError ? (
                    <p>Unable to load image. Check the URL.</p>
                  ) : (
                    <p>Your photo preview will appear here.</p>
                  )}
                </div>
              )}
            </div>

           
            <div className="add-photo-actions">
              <button
                type="button"
                className="add-photo-cancel"
                onClick={handleClose}
              >
                Cancel
              </button>

              <button type="submit" className="add-photo-submit">
                Add Photo
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};