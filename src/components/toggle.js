import React from 'react';
import PropTypes from 'prop-types';

const Toggle = ({
  checked, leftLabel, name, onChange, rightLabel
}) => (
  <div className="flex justify-start items-center">
    <p className="text-[#4a4a4a] text-2xl tracking-wider transition-all ease-out duration-300 mr-4">{leftLabel}</p>
    <div className="inline-block m-[2.5px] w-11 h-3 text-center relative">
      <label htmlFor={name}>
        <input type="checkbox" className=' checked:bg-white left-6 transition-all duration-500 ease-out' id={name} checked={checked} onChange={onChange} />
        <span className="bg-[#00baa5] duration-500 ease-out transition-all absolute left-0 cursor-pointer" />
        <span className=" h-5 w-5 rounded-[50%] top-[-5px]"> </span>
      </label>
    </div>
    <p className="text-[#4a4a4a] text-2xl tracking-wider transition-all ease-out duration-300 ml-4">{rightLabel}</p>
  </div>
);

Toggle.propTypes = {
  checked: PropTypes.bool,
  leftLabel: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  rightLabel: PropTypes.string
};

export default Toggle;
