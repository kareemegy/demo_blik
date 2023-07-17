interface SearchInputProps {
  query: string;
  onQueryChange: (query: string) => void;
  setIsUserSearching: (isSearching: boolean) => void;
}

const SearchInput = ({
  query,
  onQueryChange,
  setIsUserSearching,
}: SearchInputProps) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setIsUserSearching(searchText !== '');
    onQueryChange(searchText);
  };

  return (
    <input
      className="bg-transparent outline-none placeholder:text-white"
      type="text"
      name="search"
      id="search"
      placeholder="Search"
      value={query}
      onChange={handleSearch}
    />
  );
};

export default SearchInput;
