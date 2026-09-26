import { BaseRepository } from "../../../infrastructure/repositories/Baserepository";

import {
  TimelineCreateData,
  TimelineDocument,
} from "../application/mappers/TimelineMapper";

import { CreateTimeline } from "../application/usecases/CreateTimeline";
import { GetTimeline } from "../application/usecases/GetTimeline";

import { TimelineModel } from "../infrastructure/database/models/TimelineModel";
import { TimelineRepository } from "../infrastructure/database/repositories/TimelineRepository";

import { TimelineController } from "../presentation/controllers/TimelineController";

// ------------------------------------
// Base Repository
// ------------------------------------
const timelineBaseRepository = new BaseRepository<
  TimelineDocument,
  TimelineCreateData
>(TimelineModel);

// ------------------------------------
// Timeline Repository
// ------------------------------------
const timelineRepository = new TimelineRepository(
  timelineBaseRepository
);

// ------------------------------------
// Use Cases
// ------------------------------------
const createTimeline = new CreateTimeline(
  timelineRepository
);

const getTimeline = new GetTimeline(
  timelineRepository
);

// ------------------------------------
// Controller
// ------------------------------------
export const timelineController =
  new TimelineController(
    getTimeline
  );

// ------------------------------------
// Exports
// ------------------------------------
export {
  timelineRepository,
  createTimeline,
  getTimeline,
};