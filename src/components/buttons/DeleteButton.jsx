import "../../styles/components/buttons/deleteButton.scss";
export default function DeleteButton({ onClick, className }) {
  return (
    <button
      className={`delete-button heading-font-s1 ${className}`}
      onClick={onClick}
    >
      <span className="delete-button-text">Delete</span>
    </button>
  );
}
