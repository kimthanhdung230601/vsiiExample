import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  IconButton,
  Snackbar
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import styles from './styles.module.scss';
import { useState } from 'react';
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

const UploadListImages = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [imageData, setImageData] = useState<FileList[]>([]);
  const onSubmit = (data: any) => {
    alert('Cập nhật thành công');
    console.log('imageData', imageData);
  };

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files);
    console.log('files:', files);
    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
        setImageData((prev) => [...prev, files as any]);
      };
      reader.readAsDataURL(file);
    });
  };

  // validate
  const [validate, setValidate] = useState<string>('');
  const [openSnackbar, setOpenSnackBar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackBar(false);
  };

  const validateImage = (value: FileList) => {
    if (value.length + imagePreview.length > 6) {
      setValidate('Tối đa được upload 5 ảnh');
      setOpenSnackBar(true);
      return false;
    }
    for (let i = 0; i < value.length; i++) {
      const file = value[i];
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
    }
    return true;
  };

  const handleDeleteImage = (index: number) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className={styles.wrapperCenter}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={styles.btn}
          >
            Tải ảnh
          </Button>
          <Controller
            control={control}
            name="listImages"
            render={() => (
              <Button
                className={`${styles.button} w-full h-full`}
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
                  id="listImages"
                  type="file"
                  multiple
                  {...register('listImages', {
                    validate: validateImage
                  })}
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </Button>
            )}
          />
          <Grid container spacing={2}>
            {imagePreview.map((preview, index) => (
              <Grid item key={index}>
                <Card
                  sx={{ maxWidth: 320, position: 'relative' }}
                  className={styles.card}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={preview}
                      alt={`imagePreview-${index}`}
                    />
                  </CardActionArea>
                  <IconButton
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={() => handleDeleteImage(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
          {errors.listImages && (
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={openSnackbar}
              message={validate}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
            />
          )}
        </form>
      </div>
    </>
  );
};

export default UploadListImages;
