import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Container, Grid, Snackbar } from '@mui/material';
import { useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Controller, useForm } from 'react-hook-form';
import { MAX_FILE_SIZE, TYPE_FILE } from './untils';
import styles from './styles.module.scss';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

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
export default function OptionOneComponent2({ open, handleClose }: ModalProp) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();
  //form1
  const onSubmit = (data: any) => {
    console.log(data);
    alert('Cập nhật thành công');
  };
  const [imagePreview, setImagePreview] = useState<string>('');
  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  //form2
  const [imagePreview1, setImagePreview1] = useState<string>('');
  const handleImageChange1 = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview1(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  //validate
  const [validate, setValidate] = useState<any>('');
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const handleCloseSnackbar = () => {
    setOpenSnackBar(false);
  };
  const validateImage = (value: FileList) => {
    console.log('value:', value[0]);
    const file = value[0];
    if (!file) {
      setValidate('Vui lòng chọn một file ảnh');
      setOpenSnackBar(true);
      return false;
    }
    if (!TYPE_FILE.exec(file.name)) {
      setValidate('Ảnh không đúng định dạng');
      setOpenSnackBar(true);
      return false;
    }
    if (file.size >= MAX_FILE_SIZE) {
      setValidate('Kích thước ảnh không được vượt quá 2MB');
      setOpenSnackBar(true);
      return false;
    }
    return true;
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'OPTION 2'}</DialogTitle>
        <DialogContent>
          <Container maxWidth="sm" style={{ marginTop: '3vh' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {' '}
              <Button type="submit" variant="contained" color="primary">
                Tải ảnh
              </Button>
              <Grid container spacing={2} style={{ marginTop: '1rem' }}>
                <Grid item xs={6}>
                  {' '}
                  <Controller
                    control={control}
                    name="beforeImg"
                    render={({ field }) => (
                      <Button
                        className="w-full h-full"
                        component="label"
                        startIcon={
                          <AddOutlinedIcon
                            sx={{
                              width: '50px',
                              height: '50px',
                              opacity: '0.4',
                              color: 'black'
                            }}
                          />
                        }
                      >
                        <VisuallyHiddenInput
                          id="beforeImg"
                          type="file"
                          {...register('beforeImg', {
                            validate: validateImage
                          })}
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                        CCCD MẶT TRƯỚC
                      </Button>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  {' '}
                  <Controller
                    control={control}
                    name="afterImg"
                    render={({ field }) => (
                      <Button
                        className="w-full h-full"
                        component="label"
                        startIcon={
                          <AddOutlinedIcon
                            sx={{
                              width: '50px',
                              height: '50px',
                              opacity: '0.4',
                              color: 'black'
                            }}
                          />
                        }
                      >
                        <VisuallyHiddenInput
                          id="afterImg"
                          type="file"
                          {...register('afterImg', {
                            validate: validateImage
                          })}
                          onChange={handleImageChange1}
                          accept="image/*"
                        />
                        CCCD MẶT SAU
                      </Button>
                    )}
                  />
                </Grid>
              </Grid>{' '}
              <div>
                <Grid container spacing={2} style={{ marginTop: '1rem' }}>
                  <Grid item xs={6}>
                    {imagePreview && !errors.image && (
                      <img
                        src={imagePreview}
                        alt="NoImage"
                        style={{ width: '100%' }}
                      />
                    )}{' '}
                    {/* {errors.beforeImg && (
                      <Alert severity="warning">{validate}</Alert>
                    )} */}
                  </Grid>
                  <Grid item xs={6}>
                    {imagePreview1 && !errors.image && (
                      <img
                        src={imagePreview1}
                        alt="NoImage"
                        style={{ width: '100%' }}
                      />
                    )}

                    {errors.afterImg && (
                      <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={openSnackbar}
                        message={validate}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackbar}
                      />
                    )}
                  </Grid>
                </Grid>
              </div>
            </form>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CLOSE</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
