import { Timeline, TimelineEntityType } from "../../domain/entities/Timeline";

import { Types } from "mongoose";


export interface TimelineDocument {
  _id: Types.ObjectId;

  entityType: TimelineEntityType;
  entityId: string;

  action: string;
  description: string;

  performedBy: string | null;

  metadata: Record<string, unknown> | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface TimelineCreateData {
  entityType: Timeline["entityType"];
  entityId: string;

  action: Timeline["action"];
  description: Timeline["description"];

  performedBy: Timeline["performedBy"];

  metadata: Timeline["metadata"];

  createdAt: Timeline["createdAt"];
}
export class TimelineMapper {
  // ------------------------------------
  // Persistence → Domain
  // ------------------------------------
  static toDomain(
    document: TimelineDocument
  ): Timeline {
    return new Timeline({
      id: document._id.toString(),

      entityType: document.entityType,
      entityId: document.entityId,

      action: document.action,
      description: document.description,

      performedBy: document.performedBy,

      metadata: document.metadata,

      createdAt: document.createdAt,
    });
  }

  // ------------------------------------
  // Domain → Persistence
  // ------------------------------------
  static toPersistence(
    timeline: Timeline
  ): TimelineCreateData {
    return {
      entityType: timeline.entityType,
      entityId: timeline.entityId,

      action: timeline.action,
      description: timeline.description,

      performedBy: timeline.performedBy,

      metadata: timeline.metadata,

      createdAt: timeline.createdAt,
    };
  }
}