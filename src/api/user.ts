import delay from "../utils/delay";
interface User {
  id: string;
  name: string;
  orgId: string;
}
const getUserData = (params: Partial<User & { orgId: string }>): User[] => {
  const { orgId = "", name = "" } = params;
  const count = Math.floor(Math.random() * 20);
  return Array(count)
    .fill(0)
    .map(() => {
      return {
        id: Math.random() + "",
        name: name + (Math.random() + 1).toString(36).substring(7), // 添加输入的用户
        orgId,
      };
    });
};

const query = (params: Partial<User & { orgId: string }>) => {
  return delay(getUserData(params));
};

const userApi = {
  query,
};

export default userApi;
