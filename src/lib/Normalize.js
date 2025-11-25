export const normalizeProv = (name) => {
  const mapping = {
    Yogyakarta: "DI Yogyakarta",
    Jakarta: "DKI Jakarta",
  };

  return mapping[name] || name;
};
