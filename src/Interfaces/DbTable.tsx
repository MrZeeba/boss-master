interface DbTable<Type> {
  Validate();
  Create(item: Type, callback: (id: number | undefined) => void);
  GetAll(callback: (result: Type[]) => void);
  Delete(
    id: number,
    callback: (result: { errors: string; recordsDeleted: number }) => void,
  );
}
