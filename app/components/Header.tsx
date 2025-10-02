"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (showMenu === true) {
      setShowMenu(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (showMenu === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMenu]);

  return (
    <header className="py-8">
      <div className="container">
        <div className="flex justify-end items-center">
          <div onClick={() => setShowMenu(!showMenu)} className="relative z-10">
            {!showMenu ? (
              <GiHamburgerMenu color="#000" size={24} />
            ) : (
              <IoCloseOutline color="#000" size={24} />
            )}
          </div>
          {showMenu ? (
            <div
              className="flex justify-center fixed top-0 right-0 h-screen w-3/4 bg-white lg:w-1/4 border-l-2 border-black"
              style={{
                transform: showMenu ? "translateX(0)" : "translateX(100%)",
              }}
            >
              <ul className="flex gap-3 font-bold flex-col justify-center">
                <li>
                  <Link href={"/"}>მთავარი</Link>
                </li>
                <li>
                  <Link href={"/initiative"}>ინიციატივა</Link>
                </li>
                <li>
                  <Link href={"/video"}>ჩვენ</Link>
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
