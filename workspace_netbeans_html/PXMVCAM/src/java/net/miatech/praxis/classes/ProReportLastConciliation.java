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
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;

/**
 *
 * @author ggutierrez
 */
public class ProReportLastConciliation {

    private Font catFont = new Font(Font.FontFamily.TIMES_ROMAN, 15, Font.BOLD);
    private Font catFont_u = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.UNDERLINE);
    private Font subFont = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.NORMAL);
    private Font subFont_1 = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD, BaseColor.WHITE);
    private Font subFontT = new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD);
    private Font NORMAL = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
    private int PYi = 0;
    private int PYi_2 = 0;
    private int Hlng = 0;

    public void createReport(A2290Filter Data, File file) {
        DecimalFormat df = new DecimalFormat("######0");
        DecimalFormat df_2 = new DecimalFormat("#,###,###.00");

        DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
        otherSymbols.setDecimalSeparator('.');
        otherSymbols.setGroupingSeparator(',');

        df.setDecimalFormatSymbols(otherSymbols);
        df_2.setDecimalFormatSymbols(otherSymbols);

        try {
            PYi = 842; // Para A4: 788
            Hlng = 12;
            int PosX1 = 15;

            //Document document = new Document(new Rectangle(842, 595));
            Document document = new Document(PageSize.A4, 5, 5, 5, 5);
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));
            document.open();

            PYi = PYi - 40;

            //Agregando logo de AM
            Image img;
            img = Image.getInstance(String.format("/Dumps/%s", RESOURCES[0]));
            img.setAbsolutePosition(PosX1, PYi - 20);
            img.scaleToFit(190, 40);
            document.add(new Paragraph(String.format("", RESOURCES[0], img.getClass().getName())));
            document.add(img);

            //Agregando título de AM                          
            Phrase txtTitle = new Phrase(new Paragraph("Aerovias de Mexico, S.A. de C.V.", catFont));
            PdfContentByte canvas = writer.getDirectContent();
            PdfContentByte under = writer.getDirectContentUnder();
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, txtTitle, PosX1 + 540, PYi, 0);

            PYi = PYi - 40;

            Phrase txtAviso = new Phrase(new Paragraph("Aviso de irregularidad", NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtAviso, PosX1, PYi, 0);

            Phrase txtOficina = new Phrase(new Paragraph("Oficina", NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtOficina, PosX1, PYi - 40, 0);

            Phrase txtOficinaValue = new Phrase(new Paragraph(Data.SAGENT, NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtOficinaValue, PosX1 + 160, PYi - 40, 0);

            Phrase txtOficinaUnderline = new Phrase(new Paragraph("_______________", NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtOficinaUnderline, PosX1 + 140, PYi - 40, 0);

            Phrase txtNroDocumento = new Phrase(new Paragraph("Número de documento:", NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtNroDocumento, PosX1 + 350, PYi - 20, 0);
            Phrase txtNroDocumentoUnderline = new Phrase(new Paragraph("_______________", NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtNroDocumentoUnderline, PosX1 + 480, PYi - 20, 0);
            Phrase txtNroDocumentoValue = new Phrase(new Paragraph(Functions.fillZeros(6, Data.NUMAVIS.trim().replace(".00", "")), NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, txtNroDocumentoValue, PosX1 + 520, PYi - 20, 0);

            Phrase txtFecEmision = new Phrase(new Paragraph("Fecha de emisión:", NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtFecEmision, PosX1 + 350, PYi - 50, 0);
            Phrase txtFecEmisionUnderline = new Phrase(new Paragraph("_______________", NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtFecEmisionUnderline, PosX1 + 480, PYi - 50, 0);
            Phrase txtFecEmisionValue = new Phrase(new Paragraph(Functions.getMonthConvertX1(Data.descSDATE), NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, txtFecEmisionValue, PosX1 + 520, PYi - 50, 0);

            Phrase txtMoneda = new Phrase(new Paragraph("Moneda:", NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtMoneda, PosX1 + 350, PYi - 80, 0);
            Phrase txtMonedaUnderline = new Phrase(new Paragraph("_______________", NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtMonedaUnderline, PosX1 + 480, PYi - 80, 0);
            Phrase txtMonedaValue = new Phrase(new Paragraph(Data.SCURRENCY, NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, txtMonedaValue, PosX1 + 520, PYi - 80, 0);

            PYi = PYi - 150;

            PdfPTable table = new PdfPTable(4);
            table.setTotalWidth(565);
            table.setWidths(new float[]{60, 50, 385, 70});
            table.setLockedWidth(true);

            // first row
            PdfPCell cell = new PdfPCell(new Phrase("Documento", subFontT));
            cell.setFixedHeight(20);
            cell.setBorder(Rectangle.BOX);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setBackgroundColor(BaseColor.GRAY);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase("Agente", subFontT));
            cell.setFixedHeight(20);
            cell.setBorder(Rectangle.BOX);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setBackgroundColor(BaseColor.GRAY);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase("Concepto", subFontT));
            cell.setFixedHeight(20);
            cell.setBorder(Rectangle.BOX);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setBackgroundColor(BaseColor.GRAY);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase("Importe", subFontT));
            cell.setFixedHeight(20);
            cell.setBorder(Rectangle.BOX);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setBackgroundColor(BaseColor.GRAY);
            table.addCell(cell);

            // Second row
            cell = new PdfPCell(new Phrase("AVISO DE CARGO", NORMAL));
            cell.setFixedHeight(400);
            cell.setBorder(Rectangle.BOX);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase(Data.SAGENT, NORMAL));
            cell.setFixedHeight(400);
            cell.setBorder(Rectangle.BOX);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase("RECHAZO DE LOS BOLETOS\n\n" + Data.TKTS_CONCATENADOS + "\n\nPOR ERROR SE SOLICITO AUTH POR:                                      $ " + df_2.format(Data.totSVFOP_ERROR) + "\nY LA EMISION DE LOS BOLETOS SUMAN UN TOTAL DE:  $ " + df_2.format(Data.totSVFOP) + "\nSE REPROCESA EL IMPORTE AUTORIZADO", NORMAL));
            cell.setFixedHeight(400);
            cell.setBorder(Rectangle.BOX);
            cell.setHorizontalAlignment(Element.ALIGN_LEFT);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase("$ " + df_2.format(Data.totSVFOP - Data.totSVFOP_ERROR) + "", NORMAL));
            cell.setFixedHeight(400);
            cell.setBorder(Rectangle.BOX);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);

            // Adding Table to document        
            //document.add(table); 
            table.writeSelectedRows(0, -1, PosX1, PYi, canvas);

            PYi = PYi - 450;

            Phrase txtTotal = new Phrase(new Paragraph("TOTAL", NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTotal, PosX1 + 450, PYi, 0);

            colorRectangle(under, BaseColor.WHITE, PosX1 + 500, PYi - 10, 60, 25);
            ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("$ " + df_2.format(Data.totSVFOP - Data.totSVFOP_ERROR), NORMAL)), PosX1 + 530, PYi, 0);

            //cell.setColspan(2);
            /*colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), PosX1, PYi - 11, 580, 25);
             ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Documento", subFont_1)), PosX1 + 15, PYi, 0);
             PosX1 = PosX1 + 40;
             PosX2 = PosX1;
             ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Agente", subFont_1)), PosX1, PYi, 0);

             PosX1 = PosX1 + 40; //19
             PosX3 = PosX1;
             ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Concepto", subFont_1)), PosX1, PYi, 0);

             PosX1 = PosX1 + 67;
             PosX4 = PosX1;
             ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Importe", subFont_1)), PosX1, PYi, 0);*/
            document.close();
            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

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

            ColumnText.showTextAligned(total, Element.ALIGN_LEFT, new Phrase(String.valueOf(writer.getPageNumber() - 1)), 2, 2, 0);

        }
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

    public void setTitle(int posNewPagex, int posNewPagey, PdfWriter writer) {
        int posNewPagex_2 = posNewPagex;
        int posNewPagey_2 = posNewPagey - 25;

        //Nivel 1
        PdfContentByte canvas = writer.getDirectContent();
        PdfContentByte under = writer.getDirectContentUnder();
        colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), posNewPagex, posNewPagey - 7, 760, 25);

        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Moneda", subFont_1)), posNewPagex + 15, posNewPagey, 0);

        posNewPagex = posNewPagex + 40; //64        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Plazo", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 40; //19        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Fecha", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 67;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Comercio", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 73; //33        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Nro", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 75;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Nro", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 60;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Cuotas", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 52; //28        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Cuota", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 53; //33        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Importe", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 54;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Comisión del", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 60;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("IVA S/.", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 60; //65        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Neto a", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 54; //30        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Match", subFont_1)), posNewPagex, posNewPagey, 0);

        posNewPagex = posNewPagex + 54; //50        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Fuente de", subFont_1)), posNewPagex, posNewPagey, 0);

        //Nivel 2
        colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), posNewPagex_2, posNewPagey_2 - 7, 760, 25);

        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("", subFont_1)), posNewPagex_2 + 15, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 40; //64        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Pago", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 40; //19        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Presentación", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 67;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Participante", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 73; //33        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Tarjeta", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 75;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Autorización", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 60;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Plan", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 52; //28        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Vigente", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 53; //33        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Total", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 54;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Banco", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 60;
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Comisión", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 60; //65        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Cobrar", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 54; //30        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

        posNewPagex_2 = posNewPagex_2 + 54; //50        
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, new Phrase(new Paragraph("Ventas", subFont_1)), posNewPagex_2, posNewPagey_2, 0);

    }

    public static final String[] RESOURCES = {
        "logo_aeromexico.png",
        "logo_fd.png",
        "139X2.png",
        "139X.jpg"
    };

}
