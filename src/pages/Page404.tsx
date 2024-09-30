import { Flex, Result } from "antd";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <Flex justify="center" align="center" className="w-full h-[100vh]">
      <Result
        status="404"
        title="Адашиб колдингизми?"
        subTitle={<Link to="/">Асосий сахифага утиш</Link>}
      />
    </Flex>
  );
}

export default Page404;
