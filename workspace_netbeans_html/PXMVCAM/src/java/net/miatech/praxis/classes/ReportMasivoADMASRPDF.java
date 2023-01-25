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
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.SaleAudit.A1580Filter;
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import static net.miatech.praxis.classes.ReportADMBwrPDF.RESOURCES;

/**
 *
 * @author zperez
 */
public class ReportMasivoADMASRPDF {

    private String FILE = "ASRPDF.pdf";
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

    public File createReport(SQP00911Filter obj,File directorio) {

        try {
            //fileTmp01 = File.createTempFile("tmp", FILE);
            //lstFileTmp.add(fileTmp01);
            String VL_NAME = "";
            if(!obj.A2548NMEMO.trim().equals("")){
                VL_NAME = obj.A2548NMEMO.trim();
            }else{
                VL_NAME = obj.A2548CNXPA.trim();
            } 
            fileTmp01 = new File(directorio, VL_NAME+FILE);
            lstFileTmp.add(fileTmp01);           
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
            String VL_TKTS = "";
            String VL_LIST_TKT0 = "";
            String VL_LIST_TKT1 = "";
            String VL_LIST_TKT2 = "";
            String VL_PREME = "";
            String VL_EMPLE = "";

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
            ReportMasivoADMASRPDF.TableHeader event = new ReportMasivoADMASRPDF.TableHeader();
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

            if (VL_NAME.equals("")) {
                PdfContentByte canvas = writer.getDirectContentUnder();
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("NO HAY DATOS ...! ")), PosX1, PYi, 0);
                document.close();
                return null;
            }
            PdfContentByte canvas = writer.getDirectContent();
            PdfContentByte under = writer.getDirectContentUnder();

