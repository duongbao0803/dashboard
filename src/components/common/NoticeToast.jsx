import { notification } from "antd";
import React, { useEffect, useState } from "react";

let notificationApi;

export const NotificationProvider = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    notificationApi = api;
  }, [api]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
};

export const notify = (
  type,
  description,
  duration,
) => {
  const typeMessages = {
    success: "Thành công",
    info: "Thông báo",
    warning: "Cảnh báo",
    error: "Lỗi",
  };

  const notificationMessage = typeMessages[type];

  if (notificationApi) {
    notificationApi[type]({
      message: notificationMessage,
      description,
      duration: duration || 3,
      showProgress: true,
    });
  } else {
  }
};
