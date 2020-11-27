import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import TableAdverts from './TableAdverts';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from '../components/Page';
import FilterBar from './FilterBar';
import { getAdverts } from '../api/adverts';

const Dashboard = ({ history }) => {
  const [adverts, setAdverts] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    getAdverts(filters)
      .then(adverts => {
        const {
          data: { result },
        } = adverts;
        setAdverts(result.rows);
      })
      .catch(err => {
        setAdverts(null);
        console.log(err);
      });
  }, [filters]);

  const handleSearch = values => {
    setFilters(values);
  };

  return (
    <Page>
      <Layout>
        <Container maxWidth={false}>
          <Box mt={3} display="flex" alignItems="center" flexDirection="column">
            <FilterBar onSearch={handleSearch} />
            <TableAdverts history={history} adverts={adverts}></TableAdverts>
          </Box>
        </Container>
      </Layout>
    </Page>
  );
};

export default Dashboard;
