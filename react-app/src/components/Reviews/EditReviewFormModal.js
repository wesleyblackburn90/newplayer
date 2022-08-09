import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReviewForm from './EditReviewForm';

function EditReviewFormModal({ singleReview, profileId }) {
  const [showModal, setShowModal] = useState(false)
  console.log(profileId, "profile id in modal")
  console.log(singleReview, "This should be the review I want to edit")

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
