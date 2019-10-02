import React, {
  useRef,
  createContext,
  useContext,
  useState,
  useEffect
} from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

///Utils
/*
Remove this later, it is tied to the utils now.
*/
import useLockBodyScroll from "../../utils/use-lock-body-scroll";

//ModalProvider Code
type ModalContextProps = Element | any;

const ModalContext = createContext<ModalContextProps>({});

export const ModalProvider: React.FC = ({ children }) => {
  const modalRef: any = useRef();
  const [context, setContext] = useState();
  useEffect(() => {
    setContext(modalRef.current);
  }, []);

  return (
    <Container>
      <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </Container>
  );
};

//Modal Code
interface ModalProps {
  buttonName?: string;
  onClose: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent
  ) => void;
}

export const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  buttonName,
  ...props
}) => {
  useLockBodyScroll();
  const modalNode = useContext(ModalContext);
  // Bad way of handling it ?
  // const handleKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === "Escape") onClose(e);
  // };
  //onKeyPress={handleKeyPress} property on button
  return modalNode
    ? ReactDOM.createPortal(
        <Overlay>
          <Dialog {...props}>
            {children}
            <CloseButton onClick={onClose}>{buttonName || "Close"}</CloseButton>
          </Dialog>
        </Overlay>,
        modalNode
      )
    : null;
};

const fadeIn = keyframes`from {opacity: 0}`;

const Container = styled.div`
  position: relative;
  z-index: 0;
`;

const Overlay = styled.div`
  animation: ${fadeIn} 200ms ease-out;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const Dialog = styled.div`
  position: absolute;
  background: white;
  min-width: 40vw;
  min-height: 40vh;
  border-radius: 5px;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const CloseButton = styled.button`
  background-color: transparent;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: mediumseagreen;
  border: 2px solid mediumseagreen;
  &:hover {
    color: white;
    background-color: mediumseagreen;
    border-color: white;
  }
  &:active {
    color: mediumseagreen;
    background-color: white;
    border-color: mediumseagreen;
  }
`;
