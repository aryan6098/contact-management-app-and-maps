import React, { useState } from "react";
import LineChart from "./LineChart";
import CovidMap from "./CovidMap";
import Tab from "../components/Tab";

interface Tab {
  label: string;
  content: React.ReactNode;
}

const tabs: Tab[] = [
  {
    label: "Line Chart",
    content: <LineChart />,
  },
  {
    label: "Covid Map",
    content: <CovidMap />,
  },
];
const ChartAndMaps = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <>
      <div className="p-4">
        <div className="flex space-x-4 mb-4">
          {tabs.map((tab) => (
            <Tab
              key={tab.label}
              label={tab.label}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>
        <div>
          {tabs.map(
            (tab) =>
              activeTab === tab.label && (
                <div key={tab.label} className="border p-4">
                  {tab.content}
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default ChartAndMaps;
