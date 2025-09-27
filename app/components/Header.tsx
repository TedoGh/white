import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header style={{ padding: "30px 0" }}>
      <div className="container">
        <div className="flex justify-end items-center">
          <ul className="flex gap-3 font-bold">
            <li>
              <Link href={"/"}>ჩვენ შესახებ</Link>
            </li>
            <li>
              <Link href={"/upload"}>ატვირთე</Link>
            </li>
            <li>
              <Link href={"/manifest"}>მანიფესტი</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
