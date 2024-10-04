import useReport from "../hooks/useReport";
import ReportList from "../component/ReportList";

function ReportTable() {
  const { data, loading, reportType } = useReport();

  return <ReportList reportType={reportType} data={data} loading={loading} />;
}

export default ReportTable;
