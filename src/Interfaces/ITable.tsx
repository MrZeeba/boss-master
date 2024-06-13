export interface ITable<Type> {
  Validate(): Promise<boolean>;
  Restructure(): void;
  Fetch(): Promise<Type[]>;
  Create(item: Type): Promise<number>;
}
