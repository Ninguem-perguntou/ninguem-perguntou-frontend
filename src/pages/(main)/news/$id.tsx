import  { useEffect, useState } from "react";
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
  Snackbar,
  TextField,
  Button,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
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

export const NewsById = () => {
  const { id } = useParams({ strict: false });
  const { newsData, commentsData, loading, refetch } = useNews(id);
  const {createComment, loading: loadingCreateComment, errorComment} = useCreateComments();
  const navigate = useNavigate();
  const token = useAuthStore.getState().getToken(); // Verificando o token
  const [openSnackbar, setOpenSnackbar] = useState(false); // Para mostrar o Snackbar de sucesso ou erro

  const [mockContent, setMockContent] = useState<BlocksContent>([]);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [newsCreatedAt, setNewsCreatedAt] = useState("");
  const [newComment, setNewComment] = useState(""); // Estado para o novo comentário
  const [commentsCount, setCommentsCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [category, setCategory] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (newsData) {
      const { data } = newsData;  // Desestruturando 'data' que contém o conteúdo
      const { data: dataComments } = commentsData; // Desestruturando 'data' que contém os comentários
      const attributes = data; // Acessando 'data' corretamente
      const comments = dataComments; // Acessando 'data' corretamente
      const commentsCount = comments.length; // Contando os comentários
      if (attributes || comments) {
        setMockContent(attributes.content); // 'content' é um array
        setNewsTitle(attributes.title);
        setNewsDescription(attributes.description);
        setNewsCreatedAt(attributes.createdAt);
        setCategory(attributes.categories); // Pode ser um array também, dependendo de como você quer lidar com isso
        setImageUrl(attributes.cover?.url || ""); // Garante que a URL seja válida
        setCommentsCount(commentsCount);
        setComments(comments.map( (c: any) => {
          return {
            documentId: c.documentId,
            comment: c.comment,
            publishedAt: c.publishedAt,
            user: {
              documentId: c.users_permissions_user?.documentId,
              username: c.users_permissions_user?.username,
            },
          }
        })); // Armazena os comentários
        toast.success("Notícia carregada com sucesso!");
      }
    }
  }, [newsData]);

  console.log("ID do usuário:", id); // Verifica o ID do usuário


  const handleAddComment = async () => {
    if (!token) {
      toast.error("Você precisa estar autenticado para adicionar um comentário.");
      return;
    }

    const {id: idUser} = decodeToken(token);


    if (newComment.trim() === "") {
      toast.error("Comentário não pode ser vazio.");
      return;
    }

    try {
      await createComment({comment: newComment, documentId: id, idUser: idUser});
      toast.success("Comentário adicionado com sucesso!");
      setNewComment(""); // Limpa o campo de comentário
      refetch(); // Refaz a consulta para atualizar os comentários
    } catch (error) {
      toast.error("Erro ao adicionar comentário. Tente novamente.");
    }
  };

  return (
    <section
      style={{
        background: "#f3f4f6",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center" }}
            >
            <img
              src={Icon}
              alt="Logo"
              onClick={() => navigate({ to: "/" })}
              style={{ width: 30, marginRight: 20, cursor: "pointer" }}
            />
            NINGUÉM PERGUNTOU
          </Typography>
          <IconButton edge="end" color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Section Title */}
      <Box
        sx={{
          bgcolor: "var(--pink)",
          color: "white",
          px: 2,
          py: 1,
          fontWeight: "bold",
          width: "100%",
        }}
      >
        Distrito Federal
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 2 }}>
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
                    width: "100% !important",
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
      </Box>
      <div style={{ padding: 14 }} className="App">
      <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Comentários</h1>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {comments.map((comment: any) => (
          <Paper key={comment?.documentId} sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar alt={comment?.user.username} src={AvatarProfile} sx={{ width: 40, height: 40 }} />
              </Grid>
              <Grid item xs>
                <Typography variant="body1" fontWeight="bold">
                  {comment?.user.username}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
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

      {/* Se o token existir, mostrar o campo para adicionar comentário */}
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

      {/* Snackbar de feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Comentário adicionado com sucesso!"
      />
    </div>
    </section>
  );
};
