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
import net.miatech.beans.SQP00795Filter;

/**
 *
 * @author vhidalgo
 */
public class ProReportCommCTIA {

    private String FILE = "RptComisionesCONS.pdf";
    public final String FileTXT = "RptComisionesCONS.txt";
    private Font catFont = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.BOLD);
    private Font subFont = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.NORMAL); // 10
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

        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Ticket", subFont_1)), posNewPagex + 15, posNewPagey, 0);
        posNewPagex = posNewPagex + 58;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Trans.", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 30;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Cpn", subFont_1)), posNewPagex - 2, posNewPagey, 0);
        posNewPagex = posNewPagex + 20;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Cjn", subFont_1)), posNewPagex - 2, posNewPagey, 0);
        posNewPagex = posNewPagex + 16;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Issue Date", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 43;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Carr", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 26;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fare Basis", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Class", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 25;
		ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("O/D", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 25;																																 
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("IT Tour Code", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 70;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("FOP", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 28;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Station IATA", subFont_1)), posNewPagex, posNewPagey, 0);
        // Coupon            
        posNewPagex = posNewPagex + 107;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Coupon", subFont_1)), posNewPagex, posNewPagey + 12, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("CPN Fare", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 50;
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Comm.", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 10;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Agree.", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 48;
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("%", subFont_1)), posNewPagex, posNewPagey, 0);
        // Ancillaries/Charge
        posNewPagex = posNewPagex + 48;           //new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.UNDERLINE)
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Ancillaries / Charge", subFont_1)), posNewPagex, posNewPagey + 12, 0);
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Amount", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 35;
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Comm.", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 8;
        ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Agree.", subFont_1)), posNewPagex, posNewPagey, 0);
        posNewPagex = posNewPagex + 48;
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("%", subFont_1)), posNewPagex, posNewPagey, 0);

    }

    public void createReport(SQP00795Filter Data) {

        try {
            fileTmp01 = File.createTempFile("tmp", FILE);
            fileTmp02 = File.createTempFile("tmp", FileTXT);
            lstFileTmp.add(fileTmp01);
            lstFileTmp.add(fileTmp02);
            PYi = 550;
            Hlng = 12;
            int PosX1 = 15;
            int PosX5;
            int PosX15;
            int PosX9;
			int PosX99;		   
            int PosX13;
            int PosX16;
            int PosX2;
            int PosX6;
            int PosX17;
            int PosX10;
            int PosX14;
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

            int posNewPagex = 0;
            int posNewPagey = 0;

            double TOT_A2445VCPN = 0;
            double TOT_A2445ACSC = 0;
            double TOT_A2445OCANR = 0;
            double TOT_A2445COCAR = 0;

            //Document document = new Document(new Rectangle(842, 595)); // OLD
            //Document document = new Document(new Rectangle(785, 590)); // TAMANIO CARTA
            Document document = new Document(PageSize.LETTER.rotate(), 5, 5, 5, 5);
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(fileTmp01));
            TableHeader event = new TableHeader();
            writer.setPageEvent(event);
            document.open();

            // Adding a series of images ***LOGO AM
            Image img;
            img = Image.getInstance(String.format("/Dumps/%s", RESOURCES[0]));
            img.setAbsolutePosition(PosX1, 530); //550          
            img.scaleToFit(190, 40);
            document.add(new Paragraph(String.format("", RESOURCES[0], img.getClass().getName())));
            document.add(img);
            writer.setCompressionLevel(0);

            if (Data.A2444LOTE.equals("")) {
                PdfContentByte canvas = writer.getDirectContentUnder();
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("NO HAY DATOS ...! ")), PosX1, PYi, 0);
                document.close();
                return;
            }

            PYi = PYi - 32; //10            
            Phrase txtTitle = new Phrase(new Paragraph("Reporte de comisiones del " + Data.A2444FINI + " Al " + Data.A2444FFIN + "", catFont));
            PdfContentByte canvas = writer.getDirectContent();
            PdfContentByte under = writer.getDirectContentUnder();
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTitle, PosX1, PYi, 0);
            PYi = PYi - Hlng;
            Phrase txtIata = new Phrase(new Paragraph(Data.A2444IATA + " - " + Data.A003KEY1, catFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtIata, PosX1, PYi, 0);

            PYi = PYi - Hlng;
            Phrase txtLote = new Phrase(new Paragraph("Lote: " + Data.A2444LOTE, catFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtLote, PosX1, PYi, 0);

            PYi = PYi - (Hlng + 10);
            Phrase txt01 = new Phrase(new Paragraph("Resumen Totals: ", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txt01, PosX1, PYi, 0);

            // FARE
            PYi = PYi - (Hlng);
            PoxT = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fare/Ancillaries: ", subFontT)), PoxT, PYi, 0);
            PoxT = PoxT + 150; //70
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(formato_numero(Data.A2444FARE), NORMAL), PoxT, PYi, 0);

            // TOTAL COMMISSION                        
            PoxT = PoxT + 12; //100
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Commission: ", subFontT)), PoxT, PYi, 0);

            PoxT = PoxT + 130; //70
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(formato_numero(Data.A2444TCOM), NORMAL), PoxT, PYi, 0);

            // TOTAL IVA            
            PoxT = PoxT + 25; //80
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("IVA: ", subFontT)), PoxT, PYi, 0);
            PoxT = PoxT + 75; //80
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(formato_numero(Data.A2444TIVA), NORMAL), PoxT, PYi, 0);
			

            // TOTAL Comm. + IVA                    
            PoxT = PoxT + 10; //50
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Comm. + IVA: ", subFontT)), PoxT, PYi, 0);
            PoxT = PoxT + 120; //125
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(formato_numero(Data.A2444TCOMI), NORMAL), PoxT, PYi, 0);

            // fecha de envio
            PoxT = PoxT + 100; //30
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Send To FOB: ", subFontT)), PoxT, PYi, 0);
            PoxT = PoxT + 60; //65
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(Data.A2444FENV, NORMAL), PoxT, PYi, 0);
			
			//NUEVOS CAMPOS JD
            // Other Charges
            PYi = PYi - (Hlng);
            PoxT = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Other Charges: ", subFontT)), PoxT, PYi, 0);            
            PoxT = PoxT + 150; //70
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase( formato_numero(Data.A2444OTHCH), NORMAL), PoxT, PYi, 0);

            // Bank Comm                  
            PoxT = PoxT + 12; //100
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Bank Commission: ", subFontT)), PoxT, PYi, 0);
            
            PoxT = PoxT + 130; //70
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(formato_numero(Data.A2444BANKC), NORMAL), PoxT, PYi, 0);
            
            // Other - Bank Comm      
            PoxT = PoxT + 10; //80
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Oth.-Bank Comm: ", subFontT)), PoxT, PYi, 0);
            PoxT = PoxT + 135; //80
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase( formato_numero(Data.A2444OTHBK), NORMAL), PoxT, PYi, 0);
            

            // IVA                    
            PoxT = PoxT + 12; //50
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("IVA: ", subFontT)), PoxT, PYi, 0);
            PoxT = PoxT + 85; //125
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase( formato_numero(Data.A2444IVA16), NORMAL), PoxT, PYi, 0);
            
            // Other - Bank Comm + IVA
            PoxT = PoxT + 12;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Oth.-Bank Comm+IVA: ", subFontT)), PoxT, PYi, 0);
            PoxT = PoxT + 150; //65
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase( formato_numero(Data.A2444OBK16), NORMAL), PoxT, PYi, 0);
            //FIN NUEVOS CAMPOS JD
			
            // TOTAL CASH
            PYi = PYi - Hlng;
            PoxT = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Cash: ", subFontT)), PoxT, PYi, 0);
            PoxT = PoxT + 150; //70
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(formato_numero(Data.A2444TTCAS), NORMAL), PoxT, PYi, 0);

            // TOTAL CASH - COMM                    
            PoxT = PoxT + 12;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Cash - Comm. : ", subFontT)), PoxT, PYi, 0);
            PoxT = PoxT + 130;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(formato_numero(Data.A2444TCAMC), NORMAL), PoxT, PYi, 0);

			
            // Titulo Columnas grid //
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi - 28, 750, 25);

            PYi = PYi - (Hlng + 12);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Ticket", subFont_1)), PosX1 + 15, PYi, 0);

            PosX1 = PosX1 + 58;
            PosX2 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Trans", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 30;
            PosX7 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Cpn", subFont_1)), PosX1 - 2, PYi, 0);

            PosX1 = PosX1 + 20;
            PosX3 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Cjn", subFont_1)), PosX1 - 2, PYi, 0);

            PosX1 = PosX1 + 16;
            PosX5 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Issue Date", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 43;
            PosX6 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Carr", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 26;
            PosX8 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Fare Basis", subFont_1)), PosX1, PYi, 0);
            PosX1 = PosX1 + 50;
            PosX9 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Class", subFont_1)), PosX1, PYi, 0);
			// JD	 
            PosX1 = PosX1 + 25;
			PosX99 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("O/D", subFont_1)), PosX1, PYi, 0);
            //FIN JD
            PosX1 = PosX1 + 25;				   
            PosX10 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("IT Tour Code", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 70; //71
            PosX11 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("FOP", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 28; //26
            PosX20 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Station IATA", subFont_1)), PosX1, PYi, 0);

            // Coupon            
            PosX1 = PosX1 + 107; //64
            PosX12 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Coupon", subFont_1)), PosX1, PYi + 12, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("CPN Fare", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 50; //60
            PosX13 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Comm.", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 10; //45
            PosX14 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Agree.", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 48; //55
            PosX15 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("%", subFont_1)), PosX1, PYi, 0);

            // Ancillaries/Charge
            PosX1 = PosX1 + 48; //30
            PosX16 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Ancillaries / Charge", subFont_1)), PosX1, PYi + 12, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Amount", subFont_1)), PosX1, PYi, 0);
            PosX1 = PosX1 + 35; //53
            PosX17 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("Comm.", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 8; //40
            PosX18 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Agree.", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 48; // 55
            PosX19 = PosX1;
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("%", subFont_1)), PosX1, PYi, 0);

			
            // genera Data en txt
            PrintStream out = new PrintStream(new FileOutputStream(fileTmp02));
            // Texto Header            
            out.println("IATA;Ticket;Trans;cpn;cjn;Issue Date;Carr.;Fare Basis;Class;OD;IT Tour Cod.;FOP;Station IATA;CPN Fare;Comm.;Agr. Code;%;Ancillaries Amount;Ancillaries Comm.;Agr. Code;Ancillaries %;Lote");

            PYi = PYi - Hlng;  // SALTO DESPUES DEL TITULO DE COLUMNAS 
            for (int i = 0; i < Data.lstRws.size(); i++) {

                if (i % 2 == 0) {
                    colorRectangle(under, new GrayColor(0.825f), 15, PYi - 7, 750, 15);
                } else {
                    colorRectangle(under, GrayColor.GRAYWHITE, 15, PYi - 7, 750, 15);
                }

                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).TKT, subFont)), 15, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A2445TRNCU, subFont)), PosX2, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A2445CUPON, subFont)), PosX7, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A2445FLAG, subFont)), PosX3, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A2445FECVT, subFont)), PosX5, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A2445CARR, subFont)), PosX6, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A2445FBAS, subFont)), PosX8, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A2445CLAS, subFont)), PosX9, PYi, 0);
				ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A2445ORIG+"-"+Data.lstRws.get(i).A2445DEST, subFont)), PosX99-14, PYi, 0);																																											 
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A2445CODIT, subFont)), PosX10, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A2445CFOP, subFont)), PosX11, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A2445IATAE, subFont)), PosX20, PYi, 0);
                if (Data.lstRws.get(i).A2445VCPN == 0) {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("-", subFont)), PosX12, PYi, 0);
                } else {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.lstRws.get(i).A2445VCPN), subFont)), PosX12, PYi, 0);
                }
                if (Data.lstRws.get(i).A2445ACSC == 0) {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("-", subFont)), PosX13, PYi, 0);
                } else {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.lstRws.get(i).A2445ACSC), subFont)), PosX13, PYi, 0);
                }
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A2445CCST, subFont)), PosX14, PYi, 0);
                if (Data.lstRws.get(i).A2445PCSC == 0) {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("-", subFont)), PosX15, PYi, 0);
                } else {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.lstRws.get(i).A2445PCSC), subFont)), PosX15, PYi, 0);
                }
                if (Data.lstRws.get(i).A2445OCANR == 0) {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("-", subFont)), PosX16, PYi, 0);
                } else {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.lstRws.get(i).A2445OCANR), subFont)), PosX16, PYi, 0);
                }
                if (Data.lstRws.get(i).A2445COCAR == 0) {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("-", subFont)), PosX17, PYi, 0);
                } else {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.lstRws.get(i).A2445COCAR), subFont)), PosX17, PYi, 0);
                }
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.lstRws.get(i).A2445AGRAN, subFont)), PosX18, PYi, 0);

                if (Data.lstRws.get(i).A2445POCAN == 0) {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph("-", subFont)), PosX19, PYi, 0);
                } else {
                    ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.lstRws.get(i).A2445POCAN), subFont)), PosX19, PYi, 0);
                }
                // ACUMULA TOTALES
				if(!Data.lstRws.get(i).A2445TRNCU.equals("RFNX")){												  
					TOT_A2445VCPN = TOT_A2445VCPN + Data.lstRws.get(i).A2445VCPN;
				} 
                TOT_A2445ACSC = TOT_A2445ACSC + Data.lstRws.get(i).A2445ACSC;
                TOT_A2445OCANR = TOT_A2445OCANR + Data.lstRws.get(i).A2445OCANR;
                TOT_A2445COCAR = TOT_A2445COCAR + Data.lstRws.get(i).A2445COCAR;

				 
				
                // Texto detail            
                out.println(Data.lstRws.get(i).A2445IATA + ";"
                        + Data.lstRws.get(i).TKT + ";"
                        + Data.lstRws.get(i).A2445TRNCU + ";"
                        + Data.lstRws.get(i).A2445CUPON + ";"
                        + Data.lstRws.get(i).A2445FLAG + ";"
                        + Data.lstRws.get(i).A2445FECVT + ";"
                        + Data.lstRws.get(i).A2445CARR + ";"
                        + Data.lstRws.get(i).A2445FBAS + ";"
                        + Data.lstRws.get(i).A2445CLAS + ";"
						+ Data.lstRws.get(i).A2445ORIG + "-" + Data.lstRws.get(i).A2445DEST + ";"																		 
                        + Data.lstRws.get(i).A2445CODIT + ";"
                        + Data.lstRws.get(i).A2445CFOP + ";"
                        + Data.lstRws.get(i).A2445IATAE + ";"
                        + formato_numero(Data.lstRws.get(i).A2445VCPN) + ";"
                        + formato_numero(Data.lstRws.get(i).A2445ACSC) + ";"
                        + Data.lstRws.get(i).A2445CCST + ";"
                        + formato_numero(Data.lstRws.get(i).A2445PCSC) + ";"
                        + formato_numero(Data.lstRws.get(i).A2445OCANR) + ";"
                        + formato_numero(Data.lstRws.get(i).A2445COCAR) + ";"
                        + Data.lstRws.get(i).A2445AGRAN + ";"
                        + formato_numero(Data.lstRws.get(i).A2445POCAN) + ";"
                        + Data.lstRws.get(i).A2445LOTE);

                PYi = PYi - 12;
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
            }

            // TOTALES
            colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX20, PYi - 20, 380, 20);
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("TOTALS: ", subFont_1)), PosX20, PYi - 15, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(TOT_A2445VCPN), subFont_1)), PosX12, PYi - 15, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(TOT_A2445ACSC), subFont_1)), PosX13, PYi - 15, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(TOT_A2445OCANR), subFont_1)), PosX16, PYi - 15, 0);
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(TOT_A2445COCAR), subFont_1)), PosX17, PYi - 15, 0);

            // No PDF, Just a text file                       
            out.flush();
            out.close();
            //this.onCloseDocument(writer, document);
            document.close();
			

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
