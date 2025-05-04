import React, { useState, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Button,
  Chip,
  Container,
  Grid,
  Divider,
  TextField,
} from "@mui/material";
import { useJornals } from "@/hooks/journals";
import Icon from "@/assets/img/icon.png";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, LogIn, Search, Menu, Facebook, Instagram, Twitter } from "lucide-react";
import { useCategories } from "@/hooks/categories";

export const Home: React.FC = () => {
  const { jornalData, loading } = useJornals();
  const { categoriesData } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  //const theme = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const featuredNews = useMemo(() => {
    if (!jornalData?.data.data) return { main: null, secondary: [] };
    const [main, ...remaining] = jornalData.data.data;
    return { main, secondary: remaining.slice(0, 4) };
  }, [jornalData]);

  // const filteredNews = useMemo(() => {
  //   if (!jornalData?.data.data) return [];
  //   if (!selectedCategory) return jornalData.data.data.slice(5);
  //   return jornalData.data.data.filter((news: any) => 
  //     news.categories.some((cat: any) => cat.slug === selectedCategory)
  //   );
  // }, [jornalData, selectedCategory]);

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(prev => prev === slug ? null : slug);
    setMobileMenuOpen(false);
  };

  // Dados de exemplo para depoimentos
  const testimonials = [
    {
      name: "Maria Silva",
      comment: "Excelente conteúdo! Sempre encontro informações valiosas aqui."
    },
    {
      name: "João Santos",
      comment: "Adoro a diversidade de temas abordados. Continuem com o ótimo trabalho!"
    },
    {
      name: "Carla Souza",
      comment: "Um site essencial para a comunidade LGBTQIA+. Parabéns!"
    }
  ];

  return (
    <Box sx={{ bgcolor: "#ffffff", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ 
            justifyContent: "space-between", 
            py: 2,
            px: '0 !important'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                onClick={() => navigate({ to: "/" })}
                style={{ 
                  width: "40px", 
                  height: "40px",
                  marginRight: "15px", 
                  cursor: "pointer",
                  borderRadius: '50%',
                  border: '2px solid #000'
                }}
                src={Icon}
                alt="Logo Ninguém Perguntou"
              />
              <Typography 
                variant="h6" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  color: '#000'
                }}
              >
                NINGUÉM PERGUNTOU
              </Typography>
            </Box>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
              {categoriesData?.data.data.map((category: any) => (
                <Button 
                  key={category.slug}
                  onClick={() => handleCategoryClick(category.slug)}
                  sx={{ 
                    color: selectedCategory === category.slug ? '#ff007a' : '#000',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    px: 1,
                    minWidth: 'auto',
                    '&:hover': {
                      color: '#ff007a',
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  {category.name}
                </Button>
              ))}
              
              <IconButton sx={{ color: '#000' }}>
                <Search className="w-5 h-5" />
              </IconButton>
            </Box>
            
            <IconButton 
              sx={{ display: { xs: 'flex', md: 'none' }, color: '#000' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </IconButton>
            <IconButton edge="end" onClick={() => navigate({ to: "/auth/login" })}>
              <LogIn className="w-5 h-5" />
            </IconButton>
          </Toolbar>
        </Container>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <Box sx={{ 
            display: { xs: 'block', md: 'none' },
            bgcolor: '#fff',
            px: 2,
            py: 1,
            borderTop: '1px solid #e0e0e0'
          }}>
            {categoriesData?.data.data.map((category: any) => (
              <Button 
                key={`mobile-${category.slug}`}
                fullWidth
                onClick={() => handleCategoryClick(category.slug)}
                sx={{ 
                  color: selectedCategory === category.slug ? '#ff007a' : '#000',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  justifyContent: 'flex-start',
                  px: 1,
                  py: 2,
                  '&:hover': {
                    color: '#ff007a',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                {category.name}
              </Button>
            ))}
          </Box>
        )}
      </AppBar>

      {/* Banner de Boas-Vindas */}
      <Box sx={{ 
        py: 24, 
        textAlign: 'center',
        position: 'relative',
        background: 'conic-gradient(from 136deg at 50% 0%, #550E9B 0%, #8015E8 6%, #F3A78F 12%, #550E9B 28%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'transparent',
        }
      }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" component="h2" sx={{ 
            fontWeight: 'bold', 
            mb: 2,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            color: '#fff',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Seja Bem-Vindo(a)
          </Typography>
          <Typography variant="h6" sx={{ 
            color: 'rgba(255,255,255,0.9)',
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            mb: 3
          }}>
            Explorando Saúde, Cultura Pop e Muito Mais!
          </Typography>
          <Box sx={{
              width: '100%',
              overflowX: 'auto',
              py: 2,
              px: 1,
              '&::-webkit-scrollbar': {
                height: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: '2px',
              },
            }}>
              <Box sx={{
                display: 'inline-flex',
                gap: 2,
                px: 2,
                animation: 'scroll 20s linear infinite',
                '@keyframes scroll': {
                  '0%': { transform: 'translateX(0)' },
                  '100%': { transform: 'translateX(-50%)' },
                }
              }}>
                {categoriesData?.data.data.map((cat: any) => ( // Duplica os itens para loop infinito
                  <Chip 
                    key={cat.slug}
                    label={cat.name}
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.3)',
                      fontWeight: 'bold',
                      backdropFilter: 'blur(4px)',
                      flexShrink: 0,
                      px: 3,
                    }}
                  />
                ))}
              </Box>
            </Box>
        </Container>
      </Box>

      {/* Destaques */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" sx={{ 
          fontWeight: 'bold',
          mb: 4,
          textAlign: 'center'
        }}>
          Destaques
        </Typography>
        
        <Grid container spacing={3}>
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Grid size={{xs:12, sm:6, md:3}} key={`highlight-${index}`}>
                <Card sx={{ height: '100%', boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                  <Skeleton variant="rectangular" height={160} />
                  <CardContent>
                    <Skeleton width="60%" height={24} sx={{ mb: 1 }} />
                    <Skeleton width="80%" height={20} />
                    <Skeleton width="50%" height={16} sx={{ mt: 2 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : featuredNews.secondary.map((item: any, index: number) => (
            <Grid size={{xs:12, sm:6, md:3}} key={`highlight-${index}`}>
              <Card sx={{ 
                height: '100%', 
                boxShadow: 'none',
                border: '1px solid #e0e0e0',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }
              }}>
                <Link to="/news/$id" params={{ id: item.documentId }}>
                  <CardMedia
                    component="img"
                    image={item.cover?.url || '/default-news.jpg'}
                    alt={item.title}
                    sx={{ 
                      width: '100%',
                      height: '160px',
                      objectFit: 'cover'
                    }}
                  />
                  <CardContent>
                    <Chip
                      label={item.categories[0]?.name || 'Geral'}
                      size="small"
                      sx={{ 
                        bgcolor: '#ff007a',
                        color: 'white',
                        fontWeight: 'bold',
                        mb: 1
                      }}
                    />
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '48px'
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#666',
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      <Eye size={16} /> {item.views || 0} visualizações
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Seção Sobre Nós */}
      <Box sx={{ bgcolor: '#f8f8f8', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{xs:12, md:6}}>
              <Typography variant="h4" component="h2" sx={{ 
                fontWeight: 'bold',
                mb: 3
              }}>
                Sobre Nós
              </Typography>
              <Typography paragraph sx={{ mb: 2 }}>
                O 'Ninguém Perguntou' é um site de jornalismo online dedicado ao
                público LGBTQIA+ e mulheres de 18 a 50 anos. Abordamos temas
                relevantes como saúde, cultura pop e destacamos mulheres
                inspiradoras na sociedade.
              </Typography>
              <Typography paragraph>
                Nosso objetivo é ampliar a base de assinantes da newsletter, promover 
                interação nas redes sociais e estabelecer parcerias de apoio. Buscamos 
                oferecer um ambiente descontraído para desmitificar tabus.
              </Typography>
            </Grid>
            <Grid size={{xs:12, md:6}}>
              <Box sx={{ 
                bgcolor: '#fff', 
                p: 3, 
                borderRadius: 1,
                border: '1px solid #e0e0e0'
              }}>
                <Typography variant="h5" component="h3" sx={{ 
                  fontWeight: 'bold',
                  mb: 2
                }}>
                  FAQ AMOROSO
                </Typography>
                <Typography paragraph sx={{ mb: 2 }}>
                  Somos um podcast voltado para o público feminino e LGBTQIA+. Formado 
                  por dois integrantes que cresceram lendo a revista Capricho e que 
                  adoram ficar jogando um bom papo fora sobre temas variados.
                </Typography>
                <Typography paragraph sx={{ mb: 3 }}>
                  Temos a missão de fazer com que esse podcast seja um lugar confiável 
                  e seguro para falarmos de assuntos desse nosso universo e que ninguém 
                  pergunta.
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ 
                    bgcolor: '#ff007a',
                    '&:hover': { bgcolor: '#e0006a' },
                    fontWeight: 'bold'
                  }}
                >
                  Clique para ouvir
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Depoimentos */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" sx={{ 
          fontWeight: 'bold',
          mb: 4,
          textAlign: 'center'
        }}>
          O Que Dizem Sobre Nós
        </Typography>
        
        <Grid container spacing={3}>
          {testimonials.map((testimonial, index) => (
            <Grid size={{xs:12, md:4}} key={`testimonial-${index}`}>
              <Card sx={{ 
                height: '100%', 
                p: 3,
                boxShadow: 'none',
                border: '1px solid #e0e0e0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <Typography sx={{ 
                  fontStyle: 'italic',
                  mb: 2,
                  fontSize: '1.1rem'
                }}>
                  "{testimonial.comment}"
                </Typography>
                <Typography sx={{ 
                  fontWeight: 'bold',
                  textAlign: 'right'
                }}>
                  - {testimonial.name}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Newsletter */}
      <Box sx={{ bgcolor: '#ff007a', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" sx={{ 
            fontWeight: 'bold',
            mb: 2,
            color: '#fff'
          }}>
            Fique Por Dentro
          </Typography>
          <Typography sx={{ 
            mb: 4,
            color: 'rgba(255,255,255,0.9)'
          }}>
            Assine nossa newsletter para receber as últimas notícias e atualizações.
          </Typography>
          
          <Box component="form" sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center'
          }}>
            <TextField
              placeholder="Seu e-mail"
              variant="outlined"
              size="small"
              sx={{ 
                bgcolor: '#fff',
                borderRadius: 1,
                flexGrow: { sm: 1 },
                maxWidth: { sm: '400px' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: '#000',
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#333' },
                whiteSpace: 'nowrap'
              }}
            >
              Assinar Newsletter
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ 
        bgcolor: '#000',
        color: '#fff',
        py: 6
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{xs:12, md:6}}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <img
                  src={Icon}
                  alt="Logo Ninguém Perguntou"
                  style={{ 
                    width: '40px', 
                    height: '40px',
                    marginRight: '15px',
                    borderRadius: '50%',
                    border: '2px solid #fff'
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  NINGUÉM PERGUNTOU
                </Typography>
              </Box>
              <Typography sx={{ mb: 2 }}>
                niguemperguntou@gmail.com<br />
                Brasília-DF
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <IconButton sx={{ color: '#fff' }}>
                  <Facebook />
                </IconButton>
                <IconButton sx={{ color: '#fff' }}>
                  <Instagram />
                </IconButton>
                <IconButton sx={{ color: '#fff' }}>
                  <Twitter />
                </IconButton>
              </Box>
            </Grid>
            <Grid size={{xs:12, md:6}}>
              <Typography variant="h6" sx={{ 
                fontWeight: 'bold',
                mb: 2
              }}>
                Conecte-se Conosco
              </Typography>
              <Box component="form">
                <TextField
                  placeholder="Seu e-mail"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ 
                    bgcolor: '#fff',
                    borderRadius: 1,
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1
                    }
                  }}
                />
                <Button 
                  variant="contained" 
                  sx={{ 
                    bgcolor: '#ff007a',
                    color: '#fff',
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: '#e0006a' }
                  }}
                >
                  Enviar
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}>
            <Typography variant="body2">
              © {new Date().getFullYear()} Ninguém Perguntou. Todos os direitos reservados.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Typography variant="body2" sx={{ textDecoration: 'underline' }}>
                Política de Privacidade
              </Typography>
              <Typography variant="body2" sx={{ textDecoration: 'underline' }}>
                Declaração de acessibilidade
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};