import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js/auto";
import { useGetCovidDataQuery } from "../store/services/covidApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const { data, isFetching } = useGetCovidDataQuery();

  if (isFetching) {
    return <p>Loading...</p>;
  }

  const chartData: ChartData<"line", number[], unknown> = {
    labels: Object.keys(data.cases),
    datasets: [
      {
        label: "Cases",
        data: Object.values(data.cases),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Deaths",
        data: Object.values(data.deaths),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "Recovered",
        data: Object.values(data.recovered),
        fill: false,
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "COVID-19 Cases Fluctuations",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Cases",
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-lg p-4 ">
      <div className="w-11/12 h-5/6">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
