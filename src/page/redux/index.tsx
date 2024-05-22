import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField
} from '@mui/material';
import { deletePlayer, addPlayer, updatePlayer } from '../../action/dishAction';
import { Controller, useForm } from 'react-hook-form';
const ReduxExample = () => {
  const players = useSelector((state: any) => state.reloadCount.players);
  console.log('pl', players);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [playerData, setPlayerData] = useState({ id: undefined, name: '' });
  const { control, handleSubmit, reset } = useForm();
  const [playerIdToUpdate, setPlayerIdToUpdate] = useState(null);

  const handleDeletePlayer = (playerId: number) => {
    dispatch(deletePlayer(playerId));
  };

  const handleOpenDialog = (id: any) => {
    setOpen(true);
    setPlayerIdToUpdate(id);
    if (id) {
      const playerToUpdate = players.find((player: any) => player.id === id);
      if (playerToUpdate) {
        reset({ id: playerToUpdate.id, name: playerToUpdate.name });
      }
    } else {
      reset({ id: '', name: '' });
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    if (playerIdToUpdate) {
      dispatch(updatePlayer(data));
    } else {
      dispatch(addPlayer(data));
    }
    handleCloseDialog();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog(undefined)}
      >
        Thêm Cầu Thủ
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players?.map((player: any) => (
              <TableRow key={player.id}>
                <TableCell>{player.id}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeletePlayer(player.id)}
                  >
                    Xóa
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog(player.id)}
                  >
                    Sửa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>
          {playerData.id ? 'Sửa Thông Tin Cầu Thủ' : 'Thêm Cầu Thủ'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="id"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField label="ID" {...field} />}
            />
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField label="Tên" {...field} />}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>{' '}
            <Button onClick={handleCloseDialog}>Hủy</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReduxExample;
