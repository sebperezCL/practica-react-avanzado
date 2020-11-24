import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const TableAdverts = ({ classnames, ...props }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} {...props}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                hover
                //   key={customer.id}
              >
                <TableCell>
                  <Typography color="textPrimary" variant="body1">
                    Primer aviso
                  </Typography>
                </TableCell>
                <TableCell>Dato 1</TableCell>
                <TableCell>Dato 2</TableCell>
                <TableCell>Dato 3</TableCell>
                <TableCell>Dato 4</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        // count={customers.length}
        // onChangePage={handlePageChange}
        // onChangeRowsPerPage={handleLimitChange}
        page="1" //{page}
        rowsPerPage="5" //{limit}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Anuncios por página"
      />
    </Card>
  );
};

export default TableAdverts;
