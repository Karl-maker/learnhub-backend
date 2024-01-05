interface IServer {
  use(middleware: any): void;
  route(method: ServerMethodType, path: string, ...handler: any[]): void;
  start(port: number): void;
}

export type ServerMethodType = 'get' | 'post' | 'put' | 'delete' | 'patch';
export default IServer;
