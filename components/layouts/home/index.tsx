import Link from "next/link";
import { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { BsFillSuitHeartFill, BsFire } from "react-icons/bs";
import { MdStars } from "react-icons/md";
import { SiClockify } from "react-icons/si";
import { ImNewspaper } from "react-icons/im";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getToken, removeToken } from "@/utils/auth";
import axios from "axios";
import useUser from "@/context/user/UserContext";

const HomeLayout = (props: { children: JSX.Element; isHome: boolean }) => {
  const [profileImage, setProfileImage] = useState(
    "https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png"
  );
  const { user, login, logout } = useUser();
  const router = useRouter();
  const loginUser = async () => {
    const token = getToken();
    if (token) {
      console.log(token);
      const userData = await axios.post("/api/loginWithToken", { token });
      console.log(userData.data.userData);
      login(userData.data.userData);
      console.log("login");
    }
  };
  const logoutUser = async () => {
    logout();
    removeToken();
    router.push("/");
  };
  useEffect(() => {
    loginUser();
  }, []);
  useEffect(() => {
    if (user) {
      setProfileImage(
        "https://assets.materialup.com/uploads/5b045613-638c-41d9-9b7c-5f6c82926c6e/preview.png"
      );
    } else {
      setProfileImage(
        "https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png"
      );
    }
  }, [user]);
  const { asPath } = router;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center justify-start"
              onClick={() => setIsUserMenuOpen(false)}
            >
              {props.isHome ? (
                ""
              ) : (
                <div
                  className="flex items-center justify-start mr-3"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <a onClick={() => router.back()}>
                    <BsArrowLeftCircle className="flex-shrink-0 w-6 h-6 text-gray-400 dark:text-white dark:hover:text-gray-400 transition duration-100 hover:text-white" />
                  </a>
                </div>
              )}
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={handleSidebarToggle}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link href="/" className="flex ml-2 md:mr-24">
                <img
                  src={`https://raw.githubusercontent.com/huzaifa3165/huzaifa3165/main/muhammadHuzaifa1.png`}
                  className="h-7 mr-3"
                  alt="Muhammad Huzaifa"
                />
              </Link>
            </div>
            {/* <div
              className="hidden sm:flex items-center justify-center "
              onClick={() => setIsUserMenuOpen(false)}
            >
              <div className="flex w-auto rounded-full">
                <input
                  type="text"
                  className="px-4 py-2 w-48 sm:w-52 md:w-64 lg:w-96 rounded-l-full text-gray-800 hover:bg-gray-100 focus:bg-gray-100   focus:outline-1 focus:outline-slate-400 "
                  placeholder="Search..."
                />
                <button className="flex items-center justify-center px-4  rounded-r-full bg-gray-500 transition dark:bg-gray-400 hover:bg-blue-700">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                  </svg>
                </button>
              </div>
            </div> */}
            <div className="flex items-center">
              <div className="flex items-center justify-between w-16 mr-5">
                <Link href="/saved">
                  <BsFillSuitHeartFill className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-white dark:hover:text-gray-400 transition duration-75 hover:text-white" />
                </Link>
                <Link href="/setting">
                  <AiFillSetting className="flex-shrink-0 w-6 h-6 text-gray-400 dark:text-white dark:hover:text-gray-400 transition duration-100 hover:text-white" />
                </Link>
              </div>
              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    onClick={handleUserMenuToggle}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={profileImage}
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  // absolute top-14 md:top-12 right-2
                  className={`z-50 ${
                    isUserMenuOpen
                      ? "absolute top-14 md:top-12 right-2"
                      : "hidden"
                  }
                   my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 `}
                  id="dropdown-user"
                >
                  {user ? (
                    <>
                      <div className="px-4 py-3" role="none">
                        <p
                          className="text-sm text-gray-900 dark:text-white"
                          role="none"
                        >
                          {user.username}
                        </p>
                        <p
                          className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                          role="none"
                        >
                          {user.email}
                        </p>
                      </div>
                      <ul className="py-1" role="none">
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Settings
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Saved
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                            onClick={() => {
                              logoutUser();
                            }}
                          >
                            Sign out
                          </a>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <ul className="py-1" role="none">
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Settings
                          </a>
                        </li>

                        <li>
                          <Link
                            href="/signin"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Sign In
                          </Link>
                        </li>

                        <li>
                          <Link
                            href="/signup"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Sign Up
                          </Link>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-${
          isSidebarOpen ? "0" : "full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
        onClick={() => setIsUserMenuOpen(false)}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/latest"
                className={`flex items-center p-2 ${
                  asPath === "/latest"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "text-gray-900"
                } rounded-lg dark:text-white   hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <SiClockify className="flex-shrink-0 w-5 h-5 mr-1 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                <span className="flex-1 ml-3 whitespace-nowrap">Latest</span>
                {/* <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span> */}
              </Link>
            </li>
            <li>
              <Link
                href="/popular"
                className={`flex items-center p-2 ${
                  asPath === "/popular"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "text-gray-900"
                } rounded-lg dark:text-white   hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <MdStars className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                <span className="ml-3">Popular</span>
              </Link>
            </li>
            <li className="border-b border-slate-600 pb-2">
              <Link
                href="/trending"
                className={`flex items-center p-2 ${
                  asPath === "/trending"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "text-gray-900"
                } rounded-lg dark:text-white   hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <BsFire className="flex-shrink-0 w-5 h-5 mr-1 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                <span className="flex-1 ml-3 whitespace-nowrap">Trending</span>
              </Link>
            </li>
            <li>
              <Link
                href="/subscription"
                className={`flex items-center p-2 ${
                  asPath === "/subscription"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "text-gray-900"
                } rounded-lg dark:text-white   hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <ImNewspaper className="flex-shrink-0 w-5 h-5 mr-1 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Subscription
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/saved"
                className={`flex items-center p-2 ${
                  asPath === "/saved"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "text-gray-900"
                } rounded-lg dark:text-white   hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <BsFillSuitHeartFill className="flex-shrink-0 w-5 h-5 mr-1 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                <span className="flex-1 ml-3 whitespace-nowrap">Saved</span>
              </Link>
            </li>
            <li className="border-b border-slate-600 pb-2">
              <Link
                href="/"
                className={`flex items-center p-2 ${
                  asPath === "/settings"
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "text-gray-900"
                } rounded-lg dark:text-white   hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <AiFillSetting className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <a
                    href="#"
                    className={`flex items-center p-2 text-gray-900
                } rounded-lg dark:text-white   hover:bg-gray-100 dark:hover:bg-gray-700`}
                    onClick={() => {
                      logoutUser();
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Sign Out
                    </span>
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/signin"
                    className={`flex items-center p-2 ${
                      asPath === "/signin"
                        ? "bg-gray-100 dark:bg-gray-700"
                        : "text-gray-900"
                    } rounded-lg dark:text-white   hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Sign In
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className={`flex items-center p-2 ${
                      asPath === "/signup"
                        ? "bg-gray-100 dark:bg-gray-700"
                        : "text-gray-900"
                    } rounded-lg dark:text-white   hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Sign Up
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </aside>

      <div
        className="p-4 sm:ml-64"
        onClick={() => {
          setIsUserMenuOpen(false);
          setIsSidebarOpen(false);
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default HomeLayout;
