import { Badge } from "@/components/ui/badge";
import serraImage from "@/assets/serra-ouro-branco.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${serraImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
          Portal de Notícias
        </Badge>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6">
          Conexão{" "}
          <span className="bg-gradient-gold bg-clip-text text-transparent">
            Ouro Branco
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Seu portal de informações sobre Ouro Branco e as principais notícias do Brasil
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center gap-2 text-white/80">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm">Atualizado em tempo real</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;