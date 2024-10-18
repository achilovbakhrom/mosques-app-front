import { useLocation, useNavigate } from "react-router-dom";
import usePlaceStore from "../../../stores/placeStore";
import { useCallback, useEffect, useMemo } from "react";

function usePlaceTable() {
  const store = usePlaceStore();
  const location = useLocation();

  const parentId = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get("placeId");
  }, [location]);
  const navigate = useNavigate();

  const fetchData = useCallback(() => {
    store.getPlaces(
      store.page,
      store.size,
      parentId ? Number(parentId) : undefined
    );
  }, [store.page, store.size, parentId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    store,
    navigate,
  };
}

export default usePlaceTable;
