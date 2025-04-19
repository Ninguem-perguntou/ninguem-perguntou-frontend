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
import { useRegister } from '@/hooks/register';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

export const Register = () => {
  const [form, setForm] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const {register, loading} = useRegister();
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
      await register({email: form.email, password: form.password, username: form.username});
      toast.success('Registro realizado com sucesso!');
      navigate({ to: '/auth/login' });
    }catch (err) {
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
          Criar conta
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Preencha os campos abaixo para se registrar.
        </Typography>

        <Stack spacing={2}>
          <TextField
            name="username"
            label="Usuário"
            placeholder="seu_nome_de_usuário"
            value={form.username}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="username"
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
          <TextField
            name="confirmPassword"
            label="Confirmar Senha"
            placeholder="••••••••"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="new-password"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{ mt: 1, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Registrar
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};
