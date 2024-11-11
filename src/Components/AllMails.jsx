import React, { useState, useEffect } from 'react';
import { TextInput } from 'flowbite-react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AllMails = () => {
  const { currentuser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [allMails, setAllMails] = useState([]);
  const [filteredMails, setFilteredMails] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllMails = async () => {
    if (!currentuser || !currentuser.rest.email) {
      setError("User not authenticated.");
      return;
    }

    const userEmail = currentuser.rest.email;

    try {
      const [inboxResponse, sentResponse] = await Promise.all([
        axios.get(`https://email-tool-backend.onrender.com/api/messages/inbox/${userEmail}`),
        axios.get(`https://email-tool-backend.onrender.com/api/messages/sent/${userEmail}`)
      ]);

      const inboxMails = inboxResponse.data.success ? inboxResponse.data.messages : [];
      const sentMails = sentResponse.data.success ? sentResponse.data.messages : [];

      setAllMails([...inboxMails, ...sentMails]);
    } catch (error) {
      setError("Error fetching emails");
      console.error(error);
    }
  };

  useEffect(() => {
    setFilteredMails(
      allMails.filter(
        (mail) =>
          mail.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mail.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mail.sender.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [allMails, searchTerm]);

  useEffect(() => {
    if (currentuser && currentuser.rest.email) {
      fetchAllMails();
    }
  }, [currentuser]);

  return (
    <div className="mx-4 md:mx-8 lg:mx-20 xl:mx-32 py-6"> 
    
      <TextInput
        type="text"
        placeholder="Search Mails..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full md:w-1/2 lg:w-1/3 mx-auto"
      />

      {filteredMails.length > 0 ? (
        filteredMails.map((mail, index) => (
          <div
            key={index}
            className="p-4 bg-blue-50 border-b border-gray-200 rounded-lg shadow-sm transition-all hover:bg-blue-100"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <strong className="text-lg sm:text-xl lg:text-2xl text-black">{mail.sender}</strong>
                <span className="ml-4 text-sm lg:text-base text-gray-500">{mail.subject}</span>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 w-full">{mail.body}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No emails found.</p>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default AllMails;
