import Swal from "sweetalert2";

const showDeleteConfirmation = (resource) => {
  return Swal.fire({
    title: `Do you want to delete the ${resource}?`,
    text: `You will not be able to recover this ${resource}!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4dbd74",
    cancelButtonColor: "#f86c6b",
    confirmButtonText:
      '<i class="fa fa-check" aria-hidden="true"></i> Yes, delete it!',
    cancelButtonText:
      '<i class="fa fa-times" aria-hidden="true"></i> No, keep it',
  });
};

export default showDeleteConfirmation;
