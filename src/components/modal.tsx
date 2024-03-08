import BModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type Props = {
  name: string | null;
  handleClose: Function;
  handleSave: Function;
};


export default function Modal(props: Props) {
  const txt = `Do you confirm the selected name ${props.name}?`;
  
  const closeOnClickEvent = (evt: React.MouseEvent<HTMLButtonElement>) =>{
    // console.log("closeOnClickEvent() in Modal");
    props.handleClose();
  };

  const saveOnClickEvent = (evt: React.MouseEvent<HTMLButtonElement>) =>{
    // console.log("saveOnClickEvent() in Modal");
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