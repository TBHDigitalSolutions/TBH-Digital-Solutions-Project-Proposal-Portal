import React, { useState } from 'react';
import { useUser } from '../UserContext';

const allowedEmails = [
  'conor@tbhDigitalsolutions.com',
  'conorhovis1@gmail.com',
  'admin@tbhDigitalsolutions.com'
];
const allowedDomain = '@tbhDigitalsolutions.com';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { setUserId } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with email:', email); // Debug log for form submission

    if (allowedEmails.includes(email.toLowerCase()) || email.endsWith(allowedDomain)) {
      setUserId(email); // Set userId in context
      onLogin(email); // Pass email to parent component
      console.log('Login successful, onLogin called');
    } else {
      console.log('Access denied for email:', email); // Log for denied access
      setError('Access denied. Please use an allowed email or a company email.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-gradient-to-br from-white to-gray-100 rounded-lg">
      <div className="flex flex-col items-center mb-6">
        <img
          src="/assets/logos/1.png"
          alt="Company Logo"
          className="h-12 w-12 mb-2"
        />
        <h1 className="text-2xl font-bold text-dark-charcoal text-center font-sovjet">
          TBH Digital Solutions
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-[0px_4px_12px_rgba(14,175,251,0.25)] rounded-lg px-8 pt-6 pb-8"
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-6 font-aldrich">
          Login to Access Portal
        </h2>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:bg-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-logo-blue"
            placeholder="Enter Email for Access"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-logo-blue text-soft-black font-aldrich text-lg px-10 py-4 rounded-lg shadow-lg hover:bg-darker-blue hover:text-white transition duration-200 ease-in-out w-full"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
