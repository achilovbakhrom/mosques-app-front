import { Button, Card, DatePicker, Flex, Typography } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import usePlaceStore from "../../../stores/placeStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import useReportStore, { FORMATTER } from "../../../stores/reportstore";
import dayjs from "dayjs";
import ReportTypeSelect from "../component/ReportTypeSelect";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

  console.log("sss", JSON.stringify(store.data, null, 2));

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

  const formatTableData = (tableData: any) => {
    const rows = [];
    const periods = tableData.data.periods;
    const dataRows = tableData.data.data;

    // Header row
    const headerRow = ["Категория", ...periods];
    rows.push(headerRow);

    // Data rows
    dataRows.forEach((dataRow: any) => {
      rows.push(dataRow);
    });

    // Convert rows to array of objects
    const formattedRows = rows.map((row: any) => {
      const rowObj: any = {};
      row.forEach((cell: any, idx: number) => {
        rowObj[`TableCol_${idx}`] = cell;
      });
      return rowObj;
    });

    return formattedRows;
  };

  const flattenData = (data: any, level = 0, parentLevels = []) => {
    let rows: any = [];
    data.forEach((item: any) => {
      const currentLevels: any = [...parentLevels];
      while (currentLevels.length < level) {
        currentLevels.push("");
      }
      currentLevels.push(item.title);

      const row = {
        ...currentLevels.reduce((acc: any, title: string, idx: number) => {
          acc[`Даража ${idx + 1}`] = title;
          return acc;
        }, {}),
        Кирим: item.income,
        Чиким: item.expense,
        Фарки: item.difference,
      };

      rows.push(row);

      if (item.children && item.children.length > 0) {
        const childRows = flattenData(item.children, level + 1, currentLevels);
        rows = rows.concat(childRows);
      } else {
        const tableData = store.getDataForTable(item.title);
        if (tableData) {
          const formattedTableData = formatTableData(tableData);
          // rows.push({});
          rows = rows.concat(formattedTableData);
          // rows.push({});
        }
      }
    });
    return rows;
  };

  const exportToExcelBig = () => {
    const rows = flattenData(store.handledData);

    // Collect all headers used in the rows
    const headersSet = new Set();
    rows.forEach((row: any) => {
      Object.keys(row).forEach((key) => headersSet.add(key));
    });

    // Convert the set to an array and sort the headers
    const headers = Array.from(headersSet);
    headers.sort((a: any, b: any) => {
      // Hierarchy levels come first
      if (a.startsWith("Даража") && b.startsWith("Даража")) {
        return (
          parseInt(a.replace("Даража ", "")) -
          parseInt(b.replace("Даража ", ""))
        );
      }
      if (a.startsWith("Даража")) return -1;
      if (b.startsWith("Даража")) return 1;
      const order = ["Кирим", "Чиким", "Фарки"];
      if (order.includes(a) && order.includes(b)) {
        return order.indexOf(a) - order.indexOf(b);
      }
      if (order.includes(a)) return -1;
      if (order.includes(b)) return 1;
      // Then table columns
      if (a.startsWith("TableCol") && b.startsWith("TableCol")) {
        return (
          parseInt(a.replace("TableCol_", "")) -
          parseInt(b.replace("TableCol_", ""))
        );
      }
      return 0;
    });

    // Build worksheet data
    const worksheetData = [
      headers.map((h: any) => (h.startsWith("TableCol_") ? "" : h)),
    ];
    worksheetData.push(
      ...rows.map((row: any) => headers.map((h: any) => row[h] || ""))
    );

    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Create workbook and add worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Write workbook and trigger download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "hisobot.xlsx");
  };

  const formatDataForExcel = (data: any) => {
    const rows = [];
    const periods = data.periods;
    const dataRows = data.data;

    // Header row
    const headerRow = ["Категория", ...periods];
    rows.push(headerRow);

    // Data rows
    dataRows.forEach((rowData: any) => {
      rows.push(rowData);
    });

    return rows;
  };

  const exportDataToExcelSmall = () => {
    const worksheetData = formatDataForExcel(store.data);

    // Create worksheet from the data
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Create workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Generate Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "hisobot-masjid.xlsx");
  };

  return (
    <Card className="shadow-sm !p-0" styles={{ body: { padding: "8px 16px" } }}>
      <Flex
        className="h-[40px] px-3 w-full"
        align="center"
        justify="space-between"
      >
        <Flex gap={6} align="center">
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

        <Button
          type="primary"
          icon={<FileExcelOutlined />}
          loading={store.loading || store.hierarchicalLoading}
          onClick={props.isMosque ? exportDataToExcelSmall : exportToExcelBig}
        >
          Экселга чикариш
        </Button>
      </Flex>
    </Card>
  );
}

export default FilterPanel;
