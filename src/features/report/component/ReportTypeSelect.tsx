import { Select, SelectProps } from "antd";
import { ReportType } from "../../../model/Report";

const options = [
  { label: "Кунлик", value: ReportType.Daily },
  { label: "Хафталик", value: ReportType.Weekly },
  { label: "Ойлик", value: ReportType.Monthly },
];

type Props = SelectProps;

function ReportTypeSelect(props: Props) {
  return (
    <Select
      {...props}
      options={options}
      style={{ minWidth: 200 }}
      placeholder="Хисобот тури"
    />
  );
}

export default ReportTypeSelect;
