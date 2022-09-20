import React from 'react';

const DateOfBirthSelect = ({
  bDay,
  bMonth,
  bYear,
  days,
  months,
  years,
  handleRegisterChange,
  birthDateError,
}) => {
  return (
    <div className='reg_grid'>
      <select name='bDay' value={bDay} onChange={handleRegisterChange}>
        {days.map((day, index) => (
          <option key={index} value={day}>
            {day}
          </option>
        ))}
      </select>
      <select name='bMonth' value={bMonth} onChange={handleRegisterChange}>
        {months.map((month, index) => (
          <option value={month} key={index}>
            {month}
          </option>
        ))}
      </select>
      <select name='bYear' value={bYear} onChange={handleRegisterChange}>
        {years.map((year, index) => (
          <option value={year} key={index}>
            {year}
          </option>
        ))}
      </select>
      {birthDateError && <div className='input_error'>{birthDateError}</div>}
    </div>
  );
};

export default DateOfBirthSelect;
