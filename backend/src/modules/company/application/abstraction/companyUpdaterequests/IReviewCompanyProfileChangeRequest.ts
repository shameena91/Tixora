import { ReviewCompanyProfileChangeRequestDTO, ReviewCompanyProfileChangeResponseDTO } from "../../dto/ReviewCompanyProfileChangeDTO";

 
 
 export interface IReviewCompanyProfileChangeRequest{
 
 execute(
    requestId: string,
    reviewerId: string,
    dto: ReviewCompanyProfileChangeRequestDTO,
  ): Promise<ReviewCompanyProfileChangeResponseDTO> 
 }
