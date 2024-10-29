export interface IService<IRequest, IResponse> {
  execute(params: IRequest): Promise<IResponse>
}
