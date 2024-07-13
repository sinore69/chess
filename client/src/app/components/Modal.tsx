import Modal from "react-modal";
import { useState } from "react";

function ModalComponent() {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Form Modal"
      >
        <h2>Hello</h2>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
      <button onClick={openModal}>Open Modal</button>
    </div>
  );
}

export default ModalComponent;
