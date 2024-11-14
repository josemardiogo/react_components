import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

const Alert = ({ children, onClose }: Props) => {
  return (
    <div
      className="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Alert;

/* import { useState } from "react";
import Alert from "./components/Alert/Alert";
import Button from "./components/Button/Button";
import ListGroup from "./components/ListGroup/ListGroup"; */


  /*   const [alertVisible, setAlertVisibity] = useState(false);
    const [aletText, setAletText] = useState("fdgk");
    let items = ["Angola", "Mocambique", "Zambia", "RDC"];
    const onSelectItem = (item: string) => {
      setAletText(item);
      setAlertVisibity(false);
    }; */