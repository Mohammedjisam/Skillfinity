import React from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const ConfirmationDialog = ({
  title,
  text,
  icon,
  confirmButtonText,
  onConfirm
}) => {
  const showConfirmation = () => {
    Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  };

  return { showConfirmation };
};

ConfirmationDialog.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.oneOf(['warning', 'error', 'success', 'info', 'question']).isRequired,
  confirmButtonText: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default ConfirmationDialog;