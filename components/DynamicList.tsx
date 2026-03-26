import React from 'react';

interface DynamicListProps<T> {
  items: T[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  addButtonText: string;
}

const DynamicList = <T extends { id: string },>({
  items,
  onAdd,
  onRemove,
  renderItem,
  addButtonText,
}: DynamicListProps<T>) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="group relative rounded-[24px] border border-[rgba(91,63,37,0.12)] bg-white/55 p-3 shadow-[0_18px_36px_-32px_rgba(52,31,10,0.6)] backdrop-blur-sm sm:p-4">
          <button
            onClick={() => onRemove(item.id)}
            className="absolute -right-2 -top-2 z-10 rounded-full border border-red-200 bg-red-50 p-1.5 text-red-700 shadow-sm transition hover:bg-red-100 lg:opacity-0 lg:group-hover:opacity-100"
            title="Remove item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {renderItem(item, index)}
        </div>
      ))}
      <button
        onClick={onAdd}
        className="flex w-full items-center justify-center gap-2 rounded-[22px] border border-dashed border-[rgba(214,109,6,0.35)] bg-[rgba(255,248,240,0.85)] px-4 py-3 text-sm font-bold text-stone-700 transition hover:border-[rgba(214,109,6,0.6)] hover:bg-[rgba(255,242,226,0.95)] hover:text-stone-950 active:scale-[0.99]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        {addButtonText}
      </button>
    </div>
  );
};

export default DynamicList;
