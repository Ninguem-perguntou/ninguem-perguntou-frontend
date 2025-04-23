import React, { useEffect, useState, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Button,
  Chip,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
  Badge,
} from "@mui/material";
import { useJornals } from "@/hooks/journals";
import Icon from "@/assets/img/icon.png";
import { Link, useNavigate } from "@tanstack/react-router";
import { convertToBrazilianDateWithHours } from "@/utils/data";
import { LogIn, Search } from "lucide-react";
import { useCategories } from "@/hooks/categories";

interface NewsItem {
  id: string;
  documentId: string;
  title: string;
  description: string;
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

export const Home: React.FC = () => {
  const { jornalData, loading } = useJornals();
  const { categoriesData } = useCategories();
  const [bannerNews, setBannerNews] = useState<NewsItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const TEAM_MEMBERS = {
    authors: [
      "Ingrid Thauane Santos Oliveira",
      "Isabela de Moura Costa",
      "Matheus Borges Ribeiro",
      "Raquel Soares Miguel de Azevedo",
    ],
    developers: [
      "Artur Dantas Martins",
      "Paulo Abdiel Sardinha de Sousa Santos",
    ],
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (jornalData?.success && jornalData.data.data.length > 0) {
      const [firstItem, ...remainingItems] = jornalData.data.data;
      console.log(remainingItems)
      setBannerNews(firstItem);
    }
  }, [jornalData]);

  // Filtra as notícias baseado na categoria selecionada
  const filteredNews = useMemo(() => {
    if (!jornalData?.data.data) return [];
    if (!selectedCategory) return jornalData.data.data;
    
    return jornalData.data.data.filter((news: any) => 
      news.categories.some((cat: any) => cat.slug === selectedCategory)
    );
  }, [jornalData, selectedCategory]);

  // Conta quantas notícias existem por categoria
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    jornalData?.data.data?.forEach((news: any) => {
      news.categories.forEach((cat: any) => {
        counts[cat.slug] = (counts[cat.slug] || 0) + 1;
      });
    });
    
