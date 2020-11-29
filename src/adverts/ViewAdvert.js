import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Box, Container } from '@material-ui/core';
import Page from '../components/Page';
import { useParams } from 'react-router-dom';
import { getSingleAdvert } from '../api/adverts';
import { Redirect } from 'react-router-dom';
import AdvertCard from './AdvertCard';

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
            <div>
              <h2>Detalles del anuncio</h2>
            </div>
            {renderContent()}
          </Box>
        </Container>
      </Layout>
    </Page>
  );
};

export default ViewAdvert;
