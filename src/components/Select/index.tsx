import React from 'react';

interface SelectProps {
  label: string;
  options: { label: string; value: string }[];
  setCurrentOption: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, setCurrentOption }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setCurrentOption(selectedValue);
  };

  return (
    <div>
      <p>{label}</p>
      <select onChange={handleChange}>
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
