import {
  FileExcelOutlined,
  MinusOutlined,
  PlusOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Flex,
  Select,
  Tooltip,
  Typography,
} from "antd";
import { useToggle } from "react-use";
import CreateRecord from "./createRecord";
import usePlaceStore from "../../../stores/placeStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useRecordStore from "../../../stores/recordStore";
import { formatNumber } from "../../../utils/format";
import EmployeerDialog from "./employeerDialog";

function FilterPanel() {
  const [categoryType, setCategoryType] = useState<
    "all" | "expense" | "income" | "communal"
  >();
  const store = useRecordStore();
  const { getCurrentPlace, currentPlace, currentPlaceLoading } =
    usePlaceStore();
  const { id } = useParams();
  const [employersDialogOpen, toggleEmployersDialogOpen] = useToggle(false);

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
      {categoryType && (
        <CreateRecord
          categoryType={categoryType}
          onClose={() => {
            setCategoryType(undefined);
          }}
        />
      )}
      {id && employersDialogOpen && (
        <EmployeerDialog
          onClose={toggleEmployersDialogOpen}
          placeId={Number(id)}
        />
      )}
      <Flex
        className="h-[40px] px-3 w-full"
        align="center"
        justify="space-between"
      >
        <Flex align="center" gap={8}>
          <Typography.Text>{currentPlace?.name ?? "-"}</Typography.Text>
          <Typography.Text>
            (Умумий ишчилар сони: {currentPlace?.employee_count ?? "-"})
          </Typography.Text>
          <Typography.Text style={{ fontWeight: "bold" }}>
            (Фарки: {formatNumber(store.totalSum)})
          </Typography.Text>
        </Flex>
        <Flex align="center" gap={8}>
          <Tooltip title="Тизимдаги ишчилар">
            <Button
              iconPosition="start"
              type="primary"
              loading={currentPlaceLoading}
              icon={<UserSwitchOutlined />}
              onClick={toggleEmployersDialogOpen}
            />
          </Tooltip>
          <Button
            iconPosition="start"
            type="primary"
            loading={currentPlaceLoading}
            icon={<FileExcelOutlined />}
            onClick={() => {
              navigate(`/app/report/${id}`);
            }}
          >
            Хисобот (Сумма)
          </Button>
          <Button
            iconPosition="start"
            type="primary"
            loading={currentPlaceLoading}
            icon={<FileExcelOutlined />}
            onClick={() => {
              navigate(`/app/report-value/${id}`);
            }}
          >
            Хисобот (Улчов бирликлар)
          </Button>
          <Button
            icon={<MinusOutlined />}
            iconPosition="start"
            type="primary"
            style={{ backgroundColor: "red" }}
            onClick={() => {
              setCategoryType("communal");
            }}
            loading={currentPlaceLoading}
          >
            Коммунал
          </Button>
          <Button
            icon={<MinusOutlined />}
            iconPosition="start"
            type="primary"
            style={{ backgroundColor: "red" }}
            onClick={() => {
              setCategoryType("expense");
            }}
            loading={currentPlaceLoading}
          >
            Чиким
          </Button>
          <Button
            icon={<PlusOutlined />}
            iconPosition="start"
            type="primary"
            style={{ backgroundColor: "green" }}
            onClick={() => {
              setCategoryType("income");
            }}
            loading={currentPlaceLoading}
          >
            Кирим
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}

export default FilterPanel;
