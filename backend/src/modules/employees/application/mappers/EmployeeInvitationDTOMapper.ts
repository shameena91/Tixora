import { EmployeeInvitation } from "../../domain/entities/EmployeeInvitation";
import { EmployeeInvitationResponseDTO } from "../dtos/EmployeeInvitationDtos";

export class EmployeeInvitationDTOMapper {
  static toResponse(
    invitation: EmployeeInvitation,
  ): EmployeeInvitationResponseDTO {
    return {
      id: invitation.id,
      accountId: invitation.accountId,
      companyId:invitation.companyId,
      expiresAt: invitation.expiresAt,
      acceptedAt: invitation.acceptedAt,
      createdAt: invitation.createdAt,
    };
  }
}
