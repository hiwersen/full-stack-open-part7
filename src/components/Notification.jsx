const Notification = ({ notification }) =>
  notification && (
    <div style={{ color: "red", fontWeight: "bold" }}>
      <p>{notification}</p>
    </div>
  );

export default Notification;
