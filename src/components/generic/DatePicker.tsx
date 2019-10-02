import React from "react";
import DatePickerTool from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

interface DatePickerProps {
  className?: string;
  selected: Date | undefined | null;
  onChange: (date: Date, event: React.SyntheticEvent<any> | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  children,
  className,
  selected,
  onChange
}) => (
  <label className={className}>
    {children}
    <StyledDatePickerTool selected={selected} onChange={onChange} />
  </label>
);

const StyledDatePickerTool = styled(DatePickerTool)`
  width: 7rem;
  min-width: 7rem;
`;

export default DatePicker;
