import { Card, DatePicker, Flex, Typography } from "antd";
import usePlaceStore from "../../../stores/placeStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import useReportValueStore, {
  FORMATTER,
} from "../../../stores/reportValueStore";
import dayjs from "dayjs";

const stringToDayJS = (arg: string) => dayjs(arg, FORMATTER);

function FilterPanel() {
  const store = useReportValueStore();
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
    return [
      store.start ? stringToDayJS(store.start) : null,
      store.end ? stringToDayJS(store.end) : null,
    ];
  }, [store.start, store.end]);

  return (
    <Card className="shadow-sm !p-0" styles={{ body: { padding: "8px 16px" } }}>
      <Flex
        className="h-[40px] px-3 w-full"
        align="center"
        justify="space-between"
      >
        <Flex gap={6} align="center">
          <Typography.Text className="font-bold mr-3">
            {currentPlace?.name ?? "-"}
          </Typography.Text>
          <DatePicker.RangePicker
            value={dates as any}
            onChange={(_, [date1, date2]) => {
              console.log("ddd", date1, date2);
              store.setDates(date1, date2);
            }}
            allowClear={false}
          />
        </Flex>
      </Flex>
    </Card>
  );
}

export default FilterPanel;
