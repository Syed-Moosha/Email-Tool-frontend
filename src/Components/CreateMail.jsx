import React, { useState } from 'react';
import { Button, Modal, Label, TextInput, Textarea } from 'flowbite-react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CreateMail = () => {
  const { currentuser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.to || !formData.subject || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }
  
    const recipients = formData.to.split(';').map(email => email.trim()).join(';'); 

    if (!currentuser.rest.email) {
      setError("Sender email not found.");
      return;
    }
  
    try {
      const formPayload = {
        senderEmail: currentuser.rest.email,  
        recipients,  
        subject: formData.subject,
        body: formData.message,
      };
  
      const response = await axios.post('https://email-tool-backend.onrender.com/api/messages/compose', formPayload);
  
      if (response.status === 200) {
        setFormData({ to: '', subject: '', message: '' });
        setIsOpen(false);  
        alert('Mail sent successfully!'); 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending mail');
    }
  };

  return (
    <div>
      <Button gradientDuoTone="purpleToPink" onClick={() => setIsOpen(true)} className="w-full sm:w-auto">
        Create New
      </Button>

      <Modal show={isOpen} onClose={() => setIsOpen(false)} size="lg">
        <Modal.Header>Compose New Message</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="to" value="To" />
              <TextInput
                id="to"
                type="email"
                placeholder="Recipient's email (separate multiple emails with semicolon)"
                value={formData.to}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="subject" value="Subject" />
              <TextInput
                id="subject"
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="message" value="Message" />
              <Textarea
                id="message"
                placeholder="Type your message here..."
                rows={12}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </Modal.Body>
        <Modal.Footer className="flex justify-between w-full">
          <Button onClick={handleSubmit} className="w-full sm:w-auto">
            Send
          </Button>
          <Button color="gray" onClick={() => setIsOpen(false)} className="w-full sm:w-auto">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateMail;
