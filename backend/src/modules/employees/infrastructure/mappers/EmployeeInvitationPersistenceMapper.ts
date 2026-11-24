
import { Types } from "mongoose";
import { EmployeeInvitation } from "../../domain/entities/EmployeeInvitation";
import { EmployeeInvitationDocument } from "../database/modals/EmployeeInvitationModel";

export interface EmployeeInvitationCreateData {
  accountId: Types.ObjectId;
  invitedByAccountId: Types.ObjectId;
  companyId:Types.ObjectId,
  tokenHash: string;
  expiresAt: Date;
  acceptedAt: Date | null;
}

export type EmployeeInvitationUpdateData = Partial<
  Pick<
    EmployeeInvitation,
    "tokenHash" | "expiresAt" | "acceptedAt"
  >
>;

export class EmployeeInvitationPersistenceMapper {
  static toDomain(
    document: EmployeeInvitationDocument,
  ): EmployeeInvitation {
    return new EmployeeInvitation(
      document._id.toString(),
      document.accountId.toString(),
      document.invitedByAccountId.toString(),
      document.companyId.toString(),
      document.tokenHash,
      document.expiresAt,
      document.acceptedAt,
      document.createdAt,
      document.updatedAt,
    );
  }

  static toCreateData(
    invitation: EmployeeInvitation,
  ): EmployeeInvitationCreateData {
    return {
      accountId: new Types.ObjectId(invitation.accountId),
      invitedByAccountId: new Types.ObjectId(
        invitation.invitedByAccountId,
      ),

      companyId:new Types.ObjectId(
        invitation.companyId,
      ),
      tokenHash: invitation.tokenHash,
      expiresAt: invitation.expiresAt,
      acceptedAt: invitation.acceptedAt,
    };
  }

  static toUpdateData(
    data: EmployeeInvitationUpdateData,
  ): Partial<EmployeeInvitationDocument> {
    return {
      ...(data.tokenHash !== undefined && {
        tokenHash: data.tokenHash,
      }),
      ...(data.expiresAt !== undefined && {
        expiresAt: data.expiresAt,
      }),
      ...(data.acceptedAt !== undefined && {
        acceptedAt: data.acceptedAt,
      }),
    };
  }
}
