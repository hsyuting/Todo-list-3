import React, { ChangeEvent } from "react";
import DatePickerTool from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <DatePickerTool selected={selected} onChange={onChange} />
  </label>
);

export default DatePicker;
