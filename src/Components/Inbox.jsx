import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { useSelector } from "react-redux";

const Inbox = ({ searchTerm }) => {
  const { currentuser } = useSelector((state) => state.user);
  const [mailData, setMailData] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [error, setError] = useState(null);

  const getMail = async () => {
    if (!currentuser || !currentuser.rest.email) {
      setError("User not authenticated.");
      return;
    }

    const userEmail = currentuser.rest.email;
    try {
      const response = await axios.get(
        `https://email-tool-backend.onrender.com/api/messages/inbox/${userEmail}`
      );
      if (response.data.success) {
        setMailData(response.data.messages);
      } else {
        setError("Failed to load emails");
      }
    } catch (error) {
      setError("Error fetching emails");
    }
  };

  useEffect(() => {
    if (currentuser && currentuser.rest && currentuser.rest.email) {
      getMail();
    }
  }, [currentuser]);

  const filteredMailData = mailData.filter(
    (mail) =>
      mail.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-4 mx-auto lg:w-3/4 xl:w-2/3 lg:ml-10 xl:ml-20">
      {filteredMailData.length > 0 ? (
        filteredMailData.map((data) => (
          <div
            key={data._id}
            className="p-4 bg-blue-50 border-b border-gray-200 cursor-pointer rounded-lg mb-4 hover:bg-blue-100 transition-all"
            onClick={() => setSelectedMail(data)}
          >
            <div className="flex justify-between items-center flex-wrap">
              <div className="w-full lg:w-auto">
                <strong className="text-lg md:text-xl lg:text-2xl text-black">{`From: ${data.sender}`}</strong>
                <span className="ml-4 text-sm md:text-base lg:text-lg text-gray-500">{` Subject: ${data.subject}`}</span>
              </div>
              <Button
                size="sm"
                color="red"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="w-full lg:w-auto mt-2 lg:mt-0"
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-base md:text-lg lg:text-xl">No emails found in your inbox.</p>
      )}

      {selectedMail && (
        <Modal
          show={!!selectedMail}
          onClose={() => setSelectedMail(null)}
          size="lg"
        >
          <Modal.Header>Email Details</Modal.Header>
          <Modal.Body>
            <div className="space-y-2">
              <p><strong>From:</strong> {selectedMail.sender}</p>
              <p><strong>Subject:</strong> {selectedMail.subject}</p>
              <p><strong>Message Body:</strong></p>
              <p>{selectedMail.body}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setSelectedMail(null)} color="gray">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default Inbox;
