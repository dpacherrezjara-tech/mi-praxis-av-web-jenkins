/*
 * To change this template, choose Tools | Templates
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
import com.itextpdf.text.pdf.CMYKColor;
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
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import net.miatech.beans.SaleAudit.A1580Filter;
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;

/**
 *
 * @author zperez
 */
public class ReportADMBwrPDF {

    private String FILE = "RptADMPDF.pdf";
    public final String FileTXT = "RptADMPDF.txt";
    private Font catFont = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.BOLD);
    private Font subFont = new Font(Font.FontFamily.COURIER, 8, Font.NORMAL); // 10
    private Font subFontT = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD); //12
    private Font NORMAL = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
    private Font subFont_1 = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD, BaseColor.WHITE);
    private int PYi = 0; // Para A4: 788
    private int Hlng = 12;
    private File fileTmp01, fileTmp02;
    private List<File> lstFileTmp = new ArrayList<File>();

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
                table.getDefaultCell().setVerticalAlignment(Element.ALIGN_RIGHT);  //setHorizontalAlignment(Element.ALIGN_RIGHT);
                // table.addCell(String.format("Página: %d de ", writer.getPageNumber()));

                PdfPCell cell = new PdfPCell(Image.getInstance(total));
                cell.setBorder(Rectangle.BOTTOM);
                table.addCell(cell);
                table.writeSelectedRows(0, -1, 34, 10, writer.getDirectContent());
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

    public String formato_numero(double Number) {

        NumberFormat nf = NumberFormat.getNumberInstance(Locale.US);
        DecimalFormat formato = (DecimalFormat) nf;
        formato.setMinimumFractionDigits(2);
        formato.setMaximumFractionDigits(2);
        String NumberFormated = formato.format(Number);
        return NumberFormated;
    }

    public void colorRectangle(PdfContentByte under, BaseColor color, float x, float y, float width, float height) {
        under.saveState();
        under.setColorFill(color);
        under.rectangle(x, y, width, height);
        under.fillStroke();
        under.restoreState();

    }

    public void setTitle(int posNewPagex, int posNewPagey, PdfWriter writer) {

        PdfContentByte canvas = writer.getDirectContent();
        PdfContentByte under = writer.getDirectContentUnder();
        colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), posNewPagex, posNewPagey - 7, 750, 25);

    }

    public File createReport(SQP00911Filter Data, List<SQP00911Filter> lst_razones, List<A1580Filter> lst_CalcuArelonia, List<A1673Filter> lst_CalcuImpuestos, List<SQP00911Filter> lst_TKT,List<SQP00911Filter> List_TKTSUM) {

        try {
            fileTmp01 = File.createTempFile("tmp", FILE);
            //fileTmp02 = File.createTempFile("tmp", FileTXT);
            lstFileTmp.add(fileTmp01);
            //lstFileTmp.add(fileTmp02);            
            PYi = 822;
            Hlng = 12;
            int PosX1 = 15;
            int PosXTO;
            int PosROXCOM;
            int PosClase;
            int PosFareB;
            int PosXTarifa;
            int PosXQS;
            int PosXFare;
            int PosXCharg;
            int PosXTKT;
            int PosX1cur;
            int PosX18;
            int PosX3;
            int PosX7;
            int PosX19;
            int PosX11;
            int PosX20;
            int PosX8;
            int PosX12;
            int ItemPage = 0;
            int getPageNumber = 0;
            int PoxT;
            String VL_Flag = "";
            String VL_TKTS = "";
            String VL_LIST_TKT0 = "";
            String VL_LIST_TKT1 = "";
            String VL_LIST_TKT2 = "";
            String DIRAGENCY0 = "";
            String DIRAGENCY2 = "";

            int posNewPagex = 0;
            int posNewPagey = 0;
            int DIRAGENC = 0;

            double TOT_A1580FAORI = 0;
            double TOT_TOTAL = 0;
            double TOT_A1729OCANR = 0;
            double TOT_A1729COCAR = 0;



            //Document document = new Document(new Rectangle(842, 595)); // OLD
            //Document document = new Document(new Rectangle(785, 590)); // TAMANIO CARTA
            Document document = new Document(PageSize.A4, 5, 5, 5, 5);
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(fileTmp01));
            ReportADMBwrPDF.TableHeader event = new ReportADMBwrPDF.TableHeader();
            writer.setPageEvent(event);
            document.open();

            // Adding a series of images ***LOGO AM
            Image img;
            img = Image.getInstance(String.format("/Dumps/%s", RESOURCES[0]));
            img.setAbsolutePosition(PosX1, 800); //550  530        
            img.scaleToFit(190, 40);
            document.add(new Paragraph(String.format("", RESOURCES[0], img.getClass().getName())));
            document.add(img);
            writer.setCompressionLevel(0);

            if (Data.A2548PREME.equals("")) {
                PdfContentByte canvas = writer.getDirectContentUnder();
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("NO HAY DATOS ...! ")), PosX1, PYi, 0);
                document.close();
                return null;
            }
            PdfContentByte canvas = writer.getDirectContent();
            PdfContentByte under = writer.getDirectContentUnder();

            PYi = 812; //10            
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 280, PYi, 80, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Memo Number : ", subFont_1)), PosX1 + 285, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 375, PYi, 190, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548NMEMO, subFont)), 380, PYi + 2, 0);
            PYi = 800;
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 280, PYi, 80, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Issue Date : ", subFont_1)), PosX1 + 285, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 375, PYi, 190, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548FREGI, subFont)), 380, PYi + 2, 0);

            PYi = 822;
            PYi = PYi - 42; //10            
            Phrase txtTitle = new Phrase(new Paragraph("AGENCY DEBIT MEMO / NOTA DE CARGO " + "", catFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTitle, PosX1, PYi, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 280, PYi, 80, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Transaction: ", subFont_1)), PosX1 + 285, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 375, PYi, 190, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548TRNCU, subFont)), 380, PYi + 2, 0);



            PYi = PYi - Hlng;

            Phrase txtEmitido = new Phrase(new Paragraph("Accepted: ", subFont));
            Phrase datEmitido = new Phrase(new Paragraph(Data.A2548FREGI + " - " + Data.A2548REGIS, subFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtEmitido, PosX1, PYi, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, datEmitido, PosX1 + 50, PYi, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 280, PYi, 80, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Source and Channel: ", subFont_1)), PosX1 + 285, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 375, PYi, 190, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548FTE + "-" + Data.A2548CANAL, subFont)), 380, PYi + 2, 0);


            PYi = PYi - Hlng;
            Phrase txtEnviado = new Phrase(new Paragraph("Issued: ", subFont));
            Phrase datEnviado = new Phrase(new Paragraph(Data.A2548FEMIT + " " + Data.A2548EMITI, subFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtEnviado, PosX1, PYi, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, datEnviado, PosX1 + 50, PYi, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 280, PYi, 80, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Ticket Number: ", subFont_1)), PosX1 + 285, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 375, PYi, 190, 13);
            if (lst_TKT.size() > 0) {
                if (lst_TKT.get(0).A2548CANTIDAD > 1) {
                    VL_TKTS = "MULTI-SEE BELOW *";
                } else {
                    VL_TKTS = Data.A2548TIKET;
                }
            } else {
                VL_TKTS = Data.A2548TIKET;
            }

            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(VL_TKTS, subFont)), 380, PYi + 2, 0);
            PYi = PYi - Hlng;

            if (!Data.A2548FLAG.equals("")) {
                if (Data.A2548FLAG.equals("U")) {
                    VL_Flag = "Cleared up";
                } else if (Data.A2548FLAG.equals("D")) {
                    VL_Flag = "Disputed";
                } else if (Data.A2548FLAG.equals("X")) {
                    VL_Flag = "Canceled";
                } else if (Data.A2548FLAG.equals("C")) {
                    VL_Flag = "Condoned";
                } else if (Data.A2548FLAG.equals("A")) {
                    VL_Flag = "Approved";
                }
            }
            Phrase txtDisputado = new Phrase(new Paragraph(VL_Flag + " : ", subFont));
            Phrase datDisputado = new Phrase(new Paragraph(Data.A2548FDISP + " " + Data.A2548DISPU, subFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtDisputado, PosX1, PYi, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, datDisputado, PosX1 + 50, PYi, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 280, PYi, 80, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Coupon: ", subFont_1)), PosX1 + 285, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 375, PYi, 190, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548CPN, subFont)), 380, PYi + 2, 0);

            PYi = PYi - Hlng;

            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 280, PYi, 80, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Ticket Date: ", subFont_1)), PosX1 + 285, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 375, PYi, 190, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548FVTA, subFont)), 380, PYi + 2, 0);

            PYi = PYi - Hlng;
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 280, PYi, 80, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Iata Number: ", subFont_1)), PosX1 + 285, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 375, PYi, 190, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548IATA, subFont)), 380, PYi + 2, 0);
            PYi = PYi - Hlng;
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 280, PYi, 80, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Iata Name: ", subFont_1)), PosX1 + 285, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 375, PYi, 190, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.AGENCY, subFont)), 380, PYi + 2, 0);
            PYi = PYi - Hlng;
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 280, PYi, 80, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Iata Address: ", subFont_1)), PosX1 + 285, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 375, PYi, 190, 13);
            DIRAGENC = Data.DIRAGENCY.trim().length();
            if (DIRAGENC >= 88) {
                DIRAGENCY0 = Data.DIRAGENCY.trim().substring(0, 35);
                DIRAGENCY2 = Data.DIRAGENCY.trim().substring(36, DIRAGENC);
            } else {
                DIRAGENCY0 = Data.DIRAGENCY.trim();
            }
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(DIRAGENCY0, subFont)), 380, PYi + 2, 0);
            if (!DIRAGENCY2.equals("")) {
                PYi = PYi - Hlng;
                colorRectangle(under, GrayColor.GRAYWHITE, PosX1 + 280, PYi, 270, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(DIRAGENCY2, subFont)), PosX1 + 285, PYi + 4, 0);
            }


            PYi = PYi - Hlng;
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 280, PYi, 80, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Pass Name: ", subFont_1)), PosX1 + 285, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 375, PYi, 190, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548EMPLE, subFont)), 380, PYi + 2, 0);


            PYi = PYi - Hlng;
            for (int i = 0; i < lst_TKT.size(); i++) {
                if (lst_TKT.get(0).A2548CANTIDAD > 1) {
                    if (i <= 6) {
                        VL_LIST_TKT0 = VL_LIST_TKT0 + " " + lst_TKT.get(i).A2548TIKET;
                    }
                    if (i > 6 && i <= 13) {
                        VL_LIST_TKT1 = VL_LIST_TKT1 + " " + lst_TKT.get(i).A2548TIKET;
                    }
                    if (i > 13) {
                        VL_LIST_TKT2 = VL_LIST_TKT2 + " " + lst_TKT.get(i).A2548TIKET;
                    }

                }


            }
            if (lst_TKT.get(0).A2548CANTIDAD > 1) {
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("* Ticket Numbers:", subFont)), 20, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED_ALL, new Phrase(new Paragraph(VL_LIST_TKT0, subFont)), 90, PYi, 0);
                PYi = PYi - Hlng;
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED_ALL, new Phrase(new Paragraph(VL_LIST_TKT1, subFont)), 90, PYi, 0);
                PYi = PYi - Hlng;
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED_ALL, new Phrase(new Paragraph(VL_LIST_TKT2, subFont)), 90, PYi, 0);
                PYi = PYi - Hlng;
            }

            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi - 28, 550, 10);
            PYi = PYi - (Hlng + 12);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Issue Reason", subFont_1)), PosX1 + 250, PYi, 0);
            PYi = PYi - Hlng;  // SALTO DESPUES DEL TITULO DE COLUMNAS lst_razones
            for (int i = 0; i < lst_razones.size(); i++) {
                colorRectangle(under, GrayColor.GRAYWHITE, 15, PYi - 7, 550, 15);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(lst_razones.get(i).A2548EMISION, subFont)), 20, PYi, 0);
                PYi = PYi - Hlng;
            }
            PYi = PYi - (Hlng - 20);
            //Phrase txtObser = new Phrase(new Paragraph("Observation: ", subFont));
            //ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtObser, PosX1, PYi, 0);
            //PYi = PYi - Hlng;
            //colorRectangle(under, GrayColor.GRAYWHITE, 15, PYi - 7, 550, 15);
            //ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548OBSER, subFont)), 20, PYi, 0);

            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 400, PYi - 28, 150, 10);
            PYi = PYi - (Hlng + 12);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Calculated Airline (Detail)", subFont_1)), PosX1 + 430, PYi, 0);
            PYi = PYi - 14;
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi - 1, 550, 10);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("From", subFont_1)), PosX1 + 2, PYi, 0);
            PosX1 = PosX1 + 30;
            PosXTO = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("To", subFont_1)), PosX1 - 2, PYi, 0);
            PosX1 = PosX1 + 30;
            PosROXCOM = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Route x Comp.", subFont_1)), PosX1 - 2, PYi, 0);
            PosX1 = PosX1 + 70;
            PosClase = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Clase", subFont_1)), PosX1, PYi, 0);
            PosX1 = PosX1 + 30;
            PosFareB = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("FareBasis", subFont_1)), PosX1, PYi, 0);
            PosX1 = PosX1 + 90;
            PosXTarifa = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Tarifa", subFont_1)), PosX1, PYi, 0);
            PosX1 = PosX1 + 50;
            PosXQS = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Q´s", subFont_1)), PosX1, PYi, 0);
            PosX1 = PosX1 + 50;
            PosXFare = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Total Fare", subFont_1)), PosX1, PYi, 0);
            PosX1 = PosX1 + 50; //71 
            PosXCharg = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Charges", subFont_1)), PosX1, PYi, 0);
            PosX1 = PosX1 + 50; //26 
            PosXTKT = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Total TKT", subFont_1)), PosX1, PYi, 0);
            PYi = PYi - 12;
            for (int i = 0; i < lst_CalcuArelonia.size(); i++) {
                colorRectangle(under, GrayColor.GRAYWHITE, 15, PYi - 4, 550, 15);
                //ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(lst_CalcuArelonia.get(i).A1580FROM, subFont)), 15, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(lst_CalcuArelonia.get(i).A1580FROM, subFont)), 16, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(lst_CalcuArelonia.get(i).A1580TO, subFont)), PosXTO, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(lst_CalcuArelonia.get(i).A1580RUTAC, subFont)), PosROXCOM, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(lst_CalcuArelonia.get(i).A1580CLASE, subFont)), PosClase, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(lst_CalcuArelonia.get(i).A1580FBASI, subFont)), PosFareB, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(lst_CalcuArelonia.get(i).A1580FMIOR), subFont)), PosXTarifa, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(lst_CalcuArelonia.get(i).A1580QMIOR), subFont)), PosXQS, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(lst_CalcuArelonia.get(i).TotalFare), subFont)), PosXFare, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(lst_CalcuArelonia.get(i).A1580CHAMI), subFont)), PosXCharg, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(lst_CalcuArelonia.get(i).TotalTKT), subFont)), PosXTKT, PYi, 0);

                TOT_A1580FAORI = TOT_A1580FAORI + lst_CalcuArelonia.get(i).TotalFare;
                TOT_TOTAL = TOT_TOTAL + lst_CalcuArelonia.get(i).TotalTKT;
                PYi = PYi - Hlng;

            }
            PYi = PYi - 7;  // SALTO DESPUES DEL TITULO DE COLUMNAS lst_razones
            colorRectangle(under, GrayColor.GRAYWHITE, PosXFare-30, PYi - 1, 80, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(TOT_A1580FAORI), subFont)), PosXFare + 15  - (((formato_numero(TOT_A1580FAORI)).length() <= 4 ? 4 : (formato_numero(TOT_A1580FAORI)).length() * 3) - 8), PYi, 0);
            //ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TARID), subFont)), 538 - (((formato_numero(List_TKTSUM.get(0).A2548TARID)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548TARID)).length() * 3) - 8), PYi, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, PosXCharg, PYi - 1, 150, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(TOT_TOTAL), subFont)), PosXCharg + 50  - (((formato_numero(TOT_TOTAL)).length() <= 4 ? 4 : (formato_numero(TOT_TOTAL)).length() * 3) - 8), PYi, 0);

            PYi = PYi - 6;
            PosX1 = 15;
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi - 5, 70, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Tour Code", subFont_1)), PosX1 + 5, PYi - 1, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, PosX1 + 55, PYi - 5, 71, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548CODIT, subFont)), PosX1 + 60, PYi - 1, 0);

            PYi = PYi - (Hlng + 10);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi - 1, 550, 12);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Currency", subFont_1)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 70;
            PosX1cur = PosX1 + 70;

            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Calculated Airline", subFont_1)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 200;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Calculated Agent", subFont_1)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 200;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Difference", subFont_1)), PosX1 + 2, PYi + 3, 0);

            PYi = PYi - Hlng;
            PosX1 = 15;
            colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi - 4, 35, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548MDA, subFont)), PosX1 + 3, PYi, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 50, PYi - 4, 30, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fare", subFont_1)), 55, PYi, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 80, PYi - 4, 140, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TARIF), subFont)), 195 - (((formato_numero(List_TKTSUM.get(0).A2548TARIF)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548TARIF)).length() * 3) - 8), PYi, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 220, PYi - 4, 30, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fare", subFont_1)), 225, PYi, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 250, PYi - 4, 140, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TARIA), subFont)), 365 - (((formato_numero(List_TKTSUM.get(0).A2548TARIA)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548TARIA)).length() * 3) - 8), PYi, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 390, PYi - 4, 30, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fare", subFont_1)), 395, PYi, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 420, PYi - 4, 145, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TARID), subFont)), 538 - (((formato_numero(List_TKTSUM.get(0).A2548TARID)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548TARID)).length() * 3) - 8), PYi, 0);
            PYi = PYi - (Hlng + 8);
            for (int i = 0; i < lst_CalcuImpuestos.size(); i++) {
                colorRectangle(under, GrayColor.GRAYWHITE, 80, PYi, 50, 15);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(lst_CalcuImpuestos.get(i).A1673CDTAX, subFont)), 85, PYi + 5, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 120, PYi, 100, 15);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(lst_CalcuImpuestos.get(i).A1673TXMIA), subFont)), 195 - (((formato_numero(lst_CalcuImpuestos.get(i).A1673TXMIA)).length() <= 4 ? 4 : (formato_numero(lst_CalcuImpuestos.get(i).A1673TXMIA)).length() * 3) - 8), PYi + 5, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 250, PYi, 50, 15);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(lst_CalcuImpuestos.get(i).A1673CDTAX, subFont)), 255, PYi + 5, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 295, PYi, 95, 15);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(lst_CalcuImpuestos.get(i).A1673TXORI), subFont)), 365 - (((formato_numero(lst_CalcuImpuestos.get(i).A1673TXORI)).length() <= 4 ? 4 : (formato_numero(lst_CalcuImpuestos.get(i).A1673TXORI)).length() * 3) - 8), PYi + 5, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 425, PYi, 50, 15);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(lst_CalcuImpuestos.get(i).A1673CDTAX, subFont)), 430, PYi + 5, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 465, PYi, 100, 15);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(lst_CalcuImpuestos.get(i).A1673TXDIF), subFont)), 538 - (((formato_numero(lst_CalcuImpuestos.get(i).A1673TXDIF)).length() <= 4 ? 4 : (formato_numero(lst_CalcuImpuestos.get(i).A1673TXDIF)).length() * 3) - 8), PYi + 5, 0);
                PYi = PYi - Hlng;
            }
            PYi = PYi - 4;
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 50, PYi, 70, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Total Tax:", subFont_1)), 55, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 120, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TTAX), subFont)), 195 - (((formato_numero(List_TKTSUM.get(0).A2548TTAX)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548TTAX)).length() * 3) - 8), PYi + 5, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 220, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Total Tax:", subFont_1)), 225, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 295, PYi, 95, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TTAXA), subFont)), 365 - (((formato_numero(List_TKTSUM.get(0).A2548TTAXA)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548TTAXA)).length() * 3) - 8), PYi + 5, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 390, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Total Tax:", subFont_1)), 395, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 465, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TTAXD), subFont)), 538 - (((formato_numero(List_TKTSUM.get(0).A2548TTAXD)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548TTAXD)).length() * 3) - 8), PYi + 5, 0);
            PYi = PYi - (Hlng + 4);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 50, PYi, 70, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Services charges:", subFont_1)), 55, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 120, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548SERVI), subFont)), 195 - (((formato_numero(List_TKTSUM.get(0).A2548SERVI)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548SERVI)).length() * 3) - 8), PYi + 5, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 220, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Services charges:", subFont_1)), 225, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 295, PYi, 95, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548SERVA), subFont)), 365 - (((formato_numero(List_TKTSUM.get(0).A2548SERVA)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548SERVA)).length() * 3) - 8), PYi + 5, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 390, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Services charges:", subFont_1)), 395, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 465, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548SERVD), subFont)), 538 - (((formato_numero(List_TKTSUM.get(0).A2548SERVD)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548SERVD)).length() * 3) - 8), PYi + 5, 0);
            PYi = PYi - (Hlng + 4);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 50, PYi, 70, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Iva(charge):", subFont_1)), 55, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 120, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548IVACS), subFont)), 195 - (((formato_numero(List_TKTSUM.get(0).A2548IVACS)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548IVACS)).length() * 3) - 8), PYi + 5, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 220, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Iva(charge):", subFont_1)), 225, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 295, PYi, 95, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548IVACA), subFont)), 365 - (((formato_numero(List_TKTSUM.get(0).A2548IVACA)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548IVACA)).length() * 3) - 8), PYi + 5, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 390, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Iva(charge):", subFont_1)), 395, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 465, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548IVACD), subFont)), 538 - (((formato_numero(List_TKTSUM.get(0).A2548IVACD)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548IVACD)).length() * 3) - 8), PYi + 5, 0);
            PYi = PYi - (Hlng + 4);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 50, PYi, 70, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Commission:", subFont_1)), 55, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 120, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548COMIS), subFont)), 195 - (((formato_numero(List_TKTSUM.get(0).A2548COMIS)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548COMIS)).length() * 3) - 8), PYi + 5, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 220, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Commission:", subFont_1)), 225, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 295, PYi, 95, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548COMIA), subFont)), 365 - (((formato_numero(List_TKTSUM.get(0).A2548COMIA)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548COMIA)).length() * 3) - 8), PYi + 5, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 390, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Commission:", subFont_1)), 395, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 465, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548COMID), subFont)), 538 - (((formato_numero(List_TKTSUM.get(0).A2548COMID)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548COMID)).length() * 3) - 8), PYi + 5, 0);
            PYi = PYi - (Hlng + 4);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 50, PYi, 70, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Over Commission:", subFont_1)), 55, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 120, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548SCOM), subFont)), 195 - (((formato_numero(List_TKTSUM.get(0).A2548SCOM)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548SCOM)).length() * 3) - 8), PYi + 5, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 220, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Over Commission:", subFont_1)), 225, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 295, PYi, 95, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548SCOMA), subFont)), 365 - (((formato_numero(List_TKTSUM.get(0).A2548SCOMA)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548SCOMA)).length() * 3) - 8), PYi + 5, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 390, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Over Commission:", subFont_1)), 395, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 465, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548SCOMD), subFont)), 538 - (((formato_numero(List_TKTSUM.get(0).A2548SCOMD)).length() <= 4 ? 4 : (formato_numero(Data.A2548SCOMD)).length() * 3) - 8), PYi + 5, 0);
            PYi = PYi - (Hlng + 4);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 50, PYi, 70, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Tax on Comm.:", subFont_1)), 55, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 120, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TAXCM), subFont)), 195 - (((formato_numero(List_TKTSUM.get(0).A2548TAXCM)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548TAXCM)).length() * 3) - 8), PYi + 5, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 220, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Tax on Comm.:", subFont_1)), 225, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 295, PYi, 95, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TAXCA), subFont)), 365 - (((formato_numero(List_TKTSUM.get(0).A2548TAXCA)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548TAXCA)).length() * 3) - 8), PYi + 5, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 390, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Tax on Comm.:", subFont_1)), 395, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 465, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TAXCD), subFont)), 538 - (((formato_numero(List_TKTSUM.get(0).A2548TAXCD)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548TAXCD)).length() * 3) - 8), PYi + 5, 0);
            PYi = PYi - (Hlng + 4);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 295, PYi, 170, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Amount pay Airline:", subFont_1)), 300, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 465, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548NETO), subFont)), 538 - (((formato_numero(List_TKTSUM.get(0).A2548NETO)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548NETO)).length() * 3) - 8), PYi + 5, 0);



            PYi = PYi - 8;
            // Control Page: 1 //                 
            ItemPage++;
            if (ItemPage > 30 && getPageNumber < 1) { //30
                ItemPage = 0;
                PYi = 520; //550
                getPageNumber++;
                document.newPage();

                // Set Title Next Page //
                posNewPagex = 15;
                posNewPagey = (PYi + 13);
                this.setTitle(posNewPagex, posNewPagey, writer);
                // Reinciar Contador al inicio  Nex Page //
                posNewPagex = 15;

            }
            // Page > 1
            if (getPageNumber > 0 && ItemPage > 40) { //45
                ItemPage = 0;
                PYi = 520; //550
                getPageNumber++;
                document.newPage();

                // Set Title Next Page //
                posNewPagey = (PYi + 13);
                this.setTitle(posNewPagex, posNewPagey, writer);

                // Reinciar Contador al inicio  Nex Page //
                posNewPagex = 15;
            }

            document.close();
            return fileTmp01;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
