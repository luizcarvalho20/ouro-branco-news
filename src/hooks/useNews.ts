import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface NewsItem {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

interface NewsResponse {
  totalArticles: number;
  articles: NewsItem[];
}

export const useNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Para desenvolvimento, vamos usar dados mock
        // Em produção, você precisará configurar a API key no backend
        const mockNews: NewsItem[] = [
          {
            title: "Ouro Branco comemora avanços no turismo rural",
            description: "A cidade de Ouro Branco registra crescimento significativo no setor de turismo rural, atraindo visitantes de toda a região metropolitana de Belo Horizonte.",
            content: "Lorem ipsum dolor sit amet...",
            url: "#",
            image: "/placeholder.svg",
            publishedAt: new Date().toISOString(),
            source: {
              name: "Portal Ouro Branco",
              url: "#"
            }
          },
          {
            title: "Novo investimento em infraestrutura chegará à Serra",
            description: "Governo anuncia investimentos em melhorias nas estradas da região serrana, beneficiando o acesso a Ouro Branco.",
            content: "Lorem ipsum dolor sit amet...",
            url: "#",
            image: "/placeholder.svg",
            publishedAt: new Date(Date.now() - 3600000).toISOString(),
            source: {
              name: "G1 Minas",
              url: "#"
            }
          },
          {
            title: "Festival de Inverno movimenta economia local",
            description: "Evento cultural atrai milhares de visitantes e fortalece comércio local durante temporada de inverno.",
            content: "Lorem ipsum dolor sit amet...",
            url: "#",
            image: "/placeholder.svg",
            publishedAt: new Date(Date.now() - 7200000).toISOString(),
            source: {
              name: "Estado de Minas",
              url: "#"
            }
          },
          {
            title: "Preservação ambiental ganha força na região",
            description: "Novos projetos de conservação da mata atlântica são implementados com apoio da comunidade local.",
            content: "Lorem ipsum dolor sit amet...",
            url: "#",
            image: "/placeholder.svg",
            publishedAt: new Date(Date.now() - 10800000).toISOString(),
            source: {
              name: "Eco Notícias",
              url: "#"
            }
          },
          {
            title: "Startup mineira desenvolve tecnologia sustentável",
            description: "Empresa de Belo Horizonte cria solução inovadora para tratamento de água que será testada em Ouro Branco.",
            content: "Lorem ipsum dolor sit amet...",
            url: "#",
            image: "/placeholder.svg",
            publishedAt: new Date(Date.now() - 14400000).toISOString(),
            source: {
              name: "TechMG",
              url: "#"
            }
          },
          {
            title: "Produtores rurais recebem certificação orgânica",
            description: "Agricultores da região conquistam selo de produto orgânico, ampliando mercado consumidor.",
            content: "Lorem ipsum dolor sit amet...",
            url: "#",
            image: "/placeholder.svg",
            publishedAt: new Date(Date.now() - 18000000).toISOString(),
            source: {
              name: "Agro MG",
              url: "#"
            }
          }
        ];

        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setNews(mockNews);
        
      } catch (err) {
        setError('Erro ao carregar notícias. Tente novamente.');
        toast({
          title: "Erro",
          description: "Não foi possível carregar as notícias.",
          variant: "destructive",
        });
        console.error('Erro ao buscar notícias:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [toast]);

  return { news, loading, error };
};