import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ExchangeModal from './components/ExchangeModal';
import ReviewModal from './components/ReviewModal';
import ERDiagramModal from './components/ERDiagramModal';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import Matching from './pages/Matching';
import Dashboard from './pages/Dashboard';
import Exchanges from './pages/Exchanges';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function AppContent() {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('home');
  const [exchangeModalPartner, setExchangeModalPartner] = useState(null);
  const [reviewModalExchange, setReviewModalExchange] = useState(null);
  const [isDbeModalOpen, setIsDbeModalOpen] = useState(false);
  const [selectedProfileUser, setSelectedProfileUser] = useState(null);

  const handleOpenExchange = (partner) => {
    setExchangeModalPartner(partner);
  };

  const handleOpenReview = (exchange) => {
    setReviewModalExchange(exchange);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          if (page === 'profile-view') setSelectedProfileUser(null);
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openDbeModal={() => setIsDbeModalOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {activePage === 'home' && (
          <Home
            setActivePage={setActivePage}
            onOpenExchange={handleOpenExchange}
            openDbeModal={() => setIsDbeModalOpen(true)}
          />
        )}

        {activePage === 'explore' && (
          <Explore
            setActivePage={setActivePage}
            onOpenExchange={handleOpenExchange}
            setSelectedProfileUser={setSelectedProfileUser}
          />
        )}

        {activePage === 'matching' && (
          <Matching
            setActivePage={setActivePage}
            onOpenExchange={handleOpenExchange}
            setSelectedProfileUser={setSelectedProfileUser}
          />
        )}

        {activePage === 'dashboard' && (
          <Dashboard
            setActivePage={setActivePage}
            onOpenExchange={handleOpenExchange}
            setSelectedProfileUser={setSelectedProfileUser}
          />
        )}

        {activePage === 'exchanges' && (
          <Exchanges
            onOpenReview={handleOpenReview}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'how-it-works' && (
          <HowItWorks
            setActivePage={setActivePage}
            openDbeModal={() => setIsDbeModalOpen(true)}
          />
        )}

        {activePage === 'about' && (
          <About
            openDbeModal={() => setIsDbeModalOpen(true)}
          />
        )}

        {activePage === 'login' && (
          <Login
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'register' && (
          <Register
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'profile' && (
          <Profile
            targetUserId={user?.user_id}
            setActivePage={setActivePage}
            onOpenExchange={handleOpenExchange}
          />
        )}

        {activePage === 'profile-view' && (
          <Profile
            targetUserId={selectedProfileUser}
            setActivePage={setActivePage}
            onOpenExchange={handleOpenExchange}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActivePage={setActivePage}
        openDbeModal={() => setIsDbeModalOpen(true)}
      />

      {/* Modals */}
      {exchangeModalPartner && (
        <ExchangeModal
          partner={exchangeModalPartner}
          onClose={() => setExchangeModalPartner(null)}
          onSuccess={() => {
            alert('🎉 Exchange request sent successfully! You can track it in your Dashboard and Exchanges tab.');
            setActivePage('exchanges');
          }}
        />
      )}

      {reviewModalExchange && (
        <ReviewModal
          exchange={reviewModalExchange}
          onClose={() => setReviewModalExchange(null)}
          onSuccess={() => {
            alert('⭐ Review submitted and stored in the Reviews table!');
          }}
        />
      )}

      {isDbeModalOpen && (
        <ERDiagramModal
          onClose={() => setIsDbeModalOpen(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
