import { Flex, Result } from "antd";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <Flex justify="center" align="center" className="w-full h-[100vh]">
      <Result
        status="403"
        title="Сизда кириш хукуки йук, администраторга мурожаат килинг!"
        subTitle={<Link to="/">Асосий сахифага утиш</Link>}
      />
    </Flex>
  );
}

export default Page404;
