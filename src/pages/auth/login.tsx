import * as React from 'react';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
  Grid,
  IconButton,
  InputAdornment,
  Link
} from '@mui/material';
import { getDesignTokens, inputsCustomizations } from './customTheme';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import { useLogin } from '@/hooks/login';
import { decodeToken } from '@/utils/token';
import { useAuthStore } from '@/store/Auth';
import { Visibility, VisibilityOff} from '@mui/icons-material';
import Icon from "@/assets/img/icon.png";

export const Login = () => {
  const [form, setForm] = React.useState({
    identifier: '',
    password: '',
    showPassword: false
  });

  const {login, loading} = useLogin();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClickShowPassword = () => {
    setForm({ ...form, showPassword: !form.showPassword });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({identifier: form.identifier, password: form.password});
      toast.success('Login realizado com sucesso!');
      const userData = decodeToken(data.jwt);
      useAuthStore.getState().setAuthData(userData, data.jwt);
      navigate({ to: '/' });
    } catch (err) {
      console.error(err);
      toast.error('Erro ao fazer login. Verifique seus dados e tente novamente.');
    }
  };

  const mode = 'light';
  const theme = createTheme({
    ...getDesignTokens(mode),
    palette: {
      ...getDesignTokens(mode).palette,
      mode,
      primary: {
        main: '#ff007a', // Rosa característico
      },
    },
    components: {
      ...inputsCustomizations,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ minHeight: '100vh' }}>
        {/* Parte esquerda com gradiente */}
        <Grid size={{xs:12, md:6}}  sx={{
          background: 'conic-gradient(from 136deg at 50% 0%, #550E9B 0%, #8015E8 6%, #F3A78F 12%, #550E9B 28%)',
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          p: 8,
          color: 'white',
          textAlign: 'center'
        }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            NINGUÉM PERGUNTOU
          </Typography>
          <Typography variant="h5" mb={4}>
            Junte-se à nossa comunidade
          </Typography>
          <Box component="img" src={Icon} sx={{ width: 200, height: 200 }} />
        </Grid>

        {/* Parte direita com formulário */}
        <Grid size={{xs:12, md:6}} sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, sm: 6 }
        }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              maxWidth: 420,
              width: '100%',
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
              Login
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Acesse sua conta para continuar
            </Typography>

            <Stack spacing={3}>
              <TextField
                name="identifier"
                label="Email"
                placeholder="seuemail@exemplo.com"
                type="email"
                value={form.identifier}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="email"
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
              <TextField
                name="password"
                label="Senha"
                placeholder="••••••••"
                type={form.showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="current-password"
                InputProps={{
                  sx: { borderRadius: 2 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {form.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ textAlign: 'right' }}>
                <Link 
                  href="#" 
                  underline="hover" 
                  color="text.secondary"
                  //onClick={() => navigate({ to: '/auth/forgot-password' })}
                >
                  Esqueceu sua senha?
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                sx={{ 
                  py: 1.5,
                  borderRadius: 2, 
                  textTransform: 'none', 
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>

              <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
                Não tem uma conta?{' '}
                <Link 
                  href="#" 
                  underline="hover" 
                  color="primary"
                  onClick={() => navigate({ to: '/auth/register' })}
                  fontWeight="600"
                >
                  Cadastre-se
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};