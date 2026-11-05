import { DeletePhoto } from "../DeletePhoto/DeletePhoto";
import { EditPhoto } from "../Edit_Photo/EditPhoto";

export const PhotoCards = ({ photo }) => {
  return (
    <div className="photos-cards">
      <div className="photos">
        <img
          src={photo.thumbnailUrl}
          alt={photo.title}
          loading="lazy"
        />
        <h3>Album Id:{photo.albumId}</h3>
        <h3>{photo.title}</h3>
      </div>

      <EditPhoto photo={photo} />
      <DeletePhoto photo={photo} />
    </div>
  );
};