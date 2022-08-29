import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./BaseTemplate.module.css";
import ContextMenu, {
  ContextmenuItem,
} from "../../UI-elements/ContextMenu/ContextMenu";
import { useSState } from "../../../hooks/useSState";
import { useAppSelector } from "../../../hooks/redux-hooks";
import Button from "../../UI-elements/Button/Button";

const BaseTemplate = () => {
  // Handle menu open
  const isLoggedIn = useAppSelector((state) => !!state.user.token);
  const [menuIsOpen, , { setStateTo: setMenuIsOpenTo }] = useSState(false);

  const links: ContextmenuItem[] = [
    { caption: "Manage programs", path: "/manage-programs" },
    { caption: "Logout", path: "/logout" },
  ];

  // Get path context and change page title
  const path = useLocation().pathname;
  const pageTitle = { "/manage-programs": "Programs" }[path];

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
  const h1FadeOutAnim = useTransform(
    scrollYProgress,
    [0, cutoff1, cutoff2, 1],
    [1, 0, 0, 0]
  );
  const h1yOutAnim = useTransform(
    scrollYProgress,
    [0, cutoff1, cutoff2, 1],
    ["0vh", "8vh", "0vh", "0vh"]
  );
  const h3FadeInAnim = useTransform(
    scrollYProgress,
    [0, cutoff1, cutoff2, 1],
    [0, 0, 1, 1]
  );
  const fixedMenuOpacityAnim = useTransform(
    scrollYProgress,
    [0, 0.999999, 1],
    [0, 0, 1]
  );

  // Handle sticking positions
  const cancelableTimeout = useRef<NodeJS.Timer>();
  const [touching, setTouching] = useState(false);
  useEffect(() => {
    const unsub = scrollYProgress.onChange((latest) => {
      clearTimeout(cancelableTimeout.current);

      if (!menuRef.current) {
        return;
      }
      if (!touching) {
        if (latest <= 0.5) {
          cancelableTimeout.current = setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.scrollTop = 0;
            }
          }, 50);
        }
        if (latest > 0.5 && latest < 1) {
          cancelableTimeout.current = setTimeout(() => {
            if (menuRef.current && containerRef.current) {
              containerRef.current.scrollTop = menuRef.current.offsetTop;
            }
          }, 50);
        }
      }
    });

    return () => {
      unsub();
      // clearTimeout(cancelableTimeout.current);
    };
  }, [touching]);

  // Snap to H1 or H3 when the user scrolls
  // TODO: there are some bugs here
  // When the user fliks to fast scroll, the page doesn't snap to the H1 or H3
  const touchEndHandler = () => {
    setTouching(false);

    const latest = scrollYProgress.get();
    if (!containerRef.current) {
      return;
    }

    if (latest <= 0.5) {
      cancelableTimeout.current = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = 0;
        }
      }, 50);
    }
    if (latest > 0.5 && latest < 1) {
      cancelableTimeout.current = setTimeout(() => {
        if (menuRef.current && containerRef.current) {
          containerRef.current.scrollTop = menuRef.current.offsetTop;
        }
      }, 50);
    }
  };

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onTouchStart={setTouching.bind(null, true)}
      onTouchEnd={touchEndHandler}
    >
      <header>
        <motion.h1
          ref={h1Ref}
          style={{ opacity: h1FadeOutAnim, y: h1yOutAnim }}
        >
          {pageTitle || "Trainer"}
        </motion.h1>
        <div className={styles.menu} ref={menuRef}>
          {pageTitle && (
            <Button to="/" plain>
              {"<"}
            </Button>
          )}

          <motion.h3 ref={h3Ref} style={{ opacity: h3FadeInAnim }} layout>
            {pageTitle || "Trainer"}
          </motion.h3>

          <div className={styles.button}>
            {isLoggedIn && !pageTitle && (
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
        <motion.div
          className={`${styles.menu} ${styles["menu-fixed"]}`}
          style={{ opacity: fixedMenuOpacityAnim }}
        >
          {pageTitle && (
            <Button to="/" plain>
              {"<"}
            </Button>
          )}

          <motion.h3 ref={h3Ref} style={{ opacity: h3FadeInAnim }} layout>
            {pageTitle || "Trainer"}
          </motion.h3>

          <div className={styles.button}>
            {isLoggedIn && !pageTitle && (
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
        </motion.div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default BaseTemplate;
