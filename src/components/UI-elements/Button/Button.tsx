import { Link } from "react-router-dom";

import styles from "./Button.module.css";

interface Props {
  children: string;
  to?: string;
  disabled?: boolean;
  accent?: boolean;
  plain?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  disabled,
  accent,
  plain,
  to,
  children,
  onClick,
  type,
}) => {
  const classNames = [styles.button];
  disabled && classNames.push(styles.disabled);
  accent && classNames.push(styles.accent);
  plain && classNames.push(styles.plain);

  const className = classNames.join(" ");

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type || "button"}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
