import { Breadcrumb, Button, Flex, Typography } from "antd";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { PlaceType } from "../../model/PlaceType";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import useUserStore from "../../stores/userStore";
import { Role } from "../../model/Role";
import UserProfile from "../userProfile";

function Header() {
  const { place_type } = useParams<{ place_type: PlaceType }>();

  const placeMatch = useMatch("/app/place/:place_type");

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const userStore = useUserStore();

  const currentUser = userStore.user;

  const hasBackButton = useMemo(() => {
    if (!currentUser) {
      return false;
    }
    return (
      place_type !== PlaceType.Region && currentUser.role !== Role.MosqueAdmin
    );
  }, [place_type, currentUser]);

  const breadCrumb = useMemo(() => {
    switch (place_type) {
      case PlaceType.Region:
        return (
          <Breadcrumb>
            <Breadcrumb.Item className="cursor-pointer">
              Вилоятлар
            </Breadcrumb.Item>
          </Breadcrumb>
        );
      case PlaceType.City:
        return (
          <Breadcrumb>
            <Breadcrumb.Item
              className="cursor-pointer"
              onClick={() => {
                if (
                  currentUser?.role === Role.Admin ||
                  currentUser?.role === Role.RegionAdmin
                ) {
                  navigate(-1);
                }
              }}
            >
              Вилоятлар
            </Breadcrumb.Item>
            <Breadcrumb.Item className="cursor-pointer">
              Шахарлар
            </Breadcrumb.Item>
          </Breadcrumb>
        );
      case PlaceType.Mosque:
        return (
          <Breadcrumb>
            <Breadcrumb.Item
              className="cursor-pointer"
              onClick={() => {
                if (
                  currentUser?.role === Role.Admin ||
                  currentUser?.role === Role.RegionAdmin
                ) {
                  navigate(-2);
                }
              }}
            >
              Вилоятлар
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="cursor-pointer"
              onClick={() => {
                if (
                  currentUser?.role === Role.Admin ||
                  currentUser?.role === Role.RegionAdmin
                ) {
                  navigate(-1);
                }
              }}
            >
              Шахарлар
            </Breadcrumb.Item>
            <Breadcrumb.Item className="cursor-pointer">
              Масжидлар
            </Breadcrumb.Item>
          </Breadcrumb>
        );
    }
  }, [place_type, currentUser]);

  return (
    <Flex
      className="h-[50px] px-8 bg-slate-300 shadow-md z-10 gap-4"
      align="center"
      justify="space-between"
    >
      <Flex align="center">
        {hasBackButton && (
          <Button icon={<ArrowLeftOutlined />} type="link" onClick={goBack} />
        )}
        {breadCrumb}
        {!placeMatch && <Typography.Text>Киримлар/Чикимлар</Typography.Text>}
      </Flex>
      <UserProfile />
    </Flex>
  );
}

export default Header;
