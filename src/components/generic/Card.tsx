import React from "react";
import styled from "styled-components";

interface CardProps {
  onHover?: Function;
  onClick?: Function;
}

const Card: React.FC<CardProps> = ({ children, onHover, onClick }) => {
  return <CardContainer>{children}</CardContainer>;
};

const CardContainer = styled.div`
  position: relative;
  background-color: #fff;
  text-decoration: none;
  border-radius: 5px;
  box-shadow: 0 1px 5px rgba(9, 30, 66, 0.25);
  cursor: pointer;
  margin-bottom: 8px;
  min-height: 2em;
  & > * {
    grid-column: 2/3;
  }
  &:hover {
    background-color: #eeeeee88;
  }
  &:active {
    background-color: #fff;
  }
`;

export default Card;
