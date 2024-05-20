import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Container, Snackbar } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { styled } from '@mui/material/styles';
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

interface ImageUploadFormProps {
  label: string;
  inputName: string;
  alertMessage: string;
}

const FormImg = ({ label, inputName, alertMessage }: ImageUploadFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    alert(alertMessage);
  };

  const [imagePreview, setImagePreview] = useState<string>('');
  const [validate, setValidate] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const validateImage = (value: FileList) => {
    const file = value[0];
    if (!file) {
      setValidate('Vui lòng chọn một file ảnh');
      setOpen(true);
      return false;
    }
    if (!TYPE_FILE.exec(file.name)) {
      setValidate('Ảnh không đúng định dạng');
      setOpen(true);
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setValidate('Kích thước ảnh không được vượt quá 2MB');
      setOpen(true);
      return false;
    }
    return true;
  };

  const handleImageChange = (e: any) => {
    const file: any = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '3vh' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Controller
          control={control}
          name={inputName}
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
                id={inputName}
                type="file"
                {...register(inputName, {
                  validate: validateImage
                })}
                onChange={(e) => {
                  handleImageChange(e);
                  field.onChange(e);
                }}
                accept="image/*"
              />
              {label}
            </Button>
          )}
        />
        <div>
          {imagePreview && !errors[inputName] && (
            <img src={imagePreview} alt="NoImage" style={{ width: '100%' }} />
          )}
          {errors[inputName] && (
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
};

export default FormImg;
