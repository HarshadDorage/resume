import React from 'react';

interface TagSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
  selected: string[];
  suggestions: string[];
  placeholder: string;
}

const TagSelector: React.FC<TagSelectorProps> = ({ value, onChange, onAdd, onRemove, selected, suggestions, placeholder }) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              onAdd(value);
            }
          }}
          placeholder={placeholder}
          className="input-surface w-full rounded-[20px] px-4 py-3 text-sm"
        />
        <button type="button" onClick={() => onAdd(value)} className="rounded-[18px] bg-stone-950 px-4 py-3 text-sm font-semibold text-white">
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((item) => (
          <button key={item} type="button" onClick={() => onAdd(item)} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
            + {item}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {selected.map((item) => (
          <button key={item} type="button" onClick={() => onRemove(item)} className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white">
            {item} ×
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
