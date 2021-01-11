import React from 'react';
import { Alert, Col, Row, Typography } from 'antd';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import { getErrorMessage } from '../../../store/ducks/app';

const { Title } = Typography;

class LoginPage extends React.Component {
  resetError = () => this.setState({ error: null });

  render() {
    const { error } = this.props;
    return (
      <Row>
        <Col span={8} offset={8} style={{ marginTop: 64 }}>
          <Title style={{ textAlign: 'center' }}>Log In</Title>
          <LoginForm />
          {error && (
            <Alert
              afterClose={this.resetError}
              closable
              message={error}
              showIcon
              type="error"
              style={{ marginTop: 24 }}
            />
          )}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: getErrorMessage(state),
  };
};

export default connect(mapStateToProps)(LoginPage);
