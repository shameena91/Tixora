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

  // Roles
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


// Permissions allowed for Custom Roles

export const ROLE_ASSIGNABLE_PERMISSION_CODES = [
  // Tickets
  PERMISSIONS.TICKETS_CREATE,
  PERMISSIONS.TICKETS_VIEW_OWN,
  PERMISSIONS.TICKETS_REPLY_OWN,
  PERMISSIONS.TICKETS_VIEW_ASSIGNED,
  PERMISSIONS.TICKETS_REPLY_ASSIGNED,
  PERMISSIONS.TICKETS_UPDATE_ASSIGNED,
  PERMISSIONS.TICKETS_VIEW_DEPARTMENT,
  PERMISSIONS.TICKETS_UPDATE_DEPARTMENT,
  PERMISSIONS.TICKETS_ASSIGN_DEPARTMENT,

  // Departments
  PERMISSIONS.DEPARTMENTS_VIEW_OWN,

  // Categories
  PERMISSIONS.CATEGORIES_VIEW_DEPARTMENT,
  PERMISSIONS.CATEGORIES_CREATE,
  PERMISSIONS.CATEGORIES_UPDATE,
  PERMISSIONS.CATEGORIES_DELETE,

  // Members
  PERMISSIONS.MEMBERS_VIEW_DEPARTMENT,
] as const;

export type AssignablePermissionCode =
  (typeof ROLE_ASSIGNABLE_PERMISSION_CODES)[number];


// Permission Groups

export interface PermissionGroup {
  title: string;
  permissions: {
    code: AssignablePermissionCode;
    label: string;
  }[];
}

export const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    title: "Tickets",
    permissions: [
      {
        code: PERMISSIONS.TICKETS_CREATE,
        label: "Create Tickets",
      },
      {
        code: PERMISSIONS.TICKETS_VIEW_OWN,
        label: "View Own Tickets",
      },
      {
        code: PERMISSIONS.TICKETS_REPLY_OWN,
        label: "Reply to Own Tickets",
      },
      {
        code: PERMISSIONS.TICKETS_VIEW_ASSIGNED,
        label: "View Assigned Tickets",
      },
      {
        code: PERMISSIONS.TICKETS_REPLY_ASSIGNED,
        label: "Reply to Assigned Tickets",
      },
      {
        code: PERMISSIONS.TICKETS_UPDATE_ASSIGNED,
        label: "Update Assigned Tickets",
      },
      {
        code: PERMISSIONS.TICKETS_VIEW_DEPARTMENT,
        label: "View Department Tickets",
      },
      {
        code: PERMISSIONS.TICKETS_UPDATE_DEPARTMENT,
        label: "Update Department Tickets",
      },
      {
        code: PERMISSIONS.TICKETS_ASSIGN_DEPARTMENT,
        label: "Assign Department Tickets",
      },
    ],
  },

  {
    title: "Departments",
    permissions: [
      {
        code: PERMISSIONS.DEPARTMENTS_VIEW_OWN,
        label: "View Own Department",
      },
    ],
  },

  {
    title: "Categories",
    permissions: [
      {
        code: PERMISSIONS.CATEGORIES_VIEW_DEPARTMENT,
        label: "View Department Categories",
      },
      {
        code: PERMISSIONS.CATEGORIES_CREATE,
        label: "Create Category",
      },
      {
        code: PERMISSIONS.CATEGORIES_UPDATE,
        label: "Update Category",
      },
      {
        code: PERMISSIONS.CATEGORIES_DELETE,
        label: "Delete Category",
      },
    ],
  },

  {
    title: "Members",
    permissions: [
      {
        code: PERMISSIONS.MEMBERS_VIEW_DEPARTMENT,
        label: "View Department Members",
      },
    ],
  },
];