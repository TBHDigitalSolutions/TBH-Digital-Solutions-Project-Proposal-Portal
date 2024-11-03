import './styles.css';
import React, { useState, useEffect, useCallback } from 'react';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import logo from './1.png';
import { db, collection, addDoc, serverTimestamp, updateDoc, doc } from './firebase';
import { UserProvider, useUser } from './UserContext';

// Slide-specific templates
import Slide1ContentTemplate from './components/Slide1/Slide1ContentTemplate';
import Slide1QuoteTemplate from './components/Slide1/Slide1QuoteTemplate';
import Slide2ContentTemplate from './components/Slide2/Slide2ContentTemplate';
import Slide2QuoteTemplate from './components/Slide2/Slide2QuoteTemplate';
import Slide3ContentTemplate from './components/Slide3/Slide3ContentTemplate';
import Slide3QuoteTemplate from './components/Slide3/Slide3QuoteTemplate';
import Slide4ContentTemplate from './components/Slide4/Slide4ContentTemplate';
import Slide4QuoteTemplate from './components/Slide4/Slide4QuoteTemplate';
import Slide5ContentTemplate from './components/Slide5/Slide5ContentTemplate';
import Slide5QuoteTemplate from './components/Slide5/Slide5QuoteTemplate';
import Slide6ContentTemplate from './components/Slide6/Slide6ContentTemplate';
import Slide6QuoteTemplate from './components/Slide6/Slide6QuoteTemplate';
import Slide7DownloadTemplate from './components/Slide7/Slide7DownloadTemplate';
import Slide7VideoTemplate from './components/Slide7/Slide7VideoTemplate';

const App = () => {
  const { userId, setUserId } = useUser();
  const [step, setStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const maxSteps = 7;

  const handleLogin = async (email) => {
    setIsLoggedIn(true);
    setUserId(email);
    const sessionDoc = await addDoc(collection(db, 'sessions'), {
      email,
      loginTime: serverTimestamp(),
    });
    setSessionId(sessionDoc.id);
  };

  const logEvent = async (eventType, details = {}) => {
    if (sessionId) {
      try {
        await addDoc(collection(db, 'sessions', sessionId, 'events'), {
          type: eventType,
          timestamp: serverTimestamp(),
          userId,
          ...details,
        });
      } catch (error) {
        console.error("Error logging event:", error);
      }
    }
  };

  const handleNextStep = () => {
    if (step < maxSteps) {
      setStep(step + 1);
      logEvent('next_step', { step: step + 1 });
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
      logEvent('previous_step', { step: step - 1 });
    }
  };

  const onStartProposal = () => {
    setStep(2);
    logEvent('start_proposal', { step: 2 });
  };

  const onLogout = useCallback(async () => {
    if (sessionId) {
      const sessionRef = doc(db, 'sessions', sessionId);
      await updateDoc(sessionRef, {
        logoutTime: serverTimestamp(),
      });
    }
  }, [sessionId]);

  useEffect(() => {
    window.addEventListener('beforeunload', onLogout);
    return () => {
      window.removeEventListener('beforeunload', onLogout);
      onLogout();
    };
  }, [onLogout]);

  const renderContentTemplate = () => {
    switch (step) {
      case 1: return <Slide1ContentTemplate logEvent={logEvent} />;
      case 2: return <Slide2ContentTemplate logEvent={logEvent} />;
      case 3: return <Slide3ContentTemplate logEvent={logEvent} />;
      case 4: return <Slide4ContentTemplate logEvent={logEvent} />;
      case 5: return <Slide5ContentTemplate logEvent={logEvent} />;
      case 6: return <Slide6ContentTemplate logEvent={logEvent} />;
      case 7: return <Slide7DownloadTemplate logEvent={logEvent} />;
      default: return <div>Content Not Found</div>;
    }
  };

  const renderQuoteTemplate = () => {
    switch (step) {
      case 1:
        return <Slide1QuoteTemplate onStartProposal={onStartProposal} />;
      case 2: return <Slide2QuoteTemplate logEvent={logEvent} />;
      case 3: return <Slide3QuoteTemplate logEvent={logEvent} />;
      case 4: return <Slide4QuoteTemplate logEvent={logEvent} />;
      case 5: return <Slide5QuoteTemplate logEvent={logEvent} />;
      case 6: return <Slide6QuoteTemplate logEvent={logEvent} />;
      case 7: return <Slide7VideoTemplate logEvent={logEvent} />;
      default: return <div>Quote Not Found</div>;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#060512] to-[#0E1730] text-off-white">
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-soft-black text-off-white">
      <header className="p-8 shadow-md bg-soft-black fixed top-0 left-0 w-full flex items-center justify-between z-10 border-b-2 border-logo-blue">
        <div className="flex items-center">
          <img src={logo} alt="Company Logo" className="h-10 w-10 mr-4" />
          <h1 className="text-3xl font-bold flex items-baseline space-x-2">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to bottom, #f4f6f7, #0EAFFB)' }}>TBH Digital Solutions</span>
            <span className="text-off-white font-aldrich">Project Proposal Portal</span>
          </h1>
        </div>
      </header>

      <main className="flex-grow flex justify-between gap-6 main-container pt-20 pb-24">
        <div className="left-container relative bg-bg-light p-6 rounded-lg shadow-lg w-2/3 h-[calc(100vh-160px)] overflow-hidden dark:bg-soft-black">
          {renderContentTemplate()}
        </div>
        <div className="right-container relative bg-bg-light p-6 rounded-lg shadow-lg w-1/3 h-[calc(100vh-160px)] overflow-y-auto dark:bg-soft-black">
          {renderQuoteTemplate()}
          {step > 1 && (
            <div className="fixed bottom-10 right-0 w-[54%] z-20">
              <Navigation step={step} setStep={setStep} maxSteps={maxSteps} />
            </div>
          )}
        </div>
      </main>

      <footer className="h-50 bg-soft-black fixed bottom-0 left-0 w-full z-10 text-off-white flex items-center justify-center border-t-2 border-logo-blue">
        <p>&copy; 2024 TBH Digital Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Export App with UserProvider
const AppWithProvider = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

export default AppWithProvider;
