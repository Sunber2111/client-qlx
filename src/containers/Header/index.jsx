import React from "react";
import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeState } from "../../redux/actions/navigation";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import "./style.scss";
import settings from "../../app/images/settings.png";
import logout from "../../app/images/logout.png";
import { logout as Logout } from "redux/actions/account";
import { getById } from "redux/actions/employee";
import { openDialog } from "redux/actions/dialog";
import FormEmp from "containers/FormEmp";
import { warning } from "app/notify";
import { openModal } from "redux/actions/modal";

const { Header } = Layout;
const { SubMenu } = Menu;

const HeaderNav = () => {
  const dispatch = useDispatch();

  const { open } = useSelector((s) => s.nav);

  const { currentUser } = useSelector((s) => s.account);

  const toggle = () => {
    dispatch(changeState());
  };

  const handleLogout = (e) => {
    dispatch(Logout());
  };

  const handleUpdate = () => {
    getById(currentUser.maNv)
      .then((data) => {
        dispatch(openModal(<FormEmp emp={data} custom={true} />));
      })
      .catch((err) => warning(err));
  };

  return (
    <Header className="bg-nav-header" style={{ padding: 0 }}>
      {React.createElement(open ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger btn-nav",
        onClick: toggle,
      })}
      <div style={{ flex: "1 1 0%" }}></div>
      <div className="header-info">
        <Menu mode="horizontal">
          <Menu.Item>
            <Avatar size="large" icon={<UserOutlined />} src={currentUser.hinh}></Avatar>
          </Menu.Item>
          <SubMenu title={currentUser.tenNv}>
            <Menu.Item key="setting:1" onClick={handleUpdate}>
              <img src={settings} className="img-header" alt="chinh sua" />
              Chỉnh Sửa
            </Menu.Item>
            <Menu.Item key="setting:2" onClick={handleLogout}>
              <img src={logout} className="img-header" alt="dang xuat" />
              Đăng Xuất
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Header>
  );
};

export default HeaderNav;
