import React, { useState } from 'react';
import Layout from '../layout/Layout';
import TableAdverts from './TableAdverts';
import { Box, Container, makeStyles, Card } from '@material-ui/core';
import Page from '../components/Page';
import FilterBar from './FilterBar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  filters: {
    marginBottom: '2rem',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  //const [customers] = useState(data);

  return (
    <Page className={classes.root} title="Anuncios">
      <Layout>
        <Container maxWidth={false}>
          <Box mt={3} display="flex" alignItems="center" flexDirection="column">
            <FilterBar />
            <TableAdverts></TableAdverts>
          </Box>
        </Container>
      </Layout>
    </Page>
  );
};

export default Dashboard;
