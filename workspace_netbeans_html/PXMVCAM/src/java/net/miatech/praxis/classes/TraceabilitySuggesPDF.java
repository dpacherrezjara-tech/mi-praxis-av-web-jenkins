/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor. TraceabilitySuggesPDF
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
import java.io.PrintStream;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import net.miatech.beans.SQP0099Filter;
import net.miatech.beans.SaleAudit.A1672Filter;

/**
 *
 * @author vhidalgo
 */
public class TraceabilitySuggesPDF {

    private String FILE = "TraceabilitySuggesPDF.pdf";
    public final String FileTXT = "TraceabilitySuggesPDF.txt";
    private Font catFont = new Font(Font.FontFamily.TIMES_ROMAN, 11, Font.BOLD);
    private Font subFont = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.NORMAL);
    private Font subFont_1 = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD, BaseColor.WHITE);
    private Font subFontT = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD);
    private Font NORMAL = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
    private int PYi = 0; // Para A4: 788
    private int Hlng = 0;
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
                table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
                table.addCell(String.format("Page: %d of ", writer.getPageNumber()));

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

            ColumnText.showTextAligned(total, Element.ALIGN_LEFT, new Phrase(formato_numero_rate(writer.getPageNumber() - 1)), 2, 2, 0);

        }
    }

    public static final String[] RESOURCES = {
        "139X2.png",
        "139X.jpg"
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

    public String formato_numero_rate(double Number) {
        NumberFormat nf = NumberFormat.getNumberInstance(Locale.US);
        DecimalFormat formato = (DecimalFormat) nf;
        formato.setMinimumFractionDigits(0);
        formato.setMaximumFractionDigits(0);
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

    public void setTitle(int posNewPagex, int posNewPagey, PdfWriter writer, String OPTION) {
        String vl_FPROC = "";
        if (OPTION.equals("1")) {
            vl_FPROC = "Date";
        } else {
            vl_FPROC = "Year";
        }
        PdfContentByte canvas = writer.getDirectContent();
        PdfContentByte under = writer.getDirectContentUnder();
         colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), posNewPagex, posNewPagey - 11, 760, 25);
        //colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), posNewPagex, posNewPagey, 760, 25);
        

        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph(vl_FPROC, subFont_1)), posNewPagex + 10, posNewPagey, 0);
        posNewPagex = posNewPagex + 40;
        if (OPTION.equals("2")) {
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("IATA", subFont_1)), posNewPagex + 5, posNewPagey, 0);
            posNewPagex = posNewPagex + 40;
        }
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Sales Tkts", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Suggested", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("USD", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Accepted", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("USD", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("%", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 30;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Pending", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 40;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("USD", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 40;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("%", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 20;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Rejected", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 40;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("USD", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50; //30
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("%", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 40; //50        
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Special", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50; //50
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("USD", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 30; //25
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("%", subFont_1)), posNewPagex, posNewPagey, 0);
        /*posNewPagex = posNewPagex + 40; //40
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Billed", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 40; //50
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("USD", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 40; //25
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("%", subFont_1)), posNewPagex, posNewPagey, 0);
         */
    }

    public void setTitle2(int posNewPagex, int posNewPagey, PdfWriter writer, String OPTION) {
        String vl_FPROC = "";
        if (OPTION.equals("1")) {
            vl_FPROC = "Date";
        } else {
            vl_FPROC = "Year";
        }
        PdfContentByte canvas = writer.getDirectContent();
        PdfContentByte under = writer.getDirectContentUnder();
        colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), posNewPagex , posNewPagey - 11, 760, 25);

        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph(vl_FPROC, subFont_1)), posNewPagex + 10, posNewPagey, 0);
        posNewPagex = posNewPagex + 40;
        if (OPTION.equals("2")) {
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("IATA", subFont_1)), posNewPagex, posNewPagey, 0);
            posNewPagex = posNewPagex + 40;
        }
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Total Tkts", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("BSP", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("ARC", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("ASR", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Sub Total", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("P. Grouping", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Unregistered Client", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Justified", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Reaudited", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 55;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Authorized", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("IATA Disabled", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 80;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Sub TOtal", subFont_1)), posNewPagex, posNewPagey, 0);

    }

    public File createReport(List<A1672Filter> oLisDATA, String FECHA1, String FECHA2, String OPTION) {

        try {
            fileTmp01 = File.createTempFile("tmp", FECHA1 + "_TO_" + FECHA2 + FILE);
            //fileTmp02 = File.createTempFile("tmp", FileTXT);
            lstFileTmp.add(fileTmp01);
            //lstFileTmp.add(fileTmp02);

            PYi = 550; // Para A4: 788
            Hlng = 12;
            int PosX1 = 15;
            int PosX5;
            int PosX9;
            int PosX13;
            int PosX2 = 0;
            int PosX6;
            int PosX10;
            int PosX14;
            int PosX3;
            int PosX7;
            int PosX11;
            int PosX15;
            int PosX4;
            int PosX8;
            int PosX12;
            int PosX16;
            int PosX17;
            int PosX18;
            int PosX19;
            int PosX20 = 0;
            int PosX21;
            int PosX22;
            int PosX23;
            int PosX24;
            int PosX25;
            int PosX26;
            int PosX27;
            int PosX28;
            int PosX29;
            int PosX30;
            int PosX31;
            int PosX32;
            int PosX33;
            int ItemPage = 0;
            int getPageNumber = 0;
            String vl_FPROC = "";

            int posNewPagex = 0;
            int posNewPagey = 0;

            double TOT_A1776VCPLC = 0;
            double TOT_A1776ACSL = 0;
            double TOT_A1776GPAGC = 0;

            //Document document = new Document(new Rectangle(842, 595));
            Document document = new Document(PageSize.LETTER.rotate(), 5, 5, 5, 5);
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(fileTmp01));
            TableHeader event = new TableHeader();
            writer.setPageEvent(event);
            document.open();

            // Adding a series of images ***LOGO AM
            Image img;
            img = Image.getInstance(String.format("/Dumps/%s", RESOURCES[0]));
            img.setAbsolutePosition(PosX1, 540);  //530        
            img.scaleToFit(190, 40);
            document.add(new Paragraph(String.format("", RESOURCES[0], img.getClass().getName())));
            document.add(img);
            // we set the compression to 0 so that we can read the PDF syntax
            //////// writer.setCompressionLevel(0);

            if (oLisDATA.isEmpty()) {
                PdfContentByte canvas = writer.getDirectContentUnder();
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("NO HAY DATOS ...! ")), PosX1, PYi, 0);
                document.close();
                return null;
            }

            PYi = PYi - 25; //10               
            Phrase txtTitle = new Phrase(new Paragraph("Traceability of Suggested Documents " + FECHA1 + " To " + FECHA2 + "", catFont));
            PdfContentByte canvas = writer.getDirectContent();
            PdfContentByte under = writer.getDirectContentUnder();
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTitle, PosX1, PYi, 0);
            // Cabecera 
            Date date = new Date();
            DateFormat hourdateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            Phrase txthora = new Phrase(new Paragraph("Date of issue: " + hourdateFormat.format(date), catFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txthora, PosX1 + 600, PYi, 0);
            //PYi = PYi - (Hlng + 7);
            //int Px01 = 15;
            //ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Date of issue: " + hourdateFormat.format(date), catFont)), Px01, PYi, 0);
            //Px01 = Px01 + 55;

            // DETALLE DE TKT's                       
            PYi = PYi - (Hlng + 10);

            //colorRectangle(under, new GrayColor(0.825f), PosX1, PYi-10, 760, 25);            
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi - 11, 760, 25);
            if (OPTION.equals("1")) {
                vl_FPROC = "Date";
            } else {
                vl_FPROC = "Year";
            }
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(vl_FPROC, subFont_1)), PosX1 + 5, PYi, 0);
            if (OPTION.equals("2")) {
                PosX1 = PosX1 + 40; //58
                PosX2 = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("IATA", subFont_1)), PosX1, PYi, 0);
            }

            PosX1 = PosX1 + 50; //14
            PosX3 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Sales Tkts", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 50;
            PosX4 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Suggested", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 50; //33
            PosX5 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("USD", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 50;
            PosX6 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Accepted", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 50;
            PosX7 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("USD", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 60; //28
            PosX8 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("%", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 40; //33
            PosX9 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Pending", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 50;
            PosX10 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("USD", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 60;
            PosX11 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("%", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 40; //65
            PosX12 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Rejected", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 50; //30
            PosX13 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("USD", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 60; //50
            PosX14 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("%", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 40; //50
            PosX15 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Special", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 50; //25
            PosX16 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("USD", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 50; //40
            PosX17 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("%", subFont_1)), PosX1, PYi, 0);
            /*
            PosX1 = PosX1 + 40; //50
            PosX18 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("USD", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 40; //25
            PosX19 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("%", subFont_1)), PosX1, PYi, 0);*/
            PYi = PYi - (Hlng + 8);
            for (int i = 0; i < oLisDATA.size(); i++) {

                if (i % 2 == 0) {
                    colorRectangle(under, new GrayColor(0.825f), 15, PYi - 7, 760, 15);
                } else {
                    colorRectangle(under, GrayColor.GRAYWHITE, 15, PYi - 7, 760, 15);
                }
                if (OPTION.equals("1")) {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(oLisDATA.get(i).A1672FPROC, subFont)), 15, PYi, 0);
                } else {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(oLisDATA.get(i).A1672FPROC, subFont)), 15, PYi, 0);
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(oLisDATA.get(i).A1672AGENT, subFont)), PosX2, PYi, 0);
                }

                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTTOT), subFont)), PosX3, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTADM), subFont)), PosX4, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).ADMUSD), subFont)), PosX5, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTADMACEP), subFont)), PosX6, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(oLisDATA.get(i).ADMACEPUSD), subFont)), PosX7, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTADMACEPORC), subFont)), PosX8, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTADMREV), subFont)), PosX9, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(oLisDATA.get(i).ADMREVUSD), subFont)), PosX10, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTADMREVPORC), subFont)), PosX11, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTADMRECH), subFont)), PosX12, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(oLisDATA.get(i).ADMRECHUSD), subFont)), PosX13, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTADMRECHPORC), subFont)), PosX14, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTADMENV), subFont)), PosX15, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(oLisDATA.get(i).ADMENVUSD), subFont)), PosX16, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTADMENVPORC), subFont)), PosX17, PYi, 0);

                /*
                   ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(oLisDATA.get(i).BILLEDUSD), subFont)), PosX18 - 15, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero(oLisDATA.get(i).CANTBILLEDPORC), subFont)), PosX19 - 10, PYi, 0);
                 */
                // ACUMULA TOTALES
                PYi = PYi - 12;
                /*Control Page
                 */
                ItemPage++;

                if (ItemPage > 30 && getPageNumber < 1) {
                    ItemPage = 0;
                    PYi = 520; //550
                    getPageNumber++;
                    document.newPage();
                    // Set Title Next Page //
                    posNewPagex = 15;
                    posNewPagey = (PYi + 15);
                    this.setTitle(posNewPagex, posNewPagey, writer, OPTION);
                    // Reinciar Contador al inicio  Nex Page //
                    posNewPagex = 15;
                }
                if (getPageNumber > 0 && ItemPage > 40) { //45
                    ItemPage = 0;
                    PYi = 520; //550
                    getPageNumber++;
                    document.newPage();

                    // Set Title Next Page //
                    posNewPagey = (PYi + 15);
                    this.setTitle(posNewPagex, posNewPagey, writer, OPTION);

                    // Reinciar Contador al inicio  Nex Page //
                    posNewPagex = 15;
                }

            }

            //PYi = PYi - (Hlng + 10);
            PYi = PYi - 25; //10
            PosX1 = 15;
            //para la segunda grilla
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi - 11, 760, 25);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(vl_FPROC, subFont_1)), PosX1 + 5, PYi, 0);
            if (OPTION.equals("2")) {
                PosX1 = PosX1 + 40; //58
                PosX20 = PosX1;
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("IATA", subFont_1)), PosX1, PYi, 0);
            }

            PosX1 = PosX1 + 50; //14
            PosX21 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Total Tkts", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 50;
            PosX22 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("BSP", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 50; //33
            PosX23 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("ARC", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 50; //33
            PosX24 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("ASR", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 50; //33
            PosX25 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Sub Total", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 50; //33
            PosX26 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("P. Grouping", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 50; //33
            PosX27 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Unregistered Client", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 80; //33
            PosX28 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Justified", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 50; //33
            PosX29 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Reaudited", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 55; //33
            PosX30 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Authorized", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 55; //33
            PosX31 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("IATA Disabled", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 70; //33
            PosX32 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Sub Total", subFont_1)), PosX1, PYi, 0);

            PYi = PYi - (Hlng + 8);
            for (int i = 0; i < oLisDATA.size(); i++) {

                if (i % 2 == 0) {
                    colorRectangle(under, new GrayColor(0.825f), 15, PYi - 7, 760, 15);
                } else {
                    colorRectangle(under, GrayColor.GRAYWHITE, 15, PYi - 7, 760, 15);
                }

                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(oLisDATA.get(i).A1672FPROC, subFont)), 15, PYi, 0);
                if (OPTION.equals("2")) {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(oLisDATA.get(i).A1672AGENT, subFont)), PosX20, PYi, 0);
                }
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTADMACEP), subFont)), PosX21, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTABSP), subFont)), PosX22, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTARC), subFont)), PosX23, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTASR), subFont)), PosX24, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTOTAL), subFont)), PosX25, PYi, 0);

                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTADMPENGROUP), subFont)), PosX26, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTADMSINCLIE), subFont)), PosX27, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTADMJUSTI), subFont)), PosX28, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTADMREUDITE), subFont)), PosX29, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTADMAUTORI), subFont)), PosX30, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).CANTADMIATADISA), subFont)), PosX31, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(formato_numero_rate(oLisDATA.get(i).TOTALGROUP), subFont)), PosX32, PYi, 0);

                // ACUMULA TOTALES
                PYi = PYi - 12;
                /*Control Page
                 */
                ItemPage++;

                if (ItemPage > 30 && getPageNumber < 1) {
                    ItemPage = 0;
                    PYi = 520; //550
                    getPageNumber++;
                    document.newPage();
                    // Set Title Next Page //
                    posNewPagex = 15;
                    posNewPagey = (PYi + 15);
                    this.setTitle2(posNewPagex, posNewPagey, writer, OPTION);
                    // Reinciar Contador al inicio  Nex Page //
                    posNewPagex = 15;
                }
                if (getPageNumber > 0 && ItemPage > 40) { //45
                    ItemPage = 0;
                    PYi = 520; //550
                    getPageNumber++;
                    document.newPage();

                    // Set Title Next Page //
                    posNewPagey = (PYi + 15);
                    this.setTitle2(posNewPagex, posNewPagey, writer, OPTION);

                    // Reinciar Contador al inicio  Nex Page //
                    posNewPagex = 15;
                }

            }

            document.close();
            return fileTmp01;

            // this.manipulatePdf( RESULT + FILE, DESTIN );
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
