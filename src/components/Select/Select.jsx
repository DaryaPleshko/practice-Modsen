// import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ label, options, setCurrentOption }) => {
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

Select.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setCurrentOption: PropTypes.func.isRequired,
};

export default Select;
