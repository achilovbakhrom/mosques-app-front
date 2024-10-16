import { Flex, Spin, Table, Typography } from "antd";
import ReportList from "../component/ReportList";
import useHierarchicallyReport from "../hooks/useHierarchicallyReport";
import { formatNumber } from "../../../utils/format";

function HierarchicallyReportTable() {
  const { store, loading, reportType } = useHierarchicallyReport();

  const data = store.handledData;

  if (loading) {
    return (
      <Flex className="w-[100%] h-[200px]" align="center" justify="center">
        <Spin />
      </Flex>
    );
  }

  if (!data?.length) {
    return (
      <Flex className="w-[100%] h-[200px]" align="center" justify="center">
        <Typography>Маълумотлар топилмади!</Typography>
      </Flex>
    );
  }

  return (
    <Table
      columns={[
        {
          key: "title",
          dataIndex: "title",
          title: "Жой номи",
          width: "30%",
        },
        {
          key: "income",
          title: "Жами кирим",
          render: ({ income }) => (
            <Typography.Text type="success" className="font-bold">
              {formatNumber(income)}
            </Typography.Text>
          ),
        },
        {
          key: "expenses",
          title: "Жами чиким",
          render: ({ expense }) => (
            <Typography.Text type="danger" className="font-bold">
              {formatNumber(expense)}
            </Typography.Text>
          ),
        },
        {
          key: "expenses",
          title: "Фарки",
          render: ({ difference }) => (
            <Typography.Text type="warning" className="font-bold">
              {formatNumber(difference)}
            </Typography.Text>
          ),
        },
      ]}
      rowKey="title"
      expandable={{
        defaultExpandAllRows: true,
        expandedRowRender: ({ title }: any) => {
          const reportLeafNode = store.getDataForTable(title);
          if (!reportLeafNode) {
            return <div style={{ padding: 0, margin: 0 }} />;
          }

          return (
            <div className="overflow-auto w-[calc(100vw_-_40px)] p-[20px]">
              <ReportList
                reportType={reportType}
                data={reportLeafNode?.data}
                loading={loading}
              />
            </div>
          );
        },
      }}
      dataSource={data}
      pagination={false}
    />
  );
}

export default HierarchicallyReportTable;
