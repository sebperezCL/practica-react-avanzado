import React from 'react';
import { Button, Checkbox, Input, Spin } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import useForm from '../../../hooks/useForm';
import styles from './LoginForm.module.css';
import { login } from '../../../store/ducks/auth';
import { apiLoading } from '../../../store/ducks/app';
import FormHandler from '../../shared/FormHandler';

function LoginForm() {
  const dispatch = useDispatch();
  const loading = useSelector(apiLoading);

  const [form, handleChange] = useForm({
    email: '',
    password: '',
    remember: false,
  });
  const { email, password, remember } = form;

  const handleSubmit = ev => {
    ev.preventDefault();
    dispatch(login(form));
  };

  return (
    <FormHandler
      configFields={{
        email: { value: '', required: true },
        password: { value: '', required: true },
        remember: { value: false, required: false },
      }}
    >
      {(formValues, handleChange, canSubmit) => (
        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            className={styles.input}
            prefix={<MailOutlined />}
            placeholder="Email"
            onChange={handleChange}
            value={formValues.email}
          />
          <Input.Password
            name="password"
            className={styles.input}
            prefix={<LockOutlined />}
            placeholder="Password"
            onChange={handleChange}
            value={formValues.password}
          />
          <Checkbox
            name="remember"
            className={styles.input}
            onChange={handleChange}
            checked={formValues.remember}
          >
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
