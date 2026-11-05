export const Filter = ({
  albumIds,
  selectedAlbum,
  setSelectedAlbum,
}) => {
  return (
    <div className="album-filter">
      <label htmlFor="album-filter">Filter by Album:</label>

      <select
        id="album-filter"
        value={selectedAlbum}
        onChange={(e) => setSelectedAlbum(e.target.value)}
      >
        <option value="all">All Albums</option>

        {albumIds.map((albumId) => (
          <option key={albumId} value={albumId}>
            Album {albumId}
          </option>
        ))}
      </select>
    </div>
  );
};