import { Button, Flex, Typography } from "antd";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import useUserStore from "../../stores/userStore";
import UserProfile from "../userProfile";
import PlaceApi from "../../api/place";
import { Place } from "../../model/Place";

function Header() {
  const [place, setPlace] = useState<Place>();
  const placeMatch = useMatch("/app/place");

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const userStore = useUserStore();

  const currentUser = userStore.user;

  const location = useLocation();

  const { id } = useParams();

  const placeId = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get("placeId") || id;
  }, [location, id]);

  useEffect(() => {
    if (placeId != null && !Number.isNaN(Number(placeId))) {
      PlaceApi.getCurrentPlace(Number(placeId)).then((value) => {
        setPlace(value);
      });
    }
  }, [placeId]);

  const hasBackButton = useMemo(
    () => currentUser && placeId != null,
    [placeId, currentUser]
  );

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
        {placeId ? place?.name || "Умумий" : "Умумий"} &nbsp; &nbsp;
        {!placeMatch && <Typography.Text>Киримлар/Чикимлар</Typography.Text>}
      </Flex>
      <UserProfile />
    </Flex>
  );
}

export default Header;
