import React from 'react';
import T from 'prop-types';
import { LogoutOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import ConfirmationButton from '../shared/ConfirmationButton';
import { logout } from '../../store/ducks/auth';

class LogoutButton extends React.Component {
  handleLogout = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    return (
      <ConfirmationButton
        danger
        icon={<LogoutOutlined />}
        shape="round"
        type="dashed"
        confirmationProps={{
          title: 'Close session?',
          content: 'Are you sure you want to disconnect?',
          okText: 'Yes',
          cancelText: 'No',
          okButtonProps: {
            danger: true,
          },
        }}
        onConfirm={this.handleLogout}
        {...this.props}
      />
    );
  }
}

LogoutButton.propTypes = {
  logout: T.func.isRequired,
};

export default connect(null, { logout })(LogoutButton);
