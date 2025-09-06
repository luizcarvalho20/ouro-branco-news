import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

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

interface NewsCardProps {
  news: NewsItem;
  featured?: boolean;
}

const NewsCard = ({ news, featured = false }: NewsCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(news.publishedAt), { 
    addSuffix: true, 
    locale: ptBR 
  });

  return (
    <Card className={`group cursor-pointer hover:shadow-gold transition-all duration-300 ${
      featured ? 'md:col-span-2 lg:col-span-3' : ''
    }`}>
      <div className={`aspect-video relative overflow-hidden rounded-t-lg ${
        featured ? 'md:aspect-[2/1]' : ''
      }`}>
        <img 
          src={news.image || '/placeholder.svg'} 
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {news.source.name}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className={`font-playfair font-bold line-clamp-2 group-hover:text-primary transition-colors ${
          featured ? 'text-xl md:text-2xl' : 'text-lg'
        }`}>
          {news.title}
        </h3>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className={`text-muted-foreground line-clamp-3 ${
          featured ? 'text-base' : 'text-sm'
        }`}>
          {news.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{timeAgo}</span>
          <a 
            href={news.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Ler mais
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;