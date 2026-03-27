'use client';

interface Tab {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (key: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 rounded-xl bg-white/[0.03] border border-white/[0.06] p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
            active === tab.key
              ? 'bg-[#00d4aa]/10 text-[#00d4aa] shadow-sm'
              : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
