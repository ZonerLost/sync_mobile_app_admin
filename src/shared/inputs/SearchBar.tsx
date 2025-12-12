import React from "react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search here",
}) => {
  return (
    <div className="w-full rounded-full bg-neutral-100 px-5 py-3 text-xs text-neutral-800 focus-within:ring-2 focus-within:ring-blue-500/60">
      <input
        className="w-full bg-transparent text-xs outline-none placeholder:text-neutral-400"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
