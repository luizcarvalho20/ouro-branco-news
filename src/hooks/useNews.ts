import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
        
        // Buscar notícias do banco de dados
        const { data: dbNews, error: dbError } = await supabase
          .from('news')
          .select('*')
          .order('published_at', { ascending: false });

        if (dbError) throw dbError;

        // Converter formato do banco para o formato esperado
        const convertedNews: NewsItem[] = (dbNews || []).map(item => ({
          title: item.title,
          description: item.description,
          content: item.content,
          url: item.source_url || "#",
          image: item.image_url || "/placeholder.svg",
          publishedAt: item.published_at,
          source: {
            name: item.source_name,
            url: item.source_url || "#"
          }
        }));

        // Se não houver notícias no banco, usar dados mock
        if (convertedNews.length === 0) {
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
            }
          ];
          setNews(mockNews);
        } else {
          setNews(convertedNews);
        }
        
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