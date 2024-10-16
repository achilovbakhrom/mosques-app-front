import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import UserProfile from "../userProfile";

type Props = {
  title: string;
};

function SimpleHeader(props: Props) {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Flex
      className="h-[50px] px-8 bg-slate-300 shadow-md z-10 gap-4"
      align="center"
      justify="space-between"
    >
      <Flex align="center">
        <Button icon={<ArrowLeftOutlined />} type="link" onClick={goBack} />
        {props.title}
      </Flex>
      <UserProfile />
    </Flex>
  );
}

export default SimpleHeader;
