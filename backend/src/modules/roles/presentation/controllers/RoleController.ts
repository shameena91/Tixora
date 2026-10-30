import type { Request, Response } from "express";

import type { IRoleUseCaseFactory } from "../../application/abstraction/IRoleUseCaseFactory";

import { getUseCasesForAccount } from "../../../../presentation/response/getUseCasesForAccount";
import {
  sendError,
  sendSuccess,
} from "../../../../presentation/response/ResponseHelper";
import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { createRoleSchema } from "../validators/CreateRoleSchema";

import { MESSAGES } from "../../../../shared/constants/messages";
import { updateRoleSchema } from "../validators/UpdateRoleSchema";
import { updateRoleStatusSchema } from "../validators/updateRoleStatusSchema";

export class RoleController {
  constructor(private readonly _roleUseCaseFactory: IRoleUseCaseFactory) {}
  async createRole(req: Request, res: Response): Promise<void> {
    const data = createRoleSchema.parse(req.body);
    const accountId = req.user!.accountId;
    const useCases = await getUseCasesForAccount(
      accountId,
      this._roleUseCaseFactory,
      res,
    );
    if (!useCases) return;

    const role = await useCases.createRole.execute(data);

    sendSuccess(res, "Role created successfully", role, HttpStatusCode.CREATED);
  }

  async getAllRoles(req: Request, res: Response): Promise<void> {
    const accountId = req.user!.accountId;
    const useCases = await getUseCasesForAccount(
      accountId,
      this._roleUseCaseFactory,
      res,
    );

    if (!useCases) {
      return;
    }
    const roles = await useCases.getAllRoles.execute();

    sendSuccess(
      res,

      "Roles retrieved successfully",
      roles,
      HttpStatusCode.OK,
    );
  }

  async getRoleDetails(req: Request, res: Response): Promise<void> {
    const accountId = req.user!.accountId;
    const { roleId } = req.params;
    const useCases = await getUseCasesForAccount(
      accountId,
      this._roleUseCaseFactory,
      res,
    );

    if (!useCases) {
      return;
    }

    if (typeof roleId !== "string" || !roleId) {
      sendError(
        res,
        MESSAGES.AUTHENTICATED_ID_MISING,
        HttpStatusCode.UNAUTHORIZED,
      );
      return;
    }

    const role = await useCases.getRoleDetails.execute(roleId);

    sendSuccess(
      res,

      "Role details retrieved successfully",
      role,
      HttpStatusCode.OK,
    );
  }

  async updateRole(req: Request, res: Response): Promise<void> {
    const data = updateRoleSchema.parse(req.body);
    const { roleId } = req.params;
    const accountId = req.user!.accountId;
    const useCases = await getUseCasesForAccount(
      accountId,
      this._roleUseCaseFactory,
      res,
    );

    if (typeof roleId !== "string" || !roleId) {
      sendError(
        res,
        MESSAGES.AUTHENTICATED_ID_MISING,
        HttpStatusCode.UNAUTHORIZED,
      );
      return;
    }
    if (!useCases) {
      return;
    }
    const role = await useCases.updateRole.execute(roleId, data);

    sendSuccess(
      res,

      "Role updated successfully",
      role,
      HttpStatusCode.OK,
    );
  }

  async updateRoleStatus(req: Request, res: Response): Promise<void> {
    const { roleStatus } = updateRoleStatusSchema.parse(req.body);

    const accountId = req.user!.accountId;
    const { roleId } = req.params;
    const useCases = await getUseCasesForAccount(
      accountId,
      this._roleUseCaseFactory,
      res,
    );
    if (typeof roleId !== "string" || !roleId) {
      sendError(
        res,
        MESSAGES.AUTHENTICATED_ID_MISING,
        HttpStatusCode.UNAUTHORIZED,
      );
      return;
    }

    if (!useCases) {
      return;
    }
    const role = await useCases.updateRoleStatus.execute(roleId, roleStatus);

    sendSuccess(
      res,

      "Role status updated successfully",
      role,
      HttpStatusCode.OK,
    );
  }
}
