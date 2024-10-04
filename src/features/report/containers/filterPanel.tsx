import { Card, DatePicker, Flex, Typography } from "antd";
import usePlaceStore from "../../../stores/placeStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import useReportStore, { FORMATTER } from "../../../stores/reportstore";
import dayjs, { Dayjs } from "dayjs";
import ReportTypeSelect from "../component/ReportTypeSelect";

const stringToDayJS = (arg: string) => dayjs(arg, FORMATTER);
// const dayjsToString = (arg: Dayjs) => arg.format(FORMATTER);

function FilterPanel() {
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

  return (
    <Card className="shadow-sm !p-0" styles={{ body: { padding: "8px 16px" } }}>
      <Flex className="h-[40px] px-3 w-full" align="center" gap={6}>
        <Typography.Text>{currentPlace?.name ?? "-"}</Typography.Text>
        <DatePicker.RangePicker
          value={[
            store.start ? stringToDayJS(store.start) : null,
            store.end ? stringToDayJS(store.end) : null,
          ]}
          onChange={(_, [date1, date2]) => {
            store.setDates(date1, date2);
          }}
          allowClear={false}
        />
        <ReportTypeSelect
          onChange={(value) => store.setReportType(value)}
          value={store.reportType}
          allowClear={false}
        />
      </Flex>
    </Card>
  );
}

export default FilterPanel;
