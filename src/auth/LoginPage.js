import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Page from '../components/Page';
import useForm from '../hooks/useForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(10),
  },
}));

const LoginPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPwd, setValidPwd] = useState(true);
  const [form, handleFormChange] = useForm({ email: '', password: '' });
  const classes = useStyles();

  const checkEmail = (email) => {
    return email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : false;
  };

  const handleSubmit = (event) => {
    const credentials = form;
    event.preventDefault();
  };

  const handleEmail = (event) => {
    const { email } = form;
    checkEmail(email) ? setValidEmail(true) : setValidEmail(false);
  };

  const handlePwd = (event) => {
    return form.password ? setValidPwd(true) : setValidPwd(false);
  };

  return (
    <Page className={classes.root}>
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
            <Box my={2}>
              <Button
                color="primary"
                // disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Login
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginPage;
