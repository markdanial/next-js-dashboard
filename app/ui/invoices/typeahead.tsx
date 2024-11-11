'use client';

import { useEffect, useState, useRef } from 'react';

interface Option {
  id: number;
  name: string;
  slug: string;
}

interface TypeaheadProps {
  options: Option[];
  selectedOptions: Option[];
  onSelect: (option: Option) => void;
  onRemove: (optionId: number) => void;
  label: string;
  placeholder?: string;
  required?: boolean;
  name: string;
  error?: string;
}

export default function Typeahead({
  options,
  selectedOptions,
  onSelect,
  onRemove,
  label,
  placeholder = 'Type to search...',
  required = false,
  name,
  error,
}: TypeaheadProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter(
    option => 
      option.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedOptions.find(selected => selected.id === option.id)
  );

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="mb-4 relative" ref={wrapperRef}>
      <label htmlFor={`${name}-search`} className="mb-2 block text-sm font-medium">
        {label}{required && '*'}
      </label>
      
      {/* Selected options tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedOptions.map(option => (
          <span
            key={option.id}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center"
          >
            {option.name}
            <button
              type="button"
              onClick={() => onRemove(option.id)}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name={name}
        value={selectedOptions.map(o => o.slug).join(',')}
      />
      
      {/* Search input */}
      <div className="relative">
        <input
          id={`${name}-search`}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
        />

        {/* Dropdown */}
        {isDropdownOpen && searchTerm && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onSelect(option);
                    setSearchTerm('');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100"
                >
                  {option.name}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No options found</div>
            )}
          </div>
        )}
      </div>
      
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
}