import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSessionForm from './EditSessionForm';

function EditSessionFormModal({ session }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button className="button" style={{ "width": "150px" }} onClick={() => setShowModal(true)}> Edit session </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSessionForm session={session} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  )
}

export default EditSessionFormModal
