import { usePhotos } from "../PhotoContext/PhotoContext";

export const DeletePhoto = ({ photo }) => {
  const { deletePhoto } = usePhotos();

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this photo?"
    );

    if (confirmDelete) {
      deletePhoto(photo.id);
    }
  };

  return (
    <div className="delete-photo">
      <button
        className="delete-btn"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};