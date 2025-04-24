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
import { LogIn, Search } from "lucide-react";
import { useCategories } from "@/hooks/categories";
import { TeamsMembres } from "@/components/TeamsMembres";
import { NewsItemCard } from "@/components/RenderNewsItem";

export const Home: React.FC = () => {
  const { jornalData, loading } = useJornals();
  const { categoriesData } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();

  // Pegar a notícia principal (banner) e 4 notícias secundárias
  const featuredNews = useMemo(() => {
    if (!jornalData?.data.data) return { main: null, secondary: [] };
    
    const [main, ...remaining] = jornalData.data.data;
    return {
      main,
      secondary: remaining.slice(0, 4) // Pegar as próximas 4 notícias
    };
  }, [jornalData]);

  const filteredNews = useMemo(() => {
    if (!jornalData?.data.data) return [];
    if (!selectedCategory) return jornalData.data.data.slice(5); // Pular as 5 primeiras (destaques)
    
    return jornalData.data.data.filter((news: any) => 
      news.categories.some((cat: any) => cat.slug === selectedCategory)
    );
  }, [jornalData, selectedCategory]);

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
      <Grid key={`skeleton-${index}`}>
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
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
        {loading ? (
          <Grid container spacing={3}>
            <Grid >
              <Skeleton variant="rectangular" height={400} />
            </Grid>
            <Grid >
              <Grid container spacing={2}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Grid  key={`skeleton-secondary-${i}`}>
                    <Skeleton variant="rectangular" height={100} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Banner Principal (2/3 da largura) */}
            <Grid >
              <Card sx={{ 
                height: '100%', 
                boxShadow: 'none',
                bgcolor: 'transparent'
              }}>
                <Link to="/news/$id" params={{ id: featuredNews.main?.documentId }}>
                  <CardMedia
                    component="img"
                    image={featuredNews.main?.cover?.url || '/default-banner.jpg'}
                    alt={featuredNews.main?.title}
                    sx={{ 
                      width: '100%',
                      height: { xs: '300px', md: '400px' },
                      borderRadius: 2,
                      objectFit: 'cover'
                    }}
                  />
                  <Box sx={{ mt: 2 }}>
                    {featuredNews.main?.categories?.slice(0, 1).map((category: any) => (
                      <Chip
                        key={`main-category-${category.slug}`}
                        label={category.name}
                        size="small"
                        sx={{ 
                          bgcolor: '#3f51b5',
                          color: 'white',
                          fontWeight: 'bold',
                          mb: 1
                        }}
                      />
                    ))}
                    <Typography 
                      variant="h3" 
                      component="h2"
                      sx={{ 
                        color: 'text.primary',
                        fontWeight: 'bold',
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                        lineHeight: 1.2
                      }}
                    >
                      {featuredNews.main?.title}
                    </Typography>
                  </Box>
                </Link>
              </Card>
            </Grid>

            {/* Notícias Secundárias (1/3 da largura) */}
            <Grid>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                {featuredNews.secondary.map((item: any) => (
                  <Card
                    key={`secondary-${item.id}`}
                    sx={{
                      position: 'relative',
                      height: 200,
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: 'none',
                      bgcolor: 'transparent',
                      '&:hover img': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Link to="/news/$id" params={{ id: item.documentId }}>
                      <CardMedia
                        component="img"
                        image={item.cover?.url || '/default-news.jpg'}
                        alt={item.title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          p: 2,
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.2))',
                          color: '#fff',
                        }}
                      >
                        {item.categories.slice(0, 1).map((category: any) => (
                          <Chip
                            key={`secondary-category-${category.slug}`}
                            label={category.name}
                            size="small"
                            sx={{
                              bgcolor: '#3f51b5',
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: '0.6rem',
                              mb: 1,
                            }}
                          />
                        ))}
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            lineHeight: 1.3,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            mt: 1,
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Box>
                    </Link>
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
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
              ? filteredNews.map((item: any) => <NewsItemCard key={item.id} item={item} />)
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
      <TeamsMembres/>

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