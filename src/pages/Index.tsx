import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsCard from "@/components/NewsCard";
import { useNews } from "@/hooks/useNews";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { news, loading, error } = useNews();

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-destructive mb-2">Erro ao carregar notícias</h2>
            <p className="text-muted-foreground">Tente recarregar a página</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      <main className="container mx-auto px-4 py-12">
        <section id="noticias">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-playfair font-bold">
              Últimas Notícias
            </h2>
            <div className="h-px bg-gradient-gold flex-1 ml-6"></div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-video w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item, index) => (
                <NewsCard 
                  key={index} 
                  news={item} 
                  featured={index === 0}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-card border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-xl font-playfair font-bold bg-gradient-gold bg-clip-text text-transparent mb-2">
              Conexão Ouro Branco
            </h3>
            <p className="text-muted-foreground text-sm">
              Portal de notícias e informações • Ouro Branco, MG
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;