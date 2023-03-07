import delay from "../utils/delay";
interface Org {
  id: string;
  name: string;
  children?: Org[];
}
// const getOrgData = (): Org[] => {
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

const orgList: Org[] = [
  {
    id: "1",
    name: "厦门嗨行旅游 · 10",
    children: [
      {
        id: "2",
        name: "技术部",
        children: [
          {
            id: '4',
            name: '运营部'
          }
        ]
      },
      {
        id: "3",
        name: "未分配部门",
      },
    ],
  },
];

const query = (parentId: string = "0") => {
  return delay(orgList);
};

const orgApi = {
  query,
};

export default orgApi;
