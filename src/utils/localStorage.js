import { useState } from "react";

function getUserFromLocalStorage() {
  const user = JSON.parse(localStorage.getItem("gratibox"));
  if (!user) {
    return {
      token: "",
      isSubscriber: false,
    };
  }
  return user;
}

export { getUserFromLocalStorage };
