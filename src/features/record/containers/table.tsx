import { useMemo } from "react";
import useRecordTable from "../hooks/useRecordTable";
import RecordsList from "../components/RecordsList";
import { Typography } from "antd";

function RecordTable() {
  const { store } = useRecordTable();

  const data = useMemo(() => store.data ?? [], [store.data]);

  return (
    <RecordsList
      data={data}
      page={store.page}
      size={store.size}
      total={store.total}
      loading={store.loading}
      onPaginationChange={(page: number, size: number) => {
        store.setPagination(page, size);
      }}
    />
  );
}

export default RecordTable;
