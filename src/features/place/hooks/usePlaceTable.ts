import { useLocation, useNavigate, useParams } from "react-router-dom";
import usePlaceStore from "../../../stores/placeStore";
import { PlaceType } from "../../../model/PlaceType";
import { useCallback, useEffect, useMemo } from "react";

function usePlaceTable() {
  const store = usePlaceStore();
  const { place_type } = useParams<{ place_type: PlaceType }>();
  const location = useLocation();

  const parentId = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get("parentId");
  }, [location]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!place_type) {
      navigate("/");
    }
  }, [place_type, navigate]);

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

  const nextPlaceType = useMemo(() => {
    switch (place_type) {
      case PlaceType.Region:
        return PlaceType.City;
      case PlaceType.City:
        return PlaceType.Mosque;
      case PlaceType.Mosque:
        return undefined;
      default:
        return undefined;
    }
  }, [place_type]);

  return {
    nextPlaceType,
    store,
    navigate,
  };
}

export default usePlaceTable;
