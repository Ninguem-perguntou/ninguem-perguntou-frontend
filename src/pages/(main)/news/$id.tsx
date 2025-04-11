import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { BlocksRenderer, type BlocksContent } from "@/components/index";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useNews } from "@/hooks/newsByID";
import { toast } from "sonner";

import Icon from "@/assets/img/icon.png";

export const NewsById = () => {
  const { id } = useParams({ strict: false });
  const { newsData, loading } = useNews(id);
  const navigate = useNavigate();

  const [mockContent, setMockContent] = useState<BlocksContent>([]);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [newsCreatedAt, setNewsCreatedAt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (newsData) {
      const { data } = newsData;
      const attributes = data.data;

      setMockContent(attributes.content);
      setNewsTitle(attributes.title);
      setNewsDescription(attributes.description);
      setNewsCreatedAt(attributes.createdAt);
      setImageUrl(attributes.cover?.url || "");
      toast.success("Notícia carregada com sucesso!");
    }
  }, [newsData]);

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
          <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
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
          <Card sx={{ display: "flex", flexDirection: "column", overflowX: "hidden" }}>
            <CardMedia
              component="img"
              height="300"
              image={imageUrl}
              alt="news"
              sx={{ objectFit: "cover", width: "100%" }}
            />
            <CardContent>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                {newsCreatedAt}
              </Typography>
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
                    fontSize: "1rem",
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
                        children?.map((child: any) => child.props.text).join("") ?? "";

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
    </section>
  );
};
