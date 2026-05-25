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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Invalid email format');
      return;
    }
    setMessage('Thank you for subscribing!');
  };

  return (
    <div className="newsletter-signup">
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="border p-2 w-full rounded focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-primary text-white p-2 rounded hover:bg-accent mt-4">
          Subscribe
        </button>
        {message && <p className={`mt-2 ${message.includes('Thank you') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
      </form>
    </div>
  );
};

export default NewsletterSignup;
