const ProvinceChart = (last30Days = [], forecast7Days = []) => {
  const allLabels = [
    ...last30Days.map((d) => d.tanggal),
    ...forecast7Days.map((d) => d.tanggal),
  ];

  const allData = [
    ...last30Days.map((d) => d.harga),
    ...forecast7Days.map((d) => d.harga),
  ];

  const totalActual = last30Days.length;

  const data = {
    labels: allLabels,
    datasets: [
      {
        label: "Harga Cabai",
        data: allData,
        borderWidth: 2,
        tension: 0.3,

        borderColor: "#b4f500",

        pointBackgroundColor: (ctx) =>
          ctx.dataIndex < totalActual ? "#b4f500" : "#C084FC",

        pointBorderColor: (ctx) =>
          ctx.dataIndex < totalActual ? "#b4f500" : "#C084FC",

        segment: {
          borderColor: (ctx) =>
            ctx.p0DataIndex >= totalActual - 1 ? "#C084FC" : "#b4f500",

          borderDash: (ctx) =>
            ctx.p0DataIndex >= totalActual - 1 ? [6, 6] : [],
        },
      },

      {
        label: "Prediksi",
        borderColor: "#C084FC",
        borderDash: [6, 6],
        hidden: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: { ticks: { color: "#fafafa" } },
      y: { ticks: { color: "#fafafa" } },
    },
  };

  return { data, options };
};

export default ProvinceChart;
