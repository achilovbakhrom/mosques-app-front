import { Flex, Result } from "antd";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <Flex justify="center" align="center" className="w-full h-[100vh]">
      <Result
        status="500"
        title="Серверда хатолик юз берди, Администраторга мурожаат килинг!"
        subTitle={<Link to="/">Асосий сахифага утиш</Link>}
      />
    </Flex>
  );
}

export default Page404;
