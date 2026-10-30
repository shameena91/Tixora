export const PERMISSIONS = {
  // Tickets
  TICKETS_CREATE: "tickets.create",
  TICKETS_VIEW_OWN: "tickets.view.own",
  TICKETS_REPLY_OWN: "tickets.reply.own",

  TICKETS_VIEW_ASSIGNED: "tickets.view.assigned",
  TICKETS_REPLY_ASSIGNED: "tickets.reply.assigned",
  TICKETS_UPDATE_ASSIGNED: "tickets.update.assigned",

  TICKETS_VIEW_DEPARTMENT: "tickets.view.department",
  TICKETS_UPDATE_DEPARTMENT: "tickets.update.department",
  TICKETS_ASSIGN_DEPARTMENT: "tickets.assign.department",

  // Departments
  DEPARTMENTS_VIEW_OWN: "departments.view.own",
  DEPARTMENTS_CREATE: "departments.create",
  DEPARTMENTS_UPDATE: "departments.update",
  DEPARTMENTS_DELETE: "departments.delete",

  // Categories
  CATEGORIES_VIEW_DEPARTMENT: "categories.view.department",
  CATEGORIES_CREATE: "categories.create",
  CATEGORIES_UPDATE: "categories.update",
  CATEGORIES_DELETE: "categories.delete",

  // Members
  MEMBERS_VIEW_DEPARTMENT: "members.view.department",
  MEMBERS_CREATE: "members.create",
  MEMBERS_UPDATE: "members.update",
  MEMBERS_DEACTIVATE: "members.deactivate",

  // Roles & Permissions
  ROLES_VIEW: "roles.view",
  ROLES_CREATE: "roles.create",
  ROLES_UPDATE: "roles.update",
  ROLES_DELETE: "roles.delete",
  ROLES_ASSIGN: "roles.assign",

  // Subscription & Billing
  SUBSCRIPTION_VIEW: "subscription.view",
  SUBSCRIPTION_MANAGE: "subscription.manage",
  BILLING_VIEW: "billing.view",
} as const;

export type PermissionCode =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS];