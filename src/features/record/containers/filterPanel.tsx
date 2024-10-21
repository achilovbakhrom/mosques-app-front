import { FileExcelOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Flex, Select, Typography } from "antd";
import { useToggle } from "react-use";
import CreateRecord from "./createRecord";
import usePlaceStore from "../../../stores/placeStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import useRecordStore from "../../../stores/recordStore";
import { formatNumber } from "../../../utils/format";

function FilterPanel() {
  const [open, toggleOpen] = useToggle(false);
  const store = useRecordStore();
  const { getCurrentPlace, currentPlace, currentPlaceLoading } =
    usePlaceStore();
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
      {open && <CreateRecord onClose={toggleOpen} />}
      <Flex
        className="h-[40px] px-3 w-full"
        align="center"
        justify="space-between"
      >
        <Flex align="center" gap={8}>
          <Typography.Text>{currentPlace?.name ?? "-"}</Typography.Text>
          <Typography.Text style={{ fontWeight: "bold" }}>
            (Фарки: {formatNumber(store.totalSum)})
          </Typography.Text>
        </Flex>
        <Flex align="center" gap={8}>
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
