// Write a code which filters large array based on search; use deferred value to show smooth typing.
import React from 'react'
import { useState, useDeferredValue, useMemo } from 'react';

function SmoothType() {
  const [query, setQuery] = useState("");

  const deferredQuery = useDeferredValue(query);

  const heavyList = useMemo(() => {
    const results = [];
    for (let i = 0; i < 1000; i++) {
      results.push(<div key={i}>Result for: {deferredQuery}</div>);
    }
    return results;
  }, [deferredQuery]);

  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search..." 
      />

      <div style={{ 
       opacity: query !== deferredQuery ? 0.5 : 1,
        transition: 'opacity 0.2s ease'
      }}>
        {heavyList}
      </div>
    </div>
  );
}
export default SmoothType
