import { useState } from "react";
import { usePhotos } from "../PhotoContext/PhotoContext";

export const EditPhoto = ({ photo, onClose }) => {
  const { updatePhoto } = usePhotos();
  const [editedTitle, setEditedTitle] = useState(photo.title);

  const handleSave = (e) => {
    e.preventDefault();

    const trimmedTitle = editedTitle.trim();

    if (!trimmedTitle) {
      alert("Please enter a title.");
      return;
    }

    updatePhoto(photo.id, trimmedTitle);
    onClose();
  };

  return (
    <div
      className="edit-modal-overlay"
      onClick={onClose}
    >
      <div
        className="edit-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="edit-close-btn"
          onClick={onClose}
          aria-label="Close edit form"
        >
          ×
        </button>

        <div className="edit-modal-image">
          <img
            src={photo.url || photo.thumbnailUrl}
            alt={photo.title}
          />
        </div>

        <div className="edit-modal-content">
          <h2>Edit Photo</h2>

          <form onSubmit={handleSave}>
            <div className="form-group">
              <label htmlFor="photo-title">
                Photo Title
              </label>

              <input
                id="photo-title"
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Enter photo title"
                autoFocus
                required
              />
            </div>

            <div className="edit-modal-meta">
             
              <p>Album ID: {photo.albumId}</p>
               <p>Photo ID: {photo.id}</p>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="save-btn"
              >
                Save Changes
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};