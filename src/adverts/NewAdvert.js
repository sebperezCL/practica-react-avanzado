import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Box, Container, Switch } from '@material-ui/core';
import Page from '../components/Page';
import { Save, PhotoCamera } from '@material-ui/icons';
import TagSelect from '../shared/TagSelect';
import {
  Button,
  TextField,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { getAllowedTags } from '../api/adverts';
import { changeNum2Cur, unformat } from '../utils/formatNumber';
import { postAdvert } from '../api/adverts';

import './AdvertCard.css';

const useStyles = makeStyles(theme => ({
  saveButton: {
    margin: theme.spacing(0),
    background: 'darkslategrey',
    color: 'white',
  },
  inputForm: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minWidth: '38ch',
  },
  priceForm: {
    textAlign: 'right',
    minWidth: '20ch',
  },
}));

const NewAdvert = ({ history }) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [imgAdvert, setImgAdvert] = useState('/img/placeholder-image.png');
  const [allowedTags, setAllowedTags] = useState([]);
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sale, setSale] = useState(true);

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  const handleTagsChange = tags => {
    setTags(tags);
  };

  const handlePriceChange = event => {
    setPrice(changeNum2Cur(event.target.value));
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleSaleChange = event => {
    setSale(event.target.checked);
  };

  // Efecto para mostrar la imagen en el elemento img al cargarla
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgAdvert(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  // Buscar los tags permitidos, al cargar el componente
  useEffect(() => {
    getAllowedTags().then(response => {
      const {
        data: { result: tags },
      } = response;
      setAllowedTags(tags);
    });
  }, []);

  const canSubmit = () => {
    return !submitting && tags && name && price;
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', unformat(price));
    formData.append('tags', tags);
    formData.append('sale', sale);
    formData.append('photo', file);
    postAdvert(formData).then(resp => console.log(resp));
  };

  return (
    <Page>
      <Layout>
        <Container maxWidth={false}>
          <Box mt={3} display="flex" alignItems="center" flexDirection="column">
            <div>
              <h2>Agregar nuevo anuncio</h2>
            </div>
            <div className="product-card">
              <div className="product-tumb">
                <img src={imgAdvert} alt="" />
              </div>
              <div className="upload-section">
                <input
                  type="file"
                  id="input-file"
                  name="input-file"
                  accept="image/*"
                  onChange={handleFileChange}
                  hidden
                />
                <label
                  className="btn-upload"
                  htmlFor="input-file"
                  role="button"
                >
                  <PhotoCamera />
                  <span>Buscar</span>
                </label>
              </div>
              <div className="product-details">
                <span className="product-tags">
                  <TagSelect
                    onChange={handleTagsChange}
                    allowedTags={allowedTags}
                    initialTags={tags}
                  />
                </span>
                <TextField
                  onChange={handleNameChange}
                  className={classes.inputForm}
                  placeholder="Nombre artículo"
                  variant="outlined"
                  name="name"
                  size="small"
                />
                <div className="product-bottom-details">
                  <div className="product-price">
                    <TextField
                      onChange={handlePriceChange}
                      value={price}
                      className={classes.priceForm}
                      placeholder="Precio"
                      variant="outlined"
                      name="name"
                      size="small"
                    />
                  </div>
                  <div className="product-links">
                    <span>Compra</span>
                    <Switch
                      checked={sale}
                      onChange={handleSaleChange}
                      name="checkedA"
                    />
                    <span>Venta</span>
                  </div>
                </div>
                <div className="save-container">
                  <Button
                    className={classes.saveButton}
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSubmit}
                    disabled={!canSubmit()}
                  >
                    Guardar Anuncio
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Container>
      </Layout>
    </Page>
  );
};

export default NewAdvert;
