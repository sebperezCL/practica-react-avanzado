/* eslint-disable no-extra-boolean-cast */
import React, { useState, useEffect } from 'react';
import { Delete, Home, Check, Error } from '@material-ui/icons';
import {
  Button,
  Popover,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

import { changeNum2Cur } from '../utils/formatNumber';
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
  const [deleteError, setDeleteError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleOpenPopover = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteAdvert = () => {
    setSubmitting(true);
    setDeleteError(false);
    deleteAdvert(advertId)
      .then(response => {
        setSubmitting(false);
        if (response.status === 200) {
          history.push('/dashboard');
        }
      })
      .catch(err => {
        console.log(err);
        setDeleteError(true);
      });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'delete-popover' : undefined;

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
              disabled={submitting}
            />
            <Button
              className={classes.backButton}
              variant="contained"
              onClick={() => history.push(`/dashboard`)}
              startIcon={<Home className={classes.iconButton} />}
              disabled={submitting}
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
                {!submitting ? (
                  <Button
                    className={classes.deleteButton}
                    variant="contained"
                    startIcon={<Check className={classes.iconButton} />}
                    onClick={handleDeleteAdvert}
                    disabled={submitting}
                  />
                ) : (
                  <CircularProgress />
                )}

                {deleteError && (
                  <div className="error-message">
                    <Error />
                    <p>Error al eliminar el anuncio</p>
                  </div>
                )}
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertCard;
