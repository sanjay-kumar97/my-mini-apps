import Router from "next/router";
import { RightArrowIcon } from "@/data/icons";

const AppCard = ({ props }: any) => {
  const { name, page } = props;

  const redirectToPage = (page: string) => {
    Router.push(page);
  };

  return (
    <div className="p-10 justify-center border-[1px] rounded-xl shadow-xl transition-all bg-white/90">
      <h2 className="text-2xl">{name}</h2>
      <p
        className="flex items-center gap-2 cursor-pointer pt-4 w-fit text-lg hover:text-purple-500"
        onClick={() => redirectToPage(page)}
      >
        <span className="whitespace-nowrap">View App</span> <RightArrowIcon />
      </p>
    </div>
  );
};

export default AppCard;
