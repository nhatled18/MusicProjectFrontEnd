import '../assets/Notification.css';
export default function Notification({ message }) {
  return (
    <div className="notification">
      {message}
    </div>
  );
}