import React, { useState, useEffect } from "react";
import { fetchDataDaily } from "../api";
import { Bar, Line } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    (async function fetchApi() {
      setDailyData(await fetchDataDaily());
    })();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255 , 0 , 0 , 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "people",
            backgroundColor: [
              "rgba(0 , 0 , 255 , 0.5)",
              "rgba(0 , 255 , 0 , 0.5)",
              "rgba(255 , 0 , 0 , 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current State in ${country}` },
      }}
    />
  ) : null;

  console.log(country);

  return <div className={styles.chart}>{country ? barChart : lineChart}</div>;
};

export default Chart;
