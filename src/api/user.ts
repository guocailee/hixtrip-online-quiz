import { Ref } from "vue";
import delay from "../utils/delay";
interface User {
  id: string;
  name: string;
  orgId: string;
}
// const getUserData = (): User[] => {
//   const count = Math.floor(Math.random() * 20)
//   return Array(count)
//     .fill(0)
//     .map(() => {
//       return {
//         id: Math.random() + '',
//         name: (Math.random() + 1).toString(36).substring(7),
//       }
//     })
// }

const userList: User[] = [
  {
    id: "1",
    name: "xxxx",
    orgId: "1",
  },
  {
    id: "2",
    name: "cccc",
    orgId: "1",
  },
  {
    id: "3",
    name: "vvvv",
    orgId: "2",
  },
  {
    id: "4",
    name: "bbbb",
    orgId: "3",
  },
  {
    id: "5",
    name: "nnnn",
    orgId: "4",
  },
];

interface Params {
  name: string;
  orgId: string;
}

const query = (params: Params) => {
  let list: User[] = userList;
  if (params.name) list = list.filter((v) => v.name === params.name);
  if (params.orgId) list = list.filter((v) => v.orgId === params.orgId);
  return delay(list);
};

const userApi = {
  query,
};

export default userApi;
