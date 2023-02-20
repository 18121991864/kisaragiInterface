import React, { useState, useEffect } from 'react';

const App = () => {
  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 571px)').matches,
  );

  useEffect(() => {
    window
      .matchMedia('(min-width: 571px)')
      .addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  return matches;
};

export default App;
