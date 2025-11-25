import { getLastMonthData, postForecast } from "@/lib/API";
import { useState, useEffect } from "react";

export const useForecast = (prov) => {
  const [lastMonth, setLastMonth] = useState([]);
  const [predict, setPredict] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!prov) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getLastMonthData(prov);
        setLastMonth(result.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [prov]);

  const predictHorizon = async (horizon) => {
    if (!prov) return;
    setLoading(true);
    try {
      const result = await postForecast(prov, horizon);
      console.log(result);

      setPredict(result || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { lastMonth, predict, loading, error, predictHorizon };
};
