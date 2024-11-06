import React, { useState } from 'react';
import { useUser } from '../UserContext';

const allowedEmails = [
  'conor@tbhigitalsolutions.com',
  'conorhovis1@gmail.com',
  'admin@tbhDigitalsolutions.com',
  'clefave@andovereyeinstitute.com',
  'khicks@andovereye.org',
  'dwelch@andovereyeinstitute.com',
  'sabelson@mnccapital.com',
  'ktheberge@andovereyeinstitute.com',
  'mbabelson@gmail.com',
  'OraDPO@oraclinical.com',
  'talent@oraclinical.com',
  'orarecruiting@oraclinical.com',
  'klane@oraclinical.com',
  'mhovis92@gmail.com',
  'reannencarver@gmail.com',
  'lorihovis746@gmail.com',
  'coachhovis@gmail.com'
];

const allowedDomains = [
  '@tbhdigitalsolutions.com',
  '@mnccapital.com',
  '@andovereyeinstitute.com',
  '@oraclinical.com',
  '@andovereye.org'
];

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { setUserId } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with email:', email);

    const isAllowedEmail = allowedEmails.includes(email.toLowerCase());
    const isAllowedDomain = allowedDomains.some(domain => email.endsWith(domain));

    if (isAllowedEmail || isAllowedDomain) {
      setUserId(email);
      onLogin(email);
      console.log('Login successful, onLogin called');
    } else {
      console.log('Access denied for email:', email);
      setError('Access denied. Please use an allowed email or a company email.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-gradient-to-br from-white to-gray-100 rounded-lg">
      <div className="flex flex-col items-center mb-6">
        <img src="/assets/logos/1.png" alt="Company Logo" className="h-12 w-12 mb-2" />
        <h1 className="text-2xl font-bold text-dark-charcoal text-center font-sovjet">
          TBH Digital Solutions
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-8 pt-6 pb-8">
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
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-black dark:bg-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-logo-blue"
            placeholder="Enter Email for Access"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-logo-blue text-soft-black font-aldrich text-lg px-10 py-4 rounded-lg shadow-lg w-full"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
