import { Row, Col, Button, Typography } from "antd";
import { AlignLeftOutlined } from "@ant-design/icons";
import "./Header.scss";
import { useMediaQuery } from "react-responsive";
import AdminAccount from "../../../../components/admin-account/AdminAccount";

interface HeaderProps {
  name: string;
  subName?: string;
  onPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ name, subName, onPress }) => {
  const isDesktop = useMediaQuery({ minWidth: 991 });

  return (
    <Row className="header-dashboard items-center">
      <Col
        xl={1}
        lg={1}
        md={1}
        sm={1}
        xs={1}
        className="header-dashboard__header-control"
      >
        {!isDesktop && (
          <Button
            type="link"
            className="header-dashboard__header-control__sidebar-toggler"
            onClick={onPress}
          >
            <AlignLeftOutlined />
          </Button>
        )}
      </Col>

      {/* 🟢 Căn chỉnh tên Dashboard */}
      <Col>
        <Typography.Title level={4} className="header-title">
          {name}{" "}
          <Typography.Text className="header-subtitle">{subName}</Typography.Text>
        </Typography.Title>
      </Col>

      {/* 🟢 Admin Account (Avatar + Info) */}
      <Col className="ml-auto">
        <AdminAccount />
      </Col>
    </Row>
  );
};

export default Header;
