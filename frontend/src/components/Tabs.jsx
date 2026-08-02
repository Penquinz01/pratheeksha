import { useState } from "react";

// Simple tab bar: `tabs` is [{ key, label }], `renderPanel(activeKey)` renders
// the content for whichever tab is active. Only the active panel is mounted.
export default function Tabs({ tabs, renderPanel, initialKey }) {
  const [active, setActive] = useState(initialKey ?? tabs[0]?.key);

  return (
    <div className="tabs">
      <div className="tab-bar">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`tab${t.key === active ? " active" : ""}`}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="tab-panel">{renderPanel(active)}</div>
    </div>
  );
}
