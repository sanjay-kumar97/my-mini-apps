import { useEffect, useState } from "react";
import { messageData } from "@/data/messages";
import DateCard from "@/components/ui/DateCard";

const Index = () => {
  type dataType = {
    date: string;
    time: string;
    sender: string;
    message: string;
  };

  const buildObject = (array: string[]) => {
    let date = array[0].replace(/[[,]/g, "");
    let time =
      (array[1].length == 7 ? array[1].slice(0, 4) : array[1].slice(0, 5)) +
      " " +
      array[2].slice(0, 2);
    let sender = array[3];
    let message = array.splice(5, array.length).join(" ");
    console.log({ date, time, sender, message });
    return { date, time, sender, message };
  };

  const [data, setData] = useState<dataType[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [searchDate, setSearchDate] = useState<string>("090623");

  useEffect(() => {
    messageData.forEach((item: string) => {
      let newObject = buildObject(item.split(" "));
      setData((prev) => [...prev, newObject]);
    });

    return () => {
      setData([]);
    };
  }, []);

  const onDataSet = () => {
    console.log({ data });
    setTimeout(() => setLoader(false), 1000);
  };

  useEffect(() => {
    data.length && onDataSet();
  }, [data]);

  return (
    <section className="min-w-screen flex h-[100dvh] h-[100vh] flex-col">
      <div className="flex w-full items-center gap-4 bg-[#222] p-6 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-7 w-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
          />
        </svg>
        <p className="text-2xl">Jerryy!❤️🪄</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="ml-auto h-7 w-7"
          onClick={() => {
            setShowMenu(true);
            // let element = document.getElementById(searchDate);
            // element?.scrollIntoView();
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </div>
      <div className="h-full overflow-y-scroll bg-purple-400">
        {loader && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-10 w-10 animate-spin"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        )}
        {!loader && (
          <div className="flex flex-col gap-3 p-4">
            {data?.map((item, index: number) => {
              return (
                <>
                  {(index == 0 || item?.date != data[index - 1].date) && (
                    <Date inputDate={item?.date} />
                  )}
                  <p
                    className={`flex w-fit max-w-[80%] gap-2 whitespace-pre-line rounded bg-white p-2 text-xl text-black ${
                      item?.sender == "Sanjay" ? "self-end" : ""
                    }`}
                  >
                    {item?.message}
                    <span className="self-end whitespace-nowrap pr-1 text-sm text-black/60">
                      {item?.time}
                    </span>
                  </p>
                </>
              );
            })}
          </div>
        )}
      </div>
      {showMenu && <DateCard setShowMenu={setShowMenu} />}
    </section>
  );
};

export default Index;

const Date = ({ inputDate }: any) => {
  return (
    <p
      className="w-fit self-center rounded-xl bg-black p-2 text-sm tracking-widest text-white"
      id={inputDate.replaceAll("/", "")}
    >
      {inputDate}
    </p>
  );
};
