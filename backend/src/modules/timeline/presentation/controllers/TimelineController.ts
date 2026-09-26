import { Request, Response } from "express";

import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";

import { ICreateTimeline } from "../../application/abstraction/ICreateTimeline";
import { IGetTimeline } from "../../application/abstraction/IGetTimeline";

import {
  TimelineCreateData,
} from "../../application/mappers/TimelineMapper";

import {
  TimelineEntityType,
} from "../../domain/entities/Timeline";

export class TimelineController {
  constructor(

    private readonly _getTimeline: IGetTimeline
  ) {}

 
  // ------------------------------------
  // Get Timeline By Entity
  // ------------------------------------
  async getTimelineByEntity(
      req: Request<{ 
    id: string;}>,
    res: Response
  ): Promise<void> {
   
    const { id } = req.params;
    console.log("hhhhhhhhhhhhhhhhhhh")
    console.log(id)
   

    const timeline =
      await this._getTimeline.execute(
         TimelineEntityType.COMPANY_REQUEST,
        id
      );

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: timeline,
    });
  }
}