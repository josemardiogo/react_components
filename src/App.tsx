import Select from "./components/Select/Select";
import { IOption } from "~/public/interfaces.ts";
import { useState } from "react";

function App() {

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
}
export default App;
