import { Footer } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import React from 'react';

const FooterCom = () => {
    return (
        <Footer container className='border border-t-8 bg-slate-950'>
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <Footer.Brand
                href="#"
                src="https://www.shutterstock.com/image-vector/email-icon-simple-vector-illustration-260nw-756554200.jpg"
                alt="Logo"
                name="Email Tool"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="about" />
                <Footer.LinkGroup col>
                  <Footer.Link href="https://flowbite-react.com">Flowbite</Footer.Link>
                  <Footer.Link href="https://tailwindcss.com/docs/guides/vite">Tailwind CSS</Footer.Link>
                  <Footer.Link href="https://react.dev/">React</Footer.Link>
                  <Footer.Link href="https://redux.js.org/">Redux</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow us" />
                <Footer.LinkGroup col>
                  <Footer.Link href="https://github.com/Syed-Moosha">Github</Footer.Link>
                  <Footer.Link href="https://www.linkedin.com/in/mohammed-syed-moosha/">LinkedIn</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Legal" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Privacy Policy</Footer.Link>
                  <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between font-bold">
            <Footer.Copyright href="#" by="Moosha" year={new Date().getFullYear()} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon href="https://github.com/Syed-Moosha" icon={BsGithub} />
              <Footer.Icon href="https://www.google.com/" icon={BsDribbble} />
              <Footer.Icon href="https://www.linkedin.com/in/mohammed-syed-moosha/" icon={BsLinkedin} />
            </div>
          </div>
        </div>
      </Footer>
    );
};

export default FooterCom;

