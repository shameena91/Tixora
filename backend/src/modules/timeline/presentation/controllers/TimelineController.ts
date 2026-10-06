import { Request, Response } from "express";

import {
  sendSuccess,
} from "../../../../presentation/response/ResponseHelper";

import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";

import { IGetTimeline } from "../../application/abstraction/IGetTimeline";

import {
  TimelineEntityType,
} from "../../domain/entities/Timeline";

export class TimelineController {
  constructor(
    private readonly _getTimeline: IGetTimeline,
  ) {}

  async getTimelineByEntity(
    req: Request<{ id: string }>,
    res: Response,
  ) {
    const { id } = req.params;

    const timeline = await this._getTimeline.execute(
      TimelineEntityType.COMPANY_REQUEST,
      id,
    );

    return sendSuccess(
      res,
"timeline fetched successfully",
      timeline,
      HttpStatusCode.OK,
    );
  }
}