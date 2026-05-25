import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Email is required');
      return;
    }
    const emailRegex = /^[\w-.]+@[\w-]+\.+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      setMessage('Invalid email address');
      return;
    }
    setMessage('Thank you for subscribing!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block">Email address</label>
        <input
          type="email"
          id="email"
          className="border p-2 w-full rounded focus:outline-none"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="emailHelp"
        />
      </div>
      <button type="submit" className="bg-primary text-white p-2 rounded hover:bg-accent">
        Subscribe
      </button>
      {message && (
        <p className={`mt-2 ${message.includes('Thank') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
      )}
    </form>
  );
};

export default NewsletterSignup;
