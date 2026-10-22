
import { Router } from "express";

import { authMiddleware } from "../../../auth/container/container";
import { AccountRole } from "../../../auth/domain/entities/Account";
import { authorizeRoles } from "../../../auth/presentation/middlewares/AutherizeRole";


import { INVOICE_ROUTE_CONSTANTS } from "../../../../shared/constants/route";
import { invoiceController } from "../../container/Container";

const router = Router();

router.use(
  authMiddleware.authenticate.bind(authMiddleware),
);

router.get(
  INVOICE_ROUTE_CONSTANTS.GET_ALL,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  invoiceController.getCompanyInvoices.bind(invoiceController),
);

router.get(
  INVOICE_ROUTE_CONSTANTS.GET_BY_ID,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  invoiceController.getInvoice.bind(invoiceController),
);

router.get(
  INVOICE_ROUTE_CONSTANTS.GET_PDF,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  invoiceController.getInvoicePdf.bind(invoiceController),
);
router.get(
  INVOICE_ROUTE_CONSTANTS.GET_DOWNLOAD,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  invoiceController.downloadInvoice.bind(invoiceController),
);


export default router;
