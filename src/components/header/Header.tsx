import { Layout, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

const { Header } = Layout;
const { Search } = Input;

const AppHeader: React.FC = () => {
  return (
    <Header className="flex justify-between items-center bg-[#2C4551] shadow-md p-4">
      <Logo />

      <div className="flex-1 text-center mt-8">
        <Search placeholder="Search..." className="max-w-md" />
      </div>

      <div className="flex space-x-4">
        <Link to="/list-tarot-reader" className="text-white">Booking</Link>
        <Link to="/blog" className="text-white">Blog</Link>

        <Button type="primary" className="bg-[#5F8D8D] text-white font-bold mt-4">
          <Link to="/login">Log in</Link>
        </Button>

        <Button className="bg-[#DDE6E6] text-[#243642] mt-4">
          <Link to="/register">Sign up</Link>
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;
