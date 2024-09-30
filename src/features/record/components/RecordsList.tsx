import { useMemo } from "react";
import { Record } from "../../../model/Record";
import { Table } from "antd";
import { PAGE_SIZE_OPTIONS } from "../../../constant";

type Props = {
  data: Record[];
  page: number;
  size: number;
  total: number;
  loading: boolean;
  onPaginationChange: (page: number, size: number) => void;
};

function RecordsList(props: Props) {
  const scrollY = useMemo(() => {
    const height = window.innerHeight;
    return height - 260;
  }, []);
  return (
    <Table
      size="small"
      sticky
      dataSource={props.data}
      loading={props.loading}
      columns={[
        { key: "id", dataIndex: "id", width: 50, title: "ID" },
        {
          key: "category",
          dataIndex: "category",
          title: "Категорияси",
          render: (value) => value.name,
        },
        {
          key: "amount",
          dataIndex: "amount",
          title: "Суммаси",
        },
        {
          key: "unit",
          render: ({ category }) => category.unit?.name,
          title: "Улчов бирлиги",
        },
        {
          key: "quantity",
          dataIndex: "quantity",
          title: "Киймати",
        },
        {
          key: "place",
          dataIndex: "place",
          title: "Жойи",
          render: (value) => value.name,
        },
        {
          key: "description",
          dataIndex: "description",
          title: "Изох",
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

export default RecordsList;
