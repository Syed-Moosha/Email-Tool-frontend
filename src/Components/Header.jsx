import { Avatar, Button, Dropdown, DropdownDivider, Navbar, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleTheme } from "../Redux/Slice/themeSlice";
import { signOutSuccess } from "../Redux/Slice/userSlice";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentuser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const handleSignout = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
    navigate('/signin');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Navbar className="border-b-2 dark:bg-black flex flex-wrap items-center justify-between p-4">
      <Link
        to="/home"
        className="text-lg sm:text-xl font-bold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-violet-600 via-fuchsia-700 to-pink-500 rounded-lg text-white">
          Bulk
        </span>
        Email-Tool
      </Link>

      <form className="hidden lg:flex flex-grow mx-4">
        <TextInput
          type="text"
          placeholder="Search Mails...."
          value={searchTerm}
          onChange={handleSearchChange}
          rightIcon={AiOutlineSearch}
          className="w-full"
        />
      </form>

      <Button
        className="lg:hidden text-dark"
        gradientDuoTone="purpleToPink"
        outline
        pill
      >
        <AiOutlineSearch />
      </Button>

      <div className="flex items-center gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline-flex items-center justify-center"
          gradientDuoTone="purpleToPink"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        
        {currentuser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={currentuser.rest.ProfilePicture} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentuser.rest.username}</span>
            </Dropdown.Header>
            <DropdownDivider />
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button gradientDuoTone="purpleToPink">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </Navbar>
  );
};

export default Header;
