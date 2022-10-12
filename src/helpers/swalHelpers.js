import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import ConfirmationIcon from '~/assets/swal/confirm.svg';
import ErrorIcon from '~/assets/swal/error.svg';
import InfoIcon from '~/assets/swal/info.svg';
import SuccessIcon from '~/assets/swal/success.svg';

const MySwal = withReactContent(Swal);

/**
 * Provide additional information to users
 */
const swalPositiveConfirmation = (
  title,
  content,
  confirmButtonText,
  cancelButtonText,
  handlePreConfirm = () => {},
  handleWhenClose = () => {},
) => MySwal.fire({
  title: <>{title}</>,
  html: <p>{content}</p>,
  customClass: {
    confirmButton: 'primary',
    cancelButton: 'primary-outline',
  },
  showCancelButton: cancelButtonText?.trim()?.length > 0,
  cancelButtonText,
  confirmButtonText,
  preConfirm: handlePreConfirm,
  iconHtml: <img src={ConfirmationIcon} alt="positive-confirmation-icon" />,
  allowOutsideClick: false,
}).then((response) => {
  if (!response?.isConfirmed) {
    handleWhenClose();
  }
});

/**
 * Provide additional information to users
 */
const swalNegativeConfirmation = (
  title,
  content,
  confirmButtonText,
  cancelButtonText,
  handlePreConfirm = () => {},
  handleWhenClose = () => {},
) => MySwal.fire({
  title: <>{title}</>,
  html: <p>{content}</p>,
  customClass: {
    confirmButton: 'danger',
    cancelButton: 'danger-outline',
  },
  showCancelButton: cancelButtonText?.trim()?.length > 0,
  cancelButtonText,
  confirmButtonText,
  preConfirm: handlePreConfirm,
  iconHtml: <img src={ErrorIcon} alt="negative-confirmation-icon" />,
  allowOutsideClick: false,
}).then((response) => {
  if (!response?.isConfirmed) {
    handleWhenClose();
  }
});

/**
 * Confirm a task was completed as expected
 */
const swalSuccess = (
  title,
  content,
  confirmButtonText,
  handlePreConfirm = () => {},
  handleWhenClose = () => {},
) => MySwal.fire({
  title: <>{title}</>,
  html: <p>{content}</p>,
  customClass: {
    confirmButton: 'primary',
  },
  showCancelButton: false,
  confirmButtonText,
  preConfirm: handlePreConfirm,
  iconHtml: <img src={SuccessIcon} alt="success-icon" />,
  allowOutsideClick: false,
}).then((response) => {
  if (!response?.isConfirmed) {
    handleWhenClose();
  }
});

/**
 * Inform users of an error or critical failure
 */
const swalError = (
  title,
  content,
  confirmButtonText,
  handlePreConfirm = () => {},
  handleWhenClose = () => {},
) => MySwal.fire({
  title: <>{title}</>,
  html: <p>{content}</p>,
  customClass: {
    confirmButton: 'danger',
  },
  showCancelButton: false,
  confirmButtonText,
  preConfirm: handlePreConfirm,
  iconHtml: <img src={ErrorIcon} alt="error-icon" />,
  allowOutsideClick: false,
}).then((response) => {
  if (!response?.isConfirmed) {
    handleWhenClose();
  }
});

/**
 * Taking actions that are not desirable or might have unexpected results
 */
const swalWarning = (
  title,
  content,
  confirmButtonText,
  cancelButtonText,
  handlePreConfirm = () => {},
  handleWhenClose = () => {},
) => MySwal.fire({
  title: <>{title}</>,
  html: <p>{content}</p>,
  customClass: {
    confirmButton: 'warning',
    cancelButton: 'warning-outline',
  },
  showCancelButton: cancelButtonText?.trim()?.length > 0,
  cancelButtonText,
  confirmButtonText,
  preConfirm: handlePreConfirm,
  iconHtml: <img src={InfoIcon} alt="warning-icon" />,
  allowOutsideClick: false,
}).then((response) => {
  if (!response?.isConfirmed) {
    handleWhenClose();
  }
});

export {
  swalPositiveConfirmation,
  swalNegativeConfirmation,
  swalSuccess,
  swalError,
  swalWarning,
};
