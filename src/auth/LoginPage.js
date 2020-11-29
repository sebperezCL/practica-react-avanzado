import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from '@material-ui/core';
import Page from '../components/Page';
import useForm from '../hooks/useForm';
import Layout from '../layout/Layout';
import { login } from '../api/auth';

const LoginPage = ({ onLogin, history }) => {
  const [submitting, setSubmitting] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPwd, setValidPwd] = useState(true);
  const [savePwd, setSavePwd] = useState(false); // estado savePwd para recordar contraseña
  const [form, handleFormChange] = useForm({ email: '', password: '' });
  const [error, setError] = useState(null);

  const checkEmail = email => {
    return email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : false;
  };

  const handleSubmit = event => {
    const credentials = form;
    event.preventDefault();
    setSubmitting(true);
    login(credentials, savePwd)
      .then(result => {
        setSubmitting(false);
        if (result) {
          setError(null);
          onLogin(result).then(history.push('/dashboard'));
          return;
        }
        setError(new Error('Usuario o contraseña inválidos'));
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });
  };

  const handleEmail = () => {
    const { email } = form;
    checkEmail(email) ? setValidEmail(true) : setValidEmail(false);
  };

  const handlePwd = () => {
    return form.password ? setValidPwd(true) : setValidPwd(false);
  };

  const handleCheckboxPwd = event => {
    setSavePwd(event.target.checked);
  };

  const canSubmit = () => {
    const { email, password } = form;
    return !submitting && email && password;
  };

  return (
    <Layout history={history}>
      <Page>
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="flex-start"
        >
          <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
              <Box mb={3} textAlign="center">
                <Typography gutterBottom color="textPrimary" variant="h2">
                  Entrar al sistema
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Ingrese sus datos para hacer login
                </Typography>
              </Box>
              <TextField
                fullWidth
                label="Dirección Email"
                margin="normal"
                name="email"
                type="email"
                variant="outlined"
                onChange={handleFormChange}
                onBlur={handleEmail}
                error={!validEmail}
              />
              <TextField
                fullWidth
                label="Password"
                margin="normal"
                name="password"
                type="password"
                variant="outlined"
                onChange={handleFormChange}
                onBlur={handlePwd}
                error={!validPwd}
              />
              <FormControlLabel
                value="end"
                control={
                  <Checkbox color="primary" onClick={handleCheckboxPwd} />
                }
                label="Recordar Contraseña"
                labelPlacement="end"
              />
              <Box my={2}>
                <Box mb={3} textAlign="center">
                  {error && <div>{error.message}</div>}
                </Box>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={!canSubmit()}
                >
                  {submitting ? <CircularProgress /> : 'Login'}
                </Button>
              </Box>
            </form>
          </Container>
        </Box>
      </Page>
    </Layout>
  );
};

export default LoginPage;
