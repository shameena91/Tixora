import { Types } from "mongoose";

import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";

import { EmployeeInvitation } from "../../../domain/entities/EmployeeInvitation";
import { IEmployeeInvitationRepository } from "../../../domain/repositories/IEmployeeInvitationRepository";

import {
  EmployeeInvitationPersistenceMapper,
  EmployeeInvitationCreateData,
} from "../../mappers/EmployeeInvitationPersistenceMapper";

import {
  EmployeeInvitationDocument,
  EmployeeInvitationModel,
} from "../modals/EmployeeInvitationModel";

export class EmployeeInvitationRepository
  extends BaseRepository<
    EmployeeInvitationDocument,
    EmployeeInvitationCreateData
  >
  implements IEmployeeInvitationRepository
{
  constructor() {
    super(EmployeeInvitationModel);
  }

  async createInvitation(
    invitation: EmployeeInvitation,
  ): Promise<EmployeeInvitation> {
    const createData =
      EmployeeInvitationPersistenceMapper.toCreateData(invitation);

    const document = await super.create(createData);

    return EmployeeInvitationPersistenceMapper.toDomain(document);
  }

  async findByAccountId(
    accountId: string,
  ): Promise<EmployeeInvitation | null> {
    const document = await super.findOne({
      accountId: new Types.ObjectId(accountId),
    });

    if (!document) return null;

    return EmployeeInvitationPersistenceMapper.toDomain(document);
  }

  async findByTokenHash(
    tokenHash: string,
  ): Promise<EmployeeInvitation | null> {
    const document = await super.findOne({ tokenHash });

    if (!document) return null;

    return EmployeeInvitationPersistenceMapper.toDomain(document);
  }

  async updateInvitation(
    accountId: string,
    data: Partial<EmployeeInvitation>,
  ): Promise<EmployeeInvitation | null> {
    const updateData =
      EmployeeInvitationPersistenceMapper.toUpdateData(data);

    const document = await super.update(
      {
        accountId: new Types.ObjectId(accountId),
     },
      updateData,
    );

    if (!document) return null;

    return EmployeeInvitationPersistenceMapper.toDomain(document);
  }


}