import { TimelineCreateData } from "../../application/mappers/TimelineMapper";
import { Timeline, TimelineEntityType } from "../entities/Timeline";

export interface ITimelineRepository {
  create(timeline: TimelineCreateData): Promise<Timeline>;

  findByEntity(
    entityType: TimelineEntityType,
    entityId: string
  ): Promise<Timeline[]>;
}