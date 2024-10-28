import { Layout, Input, Button, Divider } from 'antd';
import Logo from './Logo';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className="p-4 sm:p-8 bg-white text-[#4a044e] w-full">
      <div className="container mx-auto">
        {/* Newsletter Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-0 text-center sm:text-left">
            Join our newsletter to keep up to date with us!
          </h3>
          <div className="flex flex-col sm:flex-row items-center">
            <Input placeholder="Enter your email" className="mb-4 sm:mb-0 sm:mr-4" />
            <Button type="primary" className="custom-button">
              Subscribe
            </Button>
          </div>
        </div>
        <Divider className="border-gray-300" />
        {/* Main Content */}
        <div className="flex flex-col sm:flex-row justify-between py-8">
          {/* Company Info */}
          <div className="mb-8 sm:mb-0 sm:w-1/4 text-center sm:text-left">
            <Logo />
            <p className="text-[#4a044e] mt-4">We grow your business with a personal AI manager.</p>
          </div>
          {/* Links */}
          <div className="sm:w-3/4 flex flex-col sm:flex-row sm:justify-end space-y-8 sm:space-y-0 sm:space-x-12 text-center sm:text-left">
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul>
                <li className="py-1">
                  <a href="#" className="text-[#4a044e] hover:text-black">
                    Plans & Pricing
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-[#4a044e] hover:text-black">
                    Personal AI Manager
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-[#4a044e] hover:text-black">
                    AI Business Writer
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul>
                <li className="py-1">
                  <a href="#" className="text-[#4a044e] hover:text-black">
                    Blog
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-[#4a044e] hover:text-black">
                    Careers
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-[#4a044e] hover:text-black">
                    News
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul>
                <li className="py-1">
                  <a href="#" className="text-[#4a044e] hover:text-black">
                    Documentation
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-[#4a044e] hover:text-black">
                    Papers
                  </a>
                </li>
                <li className="py-1">
                  <a href="#" className="text-[#4a044e] hover:text-black">
                    Press Conferences
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Divider className="border-gray-300" />
        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <span className="text-[#4a044e] mb-4 sm:mb-0">© 2024 TarotF.</span>
          <div className="flex space-x-4">
            <a href="#" className="text-[#4a044e] hover:text-black">
              Terms of Service
            </a>
            <a href="#" className="text-[#4a044e] hover:text-black">
              Privacy Policy
            </a>
            <a href="#" className="text-[#4a044e] hover:text-black">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
