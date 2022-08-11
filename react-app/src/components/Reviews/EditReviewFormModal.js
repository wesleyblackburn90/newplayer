import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReviewForm from './EditReviewForm';

function EditReviewFormModal({ singleReview, profileId }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button className="button" onClick={() => setShowModal(true)}> Edit review </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm singleReview={singleReview} profileId={profileId} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  )
}

export default EditReviewFormModal
