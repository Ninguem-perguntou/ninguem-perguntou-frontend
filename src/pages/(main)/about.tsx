import { Header } from "@/components/AppBar"
import { Footer } from "@/components/Footer"
import { Newsletter } from "@/components/Newsletter"
import { Box, Container, Typography, Grid, Avatar, CircularProgress, Alert, Paper, Divider, Link, IconButton } from "@mui/material"
import AvatarProfile from "@/assets/img/avatar.jpg";
import { useAuhtors } from "@/hooks/authors";
import { useMemo } from "react";
import SEO from "@/components/SEO";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

export const About = () => {
    const { authorsData, loading, error } = useAuhtors();

    const authors = useMemo(() => {
        if (!authorsData?.data?.data) return [];
        return authorsData.data?.data;
    }, [authorsData]);

    if (loading) {
        return (
            <Box sx={{ 
                height: "100vh", 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ 
                height: "100vh", 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                p: 3
            }}>
                <Alert severity="error" sx={{ maxWidth: 600 }}>
                    Erro ao carregar os autores. Por favor, tente novamente mais tarde.
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
            <SEO
                title="Sobre nós | NINGUÉM PERGUNTOU" 
                description="Conheça nossa equipe de jornalistas profissionais e nossa missão" 
                keywords="jornalismo, notícias, sobre nós, equipe jornalística"
                image='https://ninguem-perguntou.vercel.app/assets/icon-BhCtsIMm.png'
                url='https://ninguem-perguntou.vercel.app/about'
                type="website"
            />
            
            <Header />
            
            <Container component="main" maxWidth="lg" sx={{ py: 6, flex: 1 }}>
                {/* Seção de Apresentação */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography 
                        variant="h1" 
                        sx={{ 
                            fontWeight: 700,
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            mb: 3,
                            color: 'primary.main'
                        }}
                    >
                        Sobre a Agência NINGUÉM PERGUNTOU
                    </Typography>
                    <Typography 
                        variant="h5" 
                        component="h2" 
                        sx={{ 
                            fontWeight: 400,
                            color: 'text.secondary',
                            maxWidth: 800,
                            mx: 'auto',
                            mb: 4
                        }}
                    >
                        Jornalismo independente com compromisso com a verdade e a ética
                    </Typography>
                    <Divider sx={{ my: 2, mx: 'auto', width: '60%' }} />
                </Box>

                {/* Seção da Equipe */}
                <Box sx={{ mb: 8 }}>
                    <Typography 
                        variant="h2" 
                        sx={{ 
                            fontWeight: 600,
                            fontSize: '2rem',
                            textAlign: 'center',
                            mb: 5
                        }}
                    >
                        Nossa Equipe
                    </Typography>
                    
                    <Grid container spacing={4}>
                        {authors.map((author: any) => (
                            <Grid size={{xs:12}} key={author.id}>
                                <Paper 
                                    elevation={3} 
                                    sx={{ 
                                        p: { xs: 2, sm: 3 },
                                        borderRadius: 2,
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        alignItems: 'center',
                                        gap: 3,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: 6
                                        }
                                    }}
                                >
                                    <Avatar
                                        src={AvatarProfile}
                                        alt={`Foto de ${author.name}`}
                                        sx={{ 
                                            width: { xs: 80, sm: 100 }, 
                                            height: { xs: 80, sm: 100 },
                                            border: '3px solid',
                                            borderColor: 'primary.light'
                                        }}
                                    />
                                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                                        <Typography 
                                            variant="h3" 
                                            sx={{ 
                                                fontWeight: 600,
                                                fontSize: '1.5rem',
                                                mb: 1
                                            }}
                                        >
                                            {author.name}
                                        </Typography>
                                        <Typography 
                                            variant="subtitle1" 
                                            sx={{ 
                                                color: 'primary.dark',
                                                mb: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: { xs: 'center', sm: 'flex-start' }
                                            }}
                                        >
                                            {author.email}
                                        </Typography>
                                        {author.about ? (
                                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                                {author.about}
                                            </Typography>
                                        ) : (
                                            <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                                Jornalista dedicado a trazer as notícias mais relevantes com precisão e ética.
                                            </Typography>
                                        )}
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Seção Expediente */}
                <Box component="section" sx={{ 
                    backgroundColor: 'background.paper',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 1
                }}>
                    <Typography 
                        variant="h2" 
                        sx={{ 
                            fontWeight: 600,
                            fontSize: '1.8rem',
                            mb: 3,
                            color: 'primary.main'
                        }}
                    >
                        Expediente
                    </Typography>
                    
                    <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                        A Agência NINGUÉM PERGUNTOU é um projeto da disciplina de Jornalismo Online do Curso de Jornalismo do UDF.
                    </Typography>
                    
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            fontWeight: 600,
                            fontSize: '1.4rem',
                            mt: 4,
                            mb: 2
                        }}
                    >
                        Equipe
                    </Typography>
                    
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid size={{xs:12, md:6}}>
                            <Typography variant="h4" sx={{ fontSize: '1.2rem', mb: 1.5 }}>
                                Edição
                            </Typography>
                            <Typography variant="body1">[Nome do Editor]</Typography>
                        </Grid>
                        <Grid size={{xs:12, md:6}}>
                            <Typography variant="h4" sx={{ fontSize: '1.2rem', mb: 1.5 }}>
                                Reportagem
                            </Typography>
                            <Typography variant="body1">[Nome dos Repórteres]</Typography>
                        </Grid>
                    </Grid>
                    
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            fontWeight: 600,
                            fontSize: '1.4rem',
                            mt: 4,
                            mb: 2
                        }}
                    >
                        Contato
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Email: <Link href="mailto:contato@ninguemperguntou.com" color="primary">contato@ninguemperguntou.com</Link>
                    </Typography>
                    
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            fontWeight: 600,
                            fontSize: '1.4rem',
                            mt: 4,
                            mb: 2
                        }}
                    >
                        Redes Sociais
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <IconButton>
                        <Facebook />
                        </IconButton>
                        <IconButton>
                        <Instagram />
                        </IconButton>
                        <IconButton>
                        <Twitter />
                        </IconButton>
                  </Box>
                </Box>
            </Container>
            
            <Newsletter />
            <Footer />
        </Box>
    )
}