import { Breadcrumb, Button, Flex, Typography } from "antd";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { PlaceType } from "../../model/PlaceType";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useMemo } from "react";

function Header() {
  const { place_type } = useParams<{ place_type: PlaceType }>();
  const placeMatch = useMatch("/app/place/:place_type");

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const hasBackButton = useMemo(
    () => place_type !== PlaceType.Region,
    [place_type]
  );

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
                navigate(-1);
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
                navigate(-2);
              }}
            >
              Вилоятлар
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="cursor-pointer"
              onClick={() => {
                navigate(-1);
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
  }, [place_type]);

  return (
    <Flex
      className="h-[50px] px-8 bg-slate-300 shadow-md z-10 gap-4"
      align="center"
    >
      {hasBackButton && (
        <Button icon={<ArrowLeftOutlined />} type="link" onClick={goBack} />
      )}
      {breadCrumb}
      {!placeMatch && <Typography.Text>Киримлар/Чикимлар</Typography.Text>}
    </Flex>
  );
}

export default Header;
