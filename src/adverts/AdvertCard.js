/* eslint-disable no-extra-boolean-cast */
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import changeNum2Cur from '../utils/formatNumber';
const { REACT_APP_API_URL: baseURL } = process.env;

import './AdvertCard.css';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(0),
    background: 'crimson',
    color: 'white',
  },
}));

const AdvertCard = ({ productName, tags, price, operacion, photo }) => {
  const classes = useStyles();
  const [imgError, setImgError] = useState(false);
  const [imgPath, setImgPath] = useState(baseURL + photo);

  const handleImageError = () => {
    setImgError(true);
  };

  useEffect(() => {
    if (imgError) {
      setImgPath('/img/notfound.png');
    }
  }, [imgError]);

  return (
    <div className="product-card">
      {!!operacion ? (
        <div className="badge-sell">Venta</div>
      ) : (
        <div className="badge-buy">Compra</div>
      )}
      <div className="product-tumb">
        <img src={imgPath} alt="" onError={handleImageError} />
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
