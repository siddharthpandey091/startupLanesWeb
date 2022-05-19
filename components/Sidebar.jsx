import { FaBars, FaHome, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import { MdShop } from "react-icons/md";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/dashboard/connections",
    name: "Members",
    icon: <FaUser />,
  },
  {
    path: "/leads",
    name: "Leads",
    icon: <MdShop />,
  },
  {
    path: "/messages",
    name: "Messages",
    icon: <MdMessage />,
  },
  {
    path: "/dashboard/post-business-requiremment",
    name: "Post business requirement",
    icon: <MdPostAdd />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "45px",
            transition: { duration: 0.5, type: "spring", damping: 10 },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  StartupLanes
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              return (
                <Link href={route.path} key={index} activeClassName="active">
                  <div className="link">
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Link>
              );
            })}
          </section>
        </motion.div>
      </div>
    </>
  );
};

export default SideBar;
