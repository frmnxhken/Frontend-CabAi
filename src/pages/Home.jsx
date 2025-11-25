import IndonesianMap from "@/components/IndonesianMap";
import Select from "@/components/ui/Select";
import React, { useEffect, useState } from "react";
import cluster from "@/data/cluster.json";
import { useNavigate } from "react-router";
import { getAgregateData } from "@/lib/API";

const Home = () => {
  const navigate = useNavigate();
  const options = Object.keys(cluster).map((c) => {
    return { label: c };
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAgregateData();
      setData(result);
    };

    fetchData();
  }, []);

  const handleChange = (prov) => {
    return navigate("/forecast/" + prov);
  };

  return (
    <>
      <div className="bg-background container max-w-[1200px] mx-auto px-4">
        <div className="pt-12">
          <h1 className="text-5xl font-semibold">CabAi</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-mute text-md w-3/4 sm:w-[40%] mt-4">
              CabAi adalah platform web untuk memantau dan memprediksi harga
              cabai di seluruh Provinsi Indonesia
            </p>
            <div className="w-full sm:w-auto flex justify-end">
              <Select
                options={options}
                onChange={(v) => handleChange(v)}
                placeholder="Prediksi"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-grid bg-glow mt-8">
        <div className="container max-w-[1200px] mx-auto px-4">
          <IndonesianMap agregates={data} />
        </div>
      </div>
    </>
  );
};

export default Home;
