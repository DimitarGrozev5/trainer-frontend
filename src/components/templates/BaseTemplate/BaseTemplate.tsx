import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Outlet } from "react-router-dom";
import styles from "./BaseTemplate.module.css";
import ContextMenu, {
  ContextmenuItem,
} from "../../UI-elements/ContextMenu/ContextMenu";
import { useSState } from "../../../hooks/useSState";
import { useAppSelector } from "../../../hooks/redux-hooks";

const BaseTemplate = () => {
  // Get ref to container div
  const containerRef: React.Ref<HTMLDivElement> = useRef(null);
  const h1Ref: React.Ref<HTMLDivElement> = useRef(null);
  const menuRef: React.Ref<HTMLDivElement> = useRef(null);
  const h3Ref: React.Ref<HTMLDivElement> = useRef(null);

  // Get current scroll position, relative to header H1
  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: h1Ref,
    offset: ["start start", "end start"],
  });

  // Change headers opacity and position based on scroll position
  const cutoff1 = 0.6;
  const cutoff2 = 0.75;
  const fadeOutAnim = useTransform(
    scrollYProgress,
    [0, cutoff1, cutoff2, 1],
    [1, 0, 0, 0]
  );
  const yOutAnim = useTransform(
    scrollYProgress,
    [0, cutoff1, cutoff2, 1],
    ["0vh", "8vh", "0vh", "0vh"]
  );
  const fadeInAnim = useTransform(
    scrollYProgress,
    [0, cutoff1, cutoff2, 1],
    [0, 0, 1, 1]
  );

  // Change H3 position to fixed when it's on top
  scrollYProgress.onChange((latest) => {
    if (!menuRef.current) {
      return;
    }
    if (latest >= 1) {
      menuRef.current.style.position = "fixed";
      menuRef.current.style.left = "0.5rem";
      menuRef.current.style.right = "0.5rem";
      return;
    }
    if (latest < 0.9) {
      menuRef.current.style.position = "relative";
      menuRef.current.style.left = "0px";
      menuRef.current.style.right = "0px";
    }
  });

  // Snap to H1 or H3 when the user scrolls
  // TODO: there are some bugs here
  // When the user fliks to fast scroll, the page doesn't snap to the H1 or H3
  const touchEndHandler = () => {
    const latest = scrollYProgress.get();
    if (!containerRef.current) {
      return;
    }

    if (latest <= 0.5) {
      containerRef.current.scrollTop = 0;
    }
    if (latest > 0.5 && latest < 1) {
      if (menuRef.current) {
        containerRef.current.scrollTop = menuRef.current.offsetTop;
      }
    }
  };

  // Handle menu open
  const isLoggedIn = useAppSelector((state) => !!state.user.token);
  const [menuIsOpen, , { setStateTo: setMenuIsOpenTo }] = useSState(false);
  const links: ContextmenuItem[] = [
    { caption: "Manage programs", path: "/manage-programs" },
    { caption: "Logout", path: "/logout" },
  ];

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onTouchEnd={touchEndHandler}
    >
      <header>
        <motion.h1 ref={h1Ref} style={{ opacity: fadeOutAnim, y: yOutAnim }}>
          Trainer
        </motion.h1>
        <div className={styles.menu} ref={menuRef}>
          <motion.h3 ref={h3Ref} style={{ opacity: fadeInAnim }} layout>
            Trainer
          </motion.h3>
          <div className={styles.button}>
            {isLoggedIn && (
              <>
                <button onClick={setMenuIsOpenTo(true)}>
                  <img src="/menu.png" alt="menu" />
                </button>

                <ContextMenu
                  show={menuIsOpen}
                  onClose={setMenuIsOpenTo(false)}
                  links={links}
                  direction={"left"}
                />
              </>
            )}
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default BaseTemplate;
