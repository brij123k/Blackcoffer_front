import React, { useEffect, useState } from "react";
// import "./chartTest.css";
import BarChart from "./component/BarChart";
import LineChart from "./component/LineChart";
// import { UserData } from "./data";
import PieChart from "./component/PieChart";
import axios from "axios";

const ChartTest = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    async function compnentDidMount() {
      let data = (await axios.get("http://localhost:81/data?query={  }")).data;
      console.log(data);
      setUserData({
        labels: data.map((item) => item.Region),
        datasets: [
          {
            label: "Intensity",
            // label: "Users lost",
            data: data.map((item) => item.intensity),
            // data: UserData.map((data) => data.userLost),
            backgroundColor: ["green", "red", "blue", "black", "gray"],
            borderColor: "black",
            borderWidth: 2,
          },
          {
            label: "likelihood",
            // label: "Users lost",
            data: data.map((item) => item.likelihood),
            // data: UserData.map((data) => data.userLost),
            backgroundColor: ["green", "red", "blue", "black", "gray"],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }
    compnentDidMount();
  }, []);
  if (!userData) {
    return <></>;
  }
  return (
    <div className="CHART">
      <label for="Data-select">Data Visualization Dashboard:</label>
      {/* Intensity
Likelihood
Relevance
Year
Country
Topics
Region
City 
 */}
      <select id="Data-select">
        <option value="">--Please choose Data variables--</option>
        <option value="Intensity">Intensity</option>
        <option value="Likelihood">Likelihood</option>
        <option value="Relevance">Relevance</option>
        <option value="Year">Year</option>
        <option value="Topics">Topics</option>
        <option value="Region">Region</option>
        <option value="City ">City </option>
      </select>

      <div style={{ width: 1000, height: 600 }}>
        <BarChart chartData={userData} />
      </div>
      <div style={{ width: 1000, height: 600 }}>
        <LineChart chartData={userData} />
      </div>
      <div style={{ width: 1000, height: 600 }}>
        <PieChart chartData={userData} />
      </div>
    </div>
  );
};

export default ChartTest;
