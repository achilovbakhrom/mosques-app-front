import { useEffect } from "react";
import useReportStore from "../../../stores/reportstore";
import { useParams } from "react-router-dom";

function useHierarchicallyReport() {
  const store = useReportStore();
  const { id } = useParams();
  useEffect(() => {
    if (id != null) {
      store.getHierarchicallyReport(Number(id));
    }
  }, [
    id,
    store.hierarchicalStart,
    store.hierarchicalEnd,
    store.hierarchicalReportType,
  ]);

  return {
    loading: store.hierarchicalLoading,
    reportType: store.hierarchicalReportType,
    store,
  };
}

export default useHierarchicallyReport;
