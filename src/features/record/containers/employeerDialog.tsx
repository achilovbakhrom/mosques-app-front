import { useEffect, useState } from "react";
import { Paginated } from "../../../model/Paginated";
import { User } from "../../../model/User";
import PlaceApi from "../../../api/place";
import { Flex, Modal, Spin, Table } from "antd";
import { Link } from "react-router-dom";

type Props = {
  placeId: number;
  onClose: () => void;
};

function EmployeerDialog(props: Props) {
  const [data, setData] = useState<Paginated<User>>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setIsLoading(true);
      PlaceApi.getUsers(props.placeId).then((response) => setData(response));
    } catch (e) {
      console.log("eee", e);
    } finally {
      setIsLoading(false);
    }
  }, [props.placeId]);

  return (
    <Modal
      open
      onCancel={props.onClose}
      title="Ишчилар"
      width={650}
      okButtonProps={{ hidden: true }}
      cancelText="Епиш"
    >
      <Flex vertical className="max-h-[400px]" gap={10}>
        {isLoading && (
          <Flex
            className="w-[400px] h-[200px]"
            align="center"
            justify="center"
            gap={10}
          >
            <Spin /> Юкланмокда
          </Flex>
        )}
      </Flex>
      <Table
        loading={isLoading}
        columns={[
          {
            title: "№",
            render: (_, __, idx) => idx + 1,
          },
          {
            title: "ФИО",
            dataIndex: "name",
          },
          {
            title: "Лавозими",
            dataIndex: "position",
            render: ({ name }) => name,
          },
          {
            title: "Объективкаси",
            dataIndex: "objective_file",
            render: (url) =>
              url ? (
                <Link to={url} target="_blank">
                  Очиш
                </Link>
              ) : null,
          },
        ]}
        dataSource={data?.results ?? []}
        locale={{ emptyText: "Ишчилар топилмади" }}
        pagination={false}
      />
    </Modal>
  );
}

export default EmployeerDialog;
