import { useEffect } from "react";
import useReportStore from "../../../stores/reportstore";
import { useParams } from "react-router-dom";

function useReport() {
  const store = useReportStore();
  const { id } = useParams();
  useEffect(() => {
    if (id != null) {
      store.getReport(Number(id));
    }
  }, [id, store.start, store.end, store.reportType]);

  return {
    data: store.data,
    loading: store.loading,
    reportType: store.reportType,
  };
}

export default useReport;
