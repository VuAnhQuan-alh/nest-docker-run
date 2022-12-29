export const Constants = {
  pre_router: '/api/v2',
  pageSize: 10,
};

export enum RolesEnum {
  SupperAdmin = 'supper-admin',
  Editor = 'editor',
  User = 'user',
}

export const parserQueries = (query: any) => {
  const result: object[] = [];
  for (const [key, value] of Object.entries(query)) {
    if (value) {
      result.push({ [`${key}`]: value });
    }
  }

  return Object.assign({}, ...result);
};
