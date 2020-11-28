import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import TableAdverts from './TableAdverts';
import { Box, Container } from '@material-ui/core';
import Page from '../components/Page';
import FilterBar from './FilterBar';
import { getAdverts } from '../api/adverts';
import { useLocation } from 'react-router-dom';

const Dashboard = ({ history }) => {
  const [adverts, setAdverts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.deletedAdvert) {
      searchAdverts();
    }
  }, [location]);

  const searchAdverts = () => {
    setSubmitting(true);
    getAdverts(filters)
      .then(response => {
        const {
          data: { result },
        } = response;
        setAdverts(result.rows);
        setSubmitting(false);
      })
      .catch(err => {
        setAdverts(null);
        console.log(err);
        setSubmitting(false);
      });
  };

  useEffect(() => {
    searchAdverts();
  }, [filters]);

  const handleSearch = values => {
    setFilters(values);
  };

  return (
    <Page>
      <Layout>
        <Container maxWidth={false}>
          <Box mt={3} display="flex" alignItems="center" flexDirection="column">
            <FilterBar onSearch={handleSearch} submitting={submitting} />
            <TableAdverts history={history} adverts={adverts}></TableAdverts>
          </Box>
        </Container>
      </Layout>
    </Page>
  );
};

export default Dashboard;
