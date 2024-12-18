import { Button, Flex, Input, Table } from "antd";
import { Place } from "../../../model/Place";
import { useMemo, useState } from "react";
import { PAGE_SIZE_OPTIONS } from "../../../constant";
import { FileExcelOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type Props = {
  data: Place[];
  page: number;
  size: number;
  total: number;
  loading: boolean;
  onPaginationChange: (page: number, size: number) => void;
  onRowClick: (data: Place) => void;
};

function PlaceList(props: Props) {
  const scrollY = useMemo(() => {
    const height = window.innerHeight;
    return height - 220;
  }, []);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <Table
      size="small"
      sticky
      dataSource={props.data.filter((item) => {
        const s = search.toLowerCase();
        const w = item.name.toLocaleLowerCase();
        if (search) {
          return item.inn?.includes(search) || w.includes(s);
        }
        return true;
      })}
      loading={props.loading}
      onRow={(data) => ({
        onClick: () => props.onRowClick(data),
      })}
      columns={[
        { key: "id", dataIndex: "id", width: 50, title: "ID" },
        {
          key: "name",
          title: (
            <Flex className="w-full" gap={10} align="center">
              Жой номи{" "}
              <span>
                <Input
                  size="small"
                  className="w-[300px]"
                  placeholder="ИНН буйича кидирув"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </span>
            </Flex>
          ),
          render: ({ id, name, inn, is_mosque }) => (
            <Flex justify="space-between" align="center">
              <p>
                {name} &nbsp; &nbsp;{inn ? <strong>(ИНН: {inn})</strong> : null}
              </p>
              {!is_mosque && (
                <Flex align="center" gap={10}>
                  <Button
                    icon={<FileExcelOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      navigate(`/app/place/top-level-report/${id}`);
                    }}
                  >
                    Хисобот
                  </Button>
                  <Button
                    icon={<FileExcelOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      navigate(`/app/report-value/${id}`);
                    }}
                  >
                    Хисобот (Коммунал)
                  </Button>
                </Flex>
              )}
            </Flex>
          ),
        },
      ]}
      scroll={{ y: scrollY }}
      pagination={{
        disabled: props.loading,
        total: props.total,
        current: props.page,
        pageSize: props.size,
        onChange: props.onPaginationChange,
        pageSizeOptions: PAGE_SIZE_OPTIONS,
        showQuickJumper: true,
        showSizeChanger: true,
      }}
    />
  );
}

export default PlaceList;
