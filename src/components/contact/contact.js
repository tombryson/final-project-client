import React from 'react';

const Contact = () => {
  return (
    <>
    <div>
      <h1>Contact Me!</h1>
      <p>Email: jonathan@gmail.com</p>
      <p>Phone: 123-456-7890</p>
    </div>
    <h2>Contact Form</h2>
    <form>
      <label>Name</label>
      <input type="text" name="name" />
      <label>Email</label>
      <input type="email" name="email" />
      <label>Message</label>
      <textarea name="message"></textarea>
      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default Contact;