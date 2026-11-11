
import { useState, useEffect } from "react";
import { PhotoCards } from "../PhotoCards/PhototCards";
import { usePhotos } from "../PhotoContext/PhotoContext";
import { Search } from "../Search/Search";
import { Filter } from "../Filter/Filter";
import { AddNewPhoto } from "../AddNewPhoto/AddNewPhoto";
import { Lightbox } from "../Lightbox/Lightbox";
import { EditPhoto } from "../Edit_Photo/EditPhoto";
import { Pagination } from "../Pagination/Pagination";

export const Gallery = () => {
  const { loading, photos, error } = usePhotos();

  const [search, setSearch] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("all");

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [photoToEdit, setPhotoToEdit] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const photosPerPage = 12;

  const albumIds = [
    ...new Set(
      photos
        .map((photo) => photo.albumId)
        .filter((id) => id !== undefined && id !== null)
    ),
  ].sort((a, b) => a - b);

  const filteredPhotos = photos.filter((photo) => {
    const matchesSearch = photo.title
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    const matchesAlbum =
      selectedAlbum === "all" ||
      photo.albumId === Number(selectedAlbum);

    return matchesSearch && matchesAlbum;
  });

  

  const totalPages = Math.ceil(
    filteredPhotos.length / photosPerPage
  );

  const startIndex = (currentPage - 1) * photosPerPage;

  const currentPhotos = filteredPhotos.slice(
    startIndex,
    startIndex + photosPerPage
  );

 
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedAlbum]);


  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (loading) {
    return <h2 className="loading-message">Loading photos...</h2>;
  }

  if (error) {
    return <h2 className="error-message">{error}</h2>;
  }

  return (
    <div className="gallery-photos">
      <div className="gallery-header">
        <h2>Showing {filteredPhotos.length} photos</h2>

        <Search
          search={search}
          setSearch={setSearch}
        />

        <Filter
          albumIds={albumIds}
          selectedAlbum={selectedAlbum}
          setSelectedAlbum={setSelectedAlbum}
        />

        <AddNewPhoto />
      </div>

      {photos.length === 0 ? (
        <h2>No photos available.</h2>
      ) : filteredPhotos.length === 0 ? (
        <h2 className="no-results">No photos found.</h2>
      ) : (
        <>
          <div className="grid-photos" key={currentPage}>
            {currentPhotos.map((photo) => (
              <PhotoCards
                key={photo.id}
                photo={photo}
                onView={setSelectedPhoto}
                onEdit={setPhotoToEdit}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}

      {photoToEdit && (
        <EditPhoto
          key={photoToEdit.id}
          photo={photoToEdit}
          onClose={() => setPhotoToEdit(null)}
        />
      )}
    </div>
  );
};
