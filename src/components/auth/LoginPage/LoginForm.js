import React from 'react';
import { Button, Spin } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import styles from './LoginForm.module.css';
import { login } from '../../../store/ducks/auth';
import { FormHandler, Input, Checkbox } from '../../shared/FormHandler';

function LoginForm() {
  const handleSubmit = (formValues, dispatch) => ev => {
    ev.preventDefault();
    dispatch(login(formValues));
  };

  return (
    <FormHandler
      configFields={{
        email: { value: '', required: true },
        password: { value: '', required: true },
        remember: { value: false, required: false },
      }}
      onSubmit={handleSubmit}
    >
      {(canSubmit, loading, handleSubmit) => (
        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            className={styles.input}
            prefix={<MailOutlined />}
            placeholder="Email"
          />
          <Input
            name="password"
            type="password"
            className={styles.input}
            prefix={<LockOutlined />}
            placeholder="Password"
          />
          <Checkbox name="remember" className={styles.input}>
            Remember me
          </Checkbox>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Spin size="large" />
            </div>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              disabled={!canSubmit()}
              block
            >
              Log In
            </Button>
          )}
        </form>
      )}
    </FormHandler>
  );
}

export default LoginForm;
