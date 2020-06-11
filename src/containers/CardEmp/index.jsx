import React, { useState } from "react";
import { Button, Grid, Image, Label, Popup } from "semantic-ui-react";
import user from "../../app/images/my.jpg";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/actions/modal";
import FormEmp from "../FormEmp";
import swal from "sweetalert";
import { deleteEmp } from "../../redux/actions/employee";

const Role = (id) => {
  switch (id) {
    case 1:
      return (
        <Label color="blue" >
          Nhân Viên
        </Label>
      );
    case 2:
      return (
        <Label color="yellow" >
          Nhân Viên Kho
        </Label>
      );
    case 3:
      return (
        <Label color="red" >
          Quản Lý
        </Label>
      );
    default:
      return <Label color="black">Chưa Có Chức Vụ</Label>;
  }
};

const CardEmp = ({ emp }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOpen = (e) => {
    dispatch(openModal(<FormEmp emp={emp} />));
  };

  const handleHover = () => {
    setIsOpen(true);
  };

  const handleOut = () => {
    setIsOpen(false);
  };

  const handleDelete = (id, name) => {
    swal({
      title: `Bạn Muốn Xóa Nhân Viên ${name}  ?`,
      icon: "warning",
      dangerMode: true,
      buttons: ["Thoát", "Có"],
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteEmp(id));
      }
    });
  };
  return (
    <Grid.Column
      computer={3}
      mobile={16}
      className="card-emp"
      onMouseEnter={(e) => handleHover()}
      onMouseLeave={(e) => handleOut()}
    >
      <Image
        src={emp.hinh ? emp.hinh : user}
        className="img-emp"
        style={
          isOpen
            ? {
                filter: "brightness(94%)",
              }
            : {}
        }
      />
      <div
        className="info-detail"
        style={
          isOpen
            ? { backgroundColor: "White", boxShadow: " 2px 2px 4px #888888c0" }
            : {}
        }
      >
        <h4>{emp.tenNv}</h4>
        {Role(emp.maChucVu)}
      </div>
      <Popup
        content="Xóa"
        trigger={
          <Button
            onClick={() => handleDelete(emp.maNv, emp.tenNv)}
            icon="trash"
            style={{ display: isOpen ? "" : "none" }}
            className="btn-delete-emp"
          />
        }
      />
      <Popup
        content="Xem Chi Tiết"
        trigger={
          <Button
            onClick={handleOpen}
            icon="paper plane outline"
            style={{ display: isOpen ? "" : "none" }}
          />
        }
      />
    </Grid.Column>
  );
};

export default React.memo(CardEmp);
