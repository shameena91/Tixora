export enum TimelineEntityType {
  COMPANY_REQUEST = "COMPANY_REQUEST",
  TICKET = "TICKET",
  SUBSCRIPTION = "SUBSCRIPTION",
  EMPLOYEE = "EMPLOYEE",
}

export interface TimelineProps {
  id: string;
  entityType: TimelineEntityType;
  entityId: string;
  action: string;
  description: string;
  performedBy: string | null;
  createdAt: Date;
  metadata?: Record<string, unknown> | null;
}

export class Timeline {
  public readonly id: string;
  public readonly entityType: TimelineEntityType;
  public readonly entityId: string;
  public readonly action: string;
  public readonly description: string;
  public readonly performedBy: string | null;
  public readonly createdAt: Date;
  public readonly metadata: Record<string, unknown> | null;

  constructor(props: TimelineProps) {
    this.id = props.id;
    this.entityType = props.entityType;
    this.entityId = props.entityId;
    this.action = props.action;
    this.description = props.description;
    this.performedBy = props.performedBy;
    this.createdAt = props.createdAt;
    this.metadata = props.metadata ?? null;
  }
}