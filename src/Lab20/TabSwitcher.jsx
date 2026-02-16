import { useState, useTransition } from 'react';

function TabSwitcher() {
  const [tab, setTab] = useState('home');

  const [isPending, startTransition] = useTransition();

  function handleTabChange(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <div>
      <nav>
        <button onClick={() => handleTabChange('home')}>Home</button>
        <button onClick={() => handleTabChange('heavy-table')}>Heavy Table</button>
      </nav>

      {/* 3. Immediate feedback using isPending */}
      {isPending && <p style={{ color: 'blue' }}>Loading new view...</p>}

      <div style={{ opacity: isPending ? 0.6 : 1 }}>
        {tab === 'home' ? <HomeView /> : <SlowTableView />}
      </div>
    </div>
  );
};

function HomeView() {
  return <h1>Welcome to the Home Tab!</h1>;
};

function SlowTableView() { 
  const rows = Array.from({ length: 1000 }, (_, i) => `Row ${i + 1}`);
  return (
    <table border="1" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Index</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{row}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TabSwitcher