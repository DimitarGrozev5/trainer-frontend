import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./ContextMenu.module.css";

export interface ContextmenuItem {
  caption: string;
  path: string;
}

interface OverlayProps {
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose}></div>;
};

interface Props {
  show: boolean;
  onClose: () => void;
  links: ContextmenuItem[];
  direction: "left" | "right";
}

const ContextMenu: React.FC<Props> = ({ show, onClose, links, direction }) => {
  return (
    <>
      {show && (
        <>
          <Overlay onClose={onClose} />
          <div className={`${styles.menu} ${styles[direction]}`}>
            {links.map((link) => (
              <Button key={link.caption} to={link.path} plain>
                {link.caption}
              </Button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ContextMenu;