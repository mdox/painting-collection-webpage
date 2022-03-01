import useModal from "components/Modal";
import { useState } from "react";

const HomePage = () => {
  const { Modal, toggleModal, hideModal, isModalShow } = useModal({
    hideOnClick: true,
    hideOnEscape: true,
    onHide: (hideType) => {
      console.log(hideType);
    },
  });

  const [count, setCount] = useState(0);

  return (
    <div className="prose">
      <h1>Home Page</h1>

      <button onClick={toggleModal}>
        {isModalShow ? "Hide" : "Show"} Modal
      </button>

      <Modal>
        <div className="flex w-56 flex-col space-y-1 rounded bg-purple-50 p-2 shadow">
          <span className="text-lg">Modal</span>
          <hr />
          <span>Content...</span>
          <button onClick={() => setCount(count + 1)}>
            Click to Count: {count}
          </button>
          <hr />
          <button className="self-end" onClick={hideModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
