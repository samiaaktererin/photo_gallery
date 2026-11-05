import { useState } from "react";
import { PhotoCards } from "../PhotoCards/PhototCards";
import { usePhotos } from "../PhotoContext/PhotoContext";
import { Search } from "../Search/Search";
import { Filter } from "../Filter/Filter";
import { AddPhoto } from "../AddNewPhoto/AddNewPhoto";

export const Gallery = () => {
  const { loading, photos, error } = usePhotos();

  const [search, setSearch] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("all");

  const albumIds = [
    ...new Set(
      photos
        .map((photo) => photo.albumId)
        .filter((albumId) => albumId !== undefined && albumId !== null)
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

        <Search search={search} setSearch={setSearch} />

        <Filter
          albumIds={albumIds}
          selectedAlbum={selectedAlbum}
          setSelectedAlbum={setSelectedAlbum}
        />
        <AddPhoto/>
      </div>

      {photos.length === 0 ? (
        <h2>No photos available.</h2>
      ) : filteredPhotos.length === 0 ? (
        <h2 className="no-results">No photos found.</h2>
      ) : (
        <div className="grid-photos">
          {filteredPhotos.map((photo) => (
            <PhotoCards key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </div>
  );
};