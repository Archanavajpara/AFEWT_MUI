import React, { useState, useEffect, useTransition } from "react";

export default function PreventUI() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [isPending, startTransition] = useTransition();

  // Generate Huge List (50,000 items)
  useEffect(() => {
    const bigList = Array.from({ length: 500 }, (_, i) => {
      return "Hello" + i;
    });

    setList(bigList);
    setFilteredList(bigList);
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value); // High priority (typing remains smooth)

    // Low priority update (filtering)
    startTransition(() => {
      const result = list.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredList(result);
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Filter Huge List with startTransition</h2>

      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search..."
        style={{ padding: "8px", width: "250px" }}
      />

      {isPending && <p>Filtering...</p>}

      <ul style={{ height: "400px", overflow: "auto" }}>
        {filteredList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
