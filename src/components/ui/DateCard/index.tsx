import { useState } from "react";

const DateCard = ({ setShowMenu }: any) => {
  const [searchDate, setSearchDate] = useState("090623");
  const getFormattedDate = (value: string) => {
    let newDate = value.split("-").reverse().join("");
    return newDate.slice(0, 4) + newDate.slice(6);
  };
  return (
    <div className="fixed z-[99] h-screen w-screen bg-black/60">
      <div className="fixed left-[50%] top-[50%] flex w-fit min-w-[80%] translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-xl bg-white p-6">
        <p className="flex items-center justify-between whitespace-nowrap text-xl font-bold">
          Pick a Date to Search{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
            onClick={() => setShowMenu(false)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </p>
        <span className="-mt-4 text-sm font-normal">
          ( Between April 29 and June 09 )
        </span>
        <input
          type="date"
          className="w-full rounded p-2 text-lg"
          min={"2023-04-29"}
          max={"2023-06-09"}
          defaultValue={"2023-06-09"}
          onChange={(e) => {
            setSearchDate(getFormattedDate(e.target.value));
          }}
        />
        <div className="mt-6 flex justify-between">
          <button
            className="rounded border-2 border-red-500 px-3 py-2 text-red-500"
            onClick={() => setShowMenu(false)}
          >
            Cancel
          </button>
          <button
            className="rounded  border-2 border-blue-500 bg-blue-500 px-3 py-2 text-white"
            onClick={() => {
              let element = document.getElementById(searchDate);
              element?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              });
              setShowMenu(false);
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateCard;
