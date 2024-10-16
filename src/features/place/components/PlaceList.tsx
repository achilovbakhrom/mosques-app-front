import { Button, Flex, Table } from "antd";
import { Place } from "../../../model/Place";
import { useMemo } from "react";
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

  return (
    <Table
      size="small"
      sticky
      dataSource={props.data}
      loading={props.loading}
      onRow={(data) => ({
        onClick: () => props.onRowClick(data),
      })}
      columns={[
        { key: "id", dataIndex: "id", width: 50, title: "ID" },
        {
          key: "name",
          title: "Жой номи",
          render: ({ id, name }) => (
            <Flex justify="space-between" align="center">
              {name}
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
