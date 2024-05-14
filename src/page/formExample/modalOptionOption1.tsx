import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Grid } from '@mui/material';
import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import FormBeforeImg from './modalOption1Form1';
import FormAfterImg from './modalOption1Form2';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface ModalProp {
  open: boolean;
  handleClose: () => void;
  handleClickOpen: () => void;
}
export default function OptionOneComponent1({ open, handleClose }: ModalProp) {
  //form1
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'OPTION 1'}</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: '1rem' }}>
            <Grid item xs={6}>
              <FormBeforeImg />
            </Grid>
            <Grid item xs={6}>
              <FormAfterImg />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>CLOSE</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
