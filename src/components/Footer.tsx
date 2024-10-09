import { Layout, Input, Button, Divider } from 'antd';
import Logo from './Logo';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className="p-4 sm:p-8 bg-[#2C4551] text-gray-300 w-full">
      <div className="container mx-auto">
        {/* Newsletter Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-6">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-0 text-center sm:text-left">
            Join our newsletter to keep up to date with us!
          </h3>
          <div className="flex flex-col sm:flex-row items-center">
            <Input placeholder="Enter your email" className="mb-4 sm:mb-0 sm:mr-4" />
            <Button type="primary" className="custom-button">
              Subscribe
            </Button>
          </div>
        </div>
        <Divider className="border-gray-600" />
        {/* Main Content */}
        <div className="flex flex-col sm:flex-row justify-between py-8">
          {/* Company Info */}
          <div className="mb-8 sm:mb-0 sm:w-1/4 text-center sm:text-left">
            {/* <div className="flex justify-center sm:justify-start items-center mb-4">
              <span className="text-2xl font-bold text-white">Tarot</span>
            </div> */}
            <Logo />
            <p className="text-gray-400 mt-4">We growing up your business with personal AI manager.</p>
          </div>
          {/* Links */}
          <div className="sm:w-3/4 flex flex-col sm:flex-row sm:justify-end space-y-8 sm:space-y-0 sm:space-x-12 text-center sm:text-left">
            <div>
              <h4 className="font-semibold mb-4 text-white">Platform</h4>
              <ul>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Plans & Pricing
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Personal AI Manager
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    AI Business Writer
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Blog
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Careers
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    News
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Documentation
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Papers
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Press Conferences
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Divider className="border-gray-600" />
        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <span className="text-gray-400 mb-4 sm:mb-0">© 2024 TarotF.</span>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
