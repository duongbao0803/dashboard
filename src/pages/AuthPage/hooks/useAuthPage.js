import { Form, message } from "antd";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { encryptData } from "../../../utils/cryptoUtils";
import { useDecryptCredentials } from "./useDecryptCredentials";
import { loginUser } from "../../../api/authApi";

const useAuthPage = () => {
  // const provider = new GoogleAuthProvider();
  // const { HTTP_STATUS } = COMMON_CONSTANT;
  const [isShowRegister, setIsShowRegister] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isShowForgotPassword, setIsShowForgotPassword] = useState(false);
  const [form] = Form.useForm();
  // const [login] = useLoginMutation();
  const [otpCode, setOtp] = useState("");
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const { email, password, secretKey } = useDecryptCredentials();
  // const { loginPermission } = useAuth();

  const onFinish = async (payload) => {
    setIsLoggingIn(true);
    // Cookies.set("__token", response.credential);

    try {
      const res = await loginUser(payload);
      if (res && res.status === 200) {
        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;

        if (accessToken) {
          const decoded = jwtDecode(accessToken);
          const role = decoded["role"];

          if (role !== "ADMIN") {
            // notify("error", "Bạn không có quyền truy cập vào trang này", 3);
            message.error("Bạn không có quyền truy cập vào trang này");
            setIsLoggingIn(false);
            return;
          } else {
            Cookies.set("accessToken", accessToken);
            Cookies.set("refreshToken", refreshToken);
            if (rememberMe) {
              const encryptedEmail = encryptData(email, secretKey);
              const encryptedPassword = encryptData(password, secretKey);
              Cookies.set("email", encryptedEmail);
              Cookies.set("password", encryptedPassword);
            }
            const authStore = useAuth.getState();
            authStore.login();
            // navigate.replace("/");
            message.success("Đăng nhập thành công");
            setIsLoggingIn(false);
          }
        }
      }
    } catch (err) {
      const errorCode = err.error;
      if (
        errorCode &&
        errorCode.status === 401
      ) {
        message.error(`${err.data.message}`);
        setIsLoggingIn(false);
        return;
      }
      message.error(`${err.message}`);
      setIsLoggingIn(false);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
  };

  return {
    form,
    isShowRegister,
    setIsShowRegister,
    isLoggingIn,
    rememberMe,
    setRememberMe,
    isShowForgotPassword,
    setIsShowForgotPassword,
    otpCode,
    setOtp,
    isDrawerVisible,
    setIsDrawerVisible,
    onFinish,
    handleDrawerClose,
    email,
    password,
  };
};

export default useAuthPage;
