interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({ value, onChange }: TextAreaProps) => {
  return (
    <div>
      <textarea
        value={value}
        onChange={onChange}
        className="w-full mb-10 h-40 bg-transparent border text-white border-gray-400 p-3"
        placeholder="Start Typing..."
      ></textarea>
    </div>
  );
};
export default TextArea;
