interface SelectProps {
  label: string;
  options: { label: string; value: string }[];
  setCurrentOption: (param: any) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, setCurrentOption }) => {
  return (
    <div>
      <p>{label}</p>
      <select onChange={setCurrentOption}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { Select };
