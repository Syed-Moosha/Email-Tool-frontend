import React, { useState } from 'react';
import Header from '../Components/Header';
import LeftSidebar from '../Components/LeftSidebar';
import Inbox from '../Components/Inbox';
import AllMails from '../Components/AllMails';
import Sent from '../Components/Sent';
import MailStatus from '../Components/MailStatus';


const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedComponent, setSelectedComponent] = useState('Inbox');
    const mainComponent = () => {
        switch (selectedComponent) {
            case 'AllMails':
                return <AllMails />;
            case 'Inbox':
                return <Inbox searchTerm={searchTerm}/>;
            case 'Sent':
                return <Sent />;
            case 'MailStatus':
                return <MailStatus />;
            default:
                return <AllMails />;
        }
    };
    return (
        <div>
            <Header onSearch={(term) => setSearchTerm(term)}/>
            <div style={{ display: 'flex' }}>
                <LeftSidebar setSelectedComponent={setSelectedComponent} />
                <div className="main-content">
                    {mainComponent()}
                </div>
                
            </div>
        </div>
    );
};

export default Home;