"use client"
import React, { useEffect } from "react";

const RedirectPage = () => {
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      window.location.href = "https://docs.applio.org";
    });

    return () => clearTimeout(redirectTimeout);
  }, []);

  return <div></div>;
};

export default RedirectPage;