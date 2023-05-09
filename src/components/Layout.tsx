import React, { ReactNode, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
  title: string;
};

interface MenuItem {
  title: string;
  pathName: string;
}

export const MenuName: MenuItem[] = [
  { title: "Contact", pathName: "/" },
  { title: "Charts and Maps", pathName: "/charts-and-maps" },
  { title: "Sidebar", pathName: "" },
];

const Layout: React.FC<LayoutProps> = (props) => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center nav w-full px-4 py-3">
        <h1 className="text-white text-2xl font-bold mx-auto">
          {props?.title}
        </h1>
        <button
          className="text-white hover:text-gray-200 focus:text-gray-200 lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <FiMenu />
        </button>
      </div>

      <div className="flex flex-1">
        <div
          className={`w-64 bg-white h-screen fixed left-0 top-115   border-2 ${
            showSidebar ? "block" : "hidden lg:block"
          }`}
        >
          <ul className="text-center">
            {MenuName &&
              MenuName.map((data: MenuItem, index: number) => {
                const isActive = data.pathName === location.pathname;
                return (
                  <li
                    key={index}
                    className={`my-2${
                      index < MenuName.length - 1 ? " border-b pb-2" : ""
                    }`}
                  >
                    <Link
                      to={data?.pathName}
                      className={`font-medium text-sm ${
                        index < MenuName.length - 1
                          ? `${isActive ? "underline text-blue-500" : " "}`
                          : ""
                      } `}
                    >
                      {data?.title}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>

        <div
          className={`flex-1 ml-0 px-4 py-6 lg:ml-64 ${
            showSidebar ? "ml-64" : ""
          }`}
          style={{ backgroundColor: "#ECE9E4" }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
