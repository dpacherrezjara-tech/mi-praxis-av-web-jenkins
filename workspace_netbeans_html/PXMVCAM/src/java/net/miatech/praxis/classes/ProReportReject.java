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
import net.miatech.praxis.payment.filter.A2288Filter;
import net.miatech.utils.Functions;

/**
 *
 * @author ggutierrez
 */
public class ProReportReject {
    
    private String FILE = "CartaRechazos.pdf";
    public final String FileXLS = "ReporteRechazos.xls";
    private Font catFont = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD);
    private Font subFontT = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD); //12
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

    public boolean createReportPDF(A2288Filter Data) {

        boolean success = true;
        
        try {

            fileTmp01 = File.createTempFile("tmp", FILE);
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
            img = Image.getInstance(String.format("/Dumps/%s", RESOURCES[0]));
            img.setAbsolutePosition(PosX1, 530); //550          
            img.scaleToFit(190, 40);
            document.add(new Paragraph(String.format("", RESOURCES[0], img.getClass().getName())));
            document.add(img);
            writer.setCompressionLevel(0);

            //COLOCANDO DIRECCION ==============================================
            PYi = PYi - 40; //10            
            Phrase txtTitle = new Phrase(new Paragraph("AEROVÍAS DE MÉXICO, S. A. DE C.V.", catFont));
            PdfContentByte canvas = writer.getDirectContent();
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTitle, PosX1, PYi, 0);
            PYi = PYi - Hlng;
            Phrase txtDirec = new Phrase(new Paragraph("Paseos de la Reforma No. 445", catFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtDirec, PosX1, PYi, 0);

            PYi = PYi - Hlng;
            Phrase txtCol = new Phrase(new Paragraph("Col. Cuauhtémoc", catFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtCol, PosX1, PYi, 0);

            PYi = PYi - Hlng;
            Phrase txtPostal = new Phrase(new Paragraph("C.P. 06500", catFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtPostal, PosX1, PYi, 0);

            PYi = PYi - Hlng;
            Phrase txtDF = new Phrase(new Paragraph("México, D.F.", catFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtDF, PosX1, PYi, 0);

            //COLOCANDO TITULO FECHA ACTUAL ====================================
            PYi = PYi - (Hlng + 10);
            Phrase txtFecha = new Phrase(new Paragraph("México, D. F. a " + Functions.getFechaActualTexto(), subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, txtFecha, 600, PYi, 0);

            //COLOCANDO DATOS DEL DESTINATARIO =================================
            PYi = PYi - (Hlng + 10);
            Phrase txtBanco = new Phrase(new Paragraph("Banco Nacional De México, S.A. DE C.V.", catFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtBanco, PosX1, PYi, 0);
            PYi = PYi - Hlng;
            Phrase txtDestinatario = new Phrase(new Paragraph("Susana Diaz", catFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtDestinatario, PosX1, PYi, 0);
            PYi = PYi - Hlng;
            Phrase txtCargo = new Phrase(new Paragraph("Ejecutivo Post Venta Premium", catFont));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtCargo, PosX1, PYi, 0);

            //COLOCANDO TEXTO ==================================================
            PYi = PYi - (Hlng + 30);
            String fechas = "";
            if(Data.strFechaI.substring(4, 6).equals(Data.strFechaF.substring(4, 6))){
                fechas = Data.strFechaI.substring(6, 8) + " al " + Functions.getFechaenTexto(Data.strFechaF);
            }else{
                fechas = Functions.getFechaenTexto(Data.strFechaI) + " al " + Functions.getFechaenTexto(Data.strFechaF);
            }
            
            String cuerpoCarta = "Por medio de la presente, solicito de la manera más atenta, que las transacciones rechazadas, que comprende del ";
            cuerpoCarta += fechas + ", ";
            Paragraph para = new Paragraph(cuerpoCarta, subFontT);
            para.setAlignment(Element.ALIGN_JUSTIFIED);
            //Phrase txtTexto = new Phrase(para);//new Paragraph(cuerpoCarta, subFontT)
            ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, para, 120, PYi, 0);

            PYi = PYi - Hlng;
            cuerpoCarta = "por afiliaciones de Aeroméxico, sean re-procesadas para su correspondiente cobro, esto derivado a una falla operativa, ya que se enviaron ";
            para = new Paragraph(cuerpoCarta, subFontT);
            para.setAlignment(Element.ALIGN_JUSTIFIED_ALL);
            //txtTexto = new Phrase(para);//new Paragraph(cuerpoCarta, subFontT)
            ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED_ALL, para, PosX1, PYi, 0);

            PYi = PYi - Hlng;
            cuerpoCarta = "incorrectamente en el archivo TEF. Quedando en el entendido que cualquier aclaración o gasto en el que se llegase a incurrir es responsabilidad";
            para = new Paragraph(cuerpoCarta, subFontT);
            para.setAlignment(Element.ALIGN_JUSTIFIED);
            //txtTexto = new Phrase(para);//new Paragraph(cuerpoCarta, subFontT)
            ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, para, PosX1, PYi, 0);

            PYi = PYi - Hlng;
            cuerpoCarta = " de Aerovías de México, S. A de C.V.";
            para = new Paragraph(cuerpoCarta, subFontT);
            para.setAlignment(Element.ALIGN_JUSTIFIED);
            //txtTexto = new Phrase(para);//new Paragraph(cuerpoCarta, subFontT)
            ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, para, PosX1, PYi, 0);

            PYi = PYi - (Hlng + 10);
            cuerpoCarta = "Anexo detalle de las transacciones para su reproceso y abono correspondiente a nuestra cuenta a la brevedad posible.";
            para = new Paragraph(cuerpoCarta, subFontT);
            para.setAlignment(Element.ALIGN_JUSTIFIED);

            Phrase txtTexto2 = new Phrase(para);//new Paragraph(cuerpoCarta, subFontT)
            ColumnText.showTextAligned(canvas, Element.ALIGN_JUSTIFIED, txtTexto2, PosX1, PYi, 0);

            PYi = PYi - (Hlng + 10);
            NumeroALetra NumLetra = new NumeroALetra();
            cuerpoCarta = "Un total de " + Data.lngTotTrans + " transacciones, por un importe total de ";
            cuerpoCarta += "$" + formato_numero(Data.dblTotMonto) + " (" + NumLetra.Convertir(String.valueOf(Data.dblTotMonto), false) + ")";
            para = new Paragraph(cuerpoCarta, subFontT);
            para.setAlignment(Element.ALIGN_JUSTIFIED);

            Phrase txtTexto3 = new Phrase(para);//new Paragraph(cuerpoCarta, subFontT)
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTexto3, PosX1, PYi, 0);

            PYi = PYi - (Hlng + 10);
            cuerpoCarta = "Así mismo, nos responsabilizamos por el gasto operativo de $100.00 (Cien pesos 00/100 M.N.) ";
            cuerpoCarta += "por operación que generan las transacciones antes ";
            para = new Paragraph(cuerpoCarta, subFontT);
            para.setAlignment(Element.ALIGN_JUSTIFIED);
            Phrase txtTexto4 = new Phrase(para);//new Paragraph(cuerpoCarta, subFontT)
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTexto4, PosX1, PYi, 0);

            PYi = PYi - Hlng;
            cuerpoCarta = "mencionadas, así como las aclaraciones que en su caso llegasen a presentar el tarjetahabiente o el banco emisor.";
            para = new Paragraph(cuerpoCarta, subFontT);
            para.setAlignment(Element.ALIGN_JUSTIFIED);
            txtTexto4 = new Phrase(para);//new Paragraph(cuerpoCarta, subFontT)
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTexto4, PosX1, PYi, 0);

            PYi = PYi - (Hlng + 10);
            cuerpoCarta = "Quedo en espera de una pronta respuesta.";
            Phrase txtTexto5 = new Phrase(new Paragraph(cuerpoCarta, subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTexto5, PosX1, PYi, 0);

            //COLOCANDO TEXTO ==================================================
            PYi = PYi - (Hlng + 50);
            cuerpoCarta = "Atentamente";

            Phrase txtAtt = new Phrase(new Paragraph(cuerpoCarta, subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtAtt, PosX1, PYi, 0);

            //COLOCANDO DATOS DEL REMITENTE ====================================
            PYi = PYi - (Hlng + 50);
            Phrase txtRemitente = new Phrase(new Paragraph("Roman Pichardo Romero", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtRemitente, PosX1, PYi, 0);
            PYi = PYi - (Hlng + 10);
            Phrase txtCargoRe = new Phrase(new Paragraph("Gerente de Crédito y Cobranza", subFontT));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtCargoRe, PosX1, PYi, 0);

            //==================================================================
            //this.onCloseDocument(writer, document);
            document.close();


        } catch (Exception e) {
            e.printStackTrace();
            success = false;
        }
        
        return success;
        
    }
    
    public boolean createReportCSV(A2288Filter Data, List<A2288Filter> listaData) {

        boolean success = true;
        A2288Filter bean;
        
        try {

            fileTmp02 = File.createTempFile("tmp", FileXLS);
            lstFileTmp.add(fileTmp02);
            
            // genera Data en txt
            PrintStream out = new PrintStream(new FileOutputStream(fileTmp02));
            // Texto Header            
            out.println("Cuenta\tImporte\tNegocio\tFecha\tAutorización\tReferencia\tCódigo de Rechazo");
            
            for (int i = 0; i < listaData.size(); i++) {
                bean = listaData.get(i);
                 
                // Texto detail            
                out.println("[" + bean.ACCOUNT + "]\t"
                        + bean.AMOUNT + "\t"
                        + bean.NAMEB + "\t"
                        + bean.FECVTA + "\t"
                        + bean.CODAUT + "\t"
                        + "[" + bean.REFERENCE + "]\t"
                        + bean.CODREJ);

            }
            
            // No PDF, Just a text file                       
            out.flush();
            out.close();

        } catch (Exception e) {
            e.printStackTrace();
            success = false;
        }
        
        return success;
        
    }
    
}
