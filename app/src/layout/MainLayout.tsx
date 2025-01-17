import { Layout } from 'antd';
import HeaderLogged from '../components/header/HeaderLogged';
import Footer from '../components/Footer';

const { Content } = Layout;

const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <Layout>
            <HeaderLogged />
            <Content className="min-h-screen">
                {children}
            </Content>
            <Footer />
        </Layout>
    );
};

export default MainLayout;