    return counts;
  }, [jornalData]);

  const getGridColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(prev => prev === slug ? null : slug);
  };

  const renderLoadingSkeleton = () => {
    const columns = getGridColumns();
    return Array.from({ length: columns * 2 }).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
        <Card sx={{ height: '100%' }}>
          <Skeleton variant="rectangular" height={160} />
          <CardContent>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Skeleton width="30%" height={24} />
              <Skeleton width="20%" height={24} />
            </Box>
            <Skeleton width="90%" height={32} sx={{ mb: 1 }} />
            <Skeleton width="80%" height={20} sx={{ mb: 1 }} />
            <Skeleton width="60%" height={16} />
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  const renderNewsItem = (item: NewsItem) => (
    <Grid key={item.id}>
      <Card sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[6]
        }
      }}>
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

  return (
    <Box sx={{ bgcolor: "#f3f4f6", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              onClick={() => {
                setSelectedCategory(null);
                navigate({ to: "/" });
              }}
              style={{ width: "30px", marginRight: "20px", cursor: "pointer" }}
              src={Icon}
              alt="Logo Ninguém Perguntou"
            />
            <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold' }}>
              NINGUÉM PERGUNTOU
            </Typography>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {categoriesData?.data.data.map((category: any) => (
              <Badge 
                key={category.slug}
                badgeContent={categoryCounts[category.slug] || 0}
                color="primary"
                overlap="circular"
                sx={{
                  '& .MuiBadge-badge': {
                    right: -5,
                    top: 10,
                  }
                }}
              >
                <Button 
                  onClick={() => handleCategoryClick(category.slug)}
                  sx={{ 
                    color: selectedCategory === category.slug ? 'var(--pink)' : 'text.primary',
                    textTransform: 'uppercase',
                    fontSize: 12,
                    minWidth: 'auto',
                    px: 1,
                    fontWeight: selectedCategory === category.slug ? 'bold' : 'normal',
                    '&:hover': {
                      color: 'var(--pink)'
                    }
                  }}
                >
                  {category.name}
                </Button>
              </Badge>
            ))}
          </Box>
          
          <Box>
            <IconButton sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
              <Search className="w-5 h-5" />
            </IconButton>
            <IconButton edge="end" onClick={() => navigate({ to: "/auth/login" })}>
              <LogIn className="w-5 h-5" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Banner Principal */}
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
        {loading || !bannerNews ? (
          <Card>
            <Skeleton variant="rectangular" height={400} />
            <CardContent>
              <Skeleton width="60%" />
              <Skeleton width="80%" />
              <Skeleton width="40%" />
            </CardContent>
          </Card>
        ) : (
          <Card elevation={0} sx={{ position: 'relative', borderRadius: 2 }}>
            <Link to="/news/$id" params={{ id: bannerNews.documentId }}>
              <CardMedia
                component="img"
                height="400"
                image={bannerNews.cover?.url || '/default-banner.jpg'}
                alt={bannerNews.title}
                sx={{ objectFit: 'cover' }}
              />
              <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 4,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8
              }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  {bannerNews.categories?.map((category, index) => (
                    <Chip
                      key={`banner-category-${index}`}
                      label={category.name}
                      size="small"
                      sx={{ 
                        bgcolor: 'var(--pink)',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  ))}
                </Box>
                <Typography 
                  variant="h3" 
                  component="h2"
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                    mb: 1
                  }}
                >
                  {bannerNews.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'white',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    mb: 2
                  }}
                >
                  {bannerNews.description}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'white',
                    display: 'block',
                    opacity: 0.8
                  }}
                >
                  {convertToBrazilianDateWithHours(bannerNews.publishedAt)}
                </Typography>
              </Box>
            </Link>
          </Card>
        )}
      </Container>

      {/* Últimas Notícias */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h2"
            sx={{ 
              fontWeight: 'bold',
              color: 'var(--pink)',
              borderBottom: '2px solid var(--pink)',
              pb: 1,
              display: 'inline-block'
            }}
          >
            {selectedCategory 
              ? `Notícias de ${categoriesData?.data.data.find((c: any) => c.slug === selectedCategory)?.name}`
              : 'Últimas notícias'}
          </Typography>
          
          {selectedCategory && (
            <Button 
              onClick={() => setSelectedCategory(null)}
              variant="outlined"
              size="small"
              sx={{ 
                color: 'var(--pink)',
                borderColor: 'var(--pink)',
                '&:hover': {
                  borderColor: 'var(--pink)',
                  bgcolor: 'rgba(255, 0, 122, 0.04)'
                }
              }}
            >
              Limpar filtro
            </Button>
          )}
        </Box>
        
        <Grid container spacing={3}>
          {loading 
            ? renderLoadingSkeleton()
            : filteredNews.length > 0 
              ? filteredNews.map(renderNewsItem)
              : (
                <Grid>
                  <Typography variant="body1" textAlign="center" sx={{ py: 4 }}>
                    Nenhuma notícia encontrada nesta categoria.
                  </Typography>
                </Grid>
              )}
        </Grid>
      </Container>

      {/* Equipe */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Card elevation={0} sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              fontWeight="bold"
              color="var(--pink)"
              sx={{ mb: 3 }}
            >
              Nossa Equipe
            </Typography>
            <Grid container spacing={4}>
              <Grid>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Autores
                </Typography>
                <List dense>
                  {TEAM_MEMBERS.authors.map((author, index) => (
                    <React.Fragment key={`author-${index}`}>
                      <ListItem disablePadding sx={{ py: 1 }}>
                        <ListItemText 
                          primary={author} 
                          primaryTypographyProps={{ variant: 'body1' }}
                        />
                      </ListItem>
                      {index < TEAM_MEMBERS.authors.length - 1 && (
                        <Divider component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Grid>
              <Grid>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Desenvolvedores
                </Typography>
                <List dense>
                  {TEAM_MEMBERS.developers.map((developer, index) => (
                    <React.Fragment key={`dev-${index}`}>
                      <ListItem disablePadding sx={{ py: 1 }}>
                        <ListItemText 
                          primary={developer} 
                          primaryTypographyProps={{ variant: 'body1' }}
                        />
                      </ListItem>
                      {index < TEAM_MEMBERS.developers.length - 1 && (
                        <Divider component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ 
        bgcolor: 'background.paper',
        py: 4,
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 4
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="body2" 
            textAlign="center"
            sx={{ color: 'text.secondary' }}
          >
            © {new Date().getFullYear()} NINGUÉM PERGUNTOU - Todos os direitos reservados
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};