import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Email is required');
    } else if (!/.+@.+\..+/.test(email)) {
      setMessage('Please enter a valid email');
    } else {
      setMessage('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-border rounded bg-card">
      <h2 className="text-xl font-semibold mb-4">Newsletter Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-center text-muted-foreground">{message}</p>}
    </div>
  );
};

export default NewsletterSignup;
