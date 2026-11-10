import {
  useContext,
  createContext,
  useEffect,
  useState,
} from "react";

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

  // Add photo
  const addPhoto = (newPhoto) => {
    const photoWithId = {
      ...newPhoto,
      id: Date.now(),
    };

    setPhotos((previousPhotos) => [
      photoWithId,
      ...previousPhotos,
    ]);
  };

  // Edit photo
  const updatePhoto = (id, newTitle) => {
    setPhotos((previousPhotos) =>
      previousPhotos.map((photo) =>
        photo.id === id
          ? { ...photo, title: newTitle }
          : photo
      )
    );
  };

  // Delete photo
  const deletePhoto = (id) => {
    setPhotos((previousPhotos) =>
      previousPhotos.filter((photo) => photo.id !== id)
    );
  };

  return (
    <PhotoContext.Provider
      value={{
        photos,
        loading,
        error,
        addPhoto,
        updatePhoto,
        deletePhoto,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => {
  return useContext(PhotoContext);
};