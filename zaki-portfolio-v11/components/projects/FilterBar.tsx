import React from 'react';
interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}
export function FilterBar({
  categories,
  activeCategory,
  onSelect
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-800 pb-4">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`
              px-4 py-2 text-sm font-mono transition-all duration-300 relative group
              ${isActive ? 'text-teal-400 bg-teal-400/10 border border-teal-400/30' : 'text-slate-400 hover:text-white border border-transparent hover:border-slate-700 hover:bg-slate-800/50'}
            `}>

            <span className="mr-2 opacity-50">{isActive ? '>' : '#'}</span>
            {category}

            {/* Corner accents for active state */}
            {isActive &&
            <>
                <span className="absolute top-0 left-0 w-1 h-1 bg-teal-400" />
                <span className="absolute bottom-0 right-0 w-1 h-1 bg-teal-400" />
              </>
            }
          </button>);

      })}
    </div>);

}