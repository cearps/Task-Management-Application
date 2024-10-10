import { useEffect } from "react";

type NotificationType = "success" | "error" | "info" | undefined;

interface NotificationPopupProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: NotificationType; 
}



const NotificationPopup = ({
  message,
  isVisible,
  onClose,
  type = "info",
}: NotificationPopupProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000); // 1 second auto-close
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg transition-opacity duration-300 ${typeStyles[type]}`}
      style={{ zIndex: 1000 }}
    >
      <span>{message}</span>
    </div>
  );
};

export default NotificationPopup;
