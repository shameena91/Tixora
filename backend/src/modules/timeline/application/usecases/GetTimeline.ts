import {
  Timeline,
  TimelineEntityType,
} from "../../domain/entities/Timeline";

import {
  ITimelineRepository,
} from "../../domain/repositories/ITimelineRepository";

import {
  IGetTimeline,
} from "../abstraction/IGetTimeline";

export class GetTimeline
  implements IGetTimeline
{
  constructor(
    private readonly _timelineRepository: ITimelineRepository
  ) {}

  async execute(
    entityType: TimelineEntityType,
    entityId: string
  ): Promise<Timeline[]> {
    return this._timelineRepository.findByEntity(
      entityType,
      entityId
    );
  }
}