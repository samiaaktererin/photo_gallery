import { DeletePhoto } from "../DeletePhoto/DeletePhoto";

export const PhotoCards = ({ photo, onView, onEdit }) => {
  return (
    <div className="photos-cards">
      <div className="photos">
        <button
          type="button"
          className="photos-image-btn"
          onClick={() => onView(photo)}
          aria-label={`Open ${photo.title} in full view`}
        >
          <img
            src={photo.thumbnailUrl}
            alt={photo.title}
            loading="lazy"
          />
        </button>

        {/* <h3>Album ID: {photo.albumId}</h3> */}
        <h3>{photo.title}</h3>
      </div>

      <div className="photo-card-actions">
        <button
          type="button"
          className="edit-btn"
          onClick={() => onEdit(photo)}
        >
          Edit
        </button>

        <DeletePhoto photo={photo} />
      </div>
    </div>
  );
};