import { useNotificationValue } from "../hooks";
import { dynamicWidth, size, color as c, styleInitial } from "../styles";

const Notification = () => {
  const notification = useNotificationValue();

  if (!notification) return null;

  const color = notification.error ? c.error : c.success;

  const style = {
    ...dynamicWidth,
    ...styleInitial,
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translate(-50%, 0%)",
    backgroundColor: c.c5,
    backdropFilter: "blur(5px)",
    color,
    borderColor: color,
    fontSize: "unset",
    fontStyle: "italic",
    textAlign: "center",
    padding: size.sz6,
    zIndex: 99,
  };

  return (
    <div style={style}>
      <p>Hello Redux</p>
    </div>
  );
};

export default Notification;
