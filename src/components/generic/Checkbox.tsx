import React, { ChangeEvent } from "react";

//styling
import styled from "styled-components";

interface CheckboxProps {
  className?: string;
  checked: boolean;
  StyledIcons?: { checked: any; unchecked: any };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
//Custom Elements
const Checkbox: React.FC<CheckboxProps> = ({
  StyledIcons,
  className,
  checked,
  onChange,
  ...props
}) => (
  <CheckboxContainer>
    <input
      className={className}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      {...props}
    />
    {StyledIcons &&
      (checked ? <StyledIcons.checked /> : <StyledIcons.unchecked />)}
  </CheckboxContainer>
);

const CheckboxContainer = styled.label`
  input {
    // Hide checkbox visually but remain accessible to screen readers.
    // Source: https://polished.js.org/docs/#hidevisually
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

export default Checkbox;
