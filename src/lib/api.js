export const BASE_API = "https://api-forecast-cabai-production.up.railway.app";

export const getAgregateData = async () => {
  try {
    const response = await fetch(BASE_API + "/province/agregate");
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getLastMonthData = async (prov) => {
  try {
    const response = await fetch(BASE_API + "/province/" + prov);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const postForecast = async (prov, horizon = 1) => {
  try {
    const response = await fetch(BASE_API + "/forecast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provinsi: prov, horizon }),
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    return error;
  }
};
