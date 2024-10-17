import { Avatar, Popover, Button, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useUserStore from "../../stores/userStore";
import useAuthStore from "../../stores/authStore";

function UserProfile() {
  const store = useUserStore();
  const authStore = useAuthStore();
  const content = (
    <div>
      <Divider className="!m-0" />
      <p className="pt-2">
        <strong>Номи:</strong> {store.user?.name || "-"}
      </p>
      <p className="pb-2">
        <strong>Логин:</strong> {store.user?.username || "-"}
      </p>
      <Divider className="!m-0" />
      <Button
        type="text"
        className="w-full mt-4 border-gray-300"
        onClick={() => authStore.logout()}
      >
        Тизимдан чикиш
      </Button>
    </div>
  );

  return (
    <Popover content={content} title="Фойдаланувчи" trigger="click">
      <Avatar size={40} icon={<UserOutlined />} style={{ cursor: "pointer" }}>
        {store.user?.name || "-"}
      </Avatar>
    </Popover>
  );
}

export default UserProfile;
