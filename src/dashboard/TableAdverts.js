import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import changeNum2Cur from '../utils/formatNumber';

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import { getAdverts } from '../api/adverts';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(5),
    maxWidth: 1500,
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  priceColumn: {
    textAlign: 'right',
  },
  textColumn: {
    textAlign: 'center',
  },
}));

const TableAdverts = ({ classnames, ...props }) => {
  const [adverts, setAdverts] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    getAdverts()
      .then(adverts => {
        const {
          data: { result },
        } = adverts;
        setAdverts(result.rows);
      })
      .catch(err => {
        setAdverts(null);
        console.log(err);
      });
  }, []);

  const renderAdverts = () => {
    if (!adverts || adverts.length === 0)
      return (
        <TableRow>
          <TableCell colSpan="4">No hay anuncios</TableCell>
        </TableRow>
      );

    return adverts.map(advert => (
      <TableRow hover key={advert._id}>
        <TableCell className={classes.textColumn}>{advert.name}</TableCell>
        <TableCell className={classes.priceColumn}>
          {changeNum2Cur(advert.price)}
        </TableCell>
        <TableCell className={classes.textColumn}>
          {advert.sale ? 'Venta' : 'Compra'}
        </TableCell>
        <TableCell className={classes.textColumn}>
          {advert.tags.join(', ')}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Card className={classes.root}>
      <PerfectScrollbar>
        <Box minWidth={1000}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.textColumn}>Nombre</TableCell>
                <TableCell className={classes.priceColumn}>Precio</TableCell>
                <TableCell className={classes.textColumn}>
                  Venta/Compra
                </TableCell>
                <TableCell className={classes.textColumn}>Tags</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderAdverts()}</TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default TableAdverts;

/*<TablePagination
        component="div"
        count={5}
        onChangePage={handleClickPage}
        // onChangeRowsPerPage={handleLimitChange}
        page={1} //{page}
        rowsPerPage={5} //{limit}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Anuncios por página"
      />*/
