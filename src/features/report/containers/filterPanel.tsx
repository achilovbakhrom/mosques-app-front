import { Card, DatePicker, Flex, Typography } from "antd";
import usePlaceStore from "../../../stores/placeStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import useReportStore, { FORMATTER } from "../../../stores/reportstore";
import dayjs from "dayjs";
import ReportTypeSelect from "../component/ReportTypeSelect";

const stringToDayJS = (arg: string) => dayjs(arg, FORMATTER);

type Props = {
  isMosque: boolean;
};

function FilterPanel(props: Props) {
  const store = useReportStore();
  const { getCurrentPlace, currentPlace } = usePlaceStore();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getCurrentPlace(Number(id));
    } else {
      navigate("/app");
    }
  }, [id]);

  const dates = useMemo(() => {
    if (props.isMosque) {
      return [
        store.start ? stringToDayJS(store.start) : null,
        store.end ? stringToDayJS(store.end) : null,
      ];
    } else {
      return [
        store.hierarchicalStart ? stringToDayJS(store.hierarchicalStart) : null,
        store.hierarchicalEnd ? stringToDayJS(store.hierarchicalEnd) : null,
      ];
    }
  }, [
    store.start,
    store.end,
    store.hierarchicalStart,
    store.hierarchicalEnd,
    props.isMosque,
  ]);

  return (
    <Card className="shadow-sm !p-0" styles={{ body: { padding: "8px 16px" } }}>
      <Flex className="h-[40px] px-3 w-full" align="center" gap={6}>
        <Typography.Text>{currentPlace?.name ?? "-"}</Typography.Text>
        <DatePicker.RangePicker
          value={dates as any}
          onChange={(_, [date1, date2]) => {
            if (props.isMosque) {
              store.setDates(date1, date2);
            } else {
              store.setHierarchicalDates(date1, date2);
            }
          }}
          allowClear={false}
        />
        <ReportTypeSelect
          onChange={(value) => {
            if (props.isMosque) {
              store.setReportType(value);
            } else {
              store.setHierarchicalReportType(value);
            }
          }}
          value={
            props.isMosque ? store.reportType : store.hierarchicalReportType
          }
          allowClear={false}
        />
      </Flex>
    </Card>
  );
}

export default FilterPanel;
