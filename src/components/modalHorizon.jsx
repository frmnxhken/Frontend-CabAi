import React from "react";
import Button from "@/components/ui/Button";

const ModalHorizon = ({
  open,
  horizon,
  setHorizon,
  handlePredict,
  onClose,
}) => {
  return (
    <div
      style={{
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: ".3s",
      }}
      className="fixed max-w-[500px] w-3/4 z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary px-8 py-6 rounded-md border border-white/15"
    >
      <p className="text-sm text-center">Jumlah hari yang ingin di Prediksi</p>
      <h1 className="text-5xl text-center py-4">{horizon}</h1>
      <input
        className="outline-0 w-full"
        type="range"
        min={1}
        max={7}
        value={horizon}
        onChange={(e) => setHorizon(Number(e.target.value))}
      />
      <div className="flex items-center justify-between gap-2 mt-4">
        <Button onClick={handlePredict} variant="primary" className="w-full">
          Submit
        </Button>
        <Button onClick={onClose} variant="outline" className="w-full">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ModalHorizon;
