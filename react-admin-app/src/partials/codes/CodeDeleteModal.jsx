import { Button, Modal } from 'flowbite-react';
import { useApi } from '../../api';

function CodeDeleteModal(props) {
  const onSubmit = async () => {
    await useApi().api.codes.delete(props.selectedId);
    props.onClose();
  };

  return (
    <Modal show={props.isOpen} size="sm" onClose={() => props.onClose()}>
      <Modal.Header>코드 삭제</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">삭제 하시겠습니까?</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>삭제</Button>
        <Button color="gray" onClick={() => props.onClose()}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CodeDeleteModal;
