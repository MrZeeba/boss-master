interface ITable<Type> {
  Validate(): boolean;
  Create(item: Type, callback: (id: number) => void): void;
  Delete(
    id: number,
    callback: (result: { errors: string; recordsDeleted: number }) => void,
  ): void;
}
