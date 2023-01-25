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
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import net.miatech.praxis.eecta.SQP04001Filter;

/**
 *
 * @author vhidalgo
 */
public class ReportEdoCtaDet {

    private String FILE = "ReportEdoCtaDet.pdf";
    public final String FileTXT = "ReportEdoCtaDet.txt";
    private Font catFont = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD);
    private Font subFont = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.NORMAL); // 10
    private Font subFontT = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD); //12
    private Font NORMAL = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
    private Font subFont_1 = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD, BaseColor.WHITE);
    private Font subFont_2 = new Font(Font.FontFamily.TIMES_ROMAN, 7, Font.NORMAL);
    private int PYi = 0;
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
            total = writer.getDirectContent().createTemplate(50, 16); //50, 16      
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
                
//                Paragraph Nbr_page = new Paragraph( String.format("Página: %d de ", writer.getPageNumber() ), subFont );                
//                Nbr_page.getFont().setSize(9);
//                table.addCell(Nbr_page);          
                
                table.addCell(String.format("Página: %d de ", writer.getPageNumber())); //original                                
                
                PdfPCell cell = new PdfPCell(Image.getInstance(total) );                
                cell.setBorder(Rectangle.BOTTOM);   
                table.addCell( cell );
                
//                Paragraph Nbr_page_total = new Paragraph(  String.format("%d ", Image.getInstance(total) )  , subFont );
//                Nbr_page_total.getFont().setSize(9);                
//                table.addCell( Nbr_page_total );
                
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
    public String formato_numeroInt (double dato) {    
        NumberFormat nf = NumberFormat.getNumberInstance(Locale.US);
        DecimalFormat formato = (DecimalFormat) nf;
        formato.setMinimumFractionDigits(0);
        formato.setMaximumFractionDigits(0);
        String NumberFormated = formato.format(dato);
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
        colorRectangle(under, new CMYKColor(1f, 0f, 0f, 0.5f), posNewPagex, posNewPagey+10 , 750, 22);
                            
            int PYi = posNewPagey+15; //(+) sube (-) baja
            int PosX1 = posNewPagex+1;            
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Nº Boleto" , subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 60;            
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("F. Emisión", subFont_1)), PosX1, PYi, 0);

            PosX1 = PosX1 + 90;            
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Nombre Pasajero", subFont_1)), PosX1, PYi, 0);
            
            PosX1 = PosX1 + 120;            
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Ref.", subFont_1)), PosX1, PYi, 0);
            PosX1 = PosX1 + 42;            
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Trx.", subFont_1)), PosX1, PYi, 0);
            PosX1 = PosX1 + 45;            
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Ruta", subFont_1)), PosX1, PYi, 0);
            PosX1 = PosX1 + 100;            
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("UUID", subFont_1)), PosX1+35, PYi, 0);
            PosX1 = PosX1 + 150;             
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Mda.", subFont_1)), PosX1+30, PYi, 0);
            PosX1 = PosX1 + 45;             
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Saldo", subFont_1)), PosX1+30, PYi, 0);
            PosX1 = PosX1 + 35;
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("Antig.", subFont_1)), PosX1+30, PYi+10, 0);                         
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("(días)", subFont_1)), PosX1+30, PYi, 0);            
    }

    public File createReport(List<SQP04001Filter> Data) {

        try {

            //C:\Program Files\Apache Software Foundation\Apache Tomcat 8.0.27\temp\tmp5401410828782100458RptVentaUATP.pdf
            fileTmp01 = File.createTempFile("tmp", FILE);
            lstFileTmp.add(fileTmp01);
            //fileTmp02 = File.createTempFile("tmp", FileTXT);            
            //lstFileTmp.add(fileTmp02);            
            PYi = 550;
            Hlng = 12;
            int PosX1 = 15;
            int PosX2;
            int PosXd;
            int PosX3;
            int PosX4;
            int PosX5;
            int PosX6;
            int PosX7;
            int PosX8;
            int PosX9;
            int PosX10;
            int PosX11;
            int PosX12;
            int PosX13;
            int PosX14;
            int PosX15;
            int PosX16;
            int PosX17;
            int PosX18;
            int PosX19;
            int PosX20;

            int ItemPage = 0;
            int getPageNumber = 0;
            int PoxT;

            int posNewPagex = 0;
            int posNewPagey = 0;

            Document document = new Document(PageSize.LETTER.rotate(), 5, 5, 5, 5);
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(fileTmp01));
            TableHeader event = new TableHeader();
            writer.setPageEvent(event);
            document.open();

            //titulo reporte
            PYi = PYi - 7;
            Phrase txtTitle = new Phrase(new Paragraph("ESTADO DE CUENTA", catFont));
            PdfContentByte canvas = writer.getDirectContent();
            PdfContentByte under = writer.getDirectContentUnder();
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTitle, 300, PYi, 0);
            PYi = PYi - 10;
            Phrase txtTitle1 = new Phrase(new Paragraph("ANEXO: Detalle de boletos", subFontT));            
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtTitle1, 300, PYi, 0);

            // Logo AEROMEXICO
            Image img;
            img = Image.getInstance(String.format("/Dumps/%s", RESOURCES[0]));
            img.setAbsolutePosition(PosX1, 530);
            img.scaleToFit(190, 40);
            document.add(new Paragraph(String.format("", RESOURCES[0], img.getClass().getName())));
            document.add(img);
            writer.setCompressionLevel(0);

            //datos AEROMEXICO
            PYi = PYi - 32;
            int py0 = PYi;
            Phrase txtAMInfo = new Phrase(new Paragraph(Data.get(1).tbl_misl.A3961DESC1, catFont)); //nombre AM
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtAMInfo, PosX1, PYi, 0);
            PYi = PYi - Hlng;
            String[] strDireccion = Data.get(1).tbl_misl.A3961DESC2.split(",");            
            Phrase txtAMdir1 = new Phrase(new Paragraph( strDireccion[0] , NORMAL)); //Direccion AM1
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtAMdir1, PosX1, PYi, 0);
            PYi = PYi - Hlng;
            Phrase txtAMdir2 = new Phrase(new Paragraph( strDireccion[1].trim() +", "+ strDireccion[2].trim() +", "+ strDireccion[3].trim(), NORMAL)); //Direccion AM2
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtAMdir2, PosX1, PYi, 0);
            PYi = PYi - Hlng;
            Phrase txtAMInfo2 = new Phrase(new Paragraph(Data.get(1).tbl_misl.A3961COME1, NORMAL));  //Telf. AM          
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtAMInfo2, PosX1, PYi, 0);
            //PYi = PYi - Hlng;
            Phrase txtAMInfo3 = new Phrase(new Paragraph( "RFC: " +  Data.get(1).tbl_misl.A3961COME2, NORMAL));  //Clave CITA AM           
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT,  txtAMInfo3, 120, PYi, 0);

            int px1 = 480; //500
            //LOGO CLIENTE   
            if (Data.get(0).tbl_client.A3953LOGO.equals("")){
                Data.get(0).tbl_client.A3953LOGO = "not_picture.png";
            }
            img = Image.getInstance(String.format("/Dumps/%s", Data.get(0).tbl_client.A3953LOGO /*RESOURCES[0]*/ ));            
            img.setAbsolutePosition(px1, 520);
            img.scaleToFit(280, 60);
            document.add(new Paragraph(String.format("", Data.get(0).tbl_client.A3953LOGO/*RESOURCES[0]*/, img.getClass().getName())));
            document.add(img);            
            writer.setCompressionLevel(0);
            
            //datos CLIENTE
            PYi = py0;
            String A3953RSOCI_part1 = "";
            String A3953RSOCI = Data.get(0).tbl_client.A3953RSOCI;
            int length = A3953RSOCI.length(); 
            if(length > 44 ){
               A3953RSOCI = A3953RSOCI.substring(0, 44);
               A3953RSOCI_part1 = Data.get(0).tbl_client.A3953RSOCI.substring(44, length);
            }
            Phrase RSOCI = new Phrase(new Paragraph(A3953RSOCI, catFont)); //RAZON SOCIAL CLIENTE
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, RSOCI, px1, PYi, 0);            
            if (!A3953RSOCI_part1.trim().equals("")){
                PYi = PYi - Hlng;
                Phrase RSOCI_1 = new Phrase(new Paragraph(A3953RSOCI_part1, catFont)); //RAZON SOCIAL CLIENTE
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, RSOCI_1, px1, PYi, 0);
            }
