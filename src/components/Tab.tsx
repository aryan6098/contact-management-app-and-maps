import React from "react";

interface TabProps {
  activeTab: string;
  setActiveTab: (label: string) => void;
  label: string;
}

const Tab = ({ activeTab, setActiveTab, label }: TabProps) => {
  return (
    <button
      className={`${
        activeTab === label
          ? "bg-blue-500 text-white"
          : "bg-white text-gray-700"
      } px-4 py-2 rounded-md`}
      onClick={() => setActiveTab(label)}
    >
      {label}
    </button>
  );
};
export default Tab;
