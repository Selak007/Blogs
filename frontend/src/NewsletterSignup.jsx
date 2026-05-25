import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Email is required');
    } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,7}$/i.test(email)) {
      setMessage('Please enter a valid email');
    } else {
      setMessage('Thank you for subscribing!');
    }
  };

  return (
    <div className="newsletter-signup">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded focus:outline-none"
            required
            aria-required="true"
            aria-describedby="email-description"
          />
        </div>
        <button type="submit" className="bg-primary text-white p-2 rounded hover:bg-accent mt-2">Subscribe</button>
      </form>
      {message && <p className={`mt-2 ${message.includes('Thank') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
    </div>
  );
};

export default NewsletterSignup;