/* eslint-disable no-extra-boolean-cast */
import React, { useState, useEffect } from 'react';
import { Delete, Home, Check } from '@material-ui/icons';
import { Button, Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import changeNum2Cur from '../utils/formatNumber';
import { deleteAdvert } from '../api/adverts';

const { REACT_APP_API_URL: baseURL } = process.env;

import './AdvertCard.css';

const useStyles = makeStyles(theme => ({
  backButton: {
    margin: theme.spacing(0),
    background: 'darkslategrey',
    color: 'white',
  },
  deleteButton: {
    margin: theme.spacing(0),
    marginRight: theme.spacing(2),
    background: 'crimson',
    color: 'white',
  },
  iconButton: {
    marginRight: -10,
  },
}));

const AdvertCard = ({
  advertId,
  productName,
  tags,
  price,
  operacion,
  photo,
  history,
}) => {
  const classes = useStyles();
  const [imgError, setImgError] = useState(false);
  const [imgPath, setImgPath] = useState(baseURL + photo);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenPopover = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteAdvert = () => {
    deleteAdvert(advertId).then(
      history.push({ pathname: '/dashboard', deletedAdvert: advertId })
    );
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
              className={classes.deleteButton}
              variant="contained"
              startIcon={<Delete className={classes.iconButton} />}
              onClick={handleOpenPopover}
            />
            <Button
              className={classes.backButton}
              variant="contained"
              onClick={() => history.push(`/dashboard`)}
              startIcon={<Home className={classes.iconButton} />}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <div className="popover-delete">
                <p>¿Confirma la eliminación del anuncio?</p>
                <Button
                  className={classes.deleteButton}
                  variant="contained"
                  startIcon={<Check className={classes.iconButton} />}
                  onClick={handleDeleteAdvert}
                />
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertCard;
