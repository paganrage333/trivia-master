// import React from 'react';
import { toast } from 'react-toastify';

const succesMsg = {
  save: "Saved successfully.",
  delete: "Deleted successfully.",
  update: "Updated successfully.",
} 

const errorMsg = {
  accessDenied : "Access Denied",
  mandatory: "Missing Required info.",
  emailValid: "Invalid Email.",
  mobileValid: "Invalid Mobile.",
  disabledCnt: "Contracted Estimate can't be updated",
  disabledCo: "Change Order Estimate can't be updated",
}

export const notifyError = (msg) => toast.error((!!errorMsg[msg] ? errorMsg[msg] : msg), {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
});

export const notifySuccess = (msg) => toast.success((!!succesMsg[msg] ? succesMsg[msg] : msg), {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
}); 

export const loaderHide = (id) => {
  document.getElementById(id).style.display = "none";
}

export const loaderShow = (id) => {
  document.getElementById(id).style.display = "block";
}

export const showHide = (id, msg) => {
  
  function hide1() {
    document.getElementById(id).innerText = '';
    document.getElementById(id).style.display = "none";
  }

  document.getElementById(id).innerText = msg;
  document.getElementById(id).style.display = "block";
  
  setTimeout(hide1, 5000);
}