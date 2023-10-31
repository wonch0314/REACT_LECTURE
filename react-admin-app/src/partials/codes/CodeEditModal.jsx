import { Button, Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useApi } from "../../api";

/**
 * useEffect를 사용해서 props를 변환하거나
 * useState를 사용해서 props를 복사하면
 * ...register 함수 내에서 value를 받지 못한다.
 * 따라서 props가 변경 될 때마다 직접 ...register 함수 내에서 value로 넣어줘야 한다.
 */
function CodeEditModal(props) {
  console.log(props.selectedItem);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (params) => {
    await useApi().api.codes.put(params);
    props.onClose();
  };

  return (
    <Modal show={props.isOpen} size="sm" onClose={() => props.onClose()}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>코드 수정</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="mb-4">
              <input
                type="hidden"
                name="id"
                {...register("id")}
                value={props.selectedItem?.id}
              />

              <label htmlFor="parent_code" className="block text-gray-600">
                상위코드
              </label>
              {/**
               * input에는 defaultValue를 props로 받아서 설정하여 초기값이 보이도록 하고
               * ...register에서 value 값에 props로 받아서 설정한다.
               */}
              <input
                type="text"
                id="parent_code"
                name="parent_code"
                className="w-full p-2 border border-gray-300 rounded-lg"
                defaultValue={props.selectedItem?.parent_code}
                {...register("parent_code", {
                  required: {
                    value: true,
                    message: "상위코드는 필수 입력 항목입니다.",
                  },
                  value: props.selectedItem?.parent_code,
                })}
              ></input>
              <ErrorMessage
                errors={errors}
                name="parent_code"
                render={({ message }) => (
                  <p style={{ color: "red" }}>{message}</p>
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
                defaultValue={props.selectedItem?.code}
                className="w-full p-2 border border-gray-300 rounded-lg"
                {...register("code", {
                  required: {
                    value: true,
                    message: "코드는 필수 입력 항목입니다.",
                  },
                  value: props.selectedItem?.code,
                })}
              ></input>
              <ErrorMessage
                errors={errors}
                name="code"
                render={({ message }) => (
                  <p style={{ color: "red" }}>{message}</p>
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
                defaultValue={props.selectedItem?.description}
                className="w-full p-2 border border-gray-300 rounded-lg"
                {...register("description", {
                  required: {
                    value: true,
                    message: "설명은 필수 입력 항목입니다.",
                  },
                  value: props.selectedItem?.description,
                })}
              ></input>
              <ErrorMessage
                errors={errors}
                name="description"
                render={({ message }) => (
                  <p style={{ color: "red" }}>{message}</p>
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
                defaultValue={props.selectedItem?.order_no}
                className="w-full p-2 border border-gray-300 rounded-lg"
                {...register("order_no", {
                  required: {
                    value: true,
                    message: "순서는 필수 입력 항목입니다.",
                  },
                  value: props.selectedItem?.order_no,
                })}
              ></input>
              <ErrorMessage
                errors={errors}
                name="order_no"
                render={({ message }) => (
                  <p style={{ color: "red" }}>{message}</p>
                )}
              ></ErrorMessage>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">수정</Button>
          <Button color="gray" onClick={() => props.onClose()}>
            취소
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default CodeEditModal;
