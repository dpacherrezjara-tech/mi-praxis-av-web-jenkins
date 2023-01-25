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
import com.itextpdf.text.FontFactory;
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
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.SaleAudit.A1580Filter;
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;

/**
 *
 * @author zperez
 */
public class ReportADMARCPDF {

    private String FILE = "RptADMARCPDF.pdf";
    public final String FileTXT = "RptADMARCPDF.txt";
    private Font catFont = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.BOLD);
    private Font subFont_negr = new Font(Font.FontFamily.COURIER, 8, Font.BOLD);
    private Font subFont = new Font(Font.FontFamily.COURIER, 8, Font.NORMAL); // 10
    private Font subFontT = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD); //12
    private Font NORMAL = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
    private Font subFont_1 = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD, BaseColor.WHITE);
    //private Font subFont_2 = new Font(Font.FontFamily.COURIER, 8,Font.BOLD, BaseColor.BLUE); // 10Font.UNDERLINE
    private Font subFont_2 = FontFactory.getFont("Courier", 8, Font.UNDERLINE, BaseColor.BLUE);
    private Font subFont3 = new Font(Font.FontFamily.COURIER, 8, Font.NORMAL); // 10
    private Font subFont4 = new Font(Font.FontFamily.COURIER, 8, Font.NORMAL); // 10
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
                table.setWidths(new int[]{24, 5, 2});
                table.setTotalWidth(530);
                table.setLockedWidth(true);
                table.getDefaultCell().setFixedHeight(20);
                table.getDefaultCell().setBorder(Rectangle.BOTTOM);
                table.addCell(header);
                table.getDefaultCell().setVerticalAlignment(Element.ALIGN_RIGHT);  //setHorizontalAlignment(Element.ALIGN_RIGHT);
                table.addCell(String.format("Página: %d de ", writer.getPageNumber()));

                PdfPCell cell = new PdfPCell(Image.getInstance(total));
                cell.setBorder(Rectangle.BOTTOM);
                table.addCell(cell);
                table.writeSelectedRows(0, -1, 34, 50, writer.getDirectContent());
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
        "139X2.png",
        "scissors.png",
        "logox2.png"
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
        //colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), posNewPagex, posNewPagey - 7, 750, 25);

    }

    public File createReport(SQP00911Filter Data, List<SQP00911Filter> lst_razones, List<A1580Filter> lst_CalcuArelonia, List<A1673Filter> lst_CalcuImpuestos, FACSIMILFilter facsimil, List<FACSIMILFilter> searchAgent, List<SQP00911Filter> lst_TKT, List<SQP00911Filter> List_TKTSUM) {

        try {
            fileTmp01 = File.createTempFile("tmp", FILE);
            //fileTmp02 = File.createTempFile("tmp", FileTXT);
            lstFileTmp.add(fileTmp01);
            //lstFileTmp.add(fileTmp02);            
            PYi = 822;
            Hlng = 12;
            int PosX1 = 15;
            int PosXTO;
            int PosXXO;
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
            int PosXCARRI;
            String vl_ZIPCOD = "";
            String VL_CntTKT;
            String VL_PAX;
            String strRestrict = "";
            String strFC = "";
            String strTexto = "";
            String VL_TKTS = "";
            String VL_LIST_TKT0 = "";
            String VL_LIST_TKT1 = "";
            String VL_LIST_TKT2 = "";
            String VL_DATESALE = "";
            String txtTitle = "";
            int ItemPage = 0;
            int getPageNumber = 0;
            int PoxT;
            int PosXDATE;
            int PosXCL;
            int PosXFROM;
            int PosXTIME;
            int PosXST;
            int PosXFAREB;
            int PosXVALIDB;
            int PosXVALIDA;
            int PosXUSE;
            int PosXDATE2;
            int PosXVALUE;
            int PosXLEG;
            int PosXFLIGHT;
            int PosXZ;

            int posNewPagex = 0;
            int posNewPagey = 0;

            double TOT_A1580FAORI = 0;
            double TOT_TOTAL = 0;
            double TOT_A1729OCANR = 0;
            double TOT_A1729COCAR = 0;

            //Document document = new Document(new Rectangle(842, 595)); // OLD
            //Document document = new Document(new Rectangle(785, 590)); // TAMANIO CARTA
            Document document = new Document(PageSize.A4, 5, 5, 5, 5);
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(fileTmp01));
            ReportADMARCPDF.TableHeader event = new ReportADMARCPDF.TableHeader();
            writer.setPageEvent(event);
            document.open();

            // Adding a series of images ***LOGO AM
            Image img;
            Image img2;
            Image img3;
            Image img4;
            img = Image.getInstance(String.format("/Dumps/%s", RESOURCES[0]));
            img2 = Image.getInstance(String.format("/Dumps/%s", RESOURCES[2]));
            img3 = Image.getInstance(String.format("/Dumps/%s", RESOURCES[0]));
            //img.setAbsolutePosition(PosX1, 800); //550  530    
            //img.scaleToFit(190, 40);

            //document.add(new Paragraph(String.format("", RESOURCES[0], img.getClass().getName())));
            //document.add(img);
            if (Data.A2548PREME.equals("")) {
                PdfContentByte canvas = writer.getDirectContentUnder();
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("NO HAY DATOS ...! ")), PosX1, PYi, 0);
                document.close();
                return null;
            }
            PdfContentByte canvas = writer.getDirectContent();
            PdfContentByte under = writer.getDirectContentUnder();

            PYi = 807; //812  

            colorRectangle(under, GrayColor.GRAYWHITE, PosX1 + 270, PYi, 95, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("MEMO NUMBER: ", subFont)), PosX1 + 275, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 380, PYi, 185, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548NMEMO, subFont)), 395, PYi + 2, 0);
            PYi = 795;

            colorRectangle(under, GrayColor.GRAYWHITE, PosX1 + 270, PYi, 95, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("MEMO DATE: ", subFont)), PosX1 + 275, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 380, PYi, 185, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548FREGI.substring(0, 4) + "-" + net.miatech.utils.Functions.getAbreviaturaMes(Data.A2548FREGI.substring(4, 6)) + "-" + Data.A2548FREGI.substring(6, 8), subFont)), 395, PYi + 2, 0);

            PYi = 822;
            PYi = PYi - 55; //10  

            if (Data.A2548TRNCU.trim().equals("ACM")) {
                txtTitle = "AGENCY CREDIT MEMO ";
            } else {
                txtTitle = "AGENCY DEBIT MEMO ";
            }

            //ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTitle, PosX1, 824, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(txtTitle, catFont)), PosX1, 824, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, PosX1, 718, 265, 103);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("amusadm@aeromexico.com", subFont_2)), PosX1 + 3, 776, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Av. Tahel S/N", subFont4)), PosX1 + 3, 768, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Colonia Pensador Mexicano", subFont4)), PosX1 + 3, 763, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Delegación Venustiano Carranza", subFont4)), PosX1 + 3, 758, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("C.P. 15510, Mexico City, Mexico", subFont4)), PosX1 + 3, 752, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, new Phrase(new Paragraph("On your next IAR sales report, please include payment", subFont3)), PosX1 + 3, 740, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, new Phrase(new Paragraph("for the amount shown on the stub below. If you have", subFont3)), PosX1 + 3, 735, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, new Phrase(new Paragraph("any information whitch amends or cancels this debit,", subFont3)), PosX1 + 3, 730, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, new Phrase(new Paragraph("please provide details and return the memo immediately", subFont3)), PosX1 + 3, 725, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, new Phrase(new Paragraph("to the e-mail or the address indicated above.", subFont3)), PosX1 + 3, 720, 0);

            img4 = Image.getInstance(String.format("/Dumps/%s", RESOURCES[0]));
            img4.setAbsolutePosition(18, 785); //550  530    
            img4.scaleToFit(190, 40);

            document.add(new Paragraph(String.format("", RESOURCES[0], img4.getClass().getName())));
            document.add(img4);

            //PYi = PYi - 42; //10 
            colorRectangle(under, GrayColor.GRAYWHITE, PosX1 + 270, PYi, 95, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("AGENCY NUMBER: ", subFont)), PosX1 + 275, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 380, PYi, 185, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548IATA, subFont)), 395, PYi + 2, 0);

            //List_TKTSUM lst_TKT 20160121
            PYi = PYi - Hlng;

            if (lst_TKT.size() > 0) {
                if (lst_TKT.get(0).A2548CANTIDAD > 1) {
                    VL_CntTKT = "MULTI-SEE BELOW *";
                    VL_PAX = "MULTI";
                    VL_DATESALE = "MULTI";
                } else {
                    VL_CntTKT = Data.A2548TIKET;
                    VL_PAX = Data.A2548PAX;
                    VL_DATESALE = Data.A2548FVTA.substring(0, 4) + "-" + net.miatech.utils.Functions.getAbreviaturaMes(Data.A2548FVTA.substring(4, 6)) + "-" + Data.A2548FVTA.substring(6, 8);
                    //getAbreviaturaMes
                }
            } else {
                VL_CntTKT = Data.A2548TIKET;
                VL_PAX = Data.A2548PAX;
                VL_DATESALE = Data.A2548FVTA.substring(0, 4) + "-" + net.miatech.utils.Functions.getAbreviaturaMes(Data.A2548FVTA.substring(4, 6)) + "-" + Data.A2548FVTA.substring(6, 8);
            }
            /* if (Data.A2548CANTIDAD > 1) {
             VL_CntTKT = "MULTI-SEE BELOW";
             VL_PAX = "";
             } else {
             VL_CntTKT = Data.A2548TIKET;
             VL_PAX = Data.A2548PAX;
             }*/
            colorRectangle(under, GrayColor.GRAYWHITE, PosX1 + 270, PYi, 95, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("TICKET NUMBER: ", subFont)), PosX1 + 275, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 380, PYi, 185, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(VL_CntTKT, subFont)), 395, PYi + 2, 0);

            PYi = PYi - Hlng;

            colorRectangle(under, GrayColor.GRAYWHITE, PosX1 + 270, PYi, 95, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("TICKET ISSUE DATE: ", subFont)), PosX1 + 275, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 380, PYi, 185, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(VL_DATESALE/*Data.A2548FVTA*/, subFont)), 395, PYi + 2, 0);

            PYi = PYi - Hlng;

            colorRectangle(under, GrayColor.GRAYWHITE, PosX1 + 270, PYi, 95, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("REFERENCE: ", subFont)), PosX1 + 275, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 380, PYi, 185, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("", subFont)), 395, PYi + 2, 0);

            PYi = PYi - Hlng;

            colorRectangle(under, GrayColor.GRAYWHITE, PosX1 + 270, PYi, 95, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("PASSENGER NAME: ", subFont)), PosX1 + 275, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 380, PYi, 185, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(VL_PAX, subFont)), 395, PYi + 2, 0);

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
            PYi = PYi - Hlng;
            PYi = PYi - (Hlng + 12);
            if (lst_TKT.size() > 1) {
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("* Ticket Numbers: ", subFont)), 15, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED_ALL, new Phrase(new Paragraph(VL_LIST_TKT0, subFont)), 95, PYi, 0);
                PYi = PYi - Hlng;
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED_ALL, new Phrase(new Paragraph(VL_LIST_TKT1, subFont)), 90, PYi, 0);
                PYi = PYi - Hlng;
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED_ALL, new Phrase(new Paragraph(VL_LIST_TKT2, subFont)), 90, PYi, 0);
                PYi = PYi - Hlng;
            }

            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("REASON / REASONS FOR MEMO", subFont)), PosX1 + 170, PYi, 0);
            PYi = PYi - Hlng;  // SALTO DESPUES DEL TITULO DE COLUMNAS lst_razones
            for (int i = 0; i < lst_razones.size(); i++) {
                colorRectangle(under, GrayColor.GRAYWHITE, 15, PYi - 7, 550, 15);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(lst_razones.get(i).A2548EMISION, subFont)), 20, PYi, 0);
                PYi = PYi - Hlng;
            }
            PYi = PYi - (Hlng + 5);

            colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi - 5, 70, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("NEXT FARE", subFont)), PosX1 + 5, PYi - 1, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, PosX1 + 65, PYi - 5, 485, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548CODIT, subFont)), PosX1 + 75, PYi - 1, 0);
            PYi = PYi - (Hlng + 10);
            //colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi-1, 550, 12);
            colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi - 1, 65, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Currency", subFont)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 75;
            colorRectangle(under, GrayColor.GRAYWHITE, 80, PYi - 1, 140, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("AIRLINE'S CALCULATION", subFont)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 165;
            colorRectangle(under, GrayColor.GRAYWHITE, 220, PYi - 1, 170, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("AGENT'S CALCULATION", subFont)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 165;
            colorRectangle(under, GrayColor.GRAYWHITE, 390, PYi - 1, 175, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("DIFFERENCE", subFont)), PosX1 + 2, PYi + 3, 0);

            PYi = PYi - (Hlng + 5);
            PosX1 = 15;
            colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi - 4, 35, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548MDA, subFont)), PosX1 + 3, PYi, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 50, PYi - 4, 70, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fare:", subFont)), 55, PYi, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 120, PYi - 4, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TARIF), subFont)), 195 - (((formato_numero(List_TKTSUM.get(0).A2548TARIF)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548TARIF)).length() * 3) - 8), PYi, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 220, PYi - 4, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fare:", subFont)), 225, PYi, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 295, PYi - 4, 95, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TARIA), subFont)), 365 - (((formato_numero(List_TKTSUM.get(0).A2548TARIA)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548TARIA)).length() * 3) - 8), PYi, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 390, PYi - 4, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fare:", subFont)), 395, PYi, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 465, PYi - 4, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TARID), subFont)), 538 - (((formato_numero(List_TKTSUM.get(0).A2548TARID)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548TARID)).length() * 3) - 8), PYi, 0);
            PYi = PYi - (Hlng + 3);
            colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi - 4, 35, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548MDA, subFont)), PosX1 + 3, PYi, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 50, PYi - 4, 70, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("TOTAL TAX:", subFont)), 55, PYi, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 120, PYi - 4, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TTAX), subFont)), 195 - (((formato_numero(List_TKTSUM.get(0).A2548TTAX)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548TTAX)).length() * 3) - 8), PYi, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 220, PYi - 4, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("TOTAL TAX:", subFont)), 225, PYi, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 295, PYi - 4, 95, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TTAXA), subFont)), 365 - (((formato_numero(List_TKTSUM.get(0).A2548TTAXA)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548TTAXA)).length() * 3) - 8), PYi, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 390, PYi - 4, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("TOTAL TAX:", subFont_1)), 395, PYi, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 465, PYi - 4, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TTAXD), subFont)), 538 - (((formato_numero(List_TKTSUM.get(0).A2548TTAXD)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548TTAXD)).length() * 3) - 8), PYi, 0);

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
            colorRectangle(under, GrayColor.GRAYWHITE, 50, PYi, 70, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("SERVICE FEE:", subFont)), 55, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 120, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548SERVI), subFont)), 195 - (((formato_numero(List_TKTSUM.get(0).A2548SERVI)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548SERVI)).length() * 3) - 8), PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 220, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("SERVICE FEE:", subFont)), 225, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 295, PYi, 95, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548SERVA), subFont)), 365 - (((formato_numero(List_TKTSUM.get(0).A2548SERVA)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548SERVA)).length() * 3) - 8), PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 390, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("SERVICE FEE:", subFont)), 395, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 465, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548SERVD), subFont)), 538 - (((formato_numero(List_TKTSUM.get(0).A2548SERVD)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548SERVD)).length() * 3) - 8), PYi + 5, 0);
            PYi = PYi - (Hlng + 4);
            colorRectangle(under, GrayColor.GRAYWHITE, 50, PYi, 70, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Commission:", subFont)), 55, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 120, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548COMIS + List_TKTSUM.get(0).A2548SCOM), subFont)), 195 - (((formato_numero(List_TKTSUM.get(0).A2548COMIS + List_TKTSUM.get(0).A2548SCOM)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548COMIS + List_TKTSUM.get(0).A2548SCOM)).length() * 3) - 8), PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 220, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Commission:", subFont)), 225, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 295, PYi, 95, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548COMIA + List_TKTSUM.get(0).A2548SCOMA), subFont)), 365 - (((formato_numero(List_TKTSUM.get(0).A2548COMIA + List_TKTSUM.get(0).A2548SCOMA)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548COMIA + List_TKTSUM.get(0).A2548SCOMA)).length() * 3) - 8), PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 390, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Commission:", subFont)), 395, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 465, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548COMID + List_TKTSUM.get(0).A2548SCOMD), subFont)), 538 - (((formato_numero(List_TKTSUM.get(0).A2548COMID + List_TKTSUM.get(0).A2548SCOMD)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548COMID + List_TKTSUM.get(0).A2548SCOMD)).length() * 3) - 8), PYi + 5, 0);
            PYi = PYi - (Hlng + 4);
            colorRectangle(under, GrayColor.GRAYWHITE, 390, PYi, 75, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("NET :", subFont)), 395, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 465, PYi, 100, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548NETO), subFont)), 538 - (((formato_numero(List_TKTSUM.get(0).A2548NETO)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548NETO)).length() * 3) - 8), PYi + 5, 0);
            PYi = PYi - (Hlng + 3);
            PosX1 = 15;

            img2.setAbsolutePosition(PosX1, PYi); //550  530 
            img2.scaleToFit(50, 15);
            document.add(new Paragraph(String.format("", RESOURCES[2], img2.getClass().getName())));
            document.add(img2);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("-----------------------------------------------------------------------------------------------------------------", subFont)), PosX1, PYi + 5, 0);
            PYi = PYi - (Hlng + 3);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("PAYMENT STUB", subFont)), 260, PYi, 0);
            PYi = PYi - Hlng - 20;
            colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi, 60, 25);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("MEMO DATE", subFont)), PosX1 + 3, PYi + 15, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548FREGI.substring(0, 4) + "-" + net.miatech.utils.Functions.getAbreviaturaMes(Data.A2548FREGI.substring(4, 6)) + "-" + Data.A2548FREGI.substring(6, 8), subFont)), PosX1 + 3, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 75, PYi, 115, 25);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("AMOUNT DUE TO AIRLINE", subFont)), 80, PYi + 15, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548NETO), subFont)), 150 - (((formato_numero(List_TKTSUM.get(0).A2548NETO)).length() <= 4 ? 4 : (formato_numero(List_TKTSUM.get(0).A2548NETO)).length() * 3) - 8), PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 190, PYi, 50, 25);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("CURRENCY", subFont)), 195, PYi + 15, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548MDA, subFont)), 210, PYi + 2, 0);

            PYi = PYi - (Hlng + 3);
            img3.setAbsolutePosition(350, PYi); //550  530 
            img3.scaleToFit(190, 40);
            document.add(new Paragraph(String.format("", RESOURCES[0], img3.getClass().getName())));
            document.add(img3);

            PYi = PYi - Hlng - 100;
            colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi, 280, 80);

            //ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(searchAgent.get(0).A720CONTA1, subFont)), PosX1 + 3, PYi + 70, 0);
            // ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(searchAgent.get(0).A720CONTA2, subFont)), PosX1 + 3, PYi + 60, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(searchAgent.get(0).strNombreAgente, subFont_negr)), PosX1 + 3, PYi + 70, 0);
            // ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(searchAgent.get(0).A720NAME, subFont)), PosX1 + 3, PYi + 60, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(searchAgent.get(0).strDirecAgente, subFont_negr)), PosX1 + 3, PYi + 60, 0);
            if (searchAgent.get(0).A720ZIPCOD.length() > 5) {
                vl_ZIPCOD = searchAgent.get(0).A720ZIPCOD.substring(0, 5) + "-" + searchAgent.get(0).A720ZIPCOD.substring(5, searchAgent.get(0).A720ZIPCOD.length());
            } else {
                vl_ZIPCOD = searchAgent.get(0).A720ZIPCOD;
            }
            //
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(searchAgent.get(0).A720DISTRI + " " + searchAgent.get(0).A720DEPART + " " + vl_ZIPCOD, subFont_negr)), PosX1 + 3, PYi + 50, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(searchAgent.get(0).COUNTRY + "A", subFont_negr)), 20, PYi + 40, 0);


            /*
             ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Country "+searchAgent.get(0).COUNTRY+" District "+ searchAgent.get(0).A720DISTRI , subFont)), PosX1 + 3, PYi + 40, 0);
             ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("County "+ searchAgent.get(0).A720DEPART+" Zipcode "+searchAgent.get(0).A720ZIPCOD, subFont)), PosX1 + 3, PYi + 30, 0);
             ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(searchAgent.get(0).AGTN, subFont)), PosX1 + 20, PYi + 10, 0);
             */
            PYi = PYi - Hlng + 15;
            colorRectangle(under, GrayColor.GRAYWHITE, 310, PYi, 100, 25);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("FORM/SERIAL NUMBER", subFont)), 312, PYi + 15, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548NMEMO, subFont)), 312, PYi + 5, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 400, PYi, 100, 25);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("AGENCY NUMBER", subFont)), 410, PYi + 15, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548IATA, subFont)), 410, PYi + 5, 0);

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
            //if (getPageNumber > 0 && ItemPage > 40) { //45
            ItemPage = 0;
            PYi = 520; //550
            getPageNumber++;
            document.newPage();

            // Set Title Next Page //
            // posNewPagey = (PYi + 13);
            //segun hoja de pdf
            PosX1 = 15;
            PYi = 812; //10  

            colorRectangle(under, GrayColor.GRAYWHITE, PosX1 + 270, PYi, 95, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("MEMO NUMBER: ", subFont)), PosX1 + 275, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 380, PYi, 185, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548NMEMO, subFont)), 395, PYi + 2, 0);
            PYi = 800;

            colorRectangle(under, GrayColor.GRAYWHITE, PosX1 + 270, PYi, 95, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("MEMO DATE: ", subFont)), PosX1 + 275, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 380, PYi, 185, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548FREGI.substring(0, 4) + "-" + net.miatech.utils.Functions.getAbreviaturaMes(Data.A2548FREGI.substring(4, 6)) + "-" + Data.A2548FREGI.substring(6, 8), subFont)), 395, PYi + 2, 0);

            img4 = Image.getInstance(String.format("/Dumps/%s", RESOURCES[0]));
            img4.setAbsolutePosition(PosX1, 800); //550  530    
            img4.scaleToFit(190, 40);

            document.add(new Paragraph(String.format("", RESOURCES[0], img4.getClass().getName())));
            document.add(img4);
            PYi = PYi - (Hlng + 30);
            if(facsimil.AGTN.equals("")){
                VL_PAX = "MULTI";
            }
            if (VL_PAX == "MULTI") {
                colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi - 1, 300, 12);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("TICKET NUMBER", subFont)), PosX1 + 2, PYi, 0);
                PosX1 = PosX1 + 90;
                PosXTO = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("ISSUE DATE", subFont)), PosX1 - 2, PYi, 0);
                PosX1 = PosX1 + 70;
                PosROXCOM = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("RECOVERY AMOUNT", subFont)), PosX1 - 2, PYi, 0);
                PYi = PYi - 12;
                for (int i = 0; i < lst_TKT.size(); i++) {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(lst_TKT.get(i).A2548TIKET, subFont)), 16, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(lst_TKT.get(i).A2548FVTA.substring(0, 4) + "-" + net.miatech.utils.Functions.getAbreviaturaMes(lst_TKT.get(i).A2548FVTA.substring(4, 6)) + "-" + lst_TKT.get(i).A2548FVTA.substring(6, 8), subFont)), PosXTO, PYi, 0);
                    //ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(lst_TKT.get(i).A2548NETO), subFont)), 220, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(lst_TKT.get(i).A2548NETO), subFont)), 220 - (((formato_numero(lst_TKT.get(i).A2548NETO)).length() <= 4 ? 4 : (formato_numero(lst_TKT.get(i).A2548NETO)).length() * 3) - 8), PYi + 3, 0);
                    PYi = PYi - Hlng;
                }
                PYi = PYi - 7;  // SALTO DESPUES DEL TITULO DE COLUMNAS lst_razones
                colorRectangle(under, GrayColor.GRAYWHITE, 15, PYi, 150, 15);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("TOTAL USD", subFont)), 70, PYi + 5, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 165, PYi, 100, 15);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548NETO), subFont)), 225, PYi + 5, 0);

            } else {
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("AUDITOR FACSIMILE ", subFont)), PosX1, PYi, 0);
                PYi = PYi - (Hlng + 30);
                colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi, 230, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("ISSUEDx BY: " + searchAgent.get(0).strNomAero, subFont)), PosX1 + 2, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 240, PYi, 180, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("PASSENGER TICKET AND BAGGAGE CHECKED", subFont)), 245, PYi + 3, 0);

                PYi = PYi - (Hlng + 2);
                colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi, 154, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("CONJUNTION TICKETS", subFont)), PosX1 + 2, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 170, PYi, 70, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548TIKET, subFont)), 175, PYi + 2, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 240, PYi, 95, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("ORIGIN/DESTINATION", subFont)), 245, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 335, PYi, 85, 13);
                if(!facsimil.TODC.trim().equals("")){
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.TODC.substring(0, 3) + " - " + facsimil.TODC.substring(3), subFont)), 340, PYi + 3, 0);
                }
                
                PYi = PYi - (Hlng + 2);
                colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi, 154, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("ENDORSEMENTS/RESTRICTIONS", subFont)), PosX1 + 2, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 170, PYi, 70, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548FTE, subFont)), 175, PYi + 2, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 240, PYi, 95, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("PNR", subFont)), 245, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 335, PYi, 85, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.PNRR, subFont)), 340, PYi + 3, 0);
                PYi = PYi - (Hlng + 2);

                for (int i = 0; i < facsimil.lstReg46Restrict.size(); i++) {
                    strRestrict += facsimil.lstReg46Restrict.get(i).toString();
                }
                colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi, 230, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(strRestrict, subFont)), PosX1 + 2, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 240, PYi, 95, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("TOUR CODE", subFont)), 245, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 335, PYi, 85, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.TOUR, subFont)), 340, PYi + 3, 0);
                PYi = PYi - (Hlng + 2);
                colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi, 154, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("PASSENGER NAME NOT TRANSFERABLE", subFont)), PosX1 + 1, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 170, PYi, 70, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("DATE OF ISSUE", subFont)), 175, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 240, PYi, 180, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("ISSUED IN EXCHANGE FOR", subFont)), 246, PYi + 3, 0);

                PYi = PYi - (Hlng + 2);
                colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi, 154, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.PXNM, subFont)), PosX1 + 1, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 170, PYi, 70, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.DAIS, subFont)), 175, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 240, PYi, 180, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.strIssExc, subFont)), 246, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 420, PYi, 155, 83);

                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(searchAgent.get(0).strNombreAgente, subFont)), 425, PYi + 75, 0);
                if (searchAgent.get(0).strDirecAgente.length() <= 29) {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(searchAgent.get(0).strDirecAgente, subFont)), 425, PYi + 65, 0);
                } else {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(searchAgent.get(0).strDirecAgente.substring(0, 29), subFont)), 425, PYi + 65, 0);
                    if ((searchAgent.get(0).strDirecAgente.length() - 29) <= 29) {
                        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(searchAgent.get(0).strDirecAgente.substring(29, searchAgent.get(0).strDirecAgente.length()), subFont)), 425, PYi + 55, 0);
                    } else {
                        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(searchAgent.get(0).strDirecAgente.substring(58, 87), subFont)), 425, PYi + 45, 0);
                        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(searchAgent.get(0).strDirecAgente.substring(116, searchAgent.get(0).strDirecAgente.length()), subFont)), 425, PYi + 45, 0);
                    }
                }
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Country " + searchAgent.get(0).COUNTRY + " District " + searchAgent.get(0).A720DISTRI, subFont)), 425, PYi + 40, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("County " + searchAgent.get(0).A720DEPART + " Zipcode " + searchAgent.get(0).A720ZIPCOD, subFont)), 425, PYi + 30, 0);

                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(searchAgent.get(0).AGTN, subFont)), 480, PYi + 10, 0);

                PYi = PYi - (Hlng + 2);
                colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi, 560, 12);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("X/O", subFont)), PosX1 + 2, PYi + 2, 0);
                PosX1 = PosX1 + 18;
                PosXFROM = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("FROM", subFont)), PosX1 + 2, PYi + 2, 0);
                PosX1 = PosX1 + 27;
                PosXTO = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("To", subFont)), PosX1 + 2, PYi + 2, 0);
                PosX1 = PosX1 + 17;
                PosXCARRI = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("CARRIER", subFont)), PosX1 + 2, PYi + 2, 0);
                PosX1 = PosX1 + 40;
                PosXFLIGHT = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("FLIGHT", subFont)), PosX1 + 2, PYi + 2, 0);
                PosX1 = PosX1 + 35;
                PosXCL = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("CL", subFont)), PosX1 + 2, PYi + 2, 0);
                PosX1 = PosX1 + 20;
                PosXDATE = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("DATE", subFont)), PosX1 + 2, PYi + 2, 0);
                PosX1 = PosX1 + 40;
                PosXTIME = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("TIME", subFont)), PosX1 + 2, PYi + 2, 0);
                PosX1 = PosX1 + 30;
                PosXST = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("ST", subFont)), PosX1 + 2, PYi + 2, 0);
                PosX1 = PosX1 + 20;
                PosXFAREB = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("FARE BASIS", subFont)), PosX1 + 2, PYi + 2, 0);
                PosX1 = PosX1 + 70;
                PosXVALIDB = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("N.VALID B", subFont)), PosX1 + 2, PYi + 2, 0);
                PosX1 = PosX1 + 55;
                PosXVALIDA = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("N.VALID A", subFont)), PosX1 + 2, PYi + 2, 0);
                PosX1 = PosX1 + 55;
                PosXUSE = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("USE", subFont)), PosX1 + 2, PYi + 2, 0);
                PosX1 = PosX1 + 20;
                PosXDATE2 = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("DATE", subFont)), PosX1 + 2, PYi + 2, 0);
                PosX1 = PosX1 + 45;
                PosXVALUE = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("VALUE", subFont)), PosX1 + 2, PYi + 2, 0);
                PosX1 = PosX1 + 40;
                PosXLEG = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("LEG", subFont)), PosX1 + 2, PYi + 2, 0);
                PYi = PYi - 12;
                for (int i = 0; i < facsimil.lstReg63.size(); i++) {
                    colorRectangle(under, GrayColor.GRAYWHITE, 15, PYi - 4, 560, 15);
                    //ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(lst_CalcuArelonia.get(i).A1580FROM, subFont)), 15, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.lstReg63.get(i).STPO, subFont)), 17, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.lstReg63.get(i).ORAC, subFont)), PosXFROM, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.lstReg63.get(i).DSTC, subFont)), PosXTO, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.lstReg63.get(i).CARR, subFont)), PosXCARRI + 10, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.lstReg63.get(i).FTNR, subFont)), PosXFLIGHT + 5, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.lstReg63.get(i).RBKD, subFont)), PosXCL + 5, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.lstReg63.get(i).FTDA, subFont)), PosXDATE, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.lstReg63.get(i).FTDT, subFont)), PosXTIME, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.lstReg63.get(i).FBST, subFont)), PosXST, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.lstReg63.get(i).FBTD, subFont)), PosXFAREB, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.lstReg63.get(i).NBDA, subFont)), PosXVALIDB + 10, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.lstReg63.get(i).NADA, subFont)), PosXVALIDA + 10, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.lstReg63.get(i).strUso, subFont)), PosXUSE + 5, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.lstReg63.get(i).strFecUso, subFont)), PosXDATE2, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(facsimil.lstReg63.get(i).dblMontoUso), subFont)), PosXVALUE + 5, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.lstReg63.get(i).strLeg, subFont)), PosXLEG + 5, PYi, 0);
                    PYi = PYi - Hlng;
                }
                PYi = PYi - (Hlng - 7);
                PosX1 = 15;
                colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi, 100, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("FARE", subFont)), PosX1 + 2, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 116, PYi, 125, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.CUTP1 + " " + formato_numero(Double.parseDouble(facsimil.FARE)), subFont)), 120, PYi + 2, 0);
                PYi = PYi - (Hlng + 2);
                colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi, 100, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("EQUIV", subFont)), PosX1 + 2, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 116, PYi, 125, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.EQFR.replaceAll("}", "").substring(0, 3).trim() + " " + formato_numero(Double.parseDouble(facsimil.EQFR.replaceAll("}", "").substring(3))), subFont)), 145, PYi + 2, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 240, PYi, 60, 26);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fare Calc.", subFont)), 242, PYi + 12, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 290, PYi, 285, 26);

                for (int i = 0; i < facsimil.lstFC.size(); i++) {
                    strFC += facsimil.lstFC.get(i).toString().trim();
                }//64 tamaño normal
                if (strFC.length() <= 58) {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(strFC, subFont)), 295, PYi + 15, 0);
                } else {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(strFC.substring(0, 57), subFont)), 295, PYi + 15, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(strFC.substring(57, strFC.length()), subFont)), 295, PYi + 5, 0);
                }
                PYi = PYi - (Hlng + 3);
                for (int i = 0; i < facsimil.lstFOP.size(); i++) {
                    strTexto += facsimil.lstFOP.get(i).toString().trim();
                }//64 tamaño normal
                colorRectangle(under, GrayColor.GRAYWHITE, 240, PYi - 10, 60, 26);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fop", subFont)), 242, PYi + 5, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 290, PYi - 10, 285, 26);
                if (strTexto.length() <= 58) {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(strTexto, subFont)), 295, PYi + 5, 0);
                } else {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(strTexto.substring(0, 57), subFont)), 295, PYi + 10, 0);
                    if ((strTexto.length() - 57) <= 57) {
                        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(strTexto.substring(57, strTexto.length()), subFont)), 295, PYi + 2, 0);
                    } else {
                        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(strTexto.substring(57, 114), subFont)), 295, PYi + 2, 0);
                        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(strTexto.substring(114, strTexto.length()), subFont)), 295, PYi - 5, 0);
                    }

                }

                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Taxes", subFont)), PosX1, PYi + 2, 0);
                for (int i = 0; i < facsimil.lstTaxes.size(); i++) {
                    colorRectangle(under, GrayColor.GRAYWHITE, 40, PYi, 75, 15);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.lstTaxes.get(i), subFont)), 100, PYi + 5, 0);
                    colorRectangle(under, GrayColor.GRAYWHITE, 116, PYi, 124, 15);
                    //ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("44.50", subFont)), 210, PYi + 5, 0);
                    PYi = PYi - Hlng;
                }
                // PYi = PYi - (Hlng + 10);
                colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi, 100, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("TOTAL", subFont)), PosX1 + 2, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 115, PYi, 125, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.CUTP1 + " " + formato_numero(Double.parseDouble(facsimil.TOTL)), subFont)), 145, PYi + 2, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 240, PYi, 95, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A2548TIKET, subFont)), 255, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 335, PYi, 85, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("ORIGINAL ISSUE ", subFont)), 340, PYi + 3, 0);
                colorRectangle(under, GrayColor.GRAYWHITE, 420, PYi, 155, 13);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(facsimil.strConjuncion.trim(), subFont)), 425, PYi + 2, 0);
            }

            /*para pintar el pdf*/
            writer.setCompressionLevel(0);

            //this.setTitle(posNewPagex, posNewPagey, writer);
            // Reinciar Contador al inicio  Nex Page //
            posNewPagex = 15;
            // }

            document.close();
            return fileTmp01;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
