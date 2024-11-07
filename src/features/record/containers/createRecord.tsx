import {
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Typography,
} from "antd";

import CategoryPicker from "../../shared/pickers/categoryPicker";
import { Category, OperationType } from "../../../model/Category";
import { useState } from "react";
import useRecordStore from "../../../stores/recordStore";
import usePlaceStore from "../../../stores/placeStore";
import dayjs from "dayjs";

type Props = {
  onClose: () => void;
  categoryType: "all" | "expense" | "income" | "communal";
};

interface FormState {
  date?: dayjs.Dayjs;
  category: Category;
  amount: number;
  quantity?: number;
  description?: string;
}

function CreateRecord(props: Props) {
  const [form] = Form.useForm<FormState>();

  const [category, setCategory] = useState<Category>();
  const [isCategoryDirty, setIsCategoryDirty] = useState(false);
  const store = useRecordStore();
  const placeStore = usePlaceStore();

  return (
    <Modal
      title="Катор кушиш"
      open
      onOk={() => {
        setIsCategoryDirty(true);
        form.submit();
      }}
      onCancel={props.onClose}
    >
      <Form
        form={form}
        onFinish={async (values) => {
          await store.createRecord(
            {
              date: values.date?.format("YYYY-MM-DD"),
              category,
              amount: values.amount,
              quantity: values.quantity,
              description: values.description,
              place: placeStore.currentPlace,
            },
            props.onClose
          );
        }}
      >
        <Flex className="w-full">
          <Typography.Text className="flex-1">Санани киритинг:</Typography.Text>

          <Form.Item
            name="date"
            rules={[{ required: true }]}
            initialValue={dayjs()}
          >
            <DatePicker placeholder="Сана" className="w-full" />
          </Form.Item>
        </Flex>
        <Flex className="w-full">
          <Typography.Text className="flex-1">
            Категорияни танланг:
          </Typography.Text>

          <Form.Item className="w-1/2" rules={[{ required: true }]}>
            <CategoryPicker
              onChange={(_, __, originalData) => {
                form.setFieldValue("category", originalData);
                setCategory(originalData);
                setIsCategoryDirty(true);
              }}
              filter={(arg) => {
                switch (props.categoryType) {
                  case "all":
                    return true;
                  case "income":
                    return arg.operation_type === OperationType.Income;
                  case "expense":
                    return arg.operation_type === OperationType.Expense;
                  case "communal":
                    return !!arg.is_communal;
                  default:
                    return true;
                }
              }}
              value={category ? String(category.id) : null}
              status={isCategoryDirty && !category ? "error" : undefined}
            />
            {isCategoryDirty && !category && (
              <Form.ErrorList
                errors={[<span className="text-red-500">Required Field</span>]}
              />
            )}
          </Form.Item>
        </Flex>
        <Flex className="w-full">
          <Typography.Text className="flex-1">
            Суммани киритинг:
          </Typography.Text>
          <Form.Item
            name="amount"
            className="w-1/2"
            rules={[{ required: true }]}
          >
            <InputNumber className="w-full" min={0} />
          </Form.Item>
        </Flex>
        {category?.unit && (
          <Flex className="w-full">
            <Typography.Text className="flex-1">
              Бирлик кийматини киритинг:
            </Typography.Text>
            <Form.Item
              name="quantity"
              className="w-1/2"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    // If Field A is set, Field B is required
                    const category = getFieldValue("category");
                    if (!category || !category.unit || value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Бирлик кийматини киритиш шарт!")
                    );
                  },
                }),
              ]}
            >
              <InputNumber
                addonAfter={
                  <Typography.Text>{category.unit.name}</Typography.Text>
                }
                min={0}
              />
            </Form.Item>
          </Flex>
        )}
        <Form.Item name="description">
          <Input.TextArea
            rows={4}
            placeholder="Изох колдиринг"
            className="w-full"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateRecord;
