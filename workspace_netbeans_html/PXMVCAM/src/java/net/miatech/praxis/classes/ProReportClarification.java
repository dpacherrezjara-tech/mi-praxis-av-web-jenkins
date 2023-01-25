/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.classes;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.ExceptionConverter;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.GrayColor;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfTemplate;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.filter.A2331Filter;
import net.miatech.utils.Functions;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.Logger;

/**
 *
 * @author ggutierrez
 */
public class ProReportClarification {
    
    //private String FILE = "CartaRechazos.pdf";
    //public final String FileXLS = "ReporteRechazos.xls";
    private Font catFont = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD);
    private Font subFontT = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD); //12
    private Font subFontP = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.NORMAL); //12
    private Font subEmision = new Font(Font.FontFamily.TIMES_ROMAN, 7, Font.NORMAL);
    private int PYi = 0; // Para A4: 788
    private int Hlng = 12;
    private File fileTmp01; //, fileTmp02;
    private List<File> lstFileTmp = new ArrayList<File>();
    private static final Logger logError = Logger.getLogger("errorLog");

    class TableHeader extends PdfPageEventHelper {

        /**
         * The header text.
         */
        String header;
        /**
         * The template with the total number of pages.
         */
        PdfTemplate total;

        /**
         * Allows us to change the content of the header.
         *
         * @param header The new header String
         */
        public void setHeader(String header) {
            this.header = header;
        }

        /**
         * Creates the PdfTemplate that will hold the total number of pages.
         *
         * @see com.itextpdf.text.pdf.PdfPageEventHelper#onOpenDocument(
         * com.itextpdf.text.pdf.PdfWriter, com.itextpdf.text.Document)
         */
        public void onOpenDocument(PdfWriter writer, Document document) {
            total = writer.getDirectContent().createTemplate(50, 16); //55      
        }

        /**
         * Adds a header to every page
         *
         * @see com.itextpdf.text.pdf.PdfPageEventHelper#onEndPage(
         * com.itextpdf.text.pdf.PdfWriter, com.itextpdf.text.Document)
         */
        public void onEndPage(PdfWriter writer, Document document) {
            // int nt;
            PdfPTable table = new PdfPTable(3);
            try {
                table.setWidths(new int[]{24, 24, 2});
                table.setTotalWidth(700);
                table.setLockedWidth(true);
                table.getDefaultCell().setFixedHeight(20);
                table.getDefaultCell().setBorder(Rectangle.BOTTOM);
                table.addCell(header);
                table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
                table.addCell(String.format("Página: %d de ", writer.getPageNumber()));

                PdfPCell cell = new PdfPCell(Image.getInstance(total));
                cell.setBorder(Rectangle.BOTTOM);
                table.addCell(cell);
                table.writeSelectedRows(0, -1, 34, 600, writer.getDirectContent());
            } catch (DocumentException de) {
                throw new ExceptionConverter(de);
            }
        }

        /**
         * Fills out the total number of pages before the document is closed.
         *
         * @see com.itextpdf.text.pdf.PdfPageEventHelper#onCloseDocument(
         * com.itextpdf.text.pdf.PdfWriter, com.itextpdf.text.Document)
         */
        public void onCloseDocument(PdfWriter writer, Document document) {

            ColumnText.showTextAligned(total, Element.ALIGN_LEFT, new Phrase(String.valueOf(writer.getPageNumber() - 1)), 2, 2, 0);

        }
    }

    public static final String[] RESOURCES = {
        "139X.jpg",
        "139X2.png"
    };

    public List<File> getFile() {
        return lstFileTmp;
    }

    /*public String formato_numero(double Number) {

     NumberFormat nf = NumberFormat.getNumberInstance(Locale.US);
     DecimalFormat formato = (DecimalFormat) nf;
     formato.setMinimumFractionDigits(2);
     formato.setMaximumFractionDigits(2);
     String NumberFormated = formato.format(Number);
     return NumberFormated;
     }*/
    public void colorRectangle(PdfContentByte under, BaseColor color, float x, float y, float width, float height) {
        under.saveState();
        under.setColorFill(color);
        under.rectangle(x, y, width, height);
        under.fillStroke();
        under.restoreState();
    }

    public boolean createReportPDF(String strNomFile, String strRuta) {

        boolean success = true;

        try {

            fileTmp01 = File.createTempFile(strNomFile + "_", strNomFile + ".pdf");
            //fileTmp02 = File.createTempFile("tmp", FileXLS);
            lstFileTmp.add(fileTmp01);
            //lstFileTmp.add(fileTmp02);
            PYi = 550;
            Hlng = 12;
            int PosX1 = 60;

            //Document document = new Document(new Rectangle(842, 595)); // OLD
            //Document document = new Document(new Rectangle(785, 590)); // TAMANIO CARTA
            Document document = new Document(PageSize.LETTER.rotate(), 5, 5, 5, 5);
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(fileTmp01));
            TableHeader event = new TableHeader();
            writer.setPageEvent(event);
            document.open();

            //COLOCANDO LOGO AEROMEXICO ========================================
            Image img;
            img = Image.getInstance(strRuta);
            img.setAlignment(Element.ALIGN_CENTER);
            //img.setAbsolutePosition(PosX1, 530); //550          
            //img.scaleToFit(190, 40);
            //document.add(new Paragraph(String.format("", RESOURCES[0], img.getClass().getName())));
            document.add(img);
            writer.setCompressionLevel(0);

            //==================================================================
            //this.onCloseDocument(writer, document);
            document.close();

        } catch (Exception e) {
            e.printStackTrace();
            logError.error("Data Request By Bank (createReportPDF) - Message: " + e.getMessage() + " Stacktrace: " + e.getMessage() + "**" + e.getStackTrace().toString());
            success = false;
        }

        return success;

    }

    public boolean createReportPDF_CCW(String folio, A2331Filter aclaracion) {
        //Call Center y Web
        boolean success = true;
        String strNomFile = "Folio_" + folio;
        NumberFormat nfDbl = NumberFormat.getInstance(java.util.Locale.US);
        nfDbl.setMinimumFractionDigits(2);
        nfDbl.setMaximumFractionDigits(2);

        try {

            fileTmp01 = File.createTempFile(strNomFile + "_", ".pdf");
            lstFileTmp.add(fileTmp01);
            PYi = 550;
            Hlng = 20;
            int PosX1 = 60;

            //Document document = new Document(new Rectangle(842, 595)); // OLD
            //Document document = new Document(new Rectangle(785, 590)); // TAMANIO CARTA
            Document document = new Document(PageSize.LETTER.rotate(), 5, 5, 5, 5);
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(fileTmp01));
            TableHeader event = new TableHeader();
            writer.setPageEvent(event);
            document.open();

            //COLOCANDO LOGO AEROMEXICO ========================================
            Image img;
            img = Image.getInstance(String.format("/Dumps/%s", RESOURCES[0]));
            img.setAbsolutePosition(PosX1, 530); //550          
            img.scaleToFit(190, 40);
            document.add(new Paragraph(String.format("", RESOURCES[0], img.getClass().getName())));
            document.add(img);
            writer.setCompressionLevel(0);

            //COLOCANDO FECHA Y HORA DE EMISION PDF ============================
            Phrase txtFHEmision = new Phrase(new Paragraph(Functions.getFechaActual() + " " + Functions.getHoraActualHHMM(), subEmision));
            PdfContentByte canvas = writer.getDirectContent();
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtFHEmision, 550, PYi, 0);

            //COLOCANDO TITULO =================================================
            PYi = PYi - 40; //10
            Phrase txtTitle = new Phrase(new Paragraph("AEROVÍAS DE MÉXICO, S. A. DE C.V.", catFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTitle, PosX1, PYi, 0);
            PYi = PYi - Hlng;
            Phrase txtDirec = new Phrase(new Paragraph("Solicitud e Historial de Servicio", catFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtDirec, PosX1, PYi, 0);
            
            //Codigo Alternativo para generar tabla ============================
            //subFontT.setColor(BaseColor.BLUE);
            PYi = PYi - (Hlng + 15);

            //PNR ==============================================================
            String[] partsPNR = aclaracion.PNR.trim().split(",");
            String strPNR = "";

            for (int i = 0; i < partsPNR.length; i += 6) {
                strPNR = partsPNR[i].trim();
                if ((i + 1) < partsPNR.length) {
                    strPNR += ", " + partsPNR[(i + 1)].trim();
                }
                if ((i + 2) < partsPNR.length) {
                    strPNR += ", " + partsPNR[(i + 2)].trim();
                }
                if ((i + 3) < partsPNR.length) {
                    strPNR += ", " + partsPNR[(i + 3)].trim();
                }
                if ((i + 4) < partsPNR.length) {
                    strPNR += ", " + partsPNR[(i + 4)].trim();
                }
                if ((i + 5) < partsPNR.length) {
                    strPNR += ", " + partsPNR[(i + 5)].trim();
                }

                PosX1 = 60;
                PYi = PYi - Hlng;
                colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 250, 20);
                if (i == 0) {
                    Phrase txtPNR = new Phrase(new Paragraph("Código de Reservación (PNR) :", subFontT));
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtPNR, PosX1, PYi, 0);
                } else {
                    Phrase txtPNR = new Phrase(new Paragraph("", subFontT));
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtPNR, PosX1, PYi, 0);
                }

                PosX1 = PosX1 + 250;
                colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 300, 20);
                Phrase txtValorPNR = new Phrase(new Paragraph(strPNR, subFontP));
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorPNR, PosX1, PYi, 0);

            }

            //TICKET ===========================================================
            String[] parts = aclaracion.strTicket.trim().split(",");
            String strTkt = "";

            for (int i = 0; i < parts.length; i += 4) {
                strTkt = parts[i].trim();
                if ((i + 1) < parts.length) {
                    strTkt += ", " + parts[(i + 1)].trim();
                }
                if ((i + 2) < parts.length) {
                    strTkt += ", " + parts[(i + 2)].trim();
                }
                if ((i + 3) < parts.length) {
                    strTkt += ", " + parts[(i + 3)].trim();
                }

                PosX1 = 60;
                PYi = PYi - Hlng;
                colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 250, 20);
                if (i == 0) {
                    Phrase txtBOLETO = new Phrase(new Paragraph("Boleto(s) :", subFontT));
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtBOLETO, PosX1, PYi, 0);
                } else {
                    Phrase txtBOLETO = new Phrase(new Paragraph("", subFontT));
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtBOLETO, PosX1, PYi, 0);
                }

                PosX1 = PosX1 + 250;
                colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 300, 20);
                Phrase txtValorBOLETO = new Phrase(new Paragraph(strTkt, subFontP));
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorBOLETO, PosX1, PYi, 0);

            }

            PosX1 = 60;
            PYi = PYi - Hlng;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 250, 20);
            Phrase txtTARJHAB = new Phrase(new Paragraph("Nombre del Tarjetahabiente :", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTARJHAB, PosX1, PYi, 0);
            PosX1 = PosX1 + 250;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 300, 20);
            Phrase txtValorTARJHAB = new Phrase(new Paragraph(aclaracion.NOMTARHAB, subFontP));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorTARJHAB, PosX1, PYi, 0);

            PosX1 = 60;
            PYi = PYi - Hlng;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 250, 20);
            Phrase txtCARDNBR = new Phrase(new Paragraph("Número de Tarjeta :", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtCARDNBR, PosX1, PYi, 0);
            PosX1 = PosX1 + 250;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 300, 20);
            Phrase txtValorCARDNBR = new Phrase(new Paragraph(aclaracion.strDescripcion, subFontP));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorCARDNBR, PosX1, PYi, 0);

            PosX1 = 60;
            PYi = PYi - Hlng;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 250, 20);
            Phrase txtAUTHNBR = new Phrase(new Paragraph("Número de Autorización :", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtAUTHNBR, PosX1, PYi, 0);
            PosX1 = PosX1 + 250;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 300, 20);
            Phrase txtValorAUTHNBR = new Phrase(new Paragraph(aclaracion.AUTHNBR, subFontP));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorAUTHNBR, PosX1, PYi, 0);

            PosX1 = 60;
            PYi = PYi - Hlng;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 250, 20);
            Phrase txtSALEDATE = new Phrase(new Paragraph("Fecha de Transacción :", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtSALEDATE, PosX1, PYi, 0);
            PosX1 = PosX1 + 250;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 300, 20);
            Phrase txtValorSALEDATE = new Phrase(new Paragraph(aclaracion.SALEDATE, subFontP));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorSALEDATE, PosX1, PYi, 0);

            PosX1 = 60;
            PYi = PYi - Hlng;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 250, 20);
            Phrase txtMERCHNAM = new Phrase(new Paragraph("Nombre del Comercio :", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtMERCHNAM, PosX1, PYi, 0);
            PosX1 = PosX1 + 250;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 300, 20);
            Phrase txtValorMERCHNAM = new Phrase(new Paragraph(aclaracion.MERCHNAM, subFontP));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorMERCHNAM, PosX1, PYi, 0);

            PosX1 = 60;
            PYi = PYi - Hlng;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 250, 20);
            Phrase txtAGENTE = new Phrase(new Paragraph("Agente :", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtAGENTE, PosX1, PYi, 0);
            PosX1 = PosX1 + 250;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 300, 20);
            Phrase txtValorAGENTE = new Phrase(new Paragraph(aclaracion.AGENTE, subFontP));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorAGENTE, PosX1, PYi, 0);

            PosX1 = 60;
            PYi = PYi - Hlng;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 250, 20);
            Phrase txtAUTAMOUNT = new Phrase(new Paragraph("Importe", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtAUTAMOUNT, PosX1, PYi, 0);
            PosX1 = PosX1 + 250;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 300, 20);
            Phrase txtValorAUTAMOUNT = new Phrase(new Paragraph(nfDbl.format(aclaracion.AUTAMOUNT), subFontP));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorAUTAMOUNT, PosX1, PYi, 0);

            //DESCRIPCION COMPRA - ROUTING =====================================
            for (int i = 0; i < 10; i++) {
                PosX1 = 60;
                PYi = PYi - Hlng;
                String strDescCompra = Functions.fillString(aclaracion.strDescStatus, 450);
                String strTemp = "";
                strTemp = strDescCompra.substring((45 * i), (45 * i) + 45);

                if (!strTemp.trim().isEmpty()) {
                    colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 250, 20);
                    if (i == 0) {
                        Phrase txtCODCOMPRA = new Phrase(new Paragraph("Descripción o código de la compra :", subFontT));
                        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtCODCOMPRA, PosX1, PYi, 0);
                    } else {
                        Phrase txtCODCOMPRA = new Phrase(new Paragraph("", subFontT));
                        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtCODCOMPRA, PosX1, PYi, 0);
                    }

                    PosX1 = PosX1 + 250;
                    colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 300, 20);
                    Phrase txtValorCODCOMPRA = new Phrase(new Paragraph(strTemp, subFontP));
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorCODCOMPRA, PosX1, PYi, 0);
                } else {
                    break;
                }
            }

            PosX1 = 60;
            PYi = PYi - Hlng;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 250, 20);
            Phrase txtDIRECCION = new Phrase(new Paragraph("Domicilio de Entrega :", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtDIRECCION, PosX1, PYi, 0);
            PosX1 = PosX1 + 250;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 300, 20);
            Phrase txtValorDIRECCION = new Phrase(new Paragraph(aclaracion.strDireccion, subFontP));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorDIRECCION, PosX1, PYi, 0);

            PosX1 = 60;
            PYi = PYi - Hlng;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 250, 20);
            Phrase txtMERCHN = new Phrase(new Paragraph("Número de Afiliación :", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtMERCHN, PosX1, PYi, 0);
            PosX1 = PosX1 + 250;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 300, 20);
            Phrase txtValorMERCHN = new Phrase(new Paragraph(aclaracion.MERCHN, subFontP));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorMERCHN, PosX1, PYi, 0);

            PosX1 = 60;
            PYi = PYi - Hlng;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 250, 20);
            Phrase txtPAX = new Phrase(new Paragraph("Autorizados a Recibir :", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtPAX, PosX1, PYi, 0);
            PosX1 = PosX1 + 250;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 300, 20);
            Phrase txtValorPAX = new Phrase(new Paragraph(aclaracion.PAX, subFontP));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorPAX, PosX1, PYi, 0);

            PosX1 = 60;
            PYi = PYi - Hlng;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 250, 20);
            Phrase txtMOTO = new Phrase(new Paragraph("Descripción 'Venta Telefónica/Internet' :", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtMOTO, PosX1, PYi, 0);
            PosX1 = PosX1 + 250;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 300, 20);
            Phrase txtValorMOTO = new Phrase(new Paragraph("Mo/To :", subFontP));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorMOTO, PosX1, PYi, 0);

            PosX1 = 60;
            PYi = PYi - Hlng;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 250, 20);
            Phrase txtPAX2 = new Phrase(new Paragraph("Nombre de quien recibe :", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtPAX2, PosX1, PYi, 0);
            PosX1 = PosX1 + 250;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 300, 20);
            Phrase txtValorPAX2 = new Phrase(new Paragraph(aclaracion.PAX, subFontP));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorPAX2, PosX1, PYi, 0);

            PosX1 = 60;
            PYi = PYi - Hlng;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 250, 20);
            Phrase txtFVLO1 = new Phrase(new Paragraph("Fecha de Entrega :", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtFVLO1, PosX1, PYi, 0);
            PosX1 = PosX1 + 250;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 300, 20);
            Phrase txtValorFVLO1 = new Phrase(new Paragraph(aclaracion.FVLO1, subFontP));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorFVLO1, PosX1, PYi, 0);

            //COMENTARIOS ======================================================
            PosX1 = 60;
            PYi = PYi - Hlng;
            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 550, 20);
            Phrase txtCOMMENT = new Phrase(new Paragraph("Comentarios :", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtCOMMENT, PosX1, PYi, 0);

            for (int i = 0; i < 5; i++) {
                PosX1 = 60;
                PYi = PYi - Hlng;
                //System.out.println("PYI : " + PYi);

                if (PYi <= 30) {
                    document.newPage();
                    PYi = 550;
                    Hlng = 20;
                } else {

                    String strComentario = Functions.fillString(aclaracion.COMMENT, 500);
                    String strTemp = "";
                    strTemp = strComentario.substring((100 * i), (100 * i) + 100);

                    try {
                        if (!strTemp.trim().isEmpty()) {
                            colorRectangle(canvas, GrayColor.GRAYWHITE, PosX1 - 5, PYi - 5, 550, 20);
                            Phrase txtValorCOMMENT = new Phrase(new Paragraph(strTemp, subFontP));
                            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtValorCOMMENT, PosX1, PYi, 0);
                        } else {
                            break;
                        } 
                    } catch (Exception ei) {
                        ei.printStackTrace();
                        break;
                    }
                }
            }

            //==================================================================
            //this.onCloseDocument(writer, document);
            document.close();

        } catch (Exception e) {
            e.printStackTrace();
            Log log = LogFactory.getLog("ProReportClarification");
            log.error("Message: " + e.getMessage() + " Stacktrace: " + e.getMessage() + "**" + e.getStackTrace().toString());
            logError.error("Data Request By Bank (createReportPDF_CCW) - Message: " + e.getMessage() + " Stacktrace: " + e.getMessage() + "**" + e.getStackTrace().toString());
            success = false;
        }

        return success;

    }
    
}
