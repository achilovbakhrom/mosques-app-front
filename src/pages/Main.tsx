import { Flex, Spin, Typography } from "antd";
import useUserStore from "../stores/userStore";
import { Role } from "../model/Role";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { PlaceType } from "../model/PlaceType";

function Main() {
  const { loading, user, getCurrentUser } = useUserStore();
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  if (loading) {
    return (
      <Flex
        className="w-full h-[300px]"
        justify="center"
        align="center"
        gap={6}
      >
        <Spin size="large" /> <Typography.Text>Юкланмокда...</Typography.Text>
      </Flex>
    );
  }

  const buildPath = (arg: PlaceType) => `/app/place/${arg}`;

  if (user) {
    switch (user.role) {
      case Role.Admin:
        return <Navigate to={buildPath(PlaceType.Region)} />;
      case Role.RegionAdmin:
        return <Navigate to={buildPath(PlaceType.City)} />;
      case Role.CityAdmin:
        return <Navigate to={buildPath(PlaceType.Mosque)} />;
      case Role.MosqueAdmin:
        return <Navigate to="/app/expenses" />;
    }
  }

  // should get user role, and according to the role this component should redirect to appropriate page
  return !user && !loading && <Navigate to="/auth" />;
}

export default Main;
