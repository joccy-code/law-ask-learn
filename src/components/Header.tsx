import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Scale, Bell, User, Menu } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Scale className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">LawQA</span>
          </Link>

          {/* Search Bar - Hidden on mobile, shown on larger screens */}
          {!isHome && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search legal questions..."
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex items-center space-x-2">
            {isHome ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="hero" size="sm">Sign Up</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="hidden md:block">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                <Link to="/ask" className="hidden md:block">
                  <Button variant="accent" size="sm">Ask Question</Button>
                </Link>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;