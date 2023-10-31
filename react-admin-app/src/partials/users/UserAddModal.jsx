import { Button, Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useApi } from "../../api";

function UserAddModal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (params) => {
    await useApi().api.user.post(params);
    props.onClose();
  };

  return (
    <Modal show={props.isOpen} size="sm" onClose={() => props.onClose()}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>코드 추가</Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="email" className="block text-gray-600">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-lg"
              {...register("email", {
                required: {
                  value: true,
                  message: "이메일은 필수 입력 항목입니다.",
                },
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p style={{ color: "red" }}>{message}</p>
              )}
            ></ErrorMessage>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-lg"
              {...register("password", {
                required: {
                  value: true,
                  message: "비밀번호는 필수 입력 항목입니다.",
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,15}$/,
                  message:
                    "비밀번호는 문자, 숫자, 특수문자(!@#$%^*+=-)를 포함하여 최소 6자 이상, 15자 이하로 입력해야 합니다.",
                },
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <p style={{ color: "red" }}>{message}</p>
              )}
            ></ErrorMessage>
          </div>
          <div>
            <label htmlFor="name" className="block text-gray-600">
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border border-gray-300 rounded-lg"
              {...register("name", {
                required: {
                  value: true,
                  message: "이름은 필수 입력 항목입니다.",
                },
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p style={{ color: "red" }}>{message}</p>
              )}
            ></ErrorMessage>
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

export default UserAddModal;
