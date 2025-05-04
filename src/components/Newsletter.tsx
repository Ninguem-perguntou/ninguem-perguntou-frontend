import { Box, Button, Container, TextField, Typography } from "@mui/material"

export const Newsletter = () => {
    return(
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
    )
}