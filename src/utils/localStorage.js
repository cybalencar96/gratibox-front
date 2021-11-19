import { useState } from "react";

function getUserFromLocalStorage() {
  const user = JSON.parse(localStorage.getItem("gratibox"));
  if (!user) {
    return {
      email: "",
      id: "",
      name: "",
      token: "",
      isSubscriber: false,
    };
  }
  return user;
}

export { getUserFromLocalStorage };
