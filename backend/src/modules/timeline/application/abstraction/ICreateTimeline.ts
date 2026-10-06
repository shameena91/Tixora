import { Timeline } from "../../domain/entities/Timeline";
import { TimelineCreateData } from "../mappers/TimelineMapper";

export interface ICreateTimeline {
  execute(
    data: TimelineCreateData
  ): Promise<Timeline>;
}