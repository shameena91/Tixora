import {
  Timeline,
  TimelineEntityType,
} from "../../domain/entities/Timeline";

export interface IGetTimeline {
  execute(
    entityType: TimelineEntityType,
    entityId: string
  ): Promise<Timeline[]>;
}