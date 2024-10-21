import { AUTOCOMPLETE_PARAM_NAME } from "../../../../constant";
import AsyncAutocomplete, { Props } from "../asyncAutocomplete";
import { SelectProps } from "antd";
import { Place } from "../../../../model/Place";

type PlaceProps = Omit<SelectProps, "onChange"> &
  Pick<Props<Place>, "onChange"> & { placeId: number };

function MosquePicker(props: PlaceProps) {
  const { placeholder = "Масжидни танланг", ...rest } = props;

  return (
    <AsyncAutocomplete<Place>
      {...rest}
      mapper={(arg) => ({
        value: String(arg.id),
        label: arg.name,
      })}
      getOriginalData={(value, items) =>
        items.find((item) => String(item.id) === value)
      }
      params={{
        place_id: props.placeId,
      }}
      path="/place/mosque_autocomplete/"
      searchKey={AUTOCOMPLETE_PARAM_NAME}
      placeholder={placeholder}
      optionRender={undefined}
      labelRender={undefined}
    />
  );
}

export default MosquePicker;
