import { Timeline } from "../../domain/entities/Timeline";
import { ITimelineRepository } from "../../domain/repositories/ITimelineRepository";

import { ICreateTimeline } from "../abstraction/ICreateTimeline";
import { TimelineCreateData } from "../mappers/TimelineMapper";

export class CreateTimeline
  implements ICreateTimeline
{
  constructor(
    private readonly _timelineRepository: ITimelineRepository
  ) {}

  async execute(
    data: TimelineCreateData
  ): Promise<Timeline> {
    return await this._timelineRepository.create(data);
  }
}