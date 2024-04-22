interface IDbChildTable<Type> {
  Create(
    parentId: number,
    item: Type,
    callback: (id: number | undefined) => void,
  );
}
