import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useReportValueStore from "../../../stores/reportValueStore";

function useReport() {
  const store = useReportValueStore();
  const { id } = useParams();

  useEffect(() => {
    if (id != null) {
      store.getReport(Number(id));
    }
  }, [id, store.start, store.end]);

  return {
    data: store.data,
    loading: store.loading,
  };
}

export default useReport;
