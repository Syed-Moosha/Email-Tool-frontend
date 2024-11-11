import React, { useState } from 'react';
import { Sidebar } from "flowbite-react";
import { HiInbox } from "react-icons/hi";
import { FaMailBulk } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { MdDrafts } from "react-icons/md";
import CreateMail from './CreateMail';
import { RiMenuUnfold3Line } from "react-icons/ri";

const LeftSidebar = ({ setSelectedComponent }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex md:flex-col">
            <button 
                className="md:hidden p-2 m-2 bg-gray-100 rounded-md focus:outline-none"
                onClick={toggleSidebar}
            >
                <RiMenuUnfold3Line />
            </button>
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
                <Sidebar aria-label="Default sidebar example" className="h-screen w-60 md:w-48">
                    <Sidebar.Items>
                        <CreateMail />
                        <Sidebar.ItemGroup>
                            <Sidebar.Item icon={FaMailBulk}>
                                <span style={{ cursor: "pointer" }} onClick={() => setSelectedComponent('AllMails')}>All Mails</span>
                            </Sidebar.Item>
                            <Sidebar.Item icon={HiInbox}>
                                <span style={{ cursor: "pointer" }} onClick={() => setSelectedComponent('Inbox')}>Inbox</span>
                            </Sidebar.Item>
                            <Sidebar.Item icon={IoMdSend}>
                                <span style={{ cursor: "pointer" }} onClick={() => setSelectedComponent('Sent')}>Sent</span>
                            </Sidebar.Item>
                            <Sidebar.Item icon={MdDrafts}>
                                <span style={{ cursor: "pointer" }} onClick={() => setSelectedComponent('MailStatus')}>Mail Status</span>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        </div>
    );
};

export default LeftSidebar;
