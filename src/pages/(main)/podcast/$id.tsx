import { Header } from "@/components/AppBar";
import { useCreateCommentsPodcast } from "@/hooks/createCommentPodcast";
import { usePodcastById } from "@/hooks/podcastByID";
import { useAuthStore } from "@/store/Auth";
import { convertToBrazilianDateWithHours } from "@/utils/data";
import { decodeToken } from "@/utils/token";
import { Avatar, Box, Button, Container, Grid, Paper, TextField, Typography, Card, CardContent, CardMedia, Divider, CircularProgress, Chip } from "@mui/material";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import AvatarProfile from "@/assets/img/avatar.jpg";

export const PodcastById = () => {
    const { id } = useParams({ strict: false });
    const { podcastData, commentsData, loading, refetch } = usePodcastById(id);
    const { createComment, loading: loadingCreateComment } = useCreateCommentsPodcast();
    const token = useAuthStore.getState().getToken();
    const [newComment, setNewComment] = useState("");
    const navigate = useNavigate();
    const [iframeError, setIframeError] = useState(false);

    const podcast = useMemo(() => {
        if (!podcastData?.data) return null;
        return podcastData.data;
    }, [podcastData]);

    const commentsPodcast = useMemo(() => {
        if (!commentsData?.data) return [];
        return commentsData.data;
    }, [commentsData]);

    // Extrai o ID do episódio do Spotify
    const getSpotifyId = (url: string) => {
        const spotifyRegex = /(?:spotify:episode:|open\.spotify\.com\/episode\/)([a-zA-Z0-9]+)/;
        const match = url.match(spotifyRegex);
        return match ? match[1] : null;
    };

    const spotifyId = podcast?.link ? getSpotifyId(podcast.link) : null;

    const handleAddComment = async () => {
        if (!token) {
            toast.error("Você precisa estar autenticado para adicionar um comentário.");
            return;
        }

        const { id: idUser }: any = decodeToken(token);

        if (newComment.trim() === "") {
            toast.error("Comentário não pode ser vazio.");
            return;
        }

        try {
            await createComment({ comment: newComment, documentId: id, idUser: idUser });
            toast.success("Comentário adicionado com sucesso!");
            setNewComment("");
            refetch();
        } catch (error) {
            toast.error("Erro ao adicionar comentário. Tente novamente.");
        }
    };

    if (loading) {
        return (
            <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!podcast) {
        return (
            <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h6">Podcast não encontrado</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ height: "100%", width: "100%", bgcolor: 'background.default' }}>
            <Header />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Player do Spotify */}
                <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
                    <Grid container>
                        <Grid size={{xs:12, md:4}}>
                            <CardMedia
                                component="img"
                                height="100%"
                                image={podcast.cover?.url || ''}
                                alt={podcast.title}
                                sx={{ 
                                    height: '100%',
                                    minHeight: 300,
                                    objectFit: 'cover'
                                }}
                            />
                        </Grid>
                        <Grid size={{xs:12, md:8}}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                                    {podcast.title}
                                </Typography>
                                
                                {iframeError ? (
                                    <Box sx={{ 
                                        p: 3, 
                                        bgcolor: 'error.light', 
                                        borderRadius: 2,
                                        textAlign: 'center'
                                    }}>
                                        <Button 
                                            variant="contained"
                                            href={podcast.link}
                                            target="_blank"
                                            fullWidth
                                        >
                                            Ouvir no Spotify
                                        </Button>
                                    </Box>
                                ) : spotifyId ? (
                                    <iframe
                                        src={`https://open.spotify.com/embed/episode/${spotifyId}`}
                                        width="100%"
                                        height="232"
                                        frameBorder="0"
                                        allow="encrypted-media"
                                        style={{ borderRadius: '12px' }}
                                        onError={() => setIframeError(true)}
                                    />
                                ) : (
                                    <Button 
                                        variant="contained"
                                        href={podcast.link}
                                        target="_blank"
                                        fullWidth
                                        sx={{ py: 2 }}
                                    >
                                        Ouvir no Spotify
                                    </Button>
                                )}
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>

                {/* Seção de Comentários */}
                <Box sx={{ 
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    p: 4,
                    boxShadow: 1
                }}>
                    <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Comentários
                        <Chip label={commentsPodcast.length} color="primary" size="small" sx={{ ml: 2 }} />
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    {/* Lista de Comentários */}
                    <Box sx={{ maxHeight: 500, overflowY: 'auto', pr: 2 }}>
                        {commentsPodcast.length === 0 ? (
                            <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
                                Nenhum comentário ainda. Seja o primeiro a comentar!
                            </Typography>
                        ) : (
                            commentsPodcast.map((comment: any) => (
                                <Paper
                                    key={comment?.documentId}
                                    sx={{
                                        p: 3,
                                        mb: 3,
                                        borderRadius: 2,
                                        boxShadow: 1
                                    }}
                                >
                                    <Grid container spacing={2} alignItems="flex-start">
                                        <Grid>
                                            <Avatar
                                                alt={comment?.users_permissions_user.username}
                                                src={AvatarProfile}
                                                sx={{ width: 56, height: 56 }}
                                            />
                                        </Grid>
                                        <Grid size={{xs:"auto"}}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {comment?.users_permissions_user.username}
                                                </Typography>
                                                <Typography variant="caption" color="textSecondary" sx={{ ml: 2 }}>
                                                    {convertToBrazilianDateWithHours(comment?.publishedAt)}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1">
                                                {comment?.comment}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))
                        )}
                    </Box>

                    {/* Formulário de Comentário */}
                    <Box sx={{ mt: 4 }}>
                        {token ? (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    Adicionar comentário
                                </Typography>
                                <TextField
                                    label="Seu comentário"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    variant="outlined"
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    onClick={handleAddComment}
                                    variant="contained"
                                    color="primary"
                                    disabled={loadingCreateComment}
                                    size="large"
                                >
                                    {loadingCreateComment ? 'Enviando...' : 'Publicar Comentário'}
                                </Button>
                            </>
                        ) : (
                            <Box sx={{ textAlign: 'center', p: 3 }}>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    Faça login para comentar
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate({ to: "/auth/login" })}
                                >
                                    Entrar
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};