import { useContext, createContext, useEffect, useState } from "react";

const PhotoContext = createContext();

const API_URL = "https://jsonplaceholder.typicode.com/photos";

export const PhotoProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }

        const data = await response.json();

        setPhotos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const updatePhoto = (id, newTitle) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id
          ? {
              ...photo,
              title: newTitle,
            }
          : photo,
      ),
    );
  };

  const deletePhoto = (id) => {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
  };

  const addPhoto = (newPhoto) => {
    const photoToAdd = {
      ...newPhoto,
      id: Date.now(),
      albumId: Number(newPhoto.albumId),
    };

    setPhotos((previousPhotos) => [photoToAdd, ...previousPhotos]);
  };

  return (
    <PhotoContext.Provider
      value={{
        photos,
        loading,
        error,
        updatePhoto,
        deletePhoto,
        addPhoto,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => {
  return useContext(PhotoContext);
};
