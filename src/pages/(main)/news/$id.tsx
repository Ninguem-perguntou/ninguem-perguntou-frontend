import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Paper,
  Grid,
  Avatar,
  TextField,
  Button,
  Container,
  useMediaQuery,
  useTheme,
  Chip,
} from "@mui/material";
import { convertToBrazilianDateWithHours } from "@/utils/data";
import { BlocksRenderer, type BlocksContent } from "@/components/index";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useNews } from "@/hooks/newsByID";
import { toast } from "sonner";
import AvatarProfile from "@/assets/img/avatar.jpg";
import { useAuthStore } from "@/store/Auth";
import { useCreateComments } from "@/hooks/createComment";
import { decodeToken } from "@/utils/token";
import { useNewsByCategory } from "@/hooks/newsByCategory";
import { Header } from "@/components/AppBar";

type CategoryData = {
  createdAt: string;
  description: string;
  documentId: string;
  id: string;
  locale: string;
  name: string;
  publishedAt: string;
  slug: string;
  updatedAt: string;
};

export const NewsById = () => {
  const { id } = useParams({ strict: false });
  const { newsData, commentsData, loading, refetch } = useNews(id);
  const { createComment, loading: loadingCreateComment } = useCreateComments();
  const navigate = useNavigate();
  const token = useAuthStore.getState().getToken();
  const [mockContent, setMockContent] = useState<BlocksContent>([]);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [newsCreatedAt, setNewsCreatedAt] = useState("");
  const [newComment, setNewComment] = useState("");
  const [commentsCount, setCommentsCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [category, setCategory] = useState<CategoryData[]>([]);
  const [author, setAuthor] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const { newsByCategoryData } = useNewsByCategory(category[0]?.id);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (newsData) {
      const { data } = newsData;
      const { data: dataComments } = commentsData;
      const attributes = data;
      const comments = dataComments;
      if (attributes || comments) {
        const commentsCount = comments.length;
        setMockContent(attributes.content);
        setNewsTitle(attributes.title);
        setNewsDescription(attributes.description);
        setNewsCreatedAt(attributes.createdAt);
        setCategory(attributes.categories);
        setImageUrl(attributes.cover?.url || "");
        setAuthor(attributes?.authors);
        setCommentsCount(commentsCount);
        setComments(
          comments.map((c: any) => {
            return {
              documentId: c.documentId,
              comment: c.comment,
              publishedAt: c.publishedAt,
              user: {
                documentId: c.users_permissions_user?.documentId,
                username: c.users_permissions_user?.username,
              },
            };
          })
        );
        toast.success("Notícia carregada com sucesso!");
      }
    }
  }, [newsData]);

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

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={3} direction={isMobile ? "column-reverse" : "row"}>
          {/* Coluna lateral (notícias relacionadas) - Movida para baixo em mobile */}
          <Grid size={{xs:12, md:4}}>
            {newsByCategoryData && newsByCategoryData.data.length > 1 && (
              <Box sx={{ 
                position: isMobile ? "relative" : "sticky",
                top: isMobile ? 0 : 20,
                mb: isMobile ? 3 : 0
              }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Notícias Relacionadas
                </Typography>
                <Grid container spacing={2}>
                  {newsByCategoryData.data
                    .filter((n: any) => n.id !== id)
                    .slice(0, 4)
                    .map((related: any) => (
                      <Grid size={{xs:12}} key={related.id}>
                        <Card
                          sx={{
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: isMobile ? "row" : "column",
                            height: "100%",
                            '&:hover': {
                              boxShadow: isMobile ? 'none' : '0 4px 8px rgba(0,0,0,0.1)'
                            }
                          }}
                          onClick={() => navigate({ to: `/news/${related.documentId}` })}
                        >
                          <CardMedia
                            component="img"
                            height={isMobile ? "100" : "140"}
                            width={isMobile ? "120" : "100%"}
                            image={related.cover?.url || ""}
                            alt={related.title}
                            sx={{ 
                              objectFit: "cover",
                              flex: isMobile ? "0 0 120px" : "1"
                            }}
                          />
                          <CardContent sx={{ flex: 1 }}>
                            <Typography 
                              variant="body2" 
                              fontWeight="bold" 
                              sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}
                            >
                              {related.title}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {convertToBrazilianDateWithHours(related.createdAt)}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            )}
          </Grid>

          {/* Coluna principal (conteúdo da notícia) */}
          <Grid size={{xs:12, md:8}}>
            {loading ? (
              <Card>
                <Skeleton variant="rectangular" height={300} />
                <CardContent>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="rounded" height={100} sx={{ mt: 2 }} />
                </CardContent>
              </Card>
            ) : (
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  overflowX: "hidden",
                  mb: 3
                }}
              >
                <CardMedia
                  component="img"
                  height={isMobile ? "200" : "300"}
                  image={imageUrl}
                  alt="news"
                  sx={{ objectFit: "cover", width: "100%" }}
                />
                <CardContent>
                  <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                    <Box sx={{ display: "flex", gap: "5px", flexWrap: 'wrap' }}>
                      {category?.map((cat: any, index: number) => (
                        <Chip
                          key={index}
                          label={cat.name}
                          size="small"
                          sx={{ 
                            bgcolor: '#ff007a',
                            color: 'white',
                            fontWeight: 'bold',
                            mb: 1
                          }}
                        />
                      ))}
                    </Box>

                    <Typography variant="caption" color="textSecondary">
                      {convertToBrazilianDateWithHours(newsCreatedAt)}
                    </Typography>
                  </Box>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {newsTitle}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" gutterBottom sx={{ mb: 3 }}>
                    {newsDescription}
                  </Typography>

                  {author.map((a: any, index: number) => (
                    <Typography key={index} variant="body2" color="textPrimary" gutterBottom>
                      Por: {a?.name}
                    </Typography>
                  ))}

                  {/* Dynamic CMS Content */}
                  <Box
                    sx={{
                      mt: 2,
                      "& p": {
                        lineHeight: 1.8,
                        fontSize: "1.1rem",
                        mb: 2,
                        textAlign: "justify",
                      },
                      "& iframe": {
                        width: 1,
                        maxWidth: "100%",
                        aspectRatio: "16/9",
                        border: "none",
                      },
                    }}
                  >
                    <BlocksRenderer
                      content={mockContent}
                      blocks={{
                        paragraph: ({ children }: any) => {
                          const textContent =
                            children
                              ?.map((child: any) => child.props.text)
                              .join("") ?? "";

                          const isIframe = /<\/?(iframe)/.test(textContent);

                          if (isIframe) {
                            return (
                              <div
                                dangerouslySetInnerHTML={{ __html: textContent }}
                                style={{ width: "100%" }}
                              />
                            );
                          }

                          return <p>{children}</p>;
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            )}
            
            {/* Seção de comentários */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Comentários ({commentsCount})
              </Typography>
              <Box sx={{ maxHeight: "400px", overflowY: "auto", mb: 3 }}>
                {comments.map((comment: any) => (
                  <Paper
                    key={comment?.documentId}
                    sx={{
                      padding: 2,
                      marginBottom: 2,
                      borderRadius: 2,
                      boxShadow: 2,
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid>
                        <Avatar
                          alt={comment?.user.username}
                          src={AvatarProfile}
                          sx={{ width: 40, height: 40 }}
                        />
                      </Grid>
                      <Grid size={{xs:12}}>
                        <Typography variant="body1" fontWeight="bold">
                          {comment?.user.username}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          paragraph
                        >
                          {comment?.comment}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {convertToBrazilianDateWithHours(comment?.publishedAt)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Box>

              {/* Formulário de comentário */}
              {token ? (
                <Box>
                  <TextField
                    label="Adicionar comentário"
                    fullWidth
                    multiline
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    variant="outlined"
                  />
                  <Button
                    onClick={handleAddComment}
                    variant="contained"
                    color="primary"
                    disabled={loadingCreateComment}
                    sx={{ mt: 2 }}
                    size="large"
                  >
                    Adicionar Comentário
                  </Button>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Você precisa estar logado para adicionar um comentário.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate({ to: "/auth/login" })}
                  >
                    Fazer Login
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};