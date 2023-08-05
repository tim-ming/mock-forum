export interface IPosts {
  posts: IPost[];
  categories: string[];
}

export interface IPost {
  id: string;
  title: string;
  publishDate: string;
  author: {
    name: string;
    avatar: string;
  };
  summary: string;
  categories: {
    id: string;
    name: string;
  }[];
}
// {
//   "id": "146b8632-ab20-479c-a67d-3cd9f50231e8",
//   "title": "in hac habitasse platea dictumst maecenas ut massa quis augue",
//   "publishDate": "2020-09-28T15:59:05Z",
//   "author": {
//     "name": "Bunnie Mathey",
//     "avatar": "https://robohash.org/quamnonet.jpg?size=50x50&set=set1"
//   },
//   "summary": "Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.",
//   "categories": [
//     {
//       "id": "5ee1187a-26f3-4819-b710-ccd99efc94df",
//       "name": "Surveys and Forms"
//     },
//     {
//       "id": "dc431d44-e26e-4bec-a2bd-a8ba1cd8b95d",
//       "name": "Digital Marketing"
//     },
//     {
//       "id": "0756ceeb-48d1-495a-9e47-8bdbc4a231d4",
//       "name": "Platform News and Updates"
//     },
//     {
//       "id": "b4f70697-928c-4838-8f34-3bf0fc101792",
//       "name": "Tips and Best Practise"
//     }
//   ]
// },