            PYi = 822;
            PYi = PYi - 42; //10            
            Phrase txtTitle = new Phrase(new Paragraph("CHARGES NOTE", catFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTitle, PosX1, PYi, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Aerovías de México, S.A. de C.V.", catFont)), PosX1 + 250, PYi + 2, 0);
            
            if (obj.lst_TKT.size() > 0) {
                if (obj.A2548CATNNTD > 1) {
                    VL_TKTS = "MULTI-SEE BELOW *";
                    VL_PREME= "MULTI-SEE BELOW *";
                } else {
                    VL_TKTS = obj.lst_TKT.get(0).A2548TIKET;
                    VL_PREME=obj.lst_TKT.get(0).A2548PREME;
                }
            } else {
                VL_TKTS = obj.lst_TKT.get(0).A2548TIKET;
                 VL_PREME=obj.lst_TKT.get(0).A2548PREME;
            }
            
            PYi = PYi - Hlng - 20;
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 290, PYi, 70, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Pre Memo Number ", subFont_1)), PosX1 + 293, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 375, PYi, 185, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(VL_PREME, subFont)), 380, PYi + 2, 0);

            PYi = PYi - Hlng;
            Phrase txtDisputado = new Phrase(new Paragraph("Office ", subFont));
            Phrase datDisputado = new Phrase(new Paragraph(obj.AGENCY, subFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtDisputado, PosX1, PYi, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, datDisputado, PosX1 + 50, PYi, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 290, PYi, 70, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Memo Number ", subFont_1)), PosX1 + 293, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 375, PYi, 185, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(obj.A2548NMEMO, subFont)), 380, PYi + 2, 0);

            PYi = PYi - Hlng;
            Phrase txtPagado = new Phrase(new Paragraph("Employee  ", subFont));
            Phrase datPagado = new Phrase(new Paragraph(obj.lst_TKT.get(0).A2548EMPLE, subFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtPagado, PosX1, PYi, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, datPagado, PosX1 + 50, PYi, 0);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 290, PYi, 70, 13);
            
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Ticket Number ", subFont_1)), PosX1 + 293, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 375, PYi, 185, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(VL_TKTS, subFont)), 380, PYi + 2, 0);

            PYi = PYi - Hlng;
           
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 290, PYi, 70, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Issude Date ", subFont_1)), PosX1 + 293, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 375, PYi, 185, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(obj.A2548FREGI, subFont)), 380, PYi + 2, 0);

            PYi = PYi - Hlng;

            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1 + 290, PYi, 70, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Currency ", subFont_1)), PosX1 + 293, PYi + 2, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 375, PYi, 185, 13);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(obj.A2548MDA, subFont)), 380, PYi + 2, 0);

            PYi = PYi - Hlng;
            
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi - 28, 550, 15);
            //colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi - 28, 550, 15);
            PYi = PYi - (Hlng + 12);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Issue Reason", subFont_1)), PosX1 + 250, PYi, 0);
            PYi = PYi - Hlng;  // SALTO DESPUES DEL TITULO DE COLUMNAS lst_razones
            for (int i = 0; i < obj.lst_razones.size(); i++) {
                colorRectangle(under, GrayColor.GRAYWHITE, 15, PYi - 7, 550, 15);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(obj.lst_razones.get(i).A2548EMISION, subFont)), 20, PYi, 0);
                PYi = PYi - Hlng;
            }
             PYi = PYi - Hlng; 
             
            for (int i = 0; i < obj.lst_TKT.size(); i++) {
                if (obj.A2548CATNNTD > 1) {
                    if (i <= 6) {
                        VL_LIST_TKT0 = VL_LIST_TKT0 + " " + obj.lst_TKT.get(i).A2548TIKET;
                    }
                    if (i > 6 && i <= 13) {
                        VL_LIST_TKT1 = VL_LIST_TKT1 + " " + obj.lst_TKT.get(i).A2548TIKET;
                    }
                    if (i > 13) {
                        VL_LIST_TKT2 = VL_LIST_TKT2 + " " + obj.lst_TKT.get(i).A2548TIKET;
                    }

                }


            }
            if (obj.A2548CATNNTD > 1) {
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("* Ticket Numbers: ", subFont)), 15, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED_ALL, new Phrase(new Paragraph(VL_LIST_TKT0, subFont)), 95, PYi, 0);
                PYi = PYi - Hlng;
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED_ALL, new Phrase(new Paragraph(VL_LIST_TKT1, subFont)), 90, PYi, 0);
                PYi = PYi - Hlng;
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED_ALL, new Phrase(new Paragraph(VL_LIST_TKT2, subFont)), 90, PYi, 0);
                PYi = PYi - Hlng;
            }
            
            PYi = PYi - Hlng;
            //colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi-1, 550, 12);
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi - 1, 65, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(" ", subFont_1)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 75;
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 80, PYi - 1, 140, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("AIRLINE'S CALCULATION", subFont_1)), PosX1 + 2, PYi + 5, 0);
            PosX1 = PosX1 + 165;
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 220, PYi - 1, 170, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("AGENT'S CALCULATION", subFont_1)), PosX1 + 2, PYi + 5, 0);
            PosX1 = PosX1 + 165;
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), 390, PYi - 1, 175, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("DIFFERENCE", subFont_1)), PosX1 + 2, PYi + 5, 0);
            //TABLE DE NETOS FARE
            PYi = PYi - Hlng;
            PosX1 = 15;
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi - 1, 65, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("FARE ", subFont_1)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 75;
            colorRectangle(under, GrayColor.GRAYWHITE, 80, PYi - 1, 140, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(obj.A2548TARIF), subFont)), 183 - (((formato_numero(obj.A2548TARIF)).length() <= 4 ? 4 : (formato_numero(obj.A2548TARIF)).length() * 3) - 8), PYi + 3, 0);
                    //(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TARIF), subFont)), 163, PYi + 3, 0);
            PosX1 = PosX1 + 165;
            colorRectangle(under, GrayColor.GRAYWHITE, 220, PYi - 1, 170, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(obj.A2548TARIA), subFont)), 360 - (((formato_numero(obj.A2548TARIA)).length() <= 4 ? 4 : (formato_numero(obj.A2548TARIA)).length() * 3) - 8), PYi + 3, 0);
                    //(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TARIA), subFont)), 340, PYi + 3, 0);
            PosX1 = PosX1 + 165;
            colorRectangle(under, GrayColor.GRAYWHITE, 390, PYi - 1, 175, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(obj.A2548TARID), subFont)), 535 - (((formato_numero(obj.A2548TARID)).length() <= 4 ? 4 : (formato_numero(obj.A2548TARID)).length() * 3) - 8), PYi + 3, 0);
                   // (new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TARID), subFont)), 515, PYi + 3, 0);
            //TAXES
            PYi = PYi - Hlng;
            PosX1 = 15;
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi - 1, 65, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("TAX ", subFont_1)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 75;
            colorRectangle(under, GrayColor.GRAYWHITE, 80, PYi - 1, 140, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(obj.A2548TTAX), subFont)), 183 - (((formato_numero(obj.A2548TTAX)).length() <= 4 ? 4 : (formato_numero(obj.A2548TTAX)).length() * 3) - 8), PYi + 3, 0);
                    //(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TTAX), subFont)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 165;
            colorRectangle(under, GrayColor.GRAYWHITE, 220, PYi - 1, 170, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(obj.A2548TTAXA), subFont)), 360 - (((formato_numero(obj.A2548TTAXA)).length() <= 4 ? 4 : (formato_numero(obj.A2548TTAXA)).length() * 3) - 8), PYi + 3, 0);
                    //(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TTAXA), subFont)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 165;
            colorRectangle(under, GrayColor.GRAYWHITE, 390, PYi - 1, 175, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(obj.A2548TTAXD), subFont)), 535 - (((formato_numero(obj.A2548TTAXD)).length() <= 4 ? 4 : (formato_numero(obj.A2548TTAXD)).length() * 3) - 8), PYi + 3, 0);
                    //(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548TTAXD), subFont)), PosX1 + 2, PYi + 3, 0);
            //TAXES
            PYi = PYi - Hlng;
            PosX1 = 15;
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi - 1, 65, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("SERVICE FEE ", subFont_1)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 75;
            colorRectangle(under, GrayColor.GRAYWHITE, 80, PYi - 1, 140, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(obj.A2548PENAL), subFont)), 183 - (((formato_numero(obj.A2548PENAL)).length() <= 4 ? 4 : (formato_numero(obj.A2548PENAL)).length() * 3) - 8), PYi + 3, 0);
                    //(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548SERVI), subFont)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 165;
            colorRectangle(under, GrayColor.GRAYWHITE, 220, PYi - 1, 170, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(obj.A2548PENAA), subFont)), 360 - (((formato_numero(obj.A2548PENAA)).length() <= 4 ? 4 : (formato_numero(obj.A2548PENAA)).length() * 3) - 8), PYi + 3, 0);
                    //(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548SERVA), subFont)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 165;
            colorRectangle(under, GrayColor.GRAYWHITE, 390, PYi - 1, 175, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(obj.A2548PENAD), subFont)), 535 - (((formato_numero(obj.A2548PENAD)).length() <= 4 ? 4 : (formato_numero(obj.A2548PENAD)).length() * 3) - 8), PYi + 3, 0);
                    //(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548SERVD), subFont)), PosX1 + 2, PYi + 3, 0);
            //COMISION
            PYi = PYi - Hlng;
            PosX1 = 15;
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi - 1, 65, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("COMMISSION", subFont_1)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 75;
            colorRectangle(under, GrayColor.GRAYWHITE, 80, PYi - 1, 140, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(obj.A2548COMIS), subFont)), 183 - (((formato_numero(obj.A2548COMIS)).length() <= 4 ? 4 : (formato_numero(obj.A2548COMIS)).length() * 3) - 8), PYi + 3, 0);
                    //(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548COMIS), subFont)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 165;
            colorRectangle(under, GrayColor.GRAYWHITE, 220, PYi - 1, 170, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(obj.A2548COMIA), subFont)), 360 - (((formato_numero(obj.A2548COMIA)).length() <= 4 ? 4 : (formato_numero(obj.A2548COMIA)).length() * 3) - 8), PYi + 3, 0);
                    //(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548COMIA), subFont)), PosX1 + 2, PYi + 3, 0);
            PosX1 = PosX1 + 165;
            colorRectangle(under, GrayColor.GRAYWHITE, 390, PYi - 1, 175, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(obj.A2548COMID), subFont)), 535 - (((formato_numero(obj.A2548COMID)).length() <= 4 ? 4 : (formato_numero(obj.A2548COMID)).length() * 3) - 8), PYi + 3, 0);
                    //(new Paragraph(formato_numero(List_TKTSUM.get(0).A2548COMID), subFont)), PosX1 + 2, PYi + 3, 0);
            
            
            
            PYi = PYi - Hlng; // SALTO DESPUES DEL TITULO DE COLUMNAS lst_razones
            PosX1 = 15;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Total: ", subFont)), 350, PYi + 3, 0);
            colorRectangle(under, GrayColor.GRAYWHITE, 390, PYi - 1, 175, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(obj.A2548NETO), subFont)), 535 - (((formato_numero(obj.A2548NETO)).length() <= 4 ? 4 : (formato_numero(obj.A2548NETO)).length() * 3) - 8), PYi + 3, 0);

            PYi = PYi - (Hlng + 5);
            Phrase txtObser = new Phrase(new Paragraph("Observation: ", subFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtObser, PosX1, PYi, 0);
            PYi = PYi - Hlng;
            colorRectangle(under, GrayColor.GRAYWHITE, 15, PYi - 7, 550, 15);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(obj.lst_TKT.get(0).A2548OBSER, subFont)), 20, PYi, 0);
            PYi = PYi - (Hlng + 60);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Name: ", subFont)), PosX1 + 7, PYi + 3, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("...............................................", subFont)), PosX1 + 35, PYi + 3, 0);
            //PRIMER CASO
            if ((obj.lst_TKT.get(0).A2548CANAL.equals("ATO") && obj.lst_TKT.get(0).A2548CIUD.equals("MEX")) || (obj.lst_TKT.get(0).A2548CANAL.equals("CTO") || obj.lst_TKT.get(0).A2548CANAL.equals("GSA"))) {
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, new Phrase(new Paragraph("Con base en la cláusula no. 102 del Contrato", subFont)), PosX1 + 305, PYi + 5, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, new Phrase(new Paragraph("Colectivo de Trabajo, en caso de no recibir", subFont)), PosX1 + 305, PYi - 3, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, new Phrase(new Paragraph("respuesta dentro de los 5 días hábiles siguientes", subFont)), PosX1 + 305, PYi - 10, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, new Phrase(new Paragraph("a la recepción de este Aviso,se procederá", subFont)), PosX1 + 305, PYi - 18, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, new Phrase(new Paragraph("con la aplicación del descuento vía nómina.", subFont)), PosX1 + 305, PYi - 25, 0);
            }//SEGUNDO CASO
            else if (obj.lst_TKT.get(0).A2548CANAL.equals("ATO") && obj.A2548PAIS.equals("MX") && !(obj.lst_TKT.get(0).A2548CIUD.equals("MEX"))) {
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, new Phrase(new Paragraph("En caso de no recibir respuesta dentro de los 5", subFont)), PosX1 + 305, PYi + 5, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, new Phrase(new Paragraph("días hábiles siguientes a la recepción de este", subFont)), PosX1 + 305, PYi - 3, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, new Phrase(new Paragraph("Aviso,se procederá con la aplicación del descuento", subFont)), PosX1 + 305, PYi - 10, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, new Phrase(new Paragraph("vía nomina a travéz de la cuenta corriente entre ", subFont)), PosX1 + 305, PYi - 18, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, new Phrase(new Paragraph("AM y AMC.", subFont)), PosX1 + 305, PYi - 25, 0);
            }

            PYi = PYi - (Hlng + 5);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Clave: ", subFont)), PosX1 + 7, PYi + 3, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("...............................................", subFont)), PosX1 + 35, PYi + 3, 0);
            PYi = PYi - (Hlng + 5);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Date: ", subFont)), PosX1 + 7, PYi + 3, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("...............................................", subFont)), PosX1 + 35, PYi + 3, 0);
            PYi = PYi - (Hlng + 30);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Signature", subFont)), PosX1 + 100, PYi + 3, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("_____________________________________", subFont)), PosX1 + 45, PYi + 12, 0);
            PYi = PYi - (Hlng + 5);
            colorRectangle(under, GrayColor.GRAYWHITE, PosX1, PYi, 300, 130);
            colorRectangle(under, GrayColor.GRAYWHITE, PosX1 + 300, PYi, 250, 130);
            PYi = PYi - (Hlng + 35);

            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("ELABORATED", subFont)), PosX1 + 100, PYi + 3, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("AUTHORIZED", subFont)), PosX1 + 400, PYi + 3, 0);
            PYi = PYi - (Hlng + 10);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(obj.lst_TKT.get(0).A2548REGIS, subFont)), PosX1 + 55, PYi + 3, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(" Vazquez Tapia Pedro", subFont)), PosX1 + 350, PYi + 3, 0);
             PYi = PYi - Hlng;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("...............................................", subFont)), PosX1 + 35, PYi + 3, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("...............................................", subFont)), PosX1 + 300, PYi + 3, 0);
     
            //ELABORATED
            //AUTHORIZED
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
