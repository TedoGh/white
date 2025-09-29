"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const pathname = usePathname();

  console.log(pathname);
  useEffect(() => {
    if (showMenu === true) {
      setShowMenu(false);
    }
  }, [pathname]);
  return (
    <header style={{ padding: "30px 0" }}>
      <div className="container">
        <div className="flex justify-end items-center">
          <div
            onClick={() => setShowMenu(!showMenu)}
            style={{ position: "relative", zIndex: "10" }}
          >
            {!showMenu ? (
              <GiHamburgerMenu color="#000" size={24} />
            ) : (
              <IoCloseOutline color="#000" size={24} />
            )}
          </div>
          {showMenu ? (
            <div
              className="flex justify-center"
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                height: "100vh",
                width: "30%",
                background: "white",
                padding: "20px",
                transition: "transform 0.3s ease-in-out",
                transform: showMenu ? "translateX(0)" : "translateX(100%)",
              }}
            >
              <ul className="flex gap-3 font-bold flex-col justify-center">
                <li>
                  <Link href={"/"}>ჩვენ შესახებ</Link>
                </li>
                <li>
                  <Link href={"/video"}>ვიდეოები</Link>
                </li>
                <li>
                  <Link href={"/upload"}>ატვირთე</Link>
                </li>
                <li>
                  <Link href={"/manifest"}>მანიფესტი</Link>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
