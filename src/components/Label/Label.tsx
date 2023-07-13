import InfoIcon from "../InfoIcon";

const Label = ({
  label,
  infoIconText,
}: {
  label: string;
  infoIconText?: string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <label className="text-gray-200 font-bold text-lg" htmlFor={label}>
        {label}
        <span className="text-error-300">*</span>
      </label>
      {infoIconText && <InfoIcon text={infoIconText} />}
    </div>
  );
};
export default Label;
