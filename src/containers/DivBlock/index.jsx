import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeState } from "redux/actions/navigation";
const DivBlock = () => {
  const { open } = useSelector((s) => s.nav);

  const dispatch = useDispatch();
  const handleClose = (e) => {
    dispatch(changeState());
  };
  if (!open) return <div className="bg-block" onClick={handleClose}></div>;

  return <div></div>;
};

export default DivBlock;
