export default interface ILoginService<T, Y> {
    login(credential: T): Promise<Y>;
}
