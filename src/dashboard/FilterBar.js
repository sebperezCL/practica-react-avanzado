import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Slider,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { changeNum2Cur } from '../utils/formatNumber';
import TagSelect from '../shared/TagSelect';
import { getAllowedTags } from '../api/adverts';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1000,
  },
  inputForm: {
    minWidth: '50ch',
  },
  selectLabel: {
    marginTop: 0,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  btn: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

// Define el precio máximo mostrado en el slider
const MAX_PRICE = 100000;

const FilterBar = ({ onSearch, submitting }) => {
  const classes = useStyles();
  const [buySell, setBuySell] = useState('todos');
  const [price, setPrice] = useState([0, MAX_PRICE]);
  const [tags, setTags] = useState([]);
  const [allowedTags, setAllowedTags] = useState([]);
  const [name, setName] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleBuyChange = event => {
    setBuySell(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handleTagsChange = tags => {
    setTags(tags);
  };

  useEffect(() => {
    getAllowedTags().then(response => {
      const {
        data: { result: tags },
      } = response;
      setAllowedTags(tags);
    });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    onSearch({
      name: name,
      tags: tags.join(),
      price: price[1] < MAX_PRICE ? price.join('-') : `${price[0]}-`,
      sale:
        buySell != 'todos' ? (buySell === 'venta' ? 'true' : 'false') : null,
    });
  };

  const handleClean = event => {
    event.preventDefault();
    setBuySell('todos');
    setName('');
    setTags([]);
    setPrice([0, MAX_PRICE]);
    onSearch({});
  };

  return (
    <div className={classes.root}>
      <Box marginBottom={3}>
        <Card>
          <CardContent>
            <Box>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box textAlign="center" mb={3}>
                      <h2>Ingrese los valores para filtrar los anuncios</h2>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      onChange={handleNameChange}
                      className={classes.inputForm}
                      placeholder="Nombre artículo"
                      variant="outlined"
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={classes.inputForm}>
                      <InputLabel
                        className={classes.selectLabel}
                        id="buy-select-label"
                      >
                        Compra/Venta
                      </InputLabel>
                      <Select
                        value={buySell}
                        onChange={handleBuyChange}
                        labelId="buy-select-label"
                      >
                        <MenuItem value="todos">Todos</MenuItem>
                        <MenuItem value="compra">Compra</MenuItem>
                        <MenuItem value="venta">Venta</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography id="range-slider" gutterBottom>
                        Precio Min: {changeNum2Cur(price[0])}
                      </Typography>
                    </Box>
                    <Slider
                      value={price}
                      onChange={handlePriceChange}
                      valueLabelDisplay="off"
                      aria-labelledby="range-slider"
                      min={0}
                      max={MAX_PRICE}
                    />
                    <Box display="flex" justifyContent="flex-end">
                      <Typography gutterBottom>
                        Precio Max:{' '}
                        {price[1] < MAX_PRICE
                          ? changeNum2Cur(price[1])
                          : ' Sin límite'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <TagSelect
                      onChange={handleTagsChange}
                      initialTags={tags}
                      allowedTags={allowedTags}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box textAlign="center">
                      <Button
                        className={classes.btn}
                        variant="outlined"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={submitting}
                      >
                        {submitting ? (
                          <CircularProgress size={'1.5rem'} />
                        ) : (
                          'Buscar Anuncios'
                        )}
                      </Button>
                      <Button
                        className={classes.btn}
                        variant="outlined"
                        type="button"
                        onClick={handleClean}
                        disabled={submitting}
                      >
                        {submitting ? (
                          <CircularProgress size={'1.5rem'} />
                        ) : (
                          'Limpiar Filtros'
                        )}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default FilterBar;
