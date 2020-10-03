import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../store/actions/auth";

const AuthenticateScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUser());
  }, []);

  return null;
};

export default AuthenticateScreen;
