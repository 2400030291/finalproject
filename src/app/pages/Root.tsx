import { Outlet, Link, useLocation } from 'react-router';
import { BarChart3, MapPin, AlertTriangle, FileText, LayoutDashboard, LogOut, Sun, Moon } from 'lucide-react';
import { cn } from '../components/ui/utils';
import { useTheme } from 'next-themes';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router';
// TODO: Add your logo to src/assets/logo.png and uncomment below
// import logoImage from '../../assets/logo.png';

const navigation = [
  { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
  { name: 'Polling Stations', href: '/app/polling-stations', icon: MapPin },
  { name: 'Results', href: '/app/results', icon: BarChart3 },
  { name: 'Incidents', href: '/app/incidents', icon: AlertTriangle },
  { name: 'Reports', href: '/app/reports', icon: FileText },
];

export function Root() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 via-white to-green-600 dark:from-orange-900 dark:via-gray-800 dark:to-green-900 border-b-4 border-orange-500 dark:border-orange-700 sticky top-0 z-50 shadow-lg">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Replace with your logo image once added */}
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-green-500 rounded-lg flex items-center justify-center drop-shadow-lg">
                <span className="text-white font-bold text-lg">EM</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900 dark:text-white">Election Monitor</h1>
                <p className="text-xs text-gray-700 dark:text-gray-300">Live Tracking System</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900 border-2 border-green-400 dark:border-green-600 rounded-lg shadow-md">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-800 dark:text-green-200">Live Updates</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-orange-400" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-600" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-2 border-orange-500 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b-2 border-orange-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-3 transition-all whitespace-nowrap',
                    isActive
                      ? 'border-orange-600 dark:border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 shadow-md'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50/50 dark:hover:bg-gray-700/50'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer Badge */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="px-3 py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
          🇮🇳 Bharat Elections
        </div>
      </div>
    </div>
  );
}
