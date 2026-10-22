export interface IExpireSubscriptionsUseCase {
  execute(): Promise<number>;
}