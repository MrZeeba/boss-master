interface DbTable<Type> {
  tableName: string;
  Validate();
  Create(item: Type, callback: (id: number | undefined) => void);
  Delete(
    id: number,
    callback: (result: { errors: string; recordsDeleted: number }) => void,
  );
}
