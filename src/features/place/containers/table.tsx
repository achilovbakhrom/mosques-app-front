import PlaceList from "../components/PlaceList";
import { Place } from "../../../model/Place";
import { objectToQueryParams } from "../../../utils/navigation";
import usePlaceTable from "../hooks/usePlaceTable";
import { useMemo } from "react";

function PlaceTable() {
  const { store, navigate } = usePlaceTable();

  const data = useMemo(() => store.data ?? [], [store.data]);

  return (
    <PlaceList
      data={data}
      page={store.page}
      size={store.size}
      total={store.total}
      loading={store.loading}
      onPaginationChange={(page: number, size: number) => {
        store.setPagination(page, size);
      }}
      onRowClick={(data: Place) => {
        if (!data.is_mosque) {
          navigate(
            `/app/place?${objectToQueryParams({
              placeId: data.id,
            })}`
          );
        } else {
          navigate(
            `/app/record/${data.id}?${objectToQueryParams({
              placeId: data.id,
            })}`
          );
        }
      }}
    />
  );
}

export default PlaceTable;
