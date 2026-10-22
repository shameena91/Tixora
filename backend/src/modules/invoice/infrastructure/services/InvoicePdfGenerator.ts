
import PDFDocument from "pdfkit";
import { CreateInvoiceDto } from "../../application/Dtos/CreateInvoiceDto";
import { IInvoicePdfGenerator } from "../../application/ports/IInvoicePdfGenerator";



export class InvoicePdfGenerator implements IInvoicePdfGenerator {
  async generate(invoice: CreateInvoiceDto): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
      });

      const chunks: Buffer[] = [];

      doc.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });

      doc.on("end", () => {
        resolve(Buffer.concat(chunks));
      });

      doc.on("error", (error: Error) => {
        reject(error);
      });

      // Invoice heading
      doc
        .font("Helvetica-Bold")
        .fontSize(26)
        .text("TIXORA", { align: "center" });

      doc
        .moveDown(0.5)
        .fontSize(18)
        .text("INVOICE", { align: "center" });

      doc.moveDown(1.5);

      // Invoice information
      doc.font("Helvetica").fontSize(11);

      doc.text(`Invoice Number: ${invoice.invoiceNumber}`);
      doc.text(
        `Invoice Date: ${invoice.paymentDate.toLocaleDateString("en-IN")}`,
      );
      doc.text(`Payment Status: ${invoice.paymentStatus}`);

      doc.moveDown();

      // Company details
      doc.font("Helvetica-Bold").fontSize(13).text("Billed To");

      doc.moveDown(0.5);
      doc.font("Helvetica").fontSize(11);

      doc.text(invoice.companyName);
      doc.text(invoice.companyEmail);

      if (invoice.companyPhone) {
        doc.text(invoice.companyPhone);
      }

      if (invoice.companyAddress) {
        doc.text(invoice.companyAddress);
      }

      if (invoice.companyRegistrationNumber) {
        doc.text(
          `Registration Number: ${invoice.companyRegistrationNumber}`,
        );
      }

      doc.moveDown(1.5);

      // Subscription details
      doc.font("Helvetica-Bold").fontSize(13).text("Subscription Details");

      doc.moveDown(0.5);
      doc.font("Helvetica").fontSize(11);

      doc.text(`Plan: ${invoice.planName}`);
      doc.text(`Billing Cycle: ${invoice.billingCycle}`);
      doc.text(`Payment Method: ${invoice.paymentMethod ?? "N/A"}`);
      doc.text(`Payment ID: ${invoice.paymentId}`);

      doc.moveDown(1.5);

      // Total amount
      doc.font("Helvetica-Bold").fontSize(16).text(
        `Total Amount: ${invoice.currency} ${invoice.amount.toFixed(2)}`,
      );

      doc.moveDown(2);

      doc
        .font("Helvetica")
        .fontSize(10)
        .text("Thank you for choosing Tixora!", {
          align: "center",
        });

      doc.end();
    });
  }
}
