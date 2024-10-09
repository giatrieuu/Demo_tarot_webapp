import { Layout } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;

const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <Layout>
            <Header />
            <Content className="min-h-screen">
                {children}
            </Content>
            <Footer />
        </Layout>
    );
};

export default MainLayout;
