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
import java.io.PrintStream;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import net.miatech.beans.SQP0099Filter;

/**
 *
 * @author vhidalgo
 */
public class ProReportCommGSA {

    private String FILE = "RptCommGSA.pdf";
    public final String FileTXT = "RptCommGSA.txt";
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
         /** The header text. */
        String header;
        /** The template with the total number of pages. */
        PdfTemplate total; 
        /**
         * Allows us to change the content of the header.
         * @param header The new header String
         */
        public void setHeader(String header) {
            this.header = header;
        }
 
        /**
         * Creates the PdfTemplate that will hold the total number of pages.
         * @see com.itextpdf.text.pdf.PdfPageEventHelper#onOpenDocument(
         *      com.itextpdf.text.pdf.PdfWriter, com.itextpdf.text.Document)
         */
        public void onOpenDocument(PdfWriter writer, Document document) {
            total = writer.getDirectContent().createTemplate(50, 16); //55      
        }
 
        /**
         * Adds a header to every page
         * @see com.itextpdf.text.pdf.PdfPageEventHelper#onEndPage(
         *      com.itextpdf.text.pdf.PdfWriter, com.itextpdf.text.Document)
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
            }
            
            catch(DocumentException de) {
                throw new ExceptionConverter(de);
            }
        }
 
        /**
         * Fills out the total number of pages before the document is closed.
         * @see com.itextpdf.text.pdf.PdfPageEventHelper#onCloseDocument(
         *      com.itextpdf.text.pdf.PdfWriter, com.itextpdf.text.Document)         
         */        
        public void onCloseDocument(PdfWriter writer, Document document) {
                        
            ColumnText.showTextAligned(total, Element.ALIGN_LEFT,new Phrase(String.valueOf(writer.getPageNumber() - 1)),2, 2, 0);
            
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
        formato.setMinimumFractionDigits(6);
        formato.setMaximumFractionDigits(6);
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
 
    public void setTitle(int posNewPagex, int posNewPagey, PdfWriter writer   ){
        
        PdfContentByte canvas = writer.getDirectContent();
        PdfContentByte under = writer.getDirectContentUnder();        
        colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), posNewPagex, posNewPagey-7, 760, 25); 
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Ticket", subFont_1)), posNewPagex + 15, posNewPagey, 0);
        
        posNewPagex = posNewPagex + 58; //64        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Cpn", subFont_1)), posNewPagex-4, posNewPagey, 0);

