"use client";

import "react-toastify/dist/ReactToastify.css";
import "../../globals.css";
import { ToastContainer } from "react-toastify";

const contextClass = {
  success: "bg-main text-black", // main color for success with contrasting text
  error: "bg-red-600 text-white", // error should stand out, red with white text
  info: "bg-lightGrayBg text-white", // info with light background and white text
  warning: "bg-orange-500 text-black", // warning with orange and black text for contrast
  default: "bg-grayBg text-white", // default uses your main background with white text
};

export default function ToastProvider() {
  return (
    <ToastContainer
      toastClassName={(context) =>
        contextClass[context?.type || "default"] +
        " p-1 min-h-10 rounded-md cursor-pointer w-"
      }
      bodyClassName={() => "flex flex-row text-sm font-med block p-3"}
      autoClose={1000}
    />
  );
}

import { toast, ToastContent, ToastOptions, Slide, Id } from "react-toastify";

export const defaultToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  closeButton: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "colored",
  transition: Slide,
};

type ToastType = "success" | "error" | "info" | "warning" | "default";

/**
 * Display toast
 *
 * @param {ToastType} type
 * @param {ToastContent} content
 * @param {ToastOptions} [options=defaultToastOption]
 * @return {Id}
 */

export const showToast = (
  type: ToastType,
  content: ToastContent,
  options: Partial<ToastOptions> = {}
): Id => {
  const optionsToApply = { ...defaultToastOptions, ...options };

  switch (type) {
    case "success":
      return toast.success(content, optionsToApply);
    case "error":
      return toast.error(content, optionsToApply);
    case "info":
      return toast.info(content, optionsToApply);
    case "warning":
      return toast.warn(content, optionsToApply);
    case "default":
      return toast(content, optionsToApply);
    default:
      return toast(content, optionsToApply);
  }
};
