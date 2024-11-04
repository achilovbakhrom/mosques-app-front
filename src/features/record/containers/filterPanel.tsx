import {
  FileExcelOutlined,
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
import { useEffect } from "react";
import useRecordStore from "../../../stores/recordStore";
import { formatNumber } from "../../../utils/format";
import EmployeerDialog from "./employeerDialog";

function FilterPanel() {
  const [open, toggleOpen] = useToggle(false);
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
      {open && <CreateRecord onClose={toggleOpen} />}
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
            Хисобот
          </Button>
          <Button
            icon={<PlusOutlined />}
            iconPosition="start"
            type="primary"
            onClick={toggleOpen}
            loading={currentPlaceLoading}
          >
            Катор кушиш
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}

export default FilterPanel;
