import { Button, Modal } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useApi } from '../../api';

function CodeAddModal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async params => {
    await useApi().api.codes.post(params);
    props.onClose();
  };

  return (
    <Modal show={props.isOpen} size="sm" onClose={() => props.onClose()}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>코드 추가</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="mb-4">
              <label htmlFor="parent_code" className="block text-gray-600">
                상위코드
              </label>
              <input
                type="text"
                id="parent_code"
                name="parent_code"
                className="w-full p-2 border border-gray-300 rounded-lg"
                {...register('parent_code', {
                  required: {
                    value: true,
                    message: '상위코드는 필수 입력 항목입니다.',
                  },
                })}
              ></input>
              <ErrorMessage
                errors={errors}
                name="parent_code"
                render={({ message }) => (
                  <p style={{ color: 'red' }}>{message}</p>
                )}
              ></ErrorMessage>
            </div>
            <div className="mb-4">
              <label htmlFor="code" className="block text-gray-600">
                코드
              </label>
              <input
                type="text"
                id="code"
                name="code"
                className="w-full p-2 border border-gray-300 rounded-lg"
                {...register('code', {
                  required: {
                    value: true,
                    message: '코드는 필수 입력 항목입니다.',
                  },
                })}
              ></input>
              <ErrorMessage
                errors={errors}
                name="code"
                render={({ message }) => (
                  <p style={{ color: 'red' }}>{message}</p>
                )}
              ></ErrorMessage>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-600">
                설명
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="w-full p-2 border border-gray-300 rounded-lg"
                {...register('description', {
                  required: {
                    value: true,
                    message: '설명은 필수 입력 항목입니다.',
                  },
                })}
              ></input>
              <ErrorMessage
                errors={errors}
                name="description"
                render={({ message }) => (
                  <p style={{ color: 'red' }}>{message}</p>
                )}
              ></ErrorMessage>
            </div>
            <div className="mb-4">
              <label htmlFor="order_no" className="block text-gray-600">
                순서
              </label>
              <input
                type="text"
                id="order_no"
                name="order_no"
                className="w-full p-2 border border-gray-300 rounded-lg"
                {...register('order_no', {
                  required: {
                    value: true,
                    message: '순서는 필수 입력 항목입니다.',
                  },
                })}
              ></input>
              <ErrorMessage
                errors={errors}
                name="order_no"
                render={({ message }) => (
                  <p style={{ color: 'red' }}>{message}</p>
                )}
              ></ErrorMessage>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">추가</Button>
          <Button color="gray" onClick={() => props.onClose()}>
            취소
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default CodeAddModal;
