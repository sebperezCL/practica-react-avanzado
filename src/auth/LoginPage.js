import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Page from '../components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <form>
            <Box mb={3}>
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
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
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