        posNewPagex = posNewPagex + 14; //19        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Issue Date", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 44;        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Trx", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 27; //33        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("From", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 28;        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("To", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 25;        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Carr", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 25; //28        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Flight", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 28; //33        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fare Basis", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 49;        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Class", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 27;        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("IT Tour Code", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 62; //65        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Curr", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 68; //30        
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Fare CPN", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 58; //50        
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Comm HOT", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 28; //50        
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("%", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 42; //25
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Rate Pay", subFont_1)), posNewPagex, posNewPagey, 0);
        
        posNewPagex = posNewPagex + 68; //40
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("GSA AM Comm", subFont_1)), posNewPagex, posNewPagey, 0);
                
        posNewPagex = posNewPagex + 7; //68        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Curr GSA", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 42; //53        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("FOP", subFont_1)), posNewPagex, posNewPagey, 0);
        
        posNewPagex = posNewPagex + 28; //30        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Ap", subFont_1)), posNewPagex, posNewPagey, 0);
        
        posNewPagex = posNewPagex + 17; //30        
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Ind", subFont_1)), posNewPagex, posNewPagey, 0);
        
    }
    
    public void createReport(SQP0099Filter Data) {

        try {
            fileTmp01 = File.createTempFile("tmp", FILE);
            fileTmp02 = File.createTempFile("tmp", FileTXT);
            lstFileTmp.add(fileTmp01);
            lstFileTmp.add(fileTmp02);

            PYi = 550; // Para A4: 788
            Hlng = 12;
            int PosX1 = 15;
            int PosX5;
            int PosX9;
            int PosX13;
            int PosX2;
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
            int PosX20;
            int PosX21;
            int ItemPage = 0;
            int getPageNumber = 0;

            int posNewPagex = 0;
            int posNewPagey = 0;
            
            double TOT_A1776VCPLC = 0;
            double TOT_A1776ACSL = 0;
            double TOT_A1776GPAGC = 0;

            //Document document = new Document(new Rectangle(842, 595));
            Document document = new Document(PageSize.LETTER.rotate(), 5, 5, 5,5);                        
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(fileTmp01));            
            TableHeader event = new TableHeader();
            writer.setPageEvent(event);
            document.open();

            // Adding a series of images ***LOGO AM
            Image img;
            img = Image.getInstance(String.format("/Dumps/%s", RESOURCES[0]));          
            img.setAbsolutePosition(PosX1,540);  //530        
            img.scaleToFit(190, 40);
            document.add(new Paragraph( String.format("", RESOURCES[0], img.getClass().getName()) ));
            document.add(img);
            // we set the compression to 0 so that we can read the PDF syntax
           //////// writer.setCompressionLevel(0);

             if ( Data.A1775LOTE.equals("") ){                
                PdfContentByte canvas = writer.getDirectContentUnder();
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("NO HAY DATOS ...! ")), PosX1, PYi, 0);                
                document.close();
                return;
            }
            
            PYi = PYi - 25; //10               
            Phrase txtTitle = new Phrase(new Paragraph("Commission Report for period " + Data.A1775FINI + " To " + Data.A1775FFIN + "", catFont));
            PdfContentByte canvas = writer.getDirectContent();
            PdfContentByte under  = writer.getDirectContentUnder();
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTitle, PosX1, PYi, 0);

            PYi = PYi - Hlng;
            Phrase txtIata = new Phrase(new Paragraph(Data.A1775GSA + " - " + Data.A1839RSOC, catFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtIata, PosX1, PYi, 0);

            PYi = PYi - Hlng;
            Phrase txtLote = new Phrase(new Paragraph("ID: " + Data.A1775LOTE, catFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtLote, PosX1, PYi, 0);
            
            // Cabecera 
            PYi = PYi - (Hlng + 7);
            int Px01 = 15;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Country:", catFont)), Px01, PYi, 0);
            Px01 = Px01 + 55;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A1775PAIS + " - " + Data.A1839DPAIS, NORMAL)), Px01, PYi, 0);
            Px01 = 215;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Open Date: ", catFont)), Px01, PYi, 0);
            Px01 = Px01 + 65;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A1775FINI, NORMAL)), Px01, PYi, 0);
            Px01 = Px01 + 95;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Curr. Local:  ", catFont)), Px01, PYi, 0);
            Px01 = Px01 + 75;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A1775MDALC, NORMAL)), Px01, PYi, 0);
            
            Px01 = 500;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Send to GSA:  ", catFont)), Px01, PYi, 0);
            Px01 = Px01 + 78;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.A1775FENV, NORMAL)), Px01, PYi, 0);
            
            // Next Col 
            PYi = PYi - (Hlng + 3);
            Px01 = 15;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Net Fare: ", catFont)), Px01, PYi, 0);
            Px01 = 160; //55
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.A1775TFRNT), NORMAL)), Px01, PYi, 0);

            Px01 = 215; //145
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fare BSP On:", catFont)), Px01, PYi, 0);
            Px01 = 400;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( formato_numero(Data.A1775TFRON), NORMAL)), Px01, PYi, 0);
            
            Px01 = 500;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fare BSP Off:", catFont)), Px01, PYi, 0);
            Px01 = 650;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( formato_numero(Data.A1775TFROF), NORMAL)), Px01, PYi, 0);
            
                    
            // Next Col 
            PYi = PYi - (Hlng + 3);
            Px01 = 15;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Commission On:", catFont)), Px01, PYi, 0);
            Px01 = 160;            
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( formato_numero(Data.A1775COMON), NORMAL)), Px01, PYi, 0);

            Px01 =215;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Commission Off: " , catFont)), Px01, PYi, 0);
            Px01 = 400;            
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( formato_numero(Data.A1775COMOF), NORMAL)), Px01, PYi, 0);
            
            Px01 = 500;            
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("% Comm.: " , catFont)), Px01, PYi, 0);
            Px01 = 650; 
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( formato_numero(Data.A1775SCGSA), NORMAL)), Px01, PYi, 0);

            // Next Col 
            PYi = PYi - (Hlng + 3);
            Px01 = 15;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("FDR: ", catFont)), Px01, PYi, 0);
            Px01 = 160;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.A1775TCFDR), NORMAL)), Px01, PYi, 0);
            
            Px01 = 215;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Total Comm GSA: ", catFont)), Px01, PYi, 0);
            Px01 = 400;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.A1775TPAG), NORMAL)), Px01, PYi, 0);


            // DETALLE DE TKT's                       
            PYi = PYi - (Hlng + 10);            
            
            //colorRectangle(under, new GrayColor(0.825f), PosX1, PYi-10, 760, 25);            
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi-11, 760, 25);            
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Ticket", subFont_1)), PosX1+15, PYi, 0);

            PosX1 = PosX1 + 58; //64
            PosX2 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Cpn", subFont_1)), PosX1-4, PYi, 0);

            PosX1 = PosX1 + 14; //19
            PosX3 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Issue Date", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 44;
            PosX4 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Trx", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 27; //33
            PosX5 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("From", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 28;
            PosX6 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("To", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 25;
            PosX7 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Carr", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 25; //28
            PosX8 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Flight", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 28; //33
            PosX9 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fare Basis", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 49;
            PosX10 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Class", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 27;
            PosX11 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("IT Tour Code", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 62; //65
            PosX12 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Curr", subFont_1)), PosX1, PYi, 0);
 
            PosX1 = PosX1 + 68; //30
            PosX13 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Fare CPN", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 58; //50
            PosX14 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Comm HOT", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 28; //50
            PosX15 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("%", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 42; //25
            PosX16 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Rate Pay", subFont_1)), PosX1, PYi, 0);
            
            PosX1 = PosX1 + 68; //40
            PosX17 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("GSA AM Comm", subFont_1)), PosX1, PYi, 0);
            
            
            PosX1 = PosX1 + 7; //68
            PosX18 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Curr GSA", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 42; //53
            PosX19 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("FOP", subFont_1)), PosX1, PYi, 0);
            
            PosX1 = PosX1 + 28; //30
            PosX20 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Ap", subFont_1)), PosX1, PYi, 0);
            
            PosX1 = PosX1 + 17; //30
            PosX21 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Ind", subFont_1)), PosX1, PYi, 0);
            
            
            // genera Data en txt
            PrintStream out = new PrintStream(new FileOutputStream(fileTmp02));
            out.println("Src;Ticket;cpn;Issue Date;Trans.;From;To;Carr.;Flight;Fare Basis;Class;IT Tour Cod.;Curr.;Fare Cpn On;Fare Cpn Off ;Comm HOT;% Comm.;GSA Comm;Rate Pay. GSA;GSA AM Comm;Curr. GSA;FOP;Ap.;Ind");
            
            //event.setHeader("----");
            
            PYi = PYi - (Hlng + 8);
            for (int i = 0; i < Data.lstRws.size(); i++) {
                
                
                
                if( i%2 == 0) colorRectangle(under, new GrayColor(0.825f), 15, PYi-7, 760, 15); 
                else          colorRectangle(under, GrayColor.GRAYWHITE, 15, PYi-7, 760, 15); 

                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).TKT, subFont)), 15, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A1776CUPON, subFont)), PosX2, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A1776FECVT, subFont)), PosX3, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A1776TRNCU, subFont)), PosX4, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A1776ORIG, subFont)), PosX5, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A1776DEST, subFont)), PosX6, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A1776CARR, subFont)), PosX7, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A1776NVLO, subFont)), PosX8, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A1776FBAS, subFont)), PosX9, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A1776CLAS, subFont)), PosX10, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A1776CODIT, subFont)), PosX11, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A1776MDALC, subFont)), PosX12, PYi, 0);
                
                if ( Data.lstRws.get(i).A1776VCPLC == 0 )
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("-", subFont)), PosX13, PYi, 0);                
                else
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.lstRws.get(i).A1776VCPLC), subFont)), PosX13, PYi, 0);                                
                if ( Data.lstRws.get(i).A1776ACSL == 0 )                    
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("-", subFont)), PosX14, PYi, 0);    
                else    
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.lstRws.get(i).A1776ACSL), subFont)), PosX14, PYi, 0);
                if ( Data.lstRws.get(i).A1776PCSC == 0 ) 
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("-", subFont)), PosX15, PYi, 0);                
                else
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.lstRws.get(i).A1776PCSC), subFont)), PosX15, PYi, 0);                                
                if ( Data.lstRws.get(i).A1776GTCAM == 0 ) 
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("-", subFont)), PosX16, PYi, 0);
                else
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero_rate(Data.lstRws.get(i).A1776GTCAM), subFont)), PosX16, PYi, 0);
                if ( Data.lstRws.get(i).A1776GPAGC == 0 ) 
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("-", subFont)), PosX17, PYi, 0);                                
                else
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.lstRws.get(i).A1776GPAGC), subFont)), PosX17, PYi, 0);                                
                                                
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A1776GMDAP, subFont)), PosX18, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A1776CFOP, subFont)), PosX19, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A1776APLIC, subFont)), PosX20, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A1776INDI, subFont)), PosX21, PYi, 0);
                
                // ACUMULA TOTALES
                TOT_A1776VCPLC = TOT_A1776VCPLC + Data.lstRws.get(i).A1776VCPLC;
                TOT_A1776ACSL  = TOT_A1776ACSL + Data.lstRws.get(i).A1776ACSL;
                TOT_A1776GPAGC = TOT_A1776GPAGC + Data.lstRws.get(i).A1776GPAGC;
                
                // Texto detail            
                out.println(Data.lstRws.get(i).A1776FUENT + ";"
                        + Data.lstRws.get(i).TKT + ";"
                        + Data.lstRws.get(i).A1776CUPON + ";"
                        + Data.lstRws.get(i).A1776FECVT + ";"
                        + Data.lstRws.get(i).A1776TRNCU + ";"
                        + Data.lstRws.get(i).A1776ORIG + ";"
                        + Data.lstRws.get(i).A1776DEST + ";"
                        + Data.lstRws.get(i).A1776CARR + ";"
                        + Data.lstRws.get(i).A1776NVLO + ";"
                        + Data.lstRws.get(i).A1776FBAS + ";"
                        + Data.lstRws.get(i).A1776CLAS + ";"
                        + Data.lstRws.get(i).A1776CODIT + ";"
                        + Data.lstRws.get(i).A1776MDALC + ";"
                        //+ Data.lstRws.get(i).A1776VCPLC + ";"
                        + formato_numero(Data.lstRws.get(i).FARE_ON) + ";"
                        + formato_numero(Data.lstRws.get(i).FARE_OFF) + ";"
                        + formato_numero(Data.lstRws.get(i).A1776ACSL) + ";"
                        + formato_numero(Data.lstRws.get(i).A1776PCSC) + ";"
                        + formato_numero(Data.lstRws.get(i).A1776GTCAM) + ";"
                        + formato_numero(Data.lstRws.get(i).A1776GPAGC) + ";"                                                
                        + Data.lstRws.get(i).A1776GMDAP + ";"
                        + Data.lstRws.get(i).A1776CFOP + ";"
                        + Data.lstRws.get(i).A1776APLIC + ";"
                        + Data.lstRws.get(i).A1776INDI);

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
                    posNewPagey = (PYi + 15) ;                       
                    this.setTitle(posNewPagex, posNewPagey, writer );                    
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
                    this.setTitle(posNewPagex, posNewPagey, writer );                    
                    
                    // Reinciar Contador al inicio  Nex Page //
                    posNewPagex = 15;  
                }

            }
            
            // TOTALES            
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX11, PYi-20, 434, 20); 
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( "TOTALS: " , subFont_1)), PosX11+50, PYi - 15, 0); 
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( formato_numero(TOT_A1776VCPLC) , subFont_1)), PosX13, PYi - 15, 0); 
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( formato_numero(TOT_A1776ACSL) , subFont_1)), PosX14, PYi - 15, 0); 
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph( formato_numero(TOT_A1776GPAGC) , subFont_1)), PosX17, PYi - 15, 0);             
                        

            out.flush();
            out.close();
            document.close();
            
           
           // this.manipulatePdf( RESULT + FILE, DESTIN );

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
