import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = ({ user }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar user={user} />
      <Box sx={{ flex: "1" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
