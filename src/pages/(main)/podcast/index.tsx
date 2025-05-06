import { Header } from "@/components/AppBar";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import SEO from "@/components/SEO";
import { usePodcast } from "@/hooks/podcast";
import { Box, Container, Grid, Typography, Card, CardContent, CardMedia, Chip, Skeleton } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";

type AllPodcasts = {
    cover: {
        documentId: string,
        name: string,
        url: string,
    },
    documentId: string,
    link: string,
    title: string
}

export const PodcastList = () => {
    const { podcastData, loading } = usePodcast();

    const allPodcasts = useMemo(() => {
        if (!podcastData?.data.data) return [];
        return podcastData.data.data;
    }, [podcastData]);

    return (
        <Box sx={{ 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.default'
        }}>
            <SEO
                title="Podcast | NINGUÉM PERGUNTOU" 
                description="Escuta nossos podcasts" 
                keywords="jornalismo, notícias, LGBTQIA+, Mulheres, Cultura POP"
                image='https://ninguem-perguntou.vercel.app/assets/icon-BhCtsIMm.png'
                url='https://ninguem-perguntou.vercel.app'
                type="notícias"
            />
            <Header />
            
            <Box component="main" sx={{ flex: 1, py: 8 }}>
                <Container maxWidth="xl">
                    {/* Cabeçalho */}
                    <Box sx={{ 
                        textAlign: 'center',
                        mb: 8,
                        px: { xs: 2, md: 0 }
                    }}>
                        <Typography variant="h2" component="h1" sx={{ 
                            fontWeight: 800,
                            mb: 2,
                            color: 'primary.main',
                            fontSize: { xs: '2rem', md: '3rem' }
                        }}>
                            Descubra Nossos Podcasts
                        </Typography>
                        <Typography variant="subtitle1" sx={{ 
                            color: 'text.secondary',
                            maxWidth: 700,
                            mx: 'auto'
                        }}>
                            Conteúdos exclusivos para expandir seu conhecimento e entretenimento
                        </Typography>
                    </Box>

                    {/* Lista de Podcasts */}
                    {loading ? (
                        <Grid container spacing={4}>
                            {[...Array(6)].map((_, index) => (
                                <Grid size={{xs:12, sm:6, md:4}}key={index}>
                                    <Card>
                                        <Skeleton variant="rectangular" height={240} />
                                        <CardContent>
                                            <Skeleton width="40%" height={32} />
                                            <Skeleton width="100%" height={24} sx={{ mt: 1 }} />
                                            <Skeleton width="100%" height={24} sx={{ mt: 1 }} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : allPodcasts.length === 0 ? (
                        <Box sx={{ 
                            textAlign: 'center',
                            py: 10,
                            border: '1px dashed',
                            borderColor: 'divider',
                            borderRadius: 2
                        }}>
                            <Typography variant="h6" color="text.secondary">
                                Nenhum podcast disponível no momento
                            </Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={4}>
                            {allPodcasts.map((podcast: AllPodcasts) => (
                                <Grid  size={{xs:12, sm:6, md:4}} key={podcast.documentId}>
                                    <Link to="/podcast/$id" params={{ id: podcast.documentId }} style={{ textDecoration: 'none' }}>
                                        <Card sx={{ 
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: 3,
                                            overflow: 'hidden',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: '0 16px 32px rgba(0,0,0,0.15)'
                                            }
                                        }}>
                                            <CardMedia
                                                component="img"
                                                height="240"
                                                image={podcast.cover.url}
                                                alt={podcast.title}
                                                sx={{ 
                                                    objectFit: "cover",
                                                    transition: 'transform 0.5s ease',
                                                    '&:hover': {
                                                        transform: 'scale(1.05)'
                                                    }
                                                }}
                                            />
                                            <CardContent sx={{ 
                                                flexGrow: 1,
                                                p: 3,
                                                bgcolor: 'background.paper'
                                            }}>
                                                <Box sx={{ mb: 2 }}>
                                                    <Chip 
                                                        label="Novo Episódio" 
                                                        color="primary" 
                                                        size="small"
                                                        sx={{ 
                                                            mb: 2,
                                                            fontWeight: 600,
                                                            alignSelf: 'flex-start'
                                                        }}
                                                    />
                                                    <Typography 
                                                        variant="h5" 
                                                        component="h2"
                                                        sx={{ 
                                                            fontWeight: 700,
                                                            lineHeight: 1.3,
                                                            mb: 1,
                                                            color: 'text.primary',
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden'
                                                        }}
                                                    >
                                                        {podcast.title}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>
            </Box>

            <Newsletter />
            <Footer />
        </Box>
    );
};