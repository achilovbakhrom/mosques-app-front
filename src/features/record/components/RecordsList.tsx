import { useMemo } from "react";
import { Record } from "../../../model/Record";
import { Flex, Table, Tag, Typography } from "antd";
import { PAGE_SIZE_OPTIONS } from "../../../constant";
import { OperationType } from "../../../model/Category";
import { formatNumber } from "../../../utils/format";

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
        { key: "date", title: "Сана", dataIndex: "date", width: 120 },
        {
          key: "place",
          dataIndex: "place",
          title: "Жойи",
          render: (value) => value.name,
        },
        {
          key: "category",
          dataIndex: "category",
          title: "Категорияси",
          render: (value) => <Typography.Text>{value.name}</Typography.Text>,
        },
        {
          key: "type",
          dataIndex: "category",
          title: "Кирим/Чиким",
          width: 100,
          render: (value) => (
            <Tag
              color={
                value.operation_type === OperationType.Expense ? "red" : "green"
              }
            >
              {value.operation_type === OperationType.Expense
                ? "чиким"
                : "кирим"}
            </Tag>
          ),
        },
        {
          key: "amount",
          dataIndex: "amount",
          title: "Суммаси",
          render: (value) => formatNumber(value),
        },
        {
          key: "unit",
          render: ({ category }) => category.unit?.name ?? "-",
          title: "Улчов бирлиги",
          width: 120,
        },
        {
          key: "quantity",
          dataIndex: "quantity",
          title: "Киймати",
          render: (value) => (value ? formatNumber(value) : "-"),
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
