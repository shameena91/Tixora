export interface IBaseRepository<T, CreateData = T> {  
  create(data: CreateData): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
}



//T=returndata and createData=givingData it takes createData abd return typr T if not explicitely
// given the Type the given data will be T