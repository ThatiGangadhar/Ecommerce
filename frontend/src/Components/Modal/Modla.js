import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  textAlign: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CustomeModal(props) {
  const navigate = useNavigate()
    const {openModal, setOpenModal} = props

  const handleClose = () => {
    setOpenModal(false)
    goBackToHomePage()
    };

  const goBackToHomePage = () => {
    navigate('/')
  }

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <img style={{width: '100%', height: '200px', borderRadius: '10px'}} src='./images/cheers.avif' alt='Order' />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cheers successfully placed order
          </Typography>
          <Button onClick={goBackToHomePage} >Continue Shoping</Button>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}