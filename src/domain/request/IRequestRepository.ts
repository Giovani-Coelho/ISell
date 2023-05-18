import { IRequestDTO } from "./IRequestDTO";
import { Request } from "./Request";


export interface IRequestRepository {
  create(data: IRequestDTO): Promise<Request>
}