import { Facebook, Instagram, Twitter } from "@mui/icons-material"
import { Box, Button, Container, Divider, Grid, IconButton, TextField, Typography } from "@mui/material"

import Icon from "@/assets/img/icon.png";

export const Footer = () => {
    return (
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
    )
}