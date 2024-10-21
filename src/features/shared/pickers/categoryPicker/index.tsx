import { AUTOCOMPLETE_PARAM_NAME } from "../../../../constant";
import AsyncAutocomplete, { Props } from "../asyncAutocomplete";
import { Category, OperationType } from "../../../../model/Category";
import { Flex, SelectProps, Tag } from "antd";

type CategoryProps = Omit<SelectProps, "onChange"> &
  Pick<Props<Category>, "onChange">;

function CategoryPicker(props: CategoryProps) {
  const { placeholder = "Категорияни танланг", ...rest } = props;
  return (
    <AsyncAutocomplete<Category>
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
      labelRender={(data) => {
        const d = data as unknown as Category;
        if (!d) {
          return null;
        }
        return (
          <Flex align="center" gap={10}>
            {d.name}
            {d.operation_type === OperationType.Expense ? (
              <Tag color="red">Чиким</Tag>
            ) : (
              <Tag color="green">Кирим</Tag>
            )}
          </Flex>
        );
      }}
      optionRender={(data) => {
        const d = data as unknown as Category;
        if (!d) {
          return null;
        }
        return (
          <Flex align="center" gap={10}>
            {d.name}
            {d.operation_type === OperationType.Expense ? (
              <Tag color="red">Чиким</Tag>
            ) : (
              <Tag color="green">Кирим</Tag>
            )}
          </Flex>
        );
      }}
    />
  );
}

export default CategoryPicker;
