import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

import Button from "@/components/ui/Button";
import ProvinceChart from "@/lib/ProvinceChart";
import { useState } from "react";
import { useParams } from "react-router";
import ModalHorizon from "@/components/modalHorizon";
import { useForecast } from "@/hooks/useForecast";

export default function Forecast() {
  const { prov } = useParams();
  const [open, setOpen] = useState(false);
  const [horizon, setHorizon] = useState(1);
  const { lastMonth, predict, predictHorizon } = useForecast(prov);

  const chart = lastMonth ? ProvinceChart(lastMonth, predict) : null;

  const handlePredict = async () => {
    await predictHorizon(horizon);
    setOpen(false);
  };

  return (
    <div className="bg-grid">
      <ModalHorizon
        open={open}
        horizon={horizon}
        setHorizon={setHorizon}
        handlePredict={handlePredict}
        onClose={() => setOpen(false)}
      />
      <div className="relative z-20 container max-w-[1200px] mx-auto px-4">
        <div className="py-12">
          <h1 className="text-4xl font-semibold">{prov}</h1>
          <div className="flex items-baseline justify-between">
            <p className="text-md mt-4 text-mute">
              Lakukan prediksi harga cabai untuk provinsi {prov}
            </p>
            <Button onClick={() => setOpen(!open)}>Prediksi</Button>
          </div>
        </div>
        <div className="w-full overflow-x-auto h-[500px]">
          {chart && <Line data={chart.data} options={chart.options} />}
        </div>
      </div>
    </div>
  );
}
