import React, { createContext, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../Auth/AuthProvider";


const API_URL = process.env.EXPO_PUBLIC_API_URL;
// Create a context with an empty object as the default value
const BillContext = createContext({});

const currentDate = new Date();
const currentMonth = currentDate.getMonth(); // Adding 1 because getMonth() returns zero-based month
// Convert month to string such as Jan, Feb, etc.
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const currentMonthName = monthNames[currentMonth];

const currentYear = currentDate.getFullYear();

const predictRequest = async (token) => {
  try {
    const response = await fetch(`${API_URL}/predict/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
      body: JSON.stringify({ month: currentMonthName, year: currentYear }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch bill data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const monthlyRequest = async (token, is_predicted = "False") => {
  try {
    const response = await fetch(
      `${API_URL}/months/?is_predicted=${is_predicted}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Token ${token}` : "",
        },
      }
    );
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    if (!response.ok) {
      throw new Error("Failed to fetch monthly data");
    }
    const data = await response.json();
    return data.monthwise_units;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getLast12Months = () => {
  const last12Months = [];
  for (let i = 11; i >= 0; i--) {
    const month = (currentMonth - i + 12) % 12;
    const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
    last12Months.push(`${monthNames[month]}-${year}`);
  }
  return last12Months;
};

const fillMissingMonths = (data, last12Months) => {
  return last12Months.map((month) => (data[month] ? data[month][0] : 0));
};

const getLabels = () => {
  const labels = [];
  // Start from 11 months ago to include the correct range
  for (let i = 11; i >= 0; i--) {
    const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
    const monthIndex = (currentMonth - i + 12) % 12;
    const month = monthNames[monthIndex];
    const label =
      i === 11 || month === "Jan"
        ? `${month}-${year.toString().slice(-2)}`
        : month;
    labels.push(label);
  }
  return labels;
};

export const useBill = () => useContext(BillContext);

export const BillProvider = ({ children }) => {
  const navigation = useNavigation();
  const { authToken } = useAuth();
  const [units, setUnits] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [perUnitCost, setPerUnitCost] = useState(0);
  const [labels, setLabels] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  const [actualMonthly, setActualMonthly] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [predictedMonthly, setPredictedMonthly] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [isMonthlyDataFetched, setIsMonthlyDataFetched] = useState(false);

  const fetchPredictedData = async () => {
    try {
      const data = await predictRequest(authToken);
      setUnits(data.units);
      setTotalCost(data.total_cost);
      setPerUnitCost(data.per_unit_cost);
    }
    catch (error) {
      console.log("Error:", error)
      navigation.navigate("Signin");
    }
  };

  const fetchMonthlyData = async () => {
    const last12Months = getLast12Months();
    const actualValues = await monthlyRequest(authToken, "False");
    const predictedValues = await monthlyRequest(authToken, "True");
    const actualData = fillMissingMonths(actualValues, last12Months);
    const predictedData = fillMissingMonths(predictedValues, last12Months);
    setActualMonthly(actualData);
    setPredictedMonthly(predictedData);
    setLabels(getLabels());
    setIsMonthlyDataFetched(true);
  };

  const resetData = () => {
    setUnits(0);
    setTotalCost(0);
    setPerUnitCost(0);
    setLabels([
      "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    ]);
    setActualMonthly([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]);
    setPredictedMonthly([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]);
    setIsMonthlyDataFetched(false);
  };

  return (
    <BillContext.Provider
      value={{
        actualMonthly,
        predictedMonthly,
        units,
        labels,
        totalCost,
        perUnitCost,
        isMonthlyDataFetched,
        fetchPredictedData,
        fetchMonthlyData,
        resetData,
      }}
    >
      {children}
    </BillContext.Provider>
  );
};
