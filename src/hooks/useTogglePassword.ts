import { useState } from "react";

const useTogglePassword = () => {
  const [visible, setVisible] = useState({
    password: false,
    comfirmPassword: false,
    oldPassword: false,
  });
  function toggleVisibility(field: string) {
    if (field === "password") {
      setVisible({ ...visible, password: !visible.password });
    } else if (field === "oldPassword") {
      setVisible({ ...visible, oldPassword: !visible.oldPassword });
    } else {
      setVisible({ ...visible, comfirmPassword: !visible.comfirmPassword });
    }
  }

  return { visible, toggleVisibility };
};

export default useTogglePassword;