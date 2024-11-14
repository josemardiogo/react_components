import React, { useState, useRef, useEffect } from 'react';
import { IOption } from "~/public/interfaces.ts";

interface SelectProps {
    options: IOption[]
    selectedIds: number[]
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>
}

const Select = ({ options, selectedIds = [], setSelectedIds }: SelectProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const inputRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setFocusedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (focusedIndex >= 0 && listRef.current) {
            const listItems = listRef.current.getElementsByTagName('div');
            const focusedElement = listItems[focusedIndex];
            if (focusedElement) {
                focusedElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    }, [focusedIndex]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setIsOpen(true);
            setFocusedIndex(prev =>
                prev < filteredOptions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedIndex(prev => prev > 0 ? prev - 1 : prev);
        } else if (e.key === 'Enter' && focusedIndex >= 0) {
            e.preventDefault();
            handleSelection(filteredOptions[focusedIndex].id);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            setIsOpen(false);
            setFocusedIndex(-1);
        }
    };

    const handleSelection = (id: number) => {
        if (id && !selectedIds.includes(id)) {
            setSelectedIds([...selectedIds, id]);
            setSearchQuery('');
            setIsOpen(false);
            setFocusedIndex(-1);
        }
    };

    const handleRemove = (id: number) => {
        setSelectedIds(selectedIds.filter((i) => i !== id));
    };

    const filteredOptions = options
        .filter(option => !selectedIds.includes(option.id))
        .filter((option) =>
            option.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div>
            <div ref={inputRef} className="my-8 relative w-full">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for a country..."
                    className="w-full px-4 py-2 text-lg border-2 border-blue-500 rounded-md focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
                />

                {isOpen && (
                    <div className="absolute w-full z-10 mt-1" ref={listRef}>
                        <div className="max-h-48 overflow-y-auto border-2 border-blue-500 rounded-md bg-white">
                            {filteredOptions.map((option, index) => (
                                <div
                                    key={option.id}
                                    className={`px-4 py-2 cursor-pointer ${focusedIndex === index ? 'bg-blue-100' : 'hover:bg-blue-100'
                                        }`}
                                    onClick={() => handleSelection(option.id)}
                                >
                                    {option.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
                {selectedIds.map((id) => {
                    const item = options.find(opt => opt.id === id);
                    if (!item) return null;
                    return (
                        <div
                            key={id}
                            className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm"
                            style={{
                                animation: 'fadeIn 0.3s ease-in forwards',
                            }}
                        >
                            <style>
                                {`
                                @keyframes fadeIn {
                                    from {
                                        opacity: 0;
                                        transform: scale(0.9);
                                    }
                                    to {
                                        opacity: 1;
                                        transform: scale(1);
                                    }
                                }
                                `}
                            </style>
                            {item.name}
                            <button
                                className="bg-none text-red-600 text-xl cursor-pointer hover:scale-110 transition-all"
                                onClick={() => handleRemove(id)}
                            >
                                ×
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Select;


// how look like in app component // d
/* 
const options: IOption[] = [
    { id: 1, name: 'United States' },
    { id: 2, name: 'Canada' },
    { id: 3, name: 'United Kingdom' },
    { id: 4, name: 'France' },
    { id: 5, name: 'Germany' },
    { id: 6, name: 'Japan' },
    { id: 7, name: 'Australia' },
    { id: 8, name: 'Brazil' },
    { id: 9, name: 'India' },
    { id: 10, name: 'India' },
    { id: 11, name: 'Angola' },
  ];

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <div> 
      <Select options={options} selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
    </div>
  );
*/