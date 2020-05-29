import React from "react";

import Header from "./Header";

const ErrorPage = ({ error }) => {
  return (
    <>
      <Header title="Error" />
      <p>{error ? error.message : "Something went wrong..."}</p>
    </>
  );
};

export default ErrorPage;
