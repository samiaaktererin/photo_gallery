export const Search = ({ search, setSearch }) => {
  return (
    <div className="search-box">
      <input
        type="search"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search photo title..."
      />
    </div>
  );
};