import { Box, Card, CardContent, CardMedia, Chip, Grid, Typography, useTheme } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { convertToBrazilianDateWithHours } from "@/utils/data";
import { Eye } from "lucide-react";

interface NewsItem {
    id: string;
    documentId: string;
    title: string;
    description: string;
    views: number
    cover?: {
      url: string;
    };
    categories: Array<{
      name: string;
      slug: string;
    }>;
    publishedAt: string;
    createdAt: string;
}

export const NewsItemCard = ({ item }: { item: NewsItem }) => {
    const theme = useTheme();  
    return (
      <Grid key={item.id}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[6],
            },
          }}
        >
          <Link to="/news/$id" params={{ id: item.documentId }} style={{ textDecoration: 'none' }}>
          <CardMedia
            component="img"
            height="200"
            image={item.cover?.url || '/default-news.jpg'}
            alt={item.title}
            sx={{ 
              objectFit: 'cover',
              borderTopLeftRadius: 'inherit',
              borderTopRightRadius: 'inherit'
            }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              {item.categories?.map((category, idx) => (
                <Chip
                  key={`${item.id}-category-${idx}`}
                  label={category.name}
                  size="small"
                  sx={{ 
                    bgcolor: idx % 2 === 0 ? 'var(--pink)' : 'transparent',
                    color: idx % 2 === 0 ? 'white' : 'var(--pink)',
                    border: idx % 2 !== 0 ? '1px solid var(--pink)' : 'none',
                    fontWeight: 'bold',
                    fontSize: '0.7rem'
                  }}
                />
              ))}
            </Box>
            <Typography 
              variant="h6" 
              component="h3"
              sx={{ 
                mb: 1.5,
                fontWeight: 'bold',
                lineHeight: 1.3,
                color: 'text.primary',
                '&:hover': {
                  color: 'var(--pink)'
                }
              }}
            >
              {item.title}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {item.description}
            </Typography>
            <Typography
              variant="body2" 
              component="p"
              sx={{ 
                color: 'text.secondary',
                fontWeight: 'medium',
                fontSize: { xs: '0.9rem', md: '1rem' }, // menor
                lineHeight: 1.2,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5, // espaço entre o ícone e o número
              }}
            >
              <Eye />
              {item?.views}
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ display: 'block', opacity: 0.7 }}
            >
              {convertToBrazilianDateWithHours(item.createdAt)}
            </Typography>
          </CardContent>
        </Link>
        </Card>
      </Grid>
    );
  };
  