//            Phrase RSOCI = new Phrase(new Paragraph(Data.get(0).tbl_client.A3953RSOCI, catFont)); //RAZON SOCIAL CLIENTE
//            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, RSOCI, px1, PYi, 0);
            PYi = PYi - Hlng;
            Phrase DIRE1 = new Phrase(new Paragraph(Data.get(0).tbl_client.A3953DIRE1, NORMAL)); //"AV. MARINA NACIONAL Nº. 329 INT C3 "
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, DIRE1, px1, PYi, 0);
            PYi = PYi - Hlng;            
            Phrase COLON = new Phrase(new Paragraph(Data.get(0).tbl_client.A3953COLON, NORMAL)); //"COL. VERONICA ANZURES, CIUDAD DE MÉXICO "
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, COLON, px1, PYi, 0);
            PYi = PYi - Hlng;
            Phrase DELEG = new Phrase(new Paragraph(Data.get(0).tbl_client.A3953DELEG, NORMAL)); //"DELEGACIÓN MIGUEL HIDALGO "
                       
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, DELEG, px1, PYi, 0);
            PYi = PYi - Hlng;
            String TXTCP = "";
            if (!Data.get(0).tbl_client.A3953CP.trim().equals("")){
                TXTCP = "C.P. " + Data.get(0).tbl_client.A3953CP;
            }
            Phrase CP = new Phrase(new Paragraph(TXTCP , NORMAL)); //"C.P. 11300 "               
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, CP, px1, PYi, 0);
                    
            //datos  Contrato
            int PYi_c = 454;
