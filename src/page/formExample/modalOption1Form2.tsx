import * as React from 'react';
import Button from '@mui/material/Button';

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Alert, Container, Snackbar } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { MAX_FILE_SIZE, TYPE_FILE } from './untils';

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

export default function FormAfterImg() {
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

  //validate
  const [validate, setValidate] = useState<any>('');
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const validateImage = (value: FileList) => {
    const file = value[0];
    if (!file) {
      // Không có file
      setValidate('Vui lòng chọn một file ảnh');
      setOpen(true);
      return false;
    }
    if (!TYPE_FILE.exec(file.name)) {
      // Định dạng không đúng
      setValidate('Ảnh không đúng định dạng');
      setOpen(true);
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      // Kích thước quá lớn
      setOpen(true);
      setValidate('Kích thước ảnh không được vượt quá 2MB');
      return false;
    }

    // Hợp lệ
    return true;
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '3vh' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Controller
          control={control}
          name="afterImg"
          render={({ field: { onChange, onBlur, value } }) => (
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
                onChange={handleImageChange}
                accept="image/*"
              />{' '}
              CCCD MẶT TRƯỚC
            </Button>
          )}
        />
        <div>
          {imagePreview && !errors.image && (
            <img src={imagePreview} alt="NoImage" style={{ width: '100%' }} />
          )}
          {errors.afterImg && (
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={open}
              message={validate}
              autoHideDuration={3000}
              onClose={handleClose}
            />
          )}
        </div>
      </form>
    </Container>
  );
}
