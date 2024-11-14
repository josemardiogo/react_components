import { useEffect, useState } from 'react';
import FlowSelector from './components/FlowSelector/FlowSelector';
function App() {

  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');

  const predefinedLocations = [
    'Armazém',
    'Aeroporto',
    'Porto',
    'Outro'
  ];

  useEffect(() => {
    console.log('origin:', origin);
    console.log('destination:', destination);
  }, [origin, destination]);

  return (
    <div>
      <FlowSelector
        setOrigin={setOrigin}
        setDestination={setDestination}
        predefinedLocations={predefinedLocations}
      />
    </div>
  );
}
export default App;
