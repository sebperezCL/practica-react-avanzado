import React, { useState, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import changeNum2Cur from '../utils/formatNumber';

import './AdvertCard.css';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(0),
    background: 'red',
    color: 'white',
  },
}));

const AdvertCard = ({ productName, tags, price, operacion }) => {
  const classes = useStyles();
  return (
    <div className="product-card">
      <div className="badge">{operacion}</div>
      <div className="product-tumb">
        {' '}
        <img src="https://i.imgur.com/xdbHo4E.png" alt="" />{' '}
      </div>
      <div className="product-details">
        <span className="product-tags">Tags: {tags}</span>
        <h4>
          <a href="">{productName}</a>
        </h4>
        <div className="product-bottom-details">
          <div className="product-price">{changeNum2Cur(price)}</div>
          <div className="product-links">
            <Button
              className={classes.button}
              variant="contained"
              startIcon={<DeleteIcon />}
            >
              Borrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertCard;
