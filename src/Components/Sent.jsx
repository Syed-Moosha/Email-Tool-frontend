import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { useSelector } from "react-redux";

const Sent = () => {
  const { currentuser } = useSelector((state) => state.user);
  const [sentMailData, setSentMailData] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [error, setError] = useState(null);

  const getSentMail = async () => {
    if (!currentuser || !currentuser.rest.email) {
      setError("User not authenticated.");
      return;
    }

    const userEmail = currentuser.rest.email;
    try {
      const response = await axios.get(
        `https://email-tool-backend.onrender.com/api/messages/sent/${userEmail}`
      );
      if (response.data.success) {
        setSentMailData(response.data.messages);
      } else {
        setError("Failed to load sent emails");
      }
    } catch (error) {
      setError("Error fetching sent emails");
    }
  };

  useEffect(() => {
    if (currentuser && currentuser.rest.email) {
      getSentMail();
    }
  }, [currentuser]);

  return (
    <div className="w-full p-4 sm:p-2 mx-auto sm:w-full md:w-3/4 lg:w-full xl:w-full" style={{ marginLeft: "4vw" }}>
      {sentMailData.length > 0 ? (
        sentMailData.map((data, index) => (
          <div
            key={index}
            className="p-4 sm:p-3 bg-green-50 border-b border-gray-200 cursor-pointer rounded-lg mb-2 sm:mb-3 md:mb-4 hover:bg-green-100 transition-all"
            onClick={() => setSelectedMail(data)}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="text-base sm:text-sm md:text-lg">
                <strong>To:</strong> {data.recipients}
              </div>
              <div className="mt-1 md:mt-0 text-gray-500 text-sm md:text-base">
                {data.subject}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-base sm:text-sm md:text-lg">
          No sent emails found.
        </p>
      )}

      {selectedMail && (
        <Modal
          show={!!selectedMail}
          onClose={() => setSelectedMail(null)}
          size="lg"
        >
          <Modal.Header>Sent Email Details</Modal.Header>
          <Modal.Body>
            <div className="space-y-2 text-sm sm:text-base md:text-lg">
              <p>
                <strong>To:</strong> {selectedMail.recipients}
              </p>
              <p>
                <strong>Subject:</strong> {selectedMail.subject}
              </p>
              <p>
                <strong>Message Body:</strong>
              </p>
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

      {error && <p className="text-red-500 text-center text-sm sm:text-base">{error}</p>}
    </div>
  );
};

export default Sent;
