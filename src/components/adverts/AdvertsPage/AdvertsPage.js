import React from 'react';
import { Link } from 'react-router-dom';
import { Empty, Button, Spin, List, Divider } from 'antd';
import { connect } from 'react-redux';
import T from 'prop-types';

import Layout from '../../layout';
import FiltersForm, { defaultFilters } from './FiltersForm';
import AdvertCard from './AdvertCard';
import {
  getFilters,
  getAdverts,
  searchAdverts,
  apiLoading,
  getErrorMessage,
} from '../../../store/ducks/app';

export class AdvertsPage extends React.Component {
  renderLoading = () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin size="large" />
    </div>
  );

  renderError = () => {
    const { error } = this.props;
    return (
      <Empty
        description={<span style={{ color: '#ff4d4f' }}>{`${error}`}</span>}
      >
        <Button type="primary" danger onClick={this.loadAdverts}>
          Reload
        </Button>
      </Empty>
    );
  };

  renderEmpty = () => {
    const { filters } = this.props;
    const isFiltered =
      JSON.stringify(filters) !== JSON.stringify(defaultFilters);
    return (
      <Empty description={<span>No adverts here!</span>}>
        {isFiltered ? (
          <span>Refine your search</span>
        ) : (
          <Link to="/adverts/new">
            <Button type="primary">Create the first one</Button>
          </Link>
        )}
      </Empty>
    );
  };

  renderAdvert = advert => {
    return (
      <List.Item>
        <Link to={`/adverts/${advert._id}`}>
          <AdvertCard {...advert} />
        </Link>
      </List.Item>
    );
  };

  renderAdverts = () => {
    const { adverts, loading, error } = this.props;
    if (loading) {
      return this.renderLoading();
    }

    if (error) {
      return this.renderError();
    }

    if (!adverts) {
      return null;
    }

    if (!adverts.length) {
      return this.renderEmpty();
    }

    return (
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={adverts}
        renderItem={this.renderAdvert}
      />
    );
  };

  loadAdverts() {
    const { filters, searchAdverts } = this.props;
    searchAdverts(filters, true);
  }

  componentDidMount() {
    this.loadAdverts();
  }

  render() {
    return (
      <Layout title="Adverts list">
        <Divider>Filter your adverts</Divider>
        <FiltersForm />
        <Divider>Adverts</Divider>
        {this.renderAdverts()}
      </Layout>
    );
  }
}

AdvertsPage.propTypes = {
  filters: T.shape({
    name: T.string,
    sale: T.string,
    price: T.arrayOf(T.number),
    tags: T.arrayOf(T.string),
  }),
  adverts: T.array.isRequired,
  loading: T.bool.isRequired,
  error: T.string,
  searchAdverts: T.func.isRequired,
};

const mapStateToProps = state => {
  return {
    filters: getFilters(state),
    adverts: getAdverts(state),
    loading: apiLoading(state),
    error: getErrorMessage(state),
  };
};

export default connect(mapStateToProps, { searchAdverts })(AdvertsPage);
