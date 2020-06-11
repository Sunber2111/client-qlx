import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Zoom from "@material-ui/core/Zoom";
import { useSelector } from "react-redux";
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Zoom in={true} ref={ref} {...props} style={{ transitionDelay: "380ms" }} />
  );
});

const ModalMruContainer = () => {

  const { openMRU, bodyMRU } = useSelector((s) => s.dialog);

  return (
    <Dialog
      open={openMRU}
      fullWidth
      maxWidth={"lg"}
      TransitionComponent={Transition}
      keepMounted
    >
     {bodyMRU}
    </Dialog>
  );
};

export default ModalMruContainer;
