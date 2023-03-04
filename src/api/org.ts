import delay from "../utils/delay";
interface Org {
  id: string;
  name: string;
  parentId: string;
  hasChildren?: boolean;
  children?: Org[];
}
const getOrgData = (parentId: string = "0"): Org[] => {
  const count = Math.floor(Math.random() * 20);
  return Array(count)
    .fill(0)
    .map(() => {
      return {
        id: Math.random() + "",
        name: (Math.random() + 1).toString(36).substring(7),
        parentId,
        hasChildren: Math.random() >= 0.5, // 随机 是否有子集部门
      };
    });
};

const query = (parentId: string = "0") => {
  return delay(getOrgData(parentId));
};

const orgApi = {
  query,
};

export default orgApi;
