import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { setNavigate } from "../utils/navigation";

function Navigation() {
  const navigate = useNavigate();
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return <Outlet />;
}

export default Navigation;
