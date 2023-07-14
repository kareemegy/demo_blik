interface SearchInputProps {
  query: string;
  onQueryChange: (query: string) => void;
}
const SearchInput = ({ query, onQueryChange }: SearchInputProps) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
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
