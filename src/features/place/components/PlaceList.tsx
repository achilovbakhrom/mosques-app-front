import { Button, Flex, Input, Table } from "antd";
import { Place } from "../../../model/Place";
import { useMemo, useState } from "react";
import { PAGE_SIZE_OPTIONS } from "../../../constant";
import { FileExcelOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { PlaceType } from "../../../model/PlaceType";

type Props = {
  data: Place[];
  page: number;
  size: number;
  total: number;
  loading: boolean;
  onPaginationChange: (page: number, size: number) => void;
  onRowClick: (data: Place) => void;
};

function PlaceList(props: Props) {
  const scrollY = useMemo(() => {
    const height = window.innerHeight;
    return height - 220;
  }, []);
  const navigate = useNavigate();
  const { place_type } = useParams();
  const [inn, setInn] = useState("");

  return (
    <Table
      size="small"
      sticky
      dataSource={props.data.filter((item) => {
        if (inn) {
          return item.inn?.includes(inn);
        }
        return true;
      })}
      loading={props.loading}
      onRow={(data) => ({
        onClick: () => props.onRowClick(data),
      })}
      columns={[
        { key: "id", dataIndex: "id", width: 50, title: "ID" },
        {
          key: "name",
          title: (
            <Flex className="w-full" gap={10} align="center">
              Жой номи{" "}
              <span>
                <Input
                  size="small"
                  className="w-[300px]"
                  placeholder="ИНН буйича кидирув"
                  value={inn}
                  onChange={(e) => {
                    setInn(e.target.value);
                  }}
                />
              </span>
            </Flex>
          ),
          render: ({ id, name, inn }) => (
            <Flex justify="space-between" align="center">
              <p>
                {name} &nbsp; &nbsp;{inn ? <strong>(ИНН: {inn})</strong> : null}
              </p>
              {place_type !== PlaceType.Mosque && (
                <Button
                  icon={<FileExcelOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate(`/app/place/${place_type}/top-level-report/${id}`);
                  }}
                >
                  Хисобот
                </Button>
              )}
            </Flex>
          ),
        },
      ]}
      scroll={{ y: scrollY }}
      pagination={{
        disabled: props.loading,
        total: props.total,
        current: props.page,
        pageSize: props.size,
        onChange: props.onPaginationChange,
        pageSizeOptions: PAGE_SIZE_OPTIONS,
        showQuickJumper: true,
        showSizeChanger: true,
      }}
    />
  );
}

export default PlaceList;
