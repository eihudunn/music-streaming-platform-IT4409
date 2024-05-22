"use client";

import Box from "@/components/Box";
import React from "react";

const Error = () => {
  return (
    <Box className="h-full flex items-center justify-center">
      <div className="text-neutral-400">
        Something went wrong. Please try again.
      </div>
    </Box>
  );
};

export default Error;
