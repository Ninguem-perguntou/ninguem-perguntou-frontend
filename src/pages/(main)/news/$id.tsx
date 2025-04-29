import { useEffect, useState } from "react";
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
  Paper,
  Grid,
  Avatar,
  TextField,
  Button,
  Container,
} from "@mui/material";
import { convertToBrazilianDateWithHours } from "@/utils/data";
import { BlocksRenderer, type BlocksContent } from "@/components/index";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useNews } from "@/hooks/newsByID";
import { toast } from "sonner";
import Icon from "@/assets/img/icon.png";
import AvatarProfile from "@/assets/img/avatar.jpg";
import { useAuthStore } from "@/store/Auth";
import { useCreateComments } from "@/hooks/createComment";
import { decodeToken } from "@/utils/token";
import { LogIn, Search } from "lucide-react";
import { useNewsByCategory } from "@/hooks/newsByCategory";

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
    <section
      style={{
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              onClick={() => {
                navigate({ to: "/" });
              }}
              style={{ width: "30px", marginRight: "20px", cursor: "pointer" }}
              src={Icon}
              alt="Logo Ninguém Perguntou"
            />
            <Typography variant="h6" component="h1" sx={{ fontWeight: "bold" }}>
              NINGUÉM PERGUNTOU
            </Typography>
          </Box>

          <Box>
            <IconButton sx={{ display: { xs: "none", sm: "inline-flex" } }}>
              <Search className="w-5 h-5" />
            </IconButton>
            <IconButton edge="end" onClick={() => navigate({ to: "/auth/login" })}>
              <LogIn className="w-5 h-5" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* Coluna principal (conteúdo da notícia) */}
          <Grid size={8}>
            {loading ? (
              <Card>
                <Skeleton variant="rectangular" height={200} />
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
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={imageUrl}
                  alt="news"
                  sx={{ objectFit: "cover", width: "100%" }}
                />
                <CardContent>
                  <section style={{ display: "flex", flexDirection: "column" }}>
                    <section style={{ display: "flex", gap: "5px" }}>
                      {category?.map((cat: any, index: number) => (
                        <Typography
                          key={index}
                          variant="caption"
                          color="var(--pink)"
                          fontWeight="bold"
                        >
                          {index === category.length - 1
                            ? cat.name
                            : `${cat.name},`}
                        </Typography>
                      ))}
                    </section>

                    <Typography variant="caption" color="textSecondary">
                      {convertToBrazilianDateWithHours(newsCreatedAt)}
                    </Typography>
                  </section>
                  <Typography variant="h6" gutterBottom>
                    {newsTitle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {newsDescription}
                  </Typography>

                    {author.map((a: any) => (
                      <Typography variant="body2" color="textPrimary" gutterBottom>
                      {a?.name}
                      </Typography>
                    ))}

                  {/* Dynamic CMS Content */}
                  <Box
                    sx={{
                      mt: 2,
                      "& p": {
                        lineHeight: 1.8,
                        fontSize: "1.2rem",
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
              <h1 style={{ fontWeight: "bold", marginBottom: "20px" }}>
                Comentários ({commentsCount})
              </h1>
              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
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
                      <Grid>
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
              </div>

              {/* Formulário de comentário */}
              {token ? (
                <div style={{ marginTop: 20 }}>
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
                    style={{ marginTop: 10 }}
                  >
                    Adicionar Comentário
                  </Button>
                </div>
              ) : (
                <div style={{ marginTop: 20 }}>
                  <Typography variant="body2" color="textSecondary">
                    Você precisa estar logado para adicionar um comentário.
                  </Typography>
                </div>
              )}
              </Box>
          </Grid>

          {/* Coluna lateral (notícias relacionadas) */}
          <Grid size={4}>
            {newsByCategoryData && newsByCategoryData.data.length > 1 && (
              <Box sx={{ position: "sticky", top: 20 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Notícias Relacionadas
                </Typography>
                <Grid container spacing={2}>
                  {newsByCategoryData.data
                    .filter((n: any) => n.id !== id)
                    .slice(0, 4)
                    .map((related: any) => (
                      <Grid key={related.id}>
                        <Card
                          sx={{
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                          }}
                          onClick={() => navigate({ to: `/news/${related.documentId}` })}
                        >
                          <CardMedia
                            component="img"
                            height="140"
                            image={related.cover?.url || ""}
                            alt={related.title}
                            sx={{ objectFit: "cover" }}
                          />
                          <CardContent>
                            <Typography variant="body2" fontWeight="bold" noWrap>
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
        </Grid>
      </Container>
    </section>
  );
};