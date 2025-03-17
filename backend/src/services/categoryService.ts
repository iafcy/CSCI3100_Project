const getCategoryList = async () => {
  return [
    {id: 1, name: 'Category 1'},
    {id: 2, name: 'Category 2'},
    {id: 3, name: 'Category 3'},
    {id: 4, name: 'Category 4'},
    {id: 5, name: 'Category 5'},
  ]
}

const getThreadsCountByCategoryId = async (
  categoryId: number
) => {
  return 10;
}

const getThreadsByCategoryId = async (
  categoryId: number
) => {
  return [
    // dummy threads
    {id: 1, username: 'User 1', title: `Thread 1 in Category ${categoryId}`, categoryId: categoryId},
    {id: 2, username: 'User 2', title: `Thread 2 in Category ${categoryId}`, categoryId: categoryId},
    {id: 3, username: 'User 3', title: `Thread 3 in Category ${categoryId}`, categoryId: categoryId},
    {id: 4, username: 'User 4', title: `Thread 4 in Category ${categoryId}`, categoryId: categoryId},
    {id: 5, username: 'User 5', title: `Thread 5 in Category ${categoryId}`, categoryId: categoryId},
    {id: 6, username: 'User 6', title: `Thread 6 in Category ${categoryId}`, categoryId: categoryId},
    {id: 7, username: 'User 7', title: `Thread 7 in Category ${categoryId}`, categoryId: categoryId},
    {id: 8, username: 'User 8', title: `Thread 8 in Category ${categoryId}`, categoryId: categoryId},
    {id: 9, username: 'User 9', title: `Thread 9 in Category ${categoryId}`, categoryId: categoryId},
    {id: 10, username: 'User 10', title: `Thread 10 in Category ${categoryId}`, categoryId: categoryId},
  ];
}

export default {
  getCategoryList,
  getThreadsCountByCategoryId,
  getThreadsByCategoryId,
}