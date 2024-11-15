import { useRef } from "react";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import SubTitleName from "../../../normal/subTitleName";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import CloseIcon from "@mui/icons-material/Close"; // Cross icon for closing the sidebar
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import MenuIcon from "@mui/icons-material/Menu";
// import { Box } from "@mui/material";

import CustomButton from "../../../normal/customButton";

function Header() {
  const [loginText, setLoginText] = useState("Log In");
  const [userStatus, setUserStatus] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const sidebarRef = useRef(null); // Ref for sidebar
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    let text = token ? "Log Out" : "Log In";
    if (token) {
      var decoded = JSON.parse(token);

      // const decoded = jwtDecode(token);

      if (decoded.role === "admin") {
        setUserStatus(true);
      } else {
        setUserStatus(false);
      }
    } else {
      setUserStatus(false);
    }
    setLoginText(text);
  }, [token]);

  const menuList = [
    { label: "Home", to: "" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: loginText, to: "/auth" },
  ];

  const dropdowns = {
    "Talk Types": ["AB", "AC", "BA", "BC", "CA", "CB"],
    "Focus Filters": ["Mind", "Body", "Soul"],
    Resources: ["Articles", "Videos", "Theory", "Country Map", "New Research"],
  };

  const handleDropdownToggle = (key) => {
    setOpenDropdown((prevKey) => (prevKey === key ? null : key));
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
    setOpenDropdown(null); // Close dropdowns when sidebar opens
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false); // Close the sidebar when cross button is clicked
  };

  return (
    <Box
      sx={{
        padding: "0 0",
        borderBottom: "1px solid #aaa",
        display: "flex",
        justifyContent: "space-between",
        flex: 1,
        backgroundColor: "#f0eeeb",
        position: "fixed", // stick to the top of the page
        top: 0,
        width: "100%",
      }}
    >
      <Box sx={{ padding: "0 0 0 50px" }}>
        <SubTitleName text="TALK TYPES" color="red" variant="h4" />
      </Box>

      {/* Hamburger Menu for Small Screens */}
      <Box className="md:hidden flex items-center">
        <MenuIcon
          onClick={handleSidebarToggle}
          className="cursor-pointer text-gray-700"
        />
      </Box>

      {/* Side Navbar (visible only on small screens when open) */}
      <Box
        ref={sidebarRef} // Attach the ref to the sidebar container
        className={`fixed inset-y-0 left-0 w-64 bg-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
        sx={{
          maxHeight: "100%", // Ensure the sidebar does not exceed the screen height
          overflowY: "auto", // Enable scrolling if content exceeds the max height
        }}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <SubTitleName
            text="TALK TYPES"
            color="red"
            variant="h5"
            sx={{
              fontSize: {
                xs: "1.25rem",
                sm: "2rem",
              },
            }}
          />
          <CloseIcon
            onClick={handleCloseSidebar}
            className="cursor-pointer text-gray-700"
          />
        </div>
        <div className="flex flex-col p-4">
          {userStatus && (
            <Link to="/manage" className="py-2">
              Manage
            </Link>
          )}
          {menuList.map((item, index) => (
            <Link key={index} to={item.to} className="py-2">
              {item.label}
            </Link>
          ))}
          {Object.keys(dropdowns).map((key, index) => (
            <div key={index} className="py-2">
              <div
                onClick={() => handleDropdownToggle(key)}
                className="flex justify-between cursor-pointer"
              >
                {key}
                <KeyboardArrowDownOutlinedIcon />
              </div>
              {openDropdown === key && (
                <div className="pl-4">
                  {dropdowns[key].map((item, subIndex) => (
                    <Link
                      key={subIndex}
                      to={`/${key
                        .toLowerCase()
                        .replace(" ", "-")}/${item.toLowerCase()}`}
                      className="block py-1"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link to="/survey" className="py-2">
            <CustomButton text="Take the test!" />
          </Link>
        </div>
      </Box>

      {/* Desktop Navbar */}
      <Box className="hidden md:flex items-center">
        {userStatus && (
          <Link to="/manage" className="px-4">
            Manage
          </Link>
        )}
        {menuList.map((item, index) => (
          <Link key={index} to={item.to} className="px-4">
            {item.label}
          </Link>
        ))}
        {Object.keys(dropdowns).map((key, index) => (
          <Box
            key={index}
            onMouseEnter={() => setOpenDropdown(key)} // Open on hover for desktop
            onMouseLeave={() => setOpenDropdown(null)} // Close on hover out
            sx={{
              position: "relative",
              padding: "0px 20px",
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {key} <KeyboardArrowDownOutlinedIcon />
            </Box>
            {openDropdown === key && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "4px",
                  padding: "10px 0",
                  zIndex: 1,
                  minWidth: "150px",
                }}
              >
                {dropdowns[key].map((item, subIndex) => (
                  <Link
                    key={subIndex}
                    to={`/${key
                      .toLowerCase()
                      .replace(" ", "-")}/${item.toLowerCase()}`}
                    style={{
                      display: "block",
                      padding: "8px 16px",
                      textDecoration: "none",
                      color: "#333",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item}
                  </Link>
                ))}
              </Box>
            )}
          </Box>
        ))}
        <Link to="/survey">
          <CustomButton text="Take the test!" />
        </Link>
      </Box>
    </Box>
  );
}

export default Header;
