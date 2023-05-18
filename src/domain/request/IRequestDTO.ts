import { TRequestStatus } from "./TRequestStatus";


export interface IRequestDTO {
  account_id: string,
  status: TRequestStatus
}