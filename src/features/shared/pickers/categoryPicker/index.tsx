import { AUTOCOMPLETE_PARAM_NAME } from "../../../../constant";
import AsyncAutocomplete, { Props } from "../asyncAutocomplete";
import { Category } from "../../../../model/Category";
import { SelectProps } from "antd";

type CategoryProps = Omit<SelectProps, "onChange"> &
  Pick<Props<Category>, "onChange">;

function CategoryPicker(props: CategoryProps) {
  const { placeholder = "Категорияни танланг", ...rest } = props;
  console.log("vvv", rest.value);
  return (
    <AsyncAutocomplete
      {...rest}
      mapper={(arg) => ({
        value: String(arg.id),
        label: arg.name,
      })}
      getOriginalData={(value, items) =>
        items.find((item) => String(item.id) === value)
      }
      path="/category/"
      searchKey={AUTOCOMPLETE_PARAM_NAME}
      placeholder={placeholder}
    />
  );
}

export default CategoryPicker;
