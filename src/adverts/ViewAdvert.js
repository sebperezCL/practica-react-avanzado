import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import {
  Box,
  Card,
  CardContent,
  Container,
  makeStyles,
  Grid,
  Button,
} from '@material-ui/core';
import Page from '../components/Page';
import { useParams } from 'react-router-dom';
import { getSingleAdvert } from '../api/adverts';
import { Redirect } from 'react-router-dom';
import AdvertCard from './AdvertCard';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1000,
  },
  inputForm: {
    minWidth: '30ch',
  },
  selectLabel: {
    marginTop: 0,
  },
  textOutput: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  btn: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

const ViewAdvert = ({ history }) => {
  const { advertId } = useParams();
  const [advert, setAdvert] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSingleAdvert(advertId)
      .then(response => {
        const {
          data: { result },
        } = response;
        setAdvert(result);
      })
      .catch(err => setError(err));
  }, []);

  const renderContent = () => {
    if (error) {
      return <Redirect to="/404" />;
    }

    if (!advert) return null;

    return (
      <AdvertCard
        advertId={advertId}
        productName={advert.name}
        tags={advert.tags.join(', ')}
        price={advert.price}
        operacion={advert.sale}
        photo={advert.photo}
        history={history}
      />
    );
  };

  return (
    <Page>
      <Layout>
        <Container maxWidth={false}>
          <Box mt={3} display="flex" alignItems="center" flexDirection="column">
            {renderContent()}
          </Box>
        </Container>
      </Layout>
    </Page>
  );
};

export default ViewAdvert;
