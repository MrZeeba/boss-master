export interface ITable<Type> {
  Validate(): Promise<boolean>;
  Restructure(): void;
  Create(item: Type, callback: (id: number) => void): void;
  Fetch(): Promise<Type[]>;
}
