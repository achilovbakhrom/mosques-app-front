import { useCallback, useEffect, useState } from "react";

import debounce from "lodash.debounce";
import Select, { DefaultOptionType, SelectProps } from "antd/es/select";
import { Paginated } from "../../../../model/Paginated";
import instance from "../../../../api/instance";

export type AsyncAutocompleteEvent<R> = {
  onChange?: (
    value: any,
    option: DefaultOptionType | DefaultOptionType[],
    originalItem?: R
  ) => void;
};

export type Props<R> = Omit<SelectProps, "onChange"> & {
  path?: string;
  searchKey: string;
  mapper: (arg: R) => { value: string; label: string };
  filter?: (arg: R) => boolean;
  getOriginalData?: (value: string, items: R[]) => R | undefined;
  isReadyForRequest?: boolean;
  params?: any;
  lazy?: boolean;
} & AsyncAutocompleteEvent<R>;

function AsyncAutocomplete<T>(props: Props<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<DefaultOptionType[]>();
  const [originalData, setOriginalData] = useState<T[]>([]);
  const [open, setOpen] = useState(false);

  const {
    mapper,
    searchKey,
    path,
    isReadyForRequest,
    params = {},
    ...rest
  } = props;

  console.log("options", options);

  const lookup = useCallback(
    debounce((arg: string) => {
      if (isReadyForRequest === false) {
        setOptions([]);
        setOriginalData([]);

        return;
      }
      setIsLoading(true);
      instance
        .get<Paginated<T>>(path ?? "", {
          params: { ...params, [searchKey]: arg },
        })
        .then((response) => {
          setOriginalData(response.data.results ?? []);
          if (props.filter) {
            setOptions(
              response.data.results?.filter(props.filter).map(mapper) ?? []
            );
          } else {
            setOptions(response.data.results?.map(mapper) ?? []);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 300),
    [options, isReadyForRequest, path]
  );

  useEffect(() => {
    if (path && !props.lazy) {
      lookup("");
    }
  }, [path, props.lazy]);

  useEffect(() => {
    if (path) {
      if (props.lazy && open && !options) {
        lookup("");
      }
    }
  }, [props.lazy, path, open, options]);
  console.log("rest", rest.value);
  return (
    <Select
      {...rest}
      open={open}
      onDropdownVisibleChange={setOpen}
      onChange={(arg, option) => {
        let originalItem: T | undefined = undefined;
        if (props.getOriginalData) {
          originalItem = props.getOriginalData(arg, originalData);
        }
        rest.onChange?.(arg, option, originalItem);
      }}
      filterOption={false}
      options={options}
      onSearch={lookup}
      loading={isLoading}
      showSearch
      allowClear
    />
  );
}

export default AsyncAutocomplete;
