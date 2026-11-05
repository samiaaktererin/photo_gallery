import { useState } from "react";
import { usePhotos } from "../PhotoContext/PhotoContext";

export const EditPhoto = ({ photo }) => {
  const { updatePhoto } = usePhotos();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(photo.title);

  const handleEdit = () => {
    setEditedTitle(photo.title);
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const trimmedTitle = editedTitle.trim();

    if (!trimmedTitle) {
      alert("Please enter both title and image URL.");
      return;
    }

    updatePhoto(photo.id, trimmedTitle);

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(photo.title);
    setIsEditing(false);
  };

  return (
    <>
      <button className="edit-btn" onClick={handleEdit}>
        Edit
      </button>

      {isEditing && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <h2>Edit Photo</h2>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor={`title-${photo.id}`}>Photo Title</label>

                <input
                  id={`title-${photo.id}`}
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Enter photo title"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
