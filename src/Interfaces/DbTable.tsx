interface DbTable<Type> {
  tableName: string;
  Validate();
  Create(item: Type, callback: (id: number | undefined) => void);
}
