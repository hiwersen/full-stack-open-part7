import { useNotificationValue } from "../hooks";

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) return null;

  const color = notification.error ? "red" : "green";
  const shadow = notification.error ? "#e1afab" : "#abc4a2";

  const style = {
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translate(-50%, -0%)",
    minWidth: 360,
    maxWidth: 720,
    width: "100%",
    backgroundColor: "lightGray",
    opacity: 0.9,
    borderRadius: 2,
    border: `solid 2px ${color}`,
    padding: "0.25em 0.5em",
    color,
    fontSize: "1.5em",
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
    boxShadow: `0 8px 12px ${shadow}`,
    zIndex: 99,
  };

  return (
    <div style={style}>
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
