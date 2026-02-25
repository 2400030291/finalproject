import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTheme } from 'next-themes';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Sun, Moon, Mail, ExternalLink, CheckCircle2, FileText, MapPin, Users, Shield, Vote, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import logoImage from "../../assets/logo.png";
import { toast } from 'sonner';

export function LandingPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Login successful! Redirecting...');
    setTimeout(() => {
      setIsAuthOpen(false);
      navigate('/app');
    }, 1000);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Account created! Redirecting...');
    setTimeout(() => {
      setIsAuthOpen(false);
      navigate('/app');
    }, 1000);
  };

  const electionInfo = [
    {
      icon: Users,
      title: 'Voter Eligibility',
      description: 'Minimum age of 18 years on qualifying date (1st January of the year)',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: FileText,
      title: 'Required Documents',
      description: 'Aadhaar Card, Voter ID (EPIC), Passport, Driving License, or PAN Card',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: MapPin,
      title: 'Constituencies',
      description: '543 Lok Sabha constituencies and 4120+ Assembly constituencies across India',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Shield,
      title: 'Electoral Process',
      description: 'Free, fair, and transparent elections conducted by Election Commission of India',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-orange-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img src={logoImage} alt="Election Commission" className="w-12 h-12" />
              </motion.div>
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-orange-600 via-white to-green-600 bg-clip-text text-transparent dark:from-orange-400 dark:via-gray-200 dark:to-green-400">
                  Election Commission
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Monitoring System</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-orange-500" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-600" />
                )}
              </Button>

              <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white shadow-lg">
                    Login / Signup
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl">Welcome Back!</DialogTitle>
                    <DialogDescription className="text-center">
                      Access the Election Monitoring System
                    </DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="your@email.com" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" placeholder="••••••••" required />
                        </div>
                        <Button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-green-600">
                          Login
                        </Button>
                      </form>
                    </TabsContent>
                    <TabsContent value="signup">
                      <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="Your Name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
                          <Input id="signup-email" type="email" placeholder="your@email.com" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <Input id="signup-password" type="password" placeholder="••••••••" required />
                        </div>
                        <Button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-green-600">
                          Create Account
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <motion.img
                src={logoImage}
                alt="Election Commission"
                className="w-32 h-32 drop-shadow-2xl"
                animate={{ 
                  rotateY: [0, 360],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent dark:from-orange-400 dark:via-blue-400 dark:to-green-400">
                Election Monitoring System
              </span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
              Empowering democracy through transparent, real-time election monitoring across India
            </p>
            <div className="flex items-center justify-center gap-2 text-orange-600 dark:text-orange-400">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">भारत निर्वाचन आयोग</span>
              <Sparkles className="w-5 h-5" />
            </div>
            <Button
              onClick={() => navigate('/app')}
              className="mt-8 bg-gradient-to-r from-orange-600 via-white to-green-600 text-gray-900 hover:shadow-2xl text-lg px-8 py-6 font-semibold"
              size="lg"
            >
              <Vote className="w-5 h-5 mr-2" />
              Enter Dashboard
            </Button>
          </motion.div>

          {/* Election Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {electionInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 dark:hover:border-orange-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{info.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">{info.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Key Features Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-br from-orange-100 via-white to-green-100 dark:from-orange-950 dark:via-gray-800 dark:to-green-950 border-2 border-orange-200 dark:border-orange-800">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent dark:from-orange-400 dark:to-green-400">
                  Key Features
                </CardTitle>
                <CardDescription className="text-base">
                  Comprehensive tools for transparent election monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[ 
                    { icon: '📊', title: 'Real-time Results', desc: 'Live vote counting and updates' },
                    { icon: '📍', title: 'Polling Stations', desc: 'Track all stations across India' },
                    { icon: '🚨', title: 'Incident Reports', desc: 'Quick issue reporting system' },
                    { icon: '📈', title: 'Analytics', desc: 'Detailed voting patterns' },
                    { icon: '🔒', title: 'Secure', desc: 'End-to-end encryption' },
                    { icon: '📱', title: 'Responsive', desc: 'Access from any device' },
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50">
                      <span className="text-3xl">{feature.icon}</span>
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: '543', label: 'Lok Sabha Seats' },
              { value: '4120+', label: 'Assembly Seats' },
              { value: '28', label: 'States' },
              { value: '8', label: 'Union Territories' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
              >
                <Card className="text-center p-6 bg-gradient-to-br from-orange-50 to-green-50 dark:from-gray-800 dark:to-gray-700 border-2 border-orange-100 dark:border-gray-600">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-orange-500 dark:border-orange-600 bg-gradient-to-r from-orange-600 via-white to-green-600 dark:from-orange-900 dark:via-gray-900 dark:to-green-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Official Resources</h3>
              <a
                href="https://eci.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Election Commission of India
              </a>
            </div>
            <div className="text-center md:text-right">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Developer Contact</h3>
              <div className="flex flex-col items-center md:items-end gap-1">
                <a
                  href="mailto:2400030291@kluniversity.in"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  <Mail className="w-4 h-4" />
                  2400030291@kluniversity.in
                </a>
                <a
                  href="mailto:2400030783@kluniversity.in"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  <Mail className="w-4 h-4" />
                  2400030783@kluniversity.in
                </a>
                <a
                  href="mailto:2400030789@kluniversity.in"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  <Mail className="w-4 h-4" />
                  2400030789@kluniversity.in
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-orange-300 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              © 2026 Election Commission Monitoring System. Ensuring transparent democracy.
            </p>
            <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Secure • Transparent • Democratic</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
