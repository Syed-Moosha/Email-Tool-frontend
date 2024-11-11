import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MailStatus = () => {
  const { currentuser } = useSelector((state) => state.user);
  const [sentMessages, setSentMessages] = useState([]);
  const [error, setError] = useState(null);

  const fetchSentMessages = async () => {
    if (!currentuser || !currentuser.rest || !currentuser.rest.email) {
      setError("User not authenticated.");
      return;
    }

    try {
      const response = await axios.get(
        `https://email-tool-backend.onrender.com/api/messages/sent/${currentuser.rest.email}`
      );

      if (response.data.success) {
        setSentMessages(response.data.messages);
      } else {
        setError("Failed to load sent messages.");
      }
    } catch (error) {
      setError("Error fetching sent messages.");
    }
  };

  useEffect(() => {
    fetchSentMessages();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-lg font-bold mb-4">Sent Messages Status</h2>

      {error && <p className="text-red-500">{error}</p>}

      {sentMessages.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border dark:bg-gray-800 dark:text-aqua">
            <thead className="bg-gray-200 dark:bg-gray-900">
              <tr>
                <th className="py-2 px-4 border">S.No</th>
                <th className="py-2 px-4 border">Sent At</th>
                <th className="py-2 px-4 border">Recipients</th>
                <th className="py-2 px-4 border">Subject</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Status Message</th>
              </tr>
            </thead>
            <tbody>
              {sentMessages.map((message, index) => {
                const registeredRecipients = message.registeredRecipients || [];
                return (
                  <tr
                    key={message._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border">{new Date(message.createdAt).toLocaleString()}</td>
                    <td className="py-2 px-4 border">{message.recipients.join(", ")}</td>
                    <td className="py-2 px-4 border">{message.subject}</td>
                    <td className="py-2 px-4 border">{message.status}</td>
                    <td className="py-2 px-4 border">
                      {message.status === "Failed"
                        ? `Failed for ${message.recipients.filter(email => !registeredRecipients.includes(email)).join(", ")}`
                        : "Delivered successfully"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No sent messages found.</p>
      )}
    </div>
  );
};

export default MailStatus;
