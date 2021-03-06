import React from 'react';
import T from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Divider, Image, Typography, Statistic, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Layout from '../../layout';
import { ConfirmationButton } from '../../shared';
import { DeleteOutlined } from '@ant-design/icons';
import placeholder from '../../../assets/photo-placeholder.png';
import Tags from '../Tags';
import { formatter } from '../../../utils/numbers';
import {
  getAdvert,
  getErrorMessage,
  deleteAdvert,
} from '../../../store/ducks/app';

const { Title } = Typography;

const AdvertPage = () => {
  const params = useParams();
  const advert = useSelector(getAdvert(params.id));
  const error = useSelector(getErrorMessage);
  const dispatch = useDispatch();
  const handleDeleteClick = () => dispatch(deleteAdvert(params.id));

  const renderAdvert = () => {
    if (error) {
      return <Redirect to="/404" />;
    }

    if (!advert) {
      return <Redirect to="/" />;
    }

    const { name, price, tags, sale, photoUrl } = advert;

    return (
      <Row>
        <Col span={24}>
          <Title level={2}>
            {name} - {sale ? 'Sell' : 'Buy'}
          </Title>
        </Col>
        <Col span={12}>
          <Statistic title="Price" value={price} formatter={formatter} />
          <div style={{ marginTop: 20 }}>
            <span style={{ marginRight: 5 }}>Tags</span>
            <Tags tags={tags} />
          </div>
        </Col>
        <Col span={12}>
          <Image
            src={photoUrl}
            alt={name}
            width={300}
            height={300}
            fallback={placeholder}
          />
        </Col>
        <ConfirmationButton
          danger
          icon={<DeleteOutlined />}
          confirmationProps={{
            title: 'Delete advert?',
            content: 'Are you sure you want to delete this advert?',
            okText: 'Yes',
            cancelText: 'No',
            okButtonProps: {
              danger: true,
            },
          }}
          onConfirm={handleDeleteClick}
          style={{ marginTop: 20 }}
          block
        >
          Delete
        </ConfirmationButton>
      </Row>
    );
  };

  return (
    <Layout title="Advert detail">
      <Divider>Detail of your advert</Divider>
      {renderAdvert()}
    </Layout>
  );
};

AdvertPage.propTypes = {
  match: T.shape({ params: T.shape({ id: T.string.isRequired }).isRequired })
    .isRequired,
};

export default AdvertPage;
