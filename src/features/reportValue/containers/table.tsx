import useReport from "../hooks/useReport";
import ReportList from "../component/ReportList";

function ReportTable() {
  const { data, loading } = useReport();

  return <ReportList data={data} loading={loading} />;
}

export default ReportTable;
