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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('SkillSwap ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-xl mx-auto my-16 p-8 bg-slate-900 border border-indigo-500/30 rounded-3xl text-center space-y-4 shadow-2xl">
          <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto text-2xl font-black">
            ⚡
          </div>
          <h2 className="text-xl font-black text-white">Something went wrong</h2>
          <p className="text-xs text-slate-400">
            {this.state.error?.message || 'A temporary render glitch occurred.'}
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                if (this.props.onReset) this.props.onReset();
                else window.location.reload();
              }}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg"
            >
              Reload View
            </button>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all border border-white/10"
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

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

      {/* Main Page Body wrapped in ErrorBoundary */}
      <main className="flex-1">
        <ErrorBoundary onReset={() => setActivePage('dashboard')}>
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
        </ErrorBoundary>
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
