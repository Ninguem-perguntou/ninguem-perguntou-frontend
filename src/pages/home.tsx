import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  PaginationItem,
  Skeleton,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import React, { useMemo, useState } from "react";
import SEO from "@/components/SEO";
import { Header } from "@/components/AppBar";
import ScrollTopButton from "@/components/ScrollTopButton";
import { useJornals } from "@/hooks/journals";
import { useCategories } from "@/hooks/categories";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

export const Home: React.FC = () => {
  const { jornalData, loading } = useJornals();
  const { categoriesData } = useCategories();
  const navigate = useNavigate();

  const featuredNews = useMemo(() => {
    if (!jornalData?.data.data) return { main: null, secondary: [] };

    // Ordena as notícias por views (do maior para o menor)
    const sortedByViews = [...jornalData.data.data].sort(
      (a, b) => b.views - a.views
    );

    // Pega a notícia mais vista (main) e as 4 próximas mais vistas (secondary)
    const [main, ...secondary] = sortedByViews;

    return {
      main,
      secondary: secondary.slice(0, 4),
    };
  }, [jornalData]);

  const allPosts = useMemo(() => {
    if (!jornalData?.data.data) return [];
    return jornalData.data.data;
  }, [jornalData]);

  // Dados de exemplo para depoimentos
  const testimonials = [
    {
      name: "Maria Silva",
      comment: "Excelente conteúdo! Sempre encontro informações valiosas aqui.",
    },
    {
      name: "João Santos",
      comment:
        "Adoro a diversidade de temas abordados. Continuem com o ótimo trabalho!",
    },
    {
      name: "Carla Souza",
      comment: "Um site essencial para a comunidade LGBTQIA+. Parabéns!",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Número de posts por página

  // Calcular posts paginados
  const paginatedPosts = useMemo(() => {
    if (!allPosts.length) return [];
    const startIndex = (currentPage - 1) * postsPerPage;
    return allPosts.slice(startIndex, startIndex + postsPerPage);
  }, [allPosts, currentPage]);

  // Calcular número total de páginas
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  // Função para renderizar a paginação com no máximo 5 itens
  const renderPagination = () => {
    const maxVisiblePages = 5;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxVisiblePages) {
      const half = Math.floor(maxVisiblePages / 2);
      startPage = Math.max(currentPage - half, 1);
      endPage = Math.min(currentPage + half, totalPages);

      if (currentPage <= half + 1) {
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - half) {
        startPage = totalPages - maxVisiblePages + 1;
      }
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem
          key={i}
          page={i}
          selected={i === currentPage}
          onClick={() => setCurrentPage(i)}
          sx={{
            fontWeight: i === currentPage ? "bold" : "normal",
            backgroundColor: i === currentPage ? "#ff007a" : "transparent",
            color: i === currentPage ? "white" : "inherit",
            "&:hover": {
              backgroundColor: i === currentPage ? "#e0006a" : "#f5f5f5",
            },
          }}
        />
      );
    }

    return (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        {/* Botão Anterior */}
        <IconButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: "50%",
            width: 36,
            height: 36,
          }}
        >
          <ChevronLeft />
        </IconButton>

        {/* Páginas */}
        {startPage > 1 && (
          <>
            <PaginationItem
              page={1}
              selected={1 === currentPage}
              onClick={() => setCurrentPage(1)}
            />
            {startPage > 2 && <Typography sx={{ px: 1 }}>...</Typography>}
          </>
        )}

        {pages}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <Typography sx={{ px: 1 }}>...</Typography>
            )}
            <PaginationItem
              page={totalPages}
              selected={totalPages === currentPage}
              onClick={() => setCurrentPage(totalPages)}
            />
          </>
        )}

        {/* Botão Próximo */}
        <IconButton
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: "50%",
            width: 36,
            height: 36,
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    );
  };

  return (
    <Box sx={{ bgcolor: "#ffffff", minHeight: "100vh" }}>
        <SEO 
        title="Home | NINGUÉM PERGUNTOU" 
        description="Leia as nossas matérias criativas e com conteúdos únicos, repleta de originalidade" 
        keywords="jornalismo, notícias, LGBTQIA+, Mulheres, Cultura POP"
        image='https://ninguem-perguntou.vercel.app/assets/icon-BhCtsIMm.png'
        url='https://ninguem-perguntou.vercel.app'
        type="notícias"
      />
      {/* Header */}
      <Header />

      {/* Scroll to Top Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
          display: { xs: "none", md: "block" },
        }}
      >
        <ScrollTopButton />
      </Box>
      {/* Banner de Boas-Vindas */}
      <Box
        sx={{
          py: 24,
          textAlign: "center",
          position: "relative",
          background:
            "conic-gradient(from 136deg at 50% 0%, #550E9B 0%, #8015E8 6%, #F3A78F 12%, #550E9B 28%)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "transparent",
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              color: "#fff",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Seja Bem-Vindo(a)
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              mb: 3,
            }}
          >
            Explorando Saúde, Cultura Pop e Muito Mais!
          </Typography>
          <Box
            sx={{
              width: "100%",
              overflowX: "auto",
              py: 2,
              px: 1,
              "&::-webkit-scrollbar": {
                height: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: "2px",
              },
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                gap: 2,
                px: 2,
                animation: "scroll 20s linear infinite",
                "@keyframes scroll": {
                  "0%": { transform: "translateX(0)" },
                  "100%": { transform: "translateX(-50%)" },
                },
              }}
            >
              {categoriesData?.data.data.map(
                (
                  cat: any // Duplica os itens para loop infinito
                ) => (
                  <Chip
                    key={cat.slug}
                    label={cat.name}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.3)",
                      fontWeight: "bold",
                      backdropFilter: "blur(4px)",
                      flexShrink: 0,
                      px: 3,
                    }}
                  />
                )
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Destaques */}
      <Container id="destaques" maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
          }}
        >
          Destaques
        </Typography>

        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 3 }}
                  key={`highlight-${index}`}
                >
                  <Card
                    sx={{
                      height: "100%",
                      boxShadow: "none",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <Skeleton variant="rectangular" height={160} />
                    <CardContent>
                      <Skeleton width="60%" height={24} sx={{ mb: 1 }} />
                      <Skeleton width="80%" height={20} />
                      <Skeleton width="50%" height={16} sx={{ mt: 2 }} />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : featuredNews.secondary.map((item: any, index: number) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 3 }}
                  key={`highlight-${index}`}
                >
                  <Card
                    sx={{
                      height: "100%",
                      boxShadow: "none",
                      border: "1px solid #e0e0e0",
                      "&:hover": {
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Link
                      to="/news/$id"
                      params={{ id: item.documentId }}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <CardMedia
                        component="img"
                        image={item.cover?.url || "/default-news.jpg"}
                        alt={item.title}
                        sx={{
                          width: "100%",
                          height: "160px",
                          objectFit: "cover",
                        }}
                      />
                      <CardContent>
                        <Chip
                          label={item.categories[0]?.name || "Geral"}
                          size="small"
                          sx={{
                            bgcolor: "#ff007a",
                            color: "white",
                            fontWeight: "bold",
                            mb: 1,
                          }}
                        />
                        <Typography
                          component="div"
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                            fontSize: "1rem",
                            lineHeight: 1.3,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            wordBreak: "break-word",
                            minHeight: "2.6em",
                            maxHeight: "2.6em",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#666",
                            mt: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
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
      <Box id="sobrenos" sx={{ bgcolor: "#f8f8f8", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                }}
              >
                Sobre Nós
              </Typography>
              <Typography sx={{ mb: 2 }}>
                O 'Ninguém Perguntou' é um site de jornalismo online dedicado ao
                público LGBTQIA+ e mulheres de 18 a 50 anos. Abordamos temas
                relevantes como saúde, cultura pop e destacamos mulheres
                inspiradoras na sociedade.
              </Typography>
              <Typography>
                Nosso objetivo é ampliar a base de assinantes da newsletter,
                promover interação nas redes sociais e estabelecer parcerias de
                apoio. Buscamos oferecer um ambiente descontraído para
                desmitificar tabus.
              </Typography>
              <Button
                  variant="contained"
                  onClick={() => navigate({ to: "/about" })}
                  sx={{
                    bgcolor: "#ff007a",
                    "&:hover": { bgcolor: "#e0006a" },
                    fontWeight: "bold",
                  }}
                >
                  Clique para saber mais
                </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  bgcolor: "#fff",
                  p: 3,
                  borderRadius: 1,
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                  }}
                >
                  FAQ AMOROSO
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  Somos um podcast voltado para o público feminino e LGBTQIA+.
                  Formado por dois integrantes que cresceram lendo a revista
                  Capricho e que adoram ficar jogando um bom papo fora sobre
                  temas variados.
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  Temos a missão de fazer com que esse podcast seja um lugar
                  confiável e seguro para falarmos de assuntos desse nosso
                  universo e que ninguém pergunta.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate({ to: "/podcast" })}
                  sx={{
                    bgcolor: "#ff007a",
                    "&:hover": { bgcolor: "#e0006a" },
                    fontWeight: "bold",
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
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
          }}
        >
          O Que Dizem Sobre Nós
        </Typography>

        <Grid container spacing={3}>
          {testimonials.map((testimonial, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={`testimonial-${index}`}>
              <Card
                sx={{
                  height: "100%",
                  p: 3,
                  boxShadow: "none",
                  border: "1px solid #e0e0e0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontStyle: "italic",
                    mb: 2,
                    fontSize: "1.1rem",
                  }}
                >
                  "{testimonial.comment}"
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  - {testimonial.name}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Seção Todos os Posts */}
      <Container id="todososposts" maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
            color: "#ff007a",
            position: "relative",
            "&:after": {
              content: '""',
              display: "block",
              width: "80px",
              height: "4px",
              bgcolor: "#ff007a",
              mx: "auto",
              mt: 2,
            },
          }}
        >
          Todos os Posts
        </Typography>

        {loading ? (
          <Grid container spacing={3}>
            {Array.from({ length: postsPerPage }).map((_, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={`post-skeleton-${index}`}
              >
                <Card
                  sx={{
                    height: "100%",
                    boxShadow: "none",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton width="30%" height={24} sx={{ mb: 1 }} />
                    <Skeleton width="90%" height={28} sx={{ mb: 1 }} />
                    <Skeleton width="80%" height={20} />
                    <Skeleton width="60%" height={16} sx={{ mt: 2 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            <Grid container spacing={3}>
              {paginatedPosts.map((post: any) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
                  <Card
                    sx={{
                      height: "100%",
                      boxShadow: "none",
                      border: "1px solid #e0e0e0",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Link
                      to="/news/$id"
                      params={{ id: post.documentId }}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <CardMedia
                        component="img"
                        image={post.cover?.url || "/default-news.jpg"}
                        alt={post.title}
                        sx={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <CardContent sx={{ p: 3 }}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            mb: 2,
                            flexWrap: "wrap",
                          }}
                        >
                          {post.categories?.slice(0, 2).map((category: any) => (
                            <Chip
                              key={category.slug}
                              label={category.name}
                              size="small"
                              sx={{
                                bgcolor: "#ff007a",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "0.65rem",
                              }}
                            />
                          ))}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            lineHeight: 1.3,
                            mb: 1,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            color: "primary.main",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            minHeight: "66px",
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            mb: 2,
                            minHeight: "60px",
                          }}
                        >
                          {post.description ||
                            "Confira este post interessante!"}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 2,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#666",
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Eye size={16} /> {post.views || 0}
                          </Typography>
                          <Button
                            size="small"
                            sx={{
                              color: "#ff007a",
                              fontWeight: "bold",
                              textTransform: "none",
                            }}
                          >
                            Ler mais
                          </Button>
                        </Box>
                      </CardContent>
                    </Link>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Paginação */}
            {totalPages > 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 6,
                }}
              >
                {renderPagination()}
              </Box>
            )}
          </>
        )}
      </Container>

      <Newsletter />

      <Footer />
    </Box>
  );
};
