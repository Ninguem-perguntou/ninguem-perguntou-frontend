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
  Link,
} from '@mui/material';
import { getDesignTokens, inputsCustomizations } from './customTheme';
import { useRegister } from '@/hooks/register';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Icon from "@/assets/img/icon.png";

export const Register = () => {
  const [form, setForm] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  });

  const {register, loading} = useRegister();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClickShowPassword = (field: 'password' | 'confirmPassword') => {
    setForm({ 
      ...form, 
      [field === 'password' ? 'showPassword' : 'showConfirmPassword']: 
      !form[field === 'password' ? 'showPassword' : 'showConfirmPassword'] 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    try {
      await register({
        email: form.email, 
        password: form.password, 
        username: form.username
      });
      toast.success('Registro realizado com sucesso!');
      navigate({ to: '/auth/login' });
    } catch (err) {
      console.error(err);
      toast.error('Erro ao registrar usuário. Verifique os dados e tente novamente.');
    }
  };

  const mode = 'light';
  const theme = createTheme({
    ...getDesignTokens(mode),
    palette: {
      ...getDesignTokens(mode).palette,
      mode,
      primary: {
        main: '#ff007a',
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
        <Grid size={{xs:12, md:6}} sx={{
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
              Criar conta
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Preencha os campos para se registrar
            </Typography>

            <Stack spacing={3}>
              <TextField
                name="username"
                label="Nome de usuário"
                placeholder="seu_nome_de_usuario"
                value={form.username}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="username"
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
              <TextField
                name="email"
                label="Email"
                placeholder="seuemail@exemplo.com"
                type="email"
                value={form.email}
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
                autoComplete="new-password"
                InputProps={{
                  sx: { borderRadius: 2 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword('password')}
                        edge="end"
                      >
                        {form.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="confirmPassword"
                label="Confirmar Senha"
                placeholder="••••••••"
                type={form.showConfirmPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="new-password"
                InputProps={{
                  sx: { borderRadius: 2 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword('confirmPassword')}
                        edge="end"
                      >
                        {form.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

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
                {loading ? 'Registrando...' : 'Registrar'}
              </Button>

              <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
                Já tem uma conta?{' '}
                <Link 
                  href="#" 
                  underline="hover" 
                  color="primary"
                  onClick={() => navigate({ to: '/auth/login' })}
                  fontWeight="600"
                >
                  Faça login
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};