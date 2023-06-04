import axios from "axios";
import { useRef, useEffect, useState } from "react";

const CurrencyConverter = ({ prop }: any) => {
  const {
    currencyData,
    setCurrencyData,
    countryCodes,
    setCountryCodes,
    showCountries,
    setShowCountries,
  } = prop;

  const [currency, setCurrency] = useState({
    fromCurrency: "USD",
    toCurrency: "INR",
  });

  const [amount, setAmount] = useState({ fromAmount: 1, toAmount: 0 });

  const [loading, setLoading] = useState(false);

  const amountRef = useRef<any>();

  const unsupported_codes = ["XAF", "XCD", "XDR", "XOF", "XPF"];

  const makeRequest = async (params: string) => {
    console.log("Entered API Call", params);
    try {
      const response = await axios({
        url: "api/currency",
        method: "POST",
        data: { param: params },
      });
      console.log(response, "RES");
      if (params == "codes") {
        setCountryCodes(
          (response?.data?.["supported_codes"]).filter((item: any) => {
            return !unsupported_codes.includes(item[0]);
          })
        );
      } else {
        return response.data;
      }
      setTimeout(() => {
        console.log({ countryCodes });
      }, 2000);
    } catch (e: any) {
      return e;
    }
  };

  useEffect(() => {
    hideResult();
  }, [currency, amount]);

  useEffect(() => {
    makeRequest("codes");
  }, []);

  const hideResult = () => {
    amountRef.current.classList.add("invisible");
  };

  const getExchangeRate = async () => {
    console.log("Getting it");
    setLoading(true);
    const res = await makeRequest(`latest/${currency?.fromCurrency}`);
    const rates = res?.conversion_rates;
    setAmount({
      ...amount,
      toAmount: amount.fromAmount * rates[currency.toCurrency],
    });
    setTimeout(() => {
      setLoading(false);
      amountRef.current.classList.remove("invisible");
    }, 500);
    console.log(rates);
  };

  return (
    <div className="flex min-h-full w-full flex-col text-xl">
      <div
        className={`sticky top-0 grid grid-cols-4 place-items-center py-4 ${
          showCountries ? "bg-white" : "bg-inherit"
        }`}
      >
        <button
          className={`col-start-4 w-fit rounded-lg p-4 ${
            showCountries
              ? "bg-purple-500 text-white"
              : "bg-white text-purple-500"
          }`}
          onClick={() => setShowCountries((prev: boolean) => !prev)}
        >
          Show {showCountries ? "Converter" : "Supported Cuurencies"}
        </button>
      </div>
      {countryCodes && showCountries && (
        <>
          <p className="sticky top-20 grid grid-cols-4 place-items-center bg-white py-4 text-center text-2xl font-semibold">
            <span>S.No</span>
            <span>Currency Code</span>
            <span>Currency Name</span>
            <span>Country Flag</span>
          </p>
          {countryCodes.map((countryCode: any, index: number) => {
            let code = String(countryCode[0]).slice(0, 2);
            return (
              <p key={index} className="grid grid-cols-4 place-items-center">
                <span>{index + 1}</span>
                <span>{countryCode[0]}</span>
                <span>{countryCode[1]}</span>
                <img
                  src={`https://www.countryflagicons.com/SHINY/64/${code}.png`}
                  alt={code}
                ></img>
              </p>
            );
          })}
        </>
      )}
      {countryCodes && !showCountries && (
        <section className="grid grow place-items-center">
          <div className="max-w-fit rounded-md bg-white p-8">
            <h1 className="text-center text-4xl font-bold">
              Currency Converter
            </h1>
            <div className="mt-8 flex flex-col gap-2">
              <label htmlFor="amount">Enter Amount</label>
              <input
                id="amount"
                type="number"
                inputMode="numeric"
                min={0}
                defaultValue={amount?.fromAmount}
                onChange={(e) =>
                  setAmount({ ...amount, fromAmount: Number(e.target.value) })
                }
                className="rounded-md border-[2px] border-gray-200 px-4 py-2 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div className="my-4 flex gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="from">From</label>
                <input
                  id="from"
                  type="text"
                  inputMode="text"
                  value={currency?.fromCurrency}
                  maxLength={3}
                  onChange={(e) =>
                    setCurrency({ ...currency, fromCurrency: e.target.value })
                  }
                  className="rounded-md border-[2px] border-gray-200 px-4 py-2 focus:border-purple-500 focus:outline-none"
                />
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="my-auto h-10 w-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
              <div className="flex flex-col gap-2">
                <label htmlFor="to">To</label>
                <input
                  id="to"
                  type="text"
                  inputMode="text"
                  value={currency?.toCurrency}
                  maxLength={3}
                  onChange={(e) =>
                    setCurrency({ ...currency, toCurrency: e.target.value })
                  }
                  className="rounded-md border-[2px] border-gray-200 px-4 py-2 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
            <p
              className="invisible font-bold"
              ref={amountRef}
            >{`${amount.fromAmount} ${currency.fromCurrency} equals ${amount.toAmount} ${currency.toCurrency}`}</p>
            <button
              className="mt-6 w-full rounded-md bg-purple-500 p-4 font-semibold text-white"
              onClick={getExchangeRate}
            >
              <p className="flex items-center justify-center gap-4">
                Get Conversion{" "}
                {loading && (
                  <svg
                    className="h-5 w-5 animate-spin rounded-full border-[2px] border-dashed border-white"
                    viewBox="0 0 24 24"
                  ></svg>
                )}
              </p>
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default CurrencyConverter;
