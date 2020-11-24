import React, { useState } from 'react';

import Layout from '../layout/Layout';
// import { getAdverts } from '../api/adverts';

// const Dashboard = () => {
//   getAdverts().then((adverts) => console.log(adverts.data.result.rows));
//   return (
//     <Layout>
//       <div>Hola Ruta Privada</div>
//     </Layout>
//   );
// };

import { Box, Container, makeStyles } from '@material-ui/core';
import Page from '../components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  //const [customers] = useState(data);

  return (
    <Page className={classes.root} title="Customers">
      <Layout>
        <Container maxWidth={false}>
          <Box mt={3}>
            <div>Por acá</div>
            {/* {<Results customers={customers} />} */}
          </Box>
        </Container>
      </Layout>
    </Page>
  );
};

export default Dashboard;
