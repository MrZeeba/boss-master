interface ITable<Type> {
  Validate();
  Create(item: Type, callback: (id: number) => void): void;
}
