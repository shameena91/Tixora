export interface Timeline {
  id: string;

  entityType: string;

  entityId: string;

  action: string;

  description: string;

  performedBy: string | null;

  metadata: Record<string, unknown> | null;

  createdAt: string;
}