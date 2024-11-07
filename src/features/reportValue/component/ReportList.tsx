import { useMemo } from "react";
import { Table } from "antd";
import { ReportValueData } from "../../../model/ReportValue";
import { formatNumber } from "../../../utils/format";

type Props = {
  data?: ReportValueData[];
  loading: boolean;
};

function ReportList(props: Props) {
  const scrollY = useMemo(() => {
    const height = window.innerHeight;
    return height - 200;
  }, []);

  return (
    <Table
      size="small"
      sticky
      dataSource={props.data ?? []}
      loading={props.loading}
      columns={[
        {
          title: "Категория",
          dataIndex: "category_name",
        },
        {
          title: "Улчов бирлиги",
          dataIndex: "unit_name",
          width: 200,
        },
        {
          title: "Киймати",
          dataIndex: "total_quantity",
          width: 400,
          render: (value) => formatNumber(value),
        },
      ]}
      scroll={{ y: scrollY }}
      pagination={false}
    />
  );
}

export default ReportList;
