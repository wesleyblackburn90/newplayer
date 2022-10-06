import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom"
import { deleteSessionThunk } from "../../store/gameSession";

function DeleteConfirmModal({ session }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const [showModal, setShowModal] = useState(false)
  const { sessionId } = useParams()

  const handleDelete = async () => {
    await dispatch(deleteSessionThunk(sessionId)).then(window.alert("Session successfully deleted")).then(history.push('/'))
  }

  const handleClose = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  return (
    <>
      <button className="button" style={{ "width": "150px" }} onClick={() => setShowModal(true)}> Delete </button>
      {showModal && (
        <Modal style={{ "height": "300px", "width": "400px" }} onClose={() => setShowModal(false)}>
          <p>Are you sure you want to delete this session?</p>
          <div style={{ display: "flex", flexDirection: "row" }} id="delete-session-btns">
            <button style={{ margin: "10px", backgroundColor: "green", color: "white" }} className="button" onClick={handleDelete}>Yes</button>
            <button style={{ margin: "10px", backgroundColor: "red", color: "white" }} className="button" onClick={handleClose}>No</button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default DeleteConfirmModal
