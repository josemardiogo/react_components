import { useState, useRef, useEffect } from 'react';

const Select = () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const inputRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const options = [
        'United States',
        'Canada',
        'United Kingdom',
        'France',
        'Germany',
        'Japan',
        'Australia',
        'Brazil',
        'India',
        'China',
    ];

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
            handleSelection(filteredOptions[focusedIndex]);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            setIsOpen(false);
            setFocusedIndex(-1);
        }
    };

    const handleSelection = (value: string) => {
        if (value && !selectedItems.includes(value)) {
            setSelectedItems([...selectedItems, value]);
            setSearchQuery('');
            setIsOpen(false);
            setFocusedIndex(-1);
        }
    };

    const handleRemove = (item: string) => {
        setSelectedItems(selectedItems.filter((i) => i !== item));
    };

    const filteredOptions = options
        .filter(option => !selectedItems.includes(option))
        .filter((option) =>
            option.toLowerCase().includes(searchQuery.toLowerCase())
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
                                    key={option}
                                    className={`px-4 py-2 cursor-pointer ${focusedIndex === index ? 'bg-blue-100' : 'hover:bg-blue-100'
                                        }`}
                                    onClick={() => handleSelection(option)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
                {selectedItems.map((item) => (
                    <div
                        key={item}
                        className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm animate-fadeIn"
                    >
                        {item}
                        <button
                            className="bg-none text-red-600 text-xl cursor-pointer hover:scale-110 transition-all"
                            onClick={() => handleRemove(item)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Select;