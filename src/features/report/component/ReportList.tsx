import { useMemo } from "react";
import { Table, Typography } from "antd";
import { formatNumber } from "../../../utils/format";
import { Report, ReportType } from "../../../model/Report";
import { FORMATTER } from "../../../stores/reportstore";
import dayjs from "dayjs";

type Props = {
  data?: Report;
  loading: boolean;
  reportType: ReportType;
};

const FORMATS = {
  [ReportType.Daily]: "DD MMMM, YYYY",
  [ReportType.Weekly]: "",
  [ReportType.Monthly]: "MMMM, YYYY",
};

const FORMATTER_FROM = {
  [ReportType.Daily]: FORMATTER,
  [ReportType.Weekly]: "",
  [ReportType.Monthly]: "YYYY-MM",
};

function ReportList(props: Props) {
  const scrollY = useMemo(() => {
    const height = window.innerHeight;
    return height - 200;
  }, []);

  const [columns, x] = useMemo(() => {
    const CATEGORY_COL_WIDTH = 300;
    const TOTAL_COL_WIDTH = 200;
    const COLS_WIDTH = 140;

    const data = props.data?.data ?? [];

    const titles = props.data?.periods ?? [];
    const result: any = [
      {
        key: "title",
        title: "Категория",
        minWidth: CATEGORY_COL_WIDTH,
        render: (value: any) => (
          <Typography style={{ fontWeight: "bold" }}>{value[0]}</Typography>
        ),
      },
    ];

    for (const title of titles) {
      const idx = titles.indexOf(title);
      const formatter = FORMATS[props.reportType];
      const formattedDate = formatter
        ? dayjs(title, FORMATTER_FROM[props.reportType]).format(formatter)
        : title;

      result.push({
        key: title,
        title: formattedDate,
        width: COLS_WIDTH,
        align: "right",
        render: (value: any, _: any, index: number) => {
          const v = value[idx + 1];
          let color = "black";
          if (v > 0) {
            color = "green";
          } else if (v < 0) {
            color = "red";
          }
          return (
            <Typography
              style={{
                color,
                fontWeight:
                  index === (props.data?.data.length ?? 0) - 1
                    ? "bold"
                    : "normal",
              }}
            >
              {formatNumber(v)}
            </Typography>
          );
        },
      });
    }

    result.push({
      key: "total",
      title: "Жами",
      width: TOTAL_COL_WIDTH,
      align: "right",
      render: (value: any) => {
        const v = value[value.length - 1];
        let color = "black";
        if (v > 0) {
          color = "green";
        } else if (v < 0) {
          color = "red";
        }
        return (
          <Typography style={{ color, fontWeight: "bold" }}>
            {formatNumber(v)}
          </Typography>
        );
      },
    });

    const colsNumber = data.length ? data[0].length : 0;

    const x = (colsNumber - 2) * COLS_WIDTH + 300 + 200;

    return [result, x];
  }, [props.data]);

  return (
    <Table
      size="small"
      sticky
      dataSource={props.data?.data}
      loading={props.loading}
      columns={columns}
      scroll={{ y: scrollY, x }}
      pagination={false}
    />
  );
}

export default ReportList;
