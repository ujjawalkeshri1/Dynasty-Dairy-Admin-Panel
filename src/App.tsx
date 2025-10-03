import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { ProductManagement } from './pages/ProductManagement';
import { Subscriptions } from './pages/Subscriptions';
import { Orders } from './pages/Orders';
import { Promotions } from './pages/Promotions';
import { Customers } from './pages/Customers';
import { HubManagement } from './pages/HubManagement';
import { Transactions } from './pages/Transactions';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { EditProfile } from './pages/EditProfile';

type AuthView = 'login' | 'signup';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('login');
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard';
      case 'products':
        return 'Product Management';
      case 'subscriptions':
        return 'Subscriptions';
      case 'orders':
        return 'Orders';
      case 'promotions':
        return 'Promotions';
      case 'customers':
        return 'Customers';
      case 'hubs':
        return 'Hub Management';
      case 'transactions':
        return 'Transactions';
      case 'settings':
        return 'Settings';
      case 'profile':
        return 'My Profile';
      case 'edit-profile':
        return 'Edit Profile';
      default:
        return 'Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Real-time analytics and business insights';
      case 'products':
        return 'Manage your dairy products inventory';
      case 'subscriptions':
        return 'Manage customer subscriptions';
      case 'orders':
        return 'Manage customer orders and deliveries';
      case 'promotions':
        return 'Manage promotional offers and discount codes';
      case 'customers':
        return 'Manage your customer database';
      case 'hubs':
        return 'Manage distribution hubs and inventory';
      case 'transactions':
        return 'View and manage all payment transactions';
      case 'settings':
        return 'Manage your account and application preferences';
      case 'profile':
        return 'View and manage your profile information';
      case 'edit-profile':
        return 'Update your personal and account information';
      default:
        return '';
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductManagement />;
      case 'subscriptions':
        return <Subscriptions />;
      case 'orders':
        return <Orders />;
      case 'promotions':
        return <Promotions />;
      case 'customers':
        return <Customers />;
      case 'hubs':
        return <HubManagement />;
      case 'transactions':
        return <Transactions />;
      case 'settings':
        return <Settings />;
      case 'profile':
        return <Profile onNavigateToEdit={() => setCurrentPage('edit-profile')} />;
      case 'edit-profile':
        return <EditProfile onNavigateBack={() => setCurrentPage('profile')} />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    if (authView === 'login') {
      return <Login onLogin={handleLogin} onSwitchToSignup={() => setAuthView('signup')} />;
    } else {
      return <Signup onSignup={handleSignup} onSwitchToLogin={() => setAuthView('login')} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} onLogout={handleLogout} />
      <div className="ml-[250px]">
        <Header
          title={getPageTitle()}
          subtitle={getPageSubtitle()}
          onNavigateToProfile={() => setCurrentPage('profile')}
          onNavigateToSettings={() => setCurrentPage('settings')}
          onLogout={handleLogout}
          onPageChange={setCurrentPage}
        />
        <div className="pt-[72px]">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}