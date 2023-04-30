import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function withAuthRequired(Component) {
  return function ProtectedComponent() {
    const user = useSelector((store) => store.authSlice.auth.user);
    const navigate = useNavigate();
    useEffect(() => {
      if (!user) {
        navigate("/signin");
      }
    }, [user]);
    return user && <Component />;
  };
}
