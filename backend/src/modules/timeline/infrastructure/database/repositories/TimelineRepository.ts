import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";
import { TimelineCreateData, TimelineDocument, TimelineMapper } from "../../../application/mappers/TimelineMapper";
import { Timeline, TimelineEntityType } from "../../../domain/entities/Timeline";
import { ITimelineRepository } from "../../../domain/repositories/ITimelineRepository";

export class TimelineRepository
  implements ITimelineRepository
{
  constructor(
    private readonly baseRepository: BaseRepository<
      TimelineDocument,
      TimelineCreateData
    >
  ) {}

  // ------------------------------------
  // Create Timeline
  // ------------------------------------
  async create(
    timeline: TimelineCreateData
  ): Promise<Timeline> {
    const createdTimeline =
      await this.baseRepository.create(timeline);

    return TimelineMapper.toDomain(
      createdTimeline
    );
  }

  // ------------------------------------
  // Find Timeline By Entity
  // ------------------------------------
  async findByEntity(
    entityType: TimelineEntityType,
    entityId: string
  ): Promise<Timeline[]> {
    const timelines =
      await this.baseRepository.findAll({
        entityType,
        entityId,
      });

    return timelines
      .sort(
        (
          a: TimelineDocument,
          b: TimelineDocument
        ) =>
          b.createdAt.getTime() -
          a.createdAt.getTime()
      )
      .map((timeline: TimelineDocument) =>
        TimelineMapper.toDomain(timeline)
      );
  }
}