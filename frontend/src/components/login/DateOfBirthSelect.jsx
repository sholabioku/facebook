import { useMediaQuery } from 'react-responsive';

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
  const view1 = useMediaQuery({
    query: '(min-width: 539px)',
  });

  const view2 = useMediaQuery({
    query: '(min-width: 850px)',
  });

  const view3 = useMediaQuery({
    query: '(min-width: 1170px)',
  });

  return (
    <div
      className='reg_grid'
      style={{ marginBottom: `${birthDateError && !view3 && '90px'}` }}
    >
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
      {birthDateError && (
        <div className='input_error'>
          <div className='error_arrow_bottom'></div>
          {birthDateError}
        </div>
      )}
    </div>
  );
};

export default DateOfBirthSelect;
