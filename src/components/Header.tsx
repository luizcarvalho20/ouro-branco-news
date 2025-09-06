import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="relative z-10 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-playfair font-bold bg-gradient-gold bg-clip-text text-transparent">
              Conexão Ouro Branco
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#noticias" className="text-foreground hover:text-primary transition-colors">
              Notícias
            </a>
            <a href="#local" className="text-foreground hover:text-primary transition-colors">
              Local
            </a>
            <a href="#esportes" className="text-foreground hover:text-primary transition-colors">
              Esportes
            </a>
            <a href="#cultura" className="text-foreground hover:text-primary transition-colors">
              Cultura
            </a>
          </nav>

          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;