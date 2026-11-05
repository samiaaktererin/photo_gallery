import { useState } from "react";
import { usePhotos } from "../PhotoContext/PhotoContext";
import (usePhotos)

export const AddPhoto = () => {
  const { addPhoto } = usePhotos();

  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [albumId, setAlbumId] = useState("1");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !imageUrl.trim() || !albumId) {
      return;
    }

    addPhoto({
      title: title.trim(),
      url: imageUrl.trim(),
      thumbnailUrl: thumbnailUrl.trim() || imageUrl.trim(),
      albumId: Number(albumId),
    });

    setTitle("");
    setImageUrl("");
    setThumbnailUrl("");
    setAlbumId("1");
    setShowForm(false);
  };

  return (
    <div className="add-photo-container">
      {showForm && (
        <form className="add-photo-form" onSubmit={handleSubmit}>
          <h3>Add a New Photo</h3>

          <label htmlFor="photo-title">Photo Title</label>
          <input
            id="photo-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter photo title"
            required
          />

          <label htmlFor="photo-image-url">Image URL</label>
          <input
            id="photo-image-url"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            required
          />

          <label htmlFor="photo-thumbnail-url">Thumbnail URL</label>
          <input
            id="photo-thumbnail-url"
            type="url"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            placeholder="Optional thumbnail URL"
          />

          <label htmlFor="photo-album">Album ID</label>
          <input
            id="photo-album"
            type="number"
            min="1"
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
            required
          />

          {imageUrl.trim() && (
            <div className="photo-preview">
              <p>Image Preview</p>
              <img src={imageUrl} alt="Preview" />
            </div>
          )}

          <div className="add-photo-actions">
            <button type="submit" className="save-photo-button">
              Add Photo
            </button>

            <button
              type="button"
              className="cancel-photo-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};