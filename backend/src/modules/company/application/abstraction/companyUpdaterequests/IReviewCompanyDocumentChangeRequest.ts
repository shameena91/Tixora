
import { ReviewCompanyDocumentChangeRequestDTO,
     ReviewCompanyDocumentChangeResponseDTO } from "../../dto/ReviewCompanyDocumentChangeDTO";

export interface IReviewCompanyDocumentChangeRequest {
  execute(
    requestId: string,
    reviewerId: string,
    dto: ReviewCompanyDocumentChangeRequestDTO,
  ): Promise<ReviewCompanyDocumentChangeResponseDTO>;
}