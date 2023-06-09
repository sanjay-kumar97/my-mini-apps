import { useState } from "react";

const DateCard = ({ setShowMenu }: any) => {
  const [searchDate, setSearchDate] = useState("");
  const getFormattedDate = (value: string) => {
    let newDate = value.split("-").reverse().join("");
    return newDate.slice(0, 4) + newDate.slice(6);
  };
  return (
    <div className="fixed h-screen w-screen bg-black/60">
      <div className="fixed left-[50%] top-[50%] flex w-fit min-w-[70%] translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-xl bg-white p-10">
        <p className="whitespace-nowrap text-xl font-bold">
          Pick a Date to Search
        </p>
        <input
          type="date"
          className="w-fit text-xl"
          min={"2023-04-29"}
          max={"2023-06-09"}
          onChange={(e) => {
            setSearchDate(getFormattedDate(e.target.value));
            console.log(getFormattedDate(e.target.value));
          }}
        />
        <div className="mt-6 flex justify-between">
          <button
            className="rounded border-2 border-red-500 px-3 py-2 text-lg text-red-500"
            onClick={() => setShowMenu(false)}
          >
            Cancel
          </button>
          <button
            className="rounded  border-2 border-blue-500 bg-blue-500 px-3 py-2 text-lg text-white"
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
