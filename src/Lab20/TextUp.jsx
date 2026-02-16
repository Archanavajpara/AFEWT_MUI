// Write a code in which main text updates immediately; preview text updates slowly using useDeferredValue. (B)
import React from 'react'
import { useState, useDeferredValue, useMemo } from 'react';
function TextUp() {
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
            <div>
                <h1>Main text</h1>
                <p>{query}</p>
            </div>
            <div>
                <h2>Preview text</h2>
                <p>{heavyList}</p>
            </div>

        </div>
    );
}
export default TextUp
