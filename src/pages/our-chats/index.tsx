import { useEffect, useState } from "react";
import { chatData } from "@/data/chatData";
import DateCard from "@/components/ui/DateCard";
import Image from "next/image";
import data from "@emoji-mart/data";
import { init, getEmojiDataFromNative } from "emoji-mart";

const Index = () => {
  const data = chatData;
  const [loader, setLoader] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);
  }, []);

  const scrollToBottom = () => {
    var container: any = document.querySelector("#container");
    container.scrollTop = container.scrollHeight;
    console.log(container?.scrollHeight, container?.scrollTop);
  };

  return (
    <section className="min-w-screen flex h-[100dvh] flex-col">
      <div className="flex w-full items-center gap-5 bg-[#075E54] p-4 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
          />
        </svg>
        <Image
          src="/profile-picture.svg"
          height={25}
          width={25}
          className="scale-[1.5] rounded-full"
          alt="pfp"
        />
        <p className="-ml-2 text-xl">Tom!😻</p>
        {/* <p className="text-2xl">Jerryy!❤️🪄</p> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="ml-auto h-7 w-7"
          onClick={() => setShowMenu(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </div>
      <div
        className={`h-full overflow-x-hidden overflow-y-scroll bg-cover bg-no-repeat ${
          loader
            ? "grid place-items-center bg-default-background"
            : "bg-chat-background"
        }`}
        id="container"
      >
        {loader && (
          // <svg
          //   xmlns="http://www.w3.org/2000/svg"
          //   fill="none"
          //   viewBox="0 0 24 24"
          //   stroke-width="1.5"
          //   stroke="currentColor"
          //   className="h-10 w-10 animate-spin"
          // >
          //   <path
          //     stroke-linecap="round"
          //     stroke-linejoin="round"
          //     d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
          //   />
          //   <path
          //     stroke-linecap="round"
          //     stroke-linejoin="round"
          //     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          //   />
          // </svg>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 animate-bounce"
          >
            <path
              d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z"
              fill="#FF6347"
              stroke="#ffffff"
              strokeOpacity={".25"}
            />
          </svg>
        )}
        {!loader && (
          <div className="flex flex-col gap-2 bg-black/10 p-4">
            {data?.map((item, index: number) => {
              let chatHead =
                "after:absolute after:top-0 after:left-[-7px] after:border-[7px] after:z-0 after:border-r-white after:border-t-white after:border-l-transparent after:border-b-transparent";
              return (
                <>
                  {(index == 0 || item?.date != data[index - 1].date) && (
                    <Date inputDate={item?.date} />
                  )}
                  <p
                    className={`relative z-10 flex w-fit max-w-[80%] gap-2 whitespace-pre-line break-words rounded-md p-2 text-black ${
                      item?.sender == "Sanjay"
                        ? "bg-white"
                        : "self-end bg-[#DCF8C6]"
                    }`}
                  >
                    {item?.message}
                    <span className="translate-x-1 translate-y-1 self-end whitespace-nowrap pr-1 text-xs text-black/60">
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="fixed bottom-6 right-6 z-50 h-8 w-8 rounded-full bg-white p-2 shadow"
        onClick={scrollToBottom}
      >
        <path
          fill-rule="evenodd"
          d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z"
          clip-rule="evenodd"
        />
      </svg>
    </section>
  );
};

export default Index;

const Date = ({ inputDate }: any) => {
  return (
    <p
      className="w-fit self-center rounded-xl bg-black p-2 text-xs tracking-widest text-white"
      id={inputDate.replaceAll("/", "")}
    >
      {inputDate}
    </p>
  );
};
