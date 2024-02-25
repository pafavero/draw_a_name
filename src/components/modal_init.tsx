import BModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type Props = {
  handleClose: Function;
  handleSave: Function;
};


export default function ModalInit(props: Props) {
  const txt = 'Do you confirm the init list will be changed?';
  
  const closeOnClickEvent = (evt: React.MouseEvent<HTMLButtonElement>) =>{
    props.handleClose();
  };

  const saveOnClickEvent = (evt: React.MouseEvent<HTMLButtonElement>) =>{
    props.handleSave();
  };
  
  return(
    <BModal show={true} size= 'sm' centered={true}
      // onHide={setMsg}
      backdrop="static">
      <BModal.Body>{txt}</BModal.Body>
      <BModal.Footer>
        <Button variant="secondary" onClick={closeOnClickEvent}>
          Close
        </Button>
        <Button variant="primary" onClick={saveOnClickEvent}>
          Confirm
        </Button>
      </BModal.Footer>
    </BModal>
  );
};