import React, { useState } from 'react';
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
} from '@material-ui/core';
import changeNum2Cur from '../utils/formatNumber';
import TagInput from './TagInput';

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
}));

const FilterBar = () => {
  const classes = useStyles();
  const [buySell, setBuySell] = useState('');
  const [price, setPrice] = useState([0, 10000000]);
  const [tags, setTags] = useState([]);
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

  const handleSubmit = event => {
    event.preventDefault();
    console.log(event);
    console.log(buySell, price, tags, name);
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
                        <MenuItem value="Todos">Todos</MenuItem>
                        <MenuItem value="Compra">Compra</MenuItem>
                        <MenuItem value="Venta">Venta</MenuItem>
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
                      max={10000000}
                      //getAriaValueText={valuetext}
                    />
                    <Box display="flex" justifyContent="flex-end">
                      <Typography gutterBottom>
                        Precio Max: {changeNum2Cur(price[1])}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <TagInput onChange={handleTagsChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <Box textAlign="center">
                      <Button variant="outlined" onClick={handleSubmit}>
                        Buscar Anuncios
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
