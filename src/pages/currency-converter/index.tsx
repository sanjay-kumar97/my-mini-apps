import { useState } from "react";
import CurrencyConverter from "@/components/bridge/CurrencyConverter";

const Index = () => {
  const [currencyData, setCurrencyData] = useState({});
  const [countryCodes, setCountryCodes] = useState([]);
  const [showCountries, setShowCountries] = useState(false);

  const prop = {
    currencyData,
    setCurrencyData,
    countryCodes,
    setCountryCodes,
    showCountries,
    setShowCountries,
  };

  return (
    <div
      className={`flex h-screen w-screen flex-col items-center justify-between p-4 md:p-24 ${
        showCountries ? "bg-white" : "bg-purple-500"
      }`}
    >
      <CurrencyConverter prop={prop} />
    </div>
  );
};

export default Index;
