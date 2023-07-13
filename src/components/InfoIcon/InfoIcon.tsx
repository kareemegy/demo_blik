import Info from "../../assets/infoIcon.svg";
import { Tooltip } from "react-tooltip";

const InfoIcon = ({ text }: { text: string }) => {
  return (
    <>
      <a className="element">
        <div className="flex justify-center border border-white border-1 rounded-xl w-4 h-4  ">
          <img src={Info} alt="info icon" />
        </div>
      </a>
      <Tooltip anchorSelect=".element" place="top">
        {text}
      </Tooltip>
    </>
  );
};

export default InfoIcon;
