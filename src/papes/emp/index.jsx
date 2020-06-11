import React from "react";
import "./style.scss";
import { Button } from "semantic-ui-react";
import EmployeeTable from "../../containers/EmployeeTable";
import { useDispatch } from 'react-redux';
import { openModal } from "../../redux/actions/modal";
import FormEmp from "../../containers/FormEmp";


const EmpPape = () => {

  const dispatch = useDispatch();

  const handleOpen = e =>{
    dispatch(openModal(<FormEmp />))
  }

  return (
    <div className='mx-auto'>
      <div className="info-emp-pape">
        <h2>Danh Sách nhân Viên</h2>
        <Button color="green" onClick={handleOpen}>
          Thêm
        </Button>
      </div>
     
      <EmployeeTable />
    </div>
  );
};

export default EmpPape;
