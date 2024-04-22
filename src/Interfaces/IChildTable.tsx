interface IChildTable<Type> extends ITable<Type> {
  Create(
    item: Type,
    parentId: number,
    callback: (id: number | undefined) => void,
  ): void;
}