//            PYi = PYi + 10;
//            PYi = PYi - Hlng;            
            //colorRectangle(under, new GrayColor(0.825f), PosX1, PYi+10, 400, 0); //LINEA                         
            Phrase CONTR = new Phrase(new Paragraph("Contrato Nº: " + Data.get(0).rpteCab.A3981CONTR, NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, CONTR, PosX1, PYi_c, 0);
            PYi_c = PYi_c - Hlng;            
            int Py_c = PYi_c;
            Phrase NRRPT = new Phrase(new Paragraph("Edo. Cuenta Nº: " + Data.get(0).rpteCab.A3981NREDO, NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, NRRPT, PosX1, PYi_c, 0);
            PYi_c = PYi_c - Hlng;
            Phrase FEECC = new Phrase(new Paragraph("Fecha Emisión: " + Data.get(0).rpteCab.A3981FEDOC, NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, FEECC, PosX1, PYi_c, 0);
            
            //Py_c; //vuelve a la altura de "REPORTE Nº:"
            int PosX1_ = 180;            
//            Phrase TXTREFBC = new Phrase(new Paragraph("Nº Ref. Bancaria: XXXXXX "  /*+Data.get(0).rpteCab.A3957REFBC */ , NORMAL));                        
//            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, TXTREFBC, PosX1_, Py_c, 0);
//            
            Py_c = Py_c - Hlng;
//            String VL_PERIODO = "";
//            if(!Data.get(0).rpteCab.A3981INIPR.equals("")){
//                VL_PERIODO = Data.get(0).rpteCab.A3981INIPR + " Al " + Data.get(0).rpteCab.A3981FINPR; 
//            }            
            Phrase txtPERIODO = new Phrase(new Paragraph("Saldo al cierre: " + Data.get(0).rpteCab.A3981FINPR  , NORMAL));
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, txtPERIODO, PosX1_, Py_c, 0);                                    
            //Py_c = Py_c - Hlng;  
//            PosX1_ = 330; 
//            colorRectangle(under, new GrayColor(0.825f), PosX1_-5, PYi, 120, 15);
//            Phrase TXTNACIONAL = new Phrase(new Paragraph( Data.get(0).tbl_client.A3953TORGN , NORMAL));
//            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, TXTNACIONAL, PosX1_+28, Py_c+4, 0);
                        
            //Titulos
            PYi = PYi_c;
            this.setTitle(15, PYi-40, writer );            
            //Double VL_A3958TOT = 0.0;            
            PYi = PYi - (Hlng + 30); //8
            for (int i = 3; i < Data.size(); i++) {
                
                if( i%2 == 0) colorRectangle(under, new GrayColor(0.825f), 15, PYi-7, 750, 15); 
                else          colorRectangle(under, GrayColor.GRAYWHITE, 15, PYi-7, 750, 15);                
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3958CIA+Data.get(i).rpteDet.A3958FORMA+Data.get(i).rpteDet.A3958SERIE, subFont)), 15, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3958FEVTA, subFont)), 80, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3958PAX, subFont)), 130, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3958SOLER, subFont)), 290, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3958TRNCU, subFont)), 330, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3958RUTA, subFont)), 360, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3958CFDI, subFont)), 480, PYi, 0);                
                ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(i).rpteDet.A3958MDLOC, subFont)), 650, PYi, 0);                
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.get(i).rpteDet.A3958TOT), subFont)), 720, PYi, 0);
                ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numeroInt(Data.get(i).CANT_DIA), subFont)), 755, PYi, 0);
                //VL_A3958TOT = VL_A3958TOT + Data.get(i).rpteDet.A3958TOT;
                
                // Texto detail            
//                out.println(Data.lstRws.get(i).A1729IATA + ";"
//                        + Data.lstRws.get(i).TKT );
                PYi = PYi - 12;
                // Control Page: 1 //                 
                ItemPage++;
                if (ItemPage > 30 && getPageNumber < 1) { //old a 30 lineas
                    ItemPage = 0;
                    PYi = 510; //ubicacion del titulo en la pagi sig
                    getPageNumber++;
                    document.newPage();
                    // Set Title Next Page //
                    posNewPagex = 15;
                    posNewPagey = PYi;
                    this.setTitle(posNewPagex, posNewPagey, writer );                    
                    // Reinciar Contador al inicio  Nex Page //
                    posNewPagex = 15;

                }
                // Page > 1
                if (getPageNumber > 0 && ItemPage > 40) { //40
                    ItemPage = 0;
                    PYi = 510; 
                    getPageNumber++;
                    document.newPage();
                    // Set Title Next Page //
                    posNewPagey = PYi; // (PYi + 13);
                     this.setTitle(posNewPagex, posNewPagey, writer );
                    // Reinciar Contador al inicio  Nex Page //
                    posNewPagex = 15;
                }
            }

            // TOTALES                                                
            PYi = PYi - 18;            
            colorRectangle(under, new GrayColor(0.825f), 15, PYi + 9, 750, -25); 
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph("SALDO TOTAL: ", NORMAL)), 580, PYi, 0);            
            ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase(new Paragraph(formato_numero(Data.get(0).rpteCab.A3981TOT), NORMAL)), 720, PYi, 0);
            //TOTAL EN LETRAS            
            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(0).rpteCab.A3981TOTLT, NORMAL)), 80, PYi, 0);

//            //REMARK            
//            String TextRemark = Data.get(2).tbl_misl.A3961DESC1.replaceAll("}", Data.get(0).tbl_client.A3953PLZCR + " DIAS ");
//            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(TextRemark, subFont_2)), 17, posRemark, 0);
//            posRemark = posRemark - 10;
//            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(2).tbl_misl.A3961DESC2, subFont_2)), 17, posRemark, 0);
//            posRemark = posRemark - 10;
//            ColumnText.showTextAligned(canvas, Element.ALIGN_LEFT, new Phrase(new Paragraph(Data.get(2).tbl_misl.A3961COME1, subFont_2)), 17, posRemark, 0);

            // No PDF, Just a text file                       
            //out.flush();
            //out.close();
            //this.onCloseDocument(writer, document);
            document.close();
            return fileTmp01;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
