import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo } from "react";
import useRecordStore from "../../../stores/recordStore";
import useUserStore from "../../../stores/userStore";
import { Role } from "../../../model/Role";

function useRecordTable() {
  const store = useRecordStore();
  const location = useLocation();
  const navigate = useNavigate();
  const userStore = useUserStore();

  const placeId = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get("placeId");
  }, [location]);

  useEffect(() => {
    if (userStore.user?.role !== Role.MosqueAdmin && !placeId) {
      navigate("/app");
    }
  }, [placeId, userStore.user]);

  const fetchData = useCallback(() => {
    store.getRecords(
      store.page,
      store.size,
      placeId ? Number(placeId) : undefined
    );
  }, [store.page, store.size, placeId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    store,
  };
}

export default useRecordTable;
