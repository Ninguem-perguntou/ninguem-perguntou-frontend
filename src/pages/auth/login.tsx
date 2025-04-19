import * as React from 'react';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { getDesignTokens, inputsCustomizations } from './customTheme';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import { useLogin } from '@/hooks/login';
import { decodeToken } from '@/utils/token';
import { useAuthStore } from '@/store/Auth';

export const Login = () => {
  const [form, setForm] = React.useState({
    identifier: '',
    password: '',
  });

  const {login, loading} = useLogin();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await login({identifier: form.identifier, password: form.password});
      toast.success('Login realizado com sucesso!');
      const userData = decodeToken(data.jwt);

       // Armazena os dados de autenticação
       useAuthStore.getState().setAuthData(userData, data.jwt);
      navigate({ to: '/' });
    }catch (err) {
      console.error(err);
      toast.error('Erro ao se logar usuário. Verifique os dados e tente novamente.');
    }
  };

  const mode = 'light';
  const theme = createTheme({
    ...getDesignTokens(mode),
    palette: {
      ...getDesignTokens(mode).palette,
      mode,
    },
    components: {
      ...inputsCustomizations,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 420,
          width: '100%',
          mx: 'auto',
          mt: 32,
          p: { xs: 3, sm: 4 },
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Login
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Preencha os campos abaixo para se logar.
        </Typography>

        <Stack spacing={2}>
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
          />
          <TextField
            name="password"
            label="Senha"
            placeholder="••••••••"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="new-password"
          />

          <Button
            variant="text"
            color="primary"
            size="small"
            onClick={() => navigate({ to: '/auth/register' })}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Não tem uma conta? Cadastre-se
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{ mt: 1, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};
