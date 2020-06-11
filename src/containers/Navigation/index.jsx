import React from "react";
import { Menu, Layout } from "antd";
import {
  UserAddOutlined,
  PieChartOutlined,
  CarOutlined,
  ContainerOutlined,
  SaveOutlined,
  SolutionOutlined,
  ShopOutlined,
  MailFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import logo from "../../app/images/logo.png";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { history } from "index";
const { Sider } = Layout;
const { SubMenu } = Menu;

const Navigation = ({ match }) => {
  const { open } = useSelector((s) => s.nav);

  const maCV = useSelector((s) => s.account.currentUser.maChucVu);
  const handleRoute = (item) => {
    history.push(`${item.key}`);
  };

  switch (maCV) {
    case 1:
    case 2:
      return (
        <Sider collapsed={open} theme="dark" width="250px">
          <div className="img-logo">
            <div className="cover-logo">
              <img src={logo} alt="logo" />
            </div>{" "}
            {!open && <h2>Anh Hòa Store</h2>}
          </div>
          <Menu mode="inline" theme="dark" onClick={handleRoute}>
            <Menu.Item key="/car" icon={<CarOutlined />}>
              Xe
            </Menu.Item>
            <SubMenu key="sub1" icon={<ContainerOutlined />} title="Hóa Đơn">
              <Menu.Item key="/order">Phiếu Xuất</Menu.Item>
              <Menu.Item key="/order/create">Tạo Phiếu Xuất</Menu.Item>
            </SubMenu>
            <Menu.Item key="/cus" icon={<SolutionOutlined />}>
              Khách Hàng
            </Menu.Item>
            <Menu.Item key="/store" icon={<ShopOutlined />}>
              Kho
            </Menu.Item>
          </Menu>
        </Sider>
      );
    case 3:
      return (
        <Sider collapsed={open} theme="dark" width="250px">
          <div className="img-logo">
            <div className="cover-logo">
              <img src={logo} alt="logo" />
            </div>{" "}
            {!open && <h2>Anh Hòa Store</h2>}
          </div>
          <Menu mode="inline" theme="dark" onClick={handleRoute}>
            <Menu.Item key="/car" icon={<CarOutlined />}>
              Xe
            </Menu.Item>
            <SubMenu key="sub1" icon={<ContainerOutlined />} title="Hóa Đơn">
              <Menu.Item key="/order">Phiếu Xuất</Menu.Item>
              <Menu.Item key="/pur">Phiếu Nhập</Menu.Item>
              <Menu.Item key="/pur/create">Tạo Phiếu Nhập</Menu.Item>
            </SubMenu>
            <Menu.Item key="/sup" icon={<SaveOutlined />}>
              Nhà Cung Cấp
            </Menu.Item>
            <Menu.Item key="/cus" icon={<SolutionOutlined />}>
              Khách Hàng
            </Menu.Item>
            <Menu.Item key="/store" icon={<ShopOutlined />}>
              Kho
            </Menu.Item>
          </Menu>
        </Sider>
      );
    case 4:
      return (
        <Sider collapsed={open} theme="dark" width="250px">
          <div className="img-logo">
            <div className="cover-logo">
              <img src={logo} alt="logo" />
            </div>{" "}
            {!open && <h2>Anh Hòa Store</h2>}
          </div>
          <Menu mode="inline" theme="dark" onClick={handleRoute}>
            <Menu.Item key="/chart" icon={<PieChartOutlined />}>
              Biểu Đồ Doanh Thu
            </Menu.Item>
            <Menu.Item key="/car" icon={<CarOutlined />}>
              Xe
            </Menu.Item>
            <SubMenu key="sub1" icon={<ContainerOutlined />} title="Hóa Đơn">
              <Menu.Item key="/order">Phiếu Xuất</Menu.Item>
              <Menu.Item key="/pur">Phiếu Nhập</Menu.Item>
            </SubMenu>
            <Menu.Item key="/emp" icon={<UserAddOutlined />}>
              Nhân Viên
            </Menu.Item>
            <Menu.Item key="/acc" icon={<MailFilled />}>
              Tài Khoản
            </Menu.Item>
            <Menu.Item key="/sup" icon={<SaveOutlined />}>
              Nhà Cung Cấp
            </Menu.Item>
            <Menu.Item key="/cus" icon={<SolutionOutlined />}>
              Khách Hàng
            </Menu.Item>
            <Menu.Item key="/store" icon={<ShopOutlined />}>
              Kho
            </Menu.Item>
          </Menu>
        </Sider>
      );
    default:
      return <div></div>;
      break;
  }
};

export default Navigation;
