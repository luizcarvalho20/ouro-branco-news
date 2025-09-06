import { useState } from "react";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <h1 className="text-xl font-playfair font-bold bg-gradient-gold bg-clip-text text-transparent">
              Conexão Ouro Branco
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => scrollToSection('home')}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Início
          </button>
          <button
            onClick={() => scrollToSection('noticias')}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Notícias
          </button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Conta
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/admin">
                        <Settings className="h-4 w-4 mr-2" />
                        Administrar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/auth">Login</Link>
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <button
              onClick={() => scrollToSection('home')}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors text-left"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('noticias')}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors text-left"
            >
              Notícias
            </button>
            
            {user ? (
              <div className="flex flex-col space-y-2 pt-2 border-t border-border/40">
                {isAdmin && (
                  <Button variant="outline" size="sm" className="w-fit" asChild>
                    <Link to="/admin">
                      <Settings className="h-4 w-4 mr-2" />
                      Administrar
                    </Link>
                  </Button>
                )}
                <Button variant="outline" size="sm" className="w-fit" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" className="w-fit" asChild>
                <Link to="/auth">Login</Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;