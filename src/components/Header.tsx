import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Scale, Bell, User, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
                
                {/* Mobile Menu */}
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <div className="flex flex-col space-y-4 mt-6">
                      {/* Close button */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                          <Scale className="h-6 w-6 text-primary" />
                          <span className="text-lg font-bold text-primary">LawQA</span>
                        </div>
                      </div>
                      
                      {/* Search Bar for mobile */}
                      {!isHome && (
                        <div className="relative w-full mb-6">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search legal questions..."
                            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                      )}
                      
                      {/* Navigation Links */}
                      <div className="flex flex-col space-y-3">
                        <Link to="/dashboard" onClick={() => setIsSheetOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start text-base">
                            Dashboard
                          </Button>
                        </Link>
                        <Link to="/ask" onClick={() => setIsSheetOpen(false)}>
                          <Button variant="accent" className="w-full justify-start text-base">
                            Ask Question
                          </Button>
                        </Link>
                        <Link to="/topics" onClick={() => setIsSheetOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start text-base">
                            Topics
                          </Button>
                        </Link>
                        
                        <div className="border-t pt-3 mt-3">
                          <Link to="/profile" onClick={() => setIsSheetOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start text-base">
                              <User className="mr-2 h-4 w-4" />
                              Profile
                            </Button>
                          </Link>
                          <Button variant="ghost" className="w-full justify-start text-base">
                            <Bell className="mr-2 h-4 w-4" />
                            Notifications
                          </Button>
                        </div>
                        
                        {isHome && (
                          <div className="border-t pt-3 mt-3 space-y-3">
                            <Link to="/login" onClick={() => setIsSheetOpen(false)}>
                              <Button variant="ghost" className="w-full justify-start text-base">
                                Log In
                              </Button>
                            </Link>
                            <Link to="/signup" onClick={() => setIsSheetOpen(false)}>
                              <Button variant="hero" className="w-full justify-start text-base">
                                Sign Up
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;