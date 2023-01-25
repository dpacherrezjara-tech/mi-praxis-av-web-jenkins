/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.A1686Filter;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.ClarificationLoadLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author
 */
@Controller
@Scope("request")
@RequestMapping("/ClarificationLoad")
public class ClarificationLoadController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private ClarificationLoadLogic logic;
    private MasterDAO masterDAO;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "sales/ClarificationLoad/form_index";
    }

    @RequestMapping(value = "/setData", method = RequestMethod.POST)
    public @ResponseBody
    String setData(ModelMap map, @RequestParam("excelfile") MultipartFile excelfile, HttpServletRequest request) throws IOException {
        byte[] bytes = null;
        Integer cont = 0;
        String mensaje = "";
        String msjResult = "";
        String msjUpload = "";

        try {
            Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

            String banco = request.getParameter("banco");
            String input = request.getParameter("input");
            String filename = excelfile.getOriginalFilename();

            if (banco.equals("EL") || banco.equals("US") || banco.equals("AX")) {

                byte[] fileData2 = excelfile.getBytes();
                msjResult = uploadCSV(fileData2, banco);

            } else if (banco.equals("STB") && input.equals("C")) {

                byte[] dataFile = excelfile.getBytes();
                msjResult = uploadFile(dataFile, banco);

            } else {

                if (banco.equals("BX") && input.equals("C")) {
                    byte[] fileDataBX = excelfile.getBytes();
                    msjUpload = uploadBanamexCSV(fileDataBX, banco, input);
                } else {
                    //Si Santander Aclaraciones entra como csv (Nuevo insumo)
                    if (banco.equals("ST") && input.equals("C") && filename.toLowerCase().contains(".csv")) {
                        byte[] fileDataST = excelfile.getBytes();
                        msjUpload = uploadSantanderAclaracionesCSV(fileDataST, banco, input);
                    } else {

                        // ------------------------------------------------------------------------
                        // -------------- CONVERTIR EXCEL a version 97-2003(*xls) -----------------
                        // ------------------------------------------------------------------------
                        msjUpload = uploadPrev(excelfile, banco, input);
                    }
                }

                map.put("successUp", true);
                map.put("msjUpload", msjUpload);
            }

            map.put("success", true);
            map.put("msjResult", msjResult);
        } catch (SQLException e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        } catch (Exception e) {
            map.put("success", false);
            map.put("sesion", SESSION_CONTROL);
        }
        return new Gson().toJson(map);
    }

    private String uploadBanamexCSV(byte[] bytes, String banco, String input) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        String msj = "", msjError = "", valueS = "", valueTOT = "", filaCompleta = "", tmp = "";
        int noOfColu = 0;
        BufferedReader br = null;
        List<String> listaExcelString = new ArrayList<String>(0);
        boolean correct = true;
        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "BanamexCsv." + strSesion + ".csv";

            String strArchivo = "C:\\Windows\\Temp\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);

            fs.write(bytes);
            fs.flush();
            fs.close();

            br = new BufferedReader(new FileReader(strArchivo));
            String line = br.readLine();

            while (null != line) {
                line = br.readLine();

                String[] fields = line.split(";");
                noOfColu = fields.length;

                valueS = fields[4];     //NUM_CTA
                valueTOT = fields[5];  //NUM_REF

                if (valueTOT.toUpperCase().indexOf("TOTAL") > -1) {
                    break;
                }

                if (valueTOT.toUpperCase().indexOf("TOTAL") == -1) {

                    if (valueS.trim().length() != 16 && valueS.trim().length() != 15) {
                        correct = false;

                        msjError = "Error. Invalid format. TOO LONG CREDIT CARD. Please contact AM.";
                        break;
                    }
                }
                if (msjError.equals("")) {
                    /*Validacion 1era Fecha columna A*/
                    tmp = fields[0];
                    msjError = validarFecha(tmp, "A");
                }
                if (msjError.equals("")) {
                    /*Validacion 1era Fecha columna H*/
                    tmp = fields[7];
                    msjError = validarFecha(tmp, "H");
                }

                if (!msjError.trim().equals("")) {
                    msj = msjError;
                    break;
                }

                filaCompleta = line.replaceAll(";", ",");

                listaExcelString.add(filaCompleta + ",");
            }

            ClarificationLoadLogic logic = new ClarificationLoadLogic();
            logic.setSession(this.serverSession.getServerSession());

            if (msj.equals("")) {
                msj = upload(listaExcelString, banco, input, "");
            }

            //Eliminar temporal           
            archivo.delete();

        } catch (Exception e) {
            e.printStackTrace();
            msj = "Se produjo un error al intentar subir el archivo.";
        }

        return msj;

    }

    private String validarFecha(String fecha, String columna) {
        String msjError = "";

        if (fecha.trim().equals("")) {
            msjError = "Error. Remittance Date is Empty. Please contact AM. (Column " + columna + ")";

        } else if (fecha.indexOf("N/A") >= 0) {
            msjError = "Error. Remittance Date incorrect format (N/A). Please contact AM. (Column " + columna + ")";

        } else if (fecha.equals("99/99/9999") || fecha.equals("99-99-9999")) {
            msjError = "Error. Invalid Remittance Date. Please contact AM. (Column " + columna + ")";

        } else if (fecha.length() != 10) {
            msjError = "Error. Format Date Invalid. Please contact AM. (Column " + columna + ")";

        }

        return msjError;
    }

    private String uploadSantanderAclaracionesCSV(byte[] bytes, String banco, String input) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        boolean inicio = false;
        String filaCompleta = "", msj = "";
        String fecha_tran = "", claim_code = "", afiliacion = "", comercio = "", marca = "", tarjeta_nro = "", arn = "", cod_aut = "", monto = "";
        String moneda = "", estatus = "", motivo = "", fecha_venc = "", emisor = "", procesador = "";
        String fechaActual = Functions.getFechaActual();

        BufferedReader br = null;
        List<String> listaExcelString = new ArrayList<String>(0);

        int i = 0;
        String cad = "";
        boolean comma_in_amt = false;

        try {

            DecimalFormat df = new DecimalFormat("######0.00");

            DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
            otherSymbols.setDecimalSeparator('.');

            df.setDecimalFormatSymbols(otherSymbols);

            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "SantanderAclaCsv." + strSesion + ".csv";

            String strArchivo = "C:\\Windows\\Temp\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);

            fs.write(bytes);
            fs.flush();
            fs.close();

//            br = new BufferedReader(new FileReader(strArchivo));
            br = new BufferedReader(new InputStreamReader(new FileInputStream(strArchivo), "ISO-8859-1"));
            String line = br.readLine();

            int cont = 0;
            while (null != line) {
                comma_in_amt = false;
                i = 0;

                cont += 1;

                String[] fields = line.split(",");

                /*validacion de fin de archivo en caso vengan filas de mas*/
                if (fields.length > 7) {
                    cad = fields[0].trim() + fields[1].trim() + fields[2].trim() + fields[3].trim();
                    if (cad.trim().equals("")) {
                        break;
                    }
                } else {
                    break;
                }

                fecha_tran = fields[0].trim();//A
                claim_code = fields[1].trim();
                afiliacion = fields[2].trim();//C
                comercio = fields[3].trim();
                marca = fields[4].trim();//E
                tarjeta_nro = fields[5].trim();//F
                arn = fields[6].trim();
                cod_aut = fields[7].trim();

                monto = fields[8].trim();//I
                if (monto.contains("\"")) {
                    comma_in_amt = true;
                    if (fields[9].trim().contains("\"")) {
                        monto = fields[8].trim() + fields[9].trim();
                        i = 1;
                    } else {
                        if (fields[10].trim().contains("\"")) {
                            monto = fields[8].trim() + fields[9].trim() + fields[10].trim();
                            i = 2;
                        }
                    }
                    if (i > 0) {
                        monto = monto.replaceAll("\"", "");
                    }
                }

                moneda = fields[9 + i].trim();
                estatus = reemplazarCaracteresRaros(fields[10 + i].trim());
                motivo = fields[11 + i].trim();//reemplazarCaracteresRaros(fields[11+i].trim());//L
                if (motivo.contains("\"")) {
                    if (fields[12 + i].trim().contains("\"")) {
                        motivo = fields[11 + i].trim() + " " + fields[12 + i].trim();
                        i = i + 1;
                    } else {
                        if (fields[13 + i].trim().contains("\"")) {
                            motivo = fields[11 + i].trim() + " " + fields[12 + i].trim() + " " + fields[13 + i].trim();
                            i = i + 2;
                        }
                    }
                    motivo = motivo.replaceAll("\"", "");
                }
                motivo = reemplazarCaracteresRaros(motivo);
                fecha_venc = fields[12 + i].trim();
                emisor = fields[13 + i].trim();
                procesador = fields[14 + i].trim();

                //            tmp = new SimpleDateFormat("yyyy-MM-dd").format(row.getCell(colAB).getDateCellValue());
                if (inicio) {

                    //Columna A
                    fecha_tran = fecha_tran.substring(0, 10);
                    if (fecha_tran.contains("/")) {
//                        try{
//                            Date date1=new SimpleDateFormat("dd/MM/yyyy").parse(fecha_tran); 
//                            fecha_tran = new SimpleDateFormat("yyyyMMdd").format(date1);
//                        }catch (Exception e){
//                            msj = " fecha_tran (A) FORMATO FECHA" + e.getMessage();
//                        }
                        fecha_tran = convertirFecha(fecha_tran);
                        if (fecha_tran.equals("error formato fecha")) {
                            msj = " fecha_tran (A) FORMATO FECHA";
                        }
                    } else {
                        msj = " fecha_tran /(A) FORMATO FECHA";
                    }

                    //Columna B
                    if (claim_code.length() > 20) {
                        msj = " claim_code (B) FOLIO tamaño 20";
                    }

                    //Columna C
                    try {
                        Integer.parseInt(afiliacion);
                        if (afiliacion.length() > 15) {
                            msj = " afiliacion (C) MERCHNC tamaño 15";
                        }
                    } catch (Exception e) {
                        msj = " afiliacion (C) MERCHNC No es númerico";
                    }

                    //Columna F
                    tarjeta_nro = tarjeta_nro.replaceAll("-", "");
                    if (tarjeta_nro.length() < 16) {
                        msj = " tarjeta_nro (F) tamaño 16";
                    }

                    //Col G (NUMREFER 23 varchar)
                    arn = arn.replaceAll("\"", "").trim();
                    if (arn.length() != 23) {
                        msj = " arn (F) NUMREFER tamaño 23";
                    }

                    //Col H (AUTHNBR 6 varchar)
                    if (cod_aut.length() > 6) {
                        msj = " cod_aut (F) AUTHNBR tamaño 6";
                    }

                    //Col I
                    monto = monto.replace(",", "");
                    try {
                        double mt = Double.parseDouble(monto);
                        monto = df.format(mt);
                    } catch (Exception e) {
                        msj = " monto (I) monto No es númerico";
                    }

                    //Col J (MONEDA)
                    if (moneda.length() != 3) {
                        msj = " moneda (J) TAMAÑO 3";
                    }

                    //Columna M
                    fecha_venc = fecha_venc.substring(0, 10);
                    if (fecha_venc.contains("/")) {
//                        try{
//                            Date date2=new SimpleDateFormat("dd/MM/yyyy").parse(fecha_venc); 
//                            fecha_venc = new SimpleDateFormat("yyyyMMdd").format(date2);
//                        }catch (Exception e){
//                            msj = " fecha_venc (A) FORMATO FECHA" + e.getMessage();
//                        }
                        fecha_venc = convertirFecha(fecha_venc);
                        if (fecha_venc.equals("error formato fecha")) {
                            msj = " fecha_venc (M) FORMATO FECHA";
                        }
                    } else {
                        msj = " fecha_venc / (M) FORMATO FECHA";
                    }

                    if (msj.equals("")) {
                        filaCompleta = claim_code + "," + afiliacion + "," + tarjeta_nro + "," + cod_aut + "," + fecha_tran + "," + fecha_venc;
                        filaCompleta = filaCompleta + "," + monto + "," + arn + "," + fechaActual + "," + fechaActual;
                        filaCompleta = filaCompleta + "," + comercio + "," + marca + "," + moneda + "," + estatus + "," + motivo + "," + emisor + "," + procesador;
                        listaExcelString.add(filaCompleta);
                        System.out.println(cont + " : " + filaCompleta);
                    } else {
                        break;
                    }
                }

                if (fields[0].contains("Fecha transacci")) {
                    listaExcelString.add(line);
                    System.out.println(cont + " : " + line);
                    inicio = true;
                }
                /*1049484887,007646056,483030XXXXXX8324,031506,30/09/2022,09/12/2022,2031.00,74524222273122738524986,20221128,29/11/2022,,,,*/

                line = br.readLine();
            }

            ClarificationLoadLogic logic = new ClarificationLoadLogic();
            logic.setSession(this.serverSession.getServerSession());

            if (msj.equals("")) {
                msj = upload(listaExcelString, banco, input, "csv");
            }

            //Eliminar temporal           
            archivo.delete();

        } catch (Exception e) {
            e.printStackTrace();
            msj = "Se produjo un error al intentar subir el archivo.";
        }

        return msj;

    }

    public String reemplazarCaracteresRaros(String input) {
        // Cadena de caracteres original a sustituir.
        String original = "áàäéèëíìïóòöúùuñÁÀÄÉÈËÍÌÏÓÒÖÚÙÜÑçÇ";
        // Cadena de caracteres ASCII que reemplazarán los originales.
        String ascii = "aaaeeeiiiooouuunAAAEEEIIIOOOUUUNcC";
        String output = input;
        for (int i = 0; i < original.length(); i++) {
            // Reemplazamos los caracteres especiales.
            output = output.replace(original.charAt(i), ascii.charAt(i));
        }//for i

        return output;
    }

    public String convertirFecha(String fecha) {

        String v_fecha = fecha;
        try {
            String[] fecha_part = fecha.replaceAll(" ", "").split("/");

            String dia = fecha_part[0].trim();
            String mes = fecha_part[1].trim();
            String anio = fecha_part[2].trim();

            String anio_actual = Functions.getFechaActual();

            if (anio.length() != 4) {//Si es diferente a 4 vino formato YY
                anio = anio_actual.substring(0, 2) + anio.substring(0, 2);
            }

            if (dia.length() != 2 || mes.length() != 2 || anio.length() != 4 || Integer.parseInt(mes) > 12) {
                v_fecha = "error formato fecha";
            } else {
                v_fecha = anio + Functions.fillZeros(2, mes) + Functions.fillZeros(2, dia);
            }
        } catch (Exception e) {
            v_fecha = "error formato fecha";
        }

        return v_fecha;
    }

    private String uploadCSV(byte[] bytes, String strBanco) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        String mensaje = "", strHora = Functions.getHoraActual();
        int fil = 0;
        String NROCASO = "", TARJETA = "", MONTO = "", FECTRX = "", MONTODISPUTA = "", RESPONDEEL = "", NROBOLAER = "", NROAFILICACION = "",
                RESPONDEMAS = "", MOTIVO = "", CODIGOMOTIVO = "", ESTATUS = "", MONTOTRXS = "", DIASREST = "", NROREFADQUI = "", ROC = "";
        List<String> listaExcelString = new ArrayList<String>(0);
        BufferedReader br = null;
        try {
            DecimalFormat df = new DecimalFormat("######0.00");
            DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols(Locale.ENGLISH);
            otherSymbols.setDecimalSeparator('.');
            df.setDecimalFormatSymbols(otherSymbols);
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "ClarificationCsv." + strSesion + ".csv";

            String strArchivo = "C:\\Windows\\Temp\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);

            fs.write(bytes);
            fs.flush();
            fs.close();

            ClarificationLoadLogic logic = new ClarificationLoadLogic();
            logic.setSession(this.serverSession.getServerSession());

            br = new BufferedReader(new InputStreamReader(new FileInputStream(strArchivo), "ISO-8859-1"));
            String line = br.readLine();
            int cont = 0;
            while (null != line) {
                line = limpiaLinea(line);
                mensaje = "";
                String ga = line;
                if (fil >= 5) {
                    String[] fields = ga.split(",");
                    NROCASO = fields[0].toString();
                    TARJETA = fields[5].toString();
                    MONTO = fields[1].toString();
                    FECTRX = fields[11].toString();
                    MONTODISPUTA = fields[7].toString();
                    RESPONDEEL = fields[13].toString();
                    NROBOLAER = fields[4].toString();
                    NROAFILICACION = fields[10].toString();
                    RESPONDEMAS = fields[12].toString();
                    MOTIVO = fields[3].toString();
                    CODIGOMOTIVO = fields[8].toString();
                    ESTATUS = fields[2].toString();
                    MONTOTRXS = fields[6].toString();
                    DIASREST = fields[49].toString();
                    NROREFADQUI = fields[42].toString();
                    ROC = fields[9].toString();
                    
                    MONTO = MONTO.replace(",", "");
                    try {
                        double mt = Double.parseDouble(MONTO);
                        MONTO = df.format(mt);
                    } catch (Exception e) {
//                        msj = " monto (I) monto No es númerico";
                    }
                    MONTOTRXS = MONTOTRXS.replace(",", "");
                    try {
                        double mtr = Double.parseDouble(MONTOTRXS);
                        MONTOTRXS = df.format(mtr);
                    } catch (Exception e) {
//                        msj = " monto (I) monto No es númerico";
                    }

                    String RealTrama = NROCASO + "," + TARJETA + "," + MONTO + "," + FECTRX + "," + MONTODISPUTA + "," + RESPONDEEL + ","
                            + NROBOLAER + "," + NROAFILICACION + "," + RESPONDEMAS + "," + MOTIVO + "," + CODIGOMOTIVO + ","
                            + ESTATUS + "," + MONTOTRXS + "," + DIASREST + "," + NROREFADQUI + "," + ROC;

                    System.out.println(RealTrama);
                    String Numb = fields[4].toString();
                    if ((Numb.trim().length() < 13) && !(Numb.trim().equals(""))) {
//                        System.out.println(Numb);
                        mensaje = "Error : Invalid Ticket";
                        break;
                    }
                    listaExcelString.add(RealTrama);
                } else {
                    System.out.println(line + ":" + fil);
                    listaExcelString.add(line);
                }
                line = br.readLine();
                fil++;
            }
            if (mensaje.equals("")) {
                mensaje = logic.loadPX413SQP02535(listaExcelString, strBanco, fil,strHora);
                if (mensaje.contains("Successful")) {
                    //Llamando al PRO10574(ELavon)
                    mensaje = logic.loadPX413PRO10570(strBanco, strHora, "");
                }
            }

            //Eliminar temporal           
            archivo.delete();

        } catch (Exception e) {
            e.printStackTrace();
            mensaje = "Se produjo un error al intentar subir el archivo.";
        }

        return mensaje;

    }

    public String limpiaLinea(String linea) {
        String linea_nueva = linea;
        boolean continua = true;

        int pos_ini = 0;
        int pos_final = 0;

        String trama_ini = "";
        String trama_modifcar = "";
        String trama_restante = "";
        trama_modifcar = "";

        while (continua) {

            pos_ini = linea_nueva.indexOf(",\"");
            pos_final = linea_nueva.indexOf("\",");

            if (pos_ini == -1) {
                continua = false;
                break;
            }

            trama_ini = linea_nueva.substring(0, pos_ini);
            trama_modifcar = linea_nueva.substring(pos_ini, pos_final);
            trama_restante = linea_nueva.substring(pos_final + 1);
            trama_modifcar = trama_modifcar.replaceAll(",", "").replaceAll("\"", "");

            linea_nueva = trama_ini + "," + trama_modifcar + trama_restante;
        }
//        System.out.println(linea_nueva);
        return linea_nueva;
    }

    private String uploadFile(byte[] bytes, String strBanco) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());

        A1686Filter obj = new A1686Filter();
        List<A1686Filter> lstData = new ArrayList<>();
        String mensaje = "", strHora = Functions.getHoraActual();

        try {
            String strSesion = UUID.randomUUID().toString();
            String strNomExcel = "StanderBSPAclaration." + strSesion + ".xlsx";

            String strArchivo = "C:\\Dumps\\" + strNomExcel;
            File archivo = new File(strArchivo);
            FileOutputStream fs = new FileOutputStream(archivo);

            fs.write(bytes);
            fs.flush();
            fs.close();

//            String nombreArchivo = "Inventario.xlsx";
//            String rutaArchivo = "C:\\Ficheros-Excel\\" + nombreArchivo;
//            String hoja = "Hoja1";
            DataFormatter formatter = new DataFormatter();
            String primeraCelda = "";
            boolean escribe = false;

            FileInputStream file = new FileInputStream(new File(strArchivo));
            // leer archivo excel
            XSSFWorkbook worbook = new XSSFWorkbook(file);
            //obtener la hoja que se va leer
            XSSFSheet sheet = worbook.getSheetAt(0);
            //obtener todas las filas de la hoja excel
            Iterator<Row> rowIterator = sheet.iterator();

            Row row;
            // se recorre cada fila hasta el final
            while (rowIterator.hasNext()) {
                row = rowIterator.next();
                primeraCelda = formatter.formatCellValue(row.getCell(0));

                if (primeraCelda.trim().equals("IATA LINEA AEREA")) {
                    escribe = true;
                }

                if (escribe) {

                    String cadena = "";
                    for (int i = 0; i < 12; i++) {

                        String val = formatter.formatCellValue(row.getCell(i));
                        //En la fecha de envio  pongo ceros a dias o a mes
                        if (i == 8) {
                            val = Functions.getMonthwitZeros(val, "/");
                        }

                        if (i == 11) {
                            cadena = cadena + val;
                        } else {
                            cadena = cadena + val + ",";
                        }
                    }

                    System.out.print(cadena);

                    if (cadena.trim().equals(",,,,,,,,,,,")) {//linea en blanco
                        escribe = false;
                    } else {
                        obj = new A1686Filter();
                        obj.strDescripcion = cadena;
                        lstData.add(obj);
                    }
                }
            }

            ClarificationLoadLogic logic = new ClarificationLoadLogic();
            logic.setSession(this.serverSession.getServerSession());

            mensaje = logic.loadPX413SQP03598(lstData);

//            if(mensaje.contains("Successful")){
//                //Llamando al PRO10574(ELavon)
//                mensaje = logic.loadPX413PRO10570(strBanco,strHora);
//            }
        } catch (Exception e) {
            e.printStackTrace();
            mensaje = "Se produjo un error al intentar subir el archivo.";
        }

        return mensaje;

    }

    private String uploadPrev(MultipartFile excelfile, String banco, String input) {

        String msj = "";

        try {
            String filaCompleta = "";
            List<String> listaExcelString = new ArrayList<String>(0);
            String msjError = "";
            String tmp = "";
            boolean filaTotal = false;
            int i = 0;
            int noOfColumns;

            byte[] fileData = excelfile.getBytes();

            if (fileData != null && fileData.length > 0) {

                String strSesion = UUID.randomUUID().toString();
                String strNomExcel = excelfile.getOriginalFilename();

                String strArchivo = "C:\\Dumps\\" + strNomExcel;
                File archivo = new File(strArchivo);
                FileOutputStream fs = new FileOutputStream(archivo);

                fs.write(fileData);
                fs.flush();
                fs.close();

                DataFormatter formatter = new DataFormatter();
                String primeraCelda = "";
                boolean escribe = false;

                FileInputStream file = new FileInputStream(archivo);
                // leer archivo excel
                HSSFWorkbook worbook = new HSSFWorkbook(file);
                //obtener la hoja que se va leer
                HSSFSheet sheet = worbook.getSheetAt(0);
                //obtener todas las filas de la hoja excel
                Iterator<Row> rowIterator = sheet.iterator();

                if (banco.equals("**")) {
                    System.out.println("***************");
                } else if (banco.equals("ST")) {
                    if (input.equals("N")) {
                        //Avisos
                        msjError = "Under Construction";
                    } else {
                        // <editor-fold defaultstate="collapsed" desc="SANTANDEEEER - Aclaraciones()">

                        int rowS = -1;
                        boolean flag = false;
                        int numberCol = 0;

                        while (rowIterator.hasNext()) {
                            Row row = rowIterator.next();
                            rowS++;
                            i++;

                            String valueS = formatter.formatCellValue(row.getCell(0));
                            if (valueS.trim().toUpperCase().equals("FOLIO")) {
                                numberCol = row.getLastCellNum();
                                flag = true;
                            }
                            filaCompleta = "";

                            if (flag) {
                                for (int colS = 0; colS < numberCol; colS++) {
                                    String cellValueS = "";

                                    if (row.getCell(colS) != null) {
                                        msjError = "";
                                        tmp = "";

                                        if (row.getCell(colS).getCellType() == 0) {
                                            tmp = new SimpleDateFormat("dd/MM/yyyy").format(row.getCell(colS).getDateCellValue()) + "";
                                        } else {
                                            tmp = formatter.formatCellValue(row.getCell(colS));
                                        }

                                        if (colS == 0 && tmp.equals("")) {
                                            filaTotal = true;
                                        }

                                        if (filaTotal == false) {
                                            System.out.println("IF");
                                            cellValueS = tmp;
                                        } else {
                                            break;
                                        }

                                        if (msjError != "") {
                                            break;
                                        } else {
//                                                filaCompleta += tmp + ',';
                                            filaCompleta += cellValueS + ',';
                                        }
                                    } // end cell is null
                                    else {
                                        filaCompleta += ',';
                                    }
                                } // end for colS

                                if (!msjError.equals("")) {
                                    break;
                                } else {
                                    listaExcelString.add(filaCompleta);
                                }

                            } else {
                                msjError = "Error.Excel file has an invalid format.";
                            } // end Flag
                        } // end While
                        //</editor-fold>
                    }
                } else if (banco.equals("PP")) {
                    if (input.equals("N")) {
                        //Avisos
                        msjError = "Under Construction";
                    } else {
                        // <editor-fold defaultstate="collapsed" desc="PAYPAL - Aclaraciones()">

                        int rowP = -1;
                        int noOfCol = 0;
                        while (rowIterator.hasNext()) {
                            Row row = rowIterator.next();
                            rowP++;
                            i++;
                            filaCompleta = "";

                            String numberTkt = formatter.formatCellValue(row.getCell(0));     //Número de Ticket
                            String fechVenta = formatter.formatCellValue(row.getCell(1));     //Fecha de Venta
                            String imporVent = formatter.formatCellValue(row.getCell(2));     //Importe de la venta
                            String moneda = formatter.formatCellValue(row.getCell(3));     //Moneda
                            String numerCaso = formatter.formatCellValue(row.getCell(4));     //Numero de caso

                            if (numberTkt.equals("") && fechVenta.equals("") && imporVent.equals("") && moneda.equals("") && numerCaso.equals("")) {
                                break;
                            }

                            if (i == 1) {
                                noOfCol = row.getLastCellNum();
                            }
                            for (int colP = 0; colP < noOfCol; colP++) {
                                String cellValueP = "";
                                if (row.getCell(colP) != null) {
                                    msjError = "";
                                    tmp = "";
                                    tmp = formatter.formatCellValue(row.getCell(colP));

                                    if (colP == 0 && tmp.equals("")) {
                                        filaTotal = true;
                                    }

                                    if (filaTotal == false) {
                                        if (rowP > 0 && colP == 1) {
                                            //Fecha de Venta (11-Aug-17)
                                            //tmp : Thu Aug 17 00:00:00 GMT-0500 2017
                                            tmp = row.getCell(colP).toString();
                                            tmp = formatter.formatCellValue(row.getCell(colP));

                                            try {
                                                String[] fields = tmp.split("/");
                                                tmp = Functions.fillZeros(2, fields[1]) + "-"
                                                        + getAbreviaturaMes(Functions.fillZeros(2, fields[0])) + "-"
                                                        + Functions.fillZeros(2, fields[2]);
                                            } catch (Exception e) {
                                                tmp = "Error";
                                            }

                                            if (tmp.trim().equals("")) {
                                                msjError = "Error. Sales Date is Empty. Please contact AM. (Column B)";

                                            } else if (tmp.indexOf("N/A") >= 0) {
                                                msjError = "Error. Sales Date incorrect format (N/A). Please contact AM. (Column B)";

                                            } else if (tmp.equals("99/99/9999") || tmp.equals("99-99-9999")) {
                                                msjError = "Error. Invalid Sales Date. Please contact AM. (Column B)";

                                            } else if (tmp.length() == 9) {
                                                cellValueP = tmp;

                                            } else {
                                                msjError = "Error. Format Date Invalid. Please contact AM. (Column B)";
//                                                cellValueP = excelFloatToDate(Number(tmp));
//                                                if(cellValueP.equals("Error")){
//                                                    msjError = "Error. Sales Date incorrect format. Please contact AM. (Column B)";
//                                                }
                                            }
                                        } else {
                                            cellValueP = formatter.formatCellValue(row.getCell(colP));
                                        }
                                    } else {
                                        break;
                                    }

                                    if (!msjError.equals("")) {
                                        break;
                                    } else {
                                        filaCompleta += cellValueP + ',';
                                    }
                                }
                            } // for noOfCol

                            if (!msjError.equals("")) {
                                break;
                            } else {
                                listaExcelString.add(filaCompleta);
                            }

                        } //while

                        //</editor-fold>
                    }
                } else {
                    //==================================================================================
                    //INICIO BANAMEX (Aclaraciones se maneja CSV )===================================================================

                    if (input.equals("N")) {
                        // <editor-fold defaultstate="collapsed" desc="BANAMEX - Avisos()">

                        int rowAB = -1;
                        int noOfColumn = 0;
                        while (rowIterator.hasNext()) {
                            Row row = rowIterator.next();
                            rowAB++;
                            i++;
                            filaCompleta = "";

                            if (i == 1) {
                                noOfColumn = row.getLastCellNum();
                            }

                            for (int colAB = 0; colAB < noOfColumn; colAB++) {
                                String cellValueAB = "";
                                if (row.getCell(colAB) != null) {
                                    msjError = "";
                                    tmp = "";
                                    tmp = formatter.formatCellValue(row.getCell(colAB));

                                    if (colAB == 0 && tmp.equals("")) {
                                        filaTotal = true;
                                    }

                                    if (filaTotal == false) {
                                        if (rowAB > 0 && colAB == 5) {
                                            //FECHA DE APLICACIÓN (02/10/2017)... se tiene que convertir a YYYY-MM-DD
                                            if (row.getCell(colAB).getCellType() == 1) {
                                                tmp = formatter.formatCellValue(row.getCell(colAB));
                                            } else {
//                                                tmp = new SimpleDateFormat("dd/MM/yyyy").format(row.getCell(colAB).getDateCellValue());
                                                tmp = new SimpleDateFormat("yyyy-MM-dd").format(row.getCell(colAB).getDateCellValue());
                                            }

                                            if (tmp.trim().equals("")) {
                                                msjError = "Error. Application Date is Empty. Please contact AM. (Column F)";

                                            } else if (tmp.indexOf("N/A") >= 0) {
                                                msjError = "Error. Application Date incorrect format (N/A). Please contact AM. (Column F)";

                                            } else if (tmp.equals("99/99/9999") || tmp.equals("99-99-9999")) {
                                                msjError = "Error. Invalid Application Date. Please contact AM. (Column F)";

                                            } else if (tmp.length() == 10) {
                                                cellValueAB = tmp;

                                            } else {
                                                msjError = "Error. Format Date Invalid. Please contact AM. (Column F)";
//                                                cellValueAB = excelFloatToDate(Number(tmp));
//                                                if(cellValueAB.equals("Error")){
//                                                    msjError = "Error. Application Date incorrect format. Please contact AM. (Column F)";
//                                                }
                                            }
                                        } else {
                                            cellValueAB = formatter.formatCellValue(row.getCell(colAB));
                                        }
                                    } else {
                                        break;
                                    }

                                    if (!msjError.equals("")) {
                                        break;
                                    } else {
                                        filaCompleta += cellValueAB + ',';
                                    }
                                }
                            } // for noOfColumn

                            if (!msjError.equals("")) {
                                break;
                            } else {
                                listaExcelString.add(filaCompleta);
                            }

                        } //while

                        //</editor-fold>
                    } else {
                        msjError = "BANAMEX ahora entra por csv";
                        // <editor-fold defaultstate="collapsed" desc="BANAMEX - Aclaraciones()">
                        /*BANAMEX ACLARACIONES SE MANEJA MEDIANTE CSV(;) debido a columnas internas que venian en los insumos XLS 
                          miércoles, 22 de junio de 2022 18:01 Elizabeth*/
//                        int rowB = -1;
//                        String valueS = "";
//                        String valueTOT = "";
//                        boolean correct = true;
//                        int noOfColu = 0;
//                        
//                        // se recorre cada fila hasta el final
//                        while (rowIterator.hasNext()) {
//                            Row row = rowIterator.next();
//                            rowB++;
//                            i++;
//                            
//                            if(i == 1){
//                                noOfColu = row.getLastCellNum();
//                            }
//                            
//                            valueS = formatter.formatCellValue(row.getCell(4));     //NUM_CTA
//                            valueTOT = formatter.formatCellValue(row.getCell(5));   //NUM_REF
//                            
//                            if(rowB != 0  && valueTOT.toUpperCase().indexOf("TOTAL") == -1 ) {
//                                        
//                                if(valueS.trim().length() != 16 && valueS.trim().length() != 15  ){
//                                   correct = false;
//
//                                   msjError = "Error. Invalid format. TOO LONG CREDIT CARD. Please contact AM.";
//                                }
//                            }
//                            
//                            filaCompleta = "";
//                            
//                            if (rowB != 0  && valueTOT.toUpperCase().indexOf("TOTAL") > -1){
//                                break;
//                            }
//                            
//                            if(correct){
//                                for (int colB = 0; colB < noOfColu; colB++) {
//                                    String cellValueB = "";
//                                    if(row.getCell(colB) != null){
//                                        msjError = "";
//                                        tmp = "";
//                                        tmp = formatter.formatCellValue(row.getCell(colB));
//
//                                        if(colB == 0 && tmp.equals("")){
//                                            filaTotal = true;
//                                        }
//                                        
//                                        if(filaTotal == false){
//                                            if(rowB > 0 && colB == 0){
//                                                //FECHA_REME (04/10/2017)
//                                                tmp = formatter.formatCellValue(row.getCell(colB));
//
//                                                if(tmp.trim().equals("")){
//                                                    msjError = "Error. Remittance Date is Empty. Please contact AM. (Column A)";
//
//                                                }else if(tmp.indexOf("N/A") >= 0){
//                                                    msjError = "Error. Remittance Date incorrect format (N/A). Please contact AM. (Column A)";
//
//                                                }else if(tmp.equals("99/99/9999") || tmp.equals("99-99-9999")){
//                                                    msjError = "Error. Invalid Remittance Date. Please contact AM. (Column A)";
//
//                                                }else if(tmp.length() == 10){
//                                                    cellValueB = tmp;
//
//                                                }else{
//                                                    msjError = "Error. Format Date Invalid. Please contact AM. (Column A)";
//    //                                                cellValueB = excelFloatToDate(Number(tmp));
////                                                    if(cellValueB.equals("Error")){
////                                                        msjError = "Error. Remittance Date incorrect format. Please contact AM. (Column A)";
////                                                    }
//                                                }
//                                            }else if(rowB > 0 && colB == 7){
//                                                //FECHA_VENT (16/09/2017)
//                                                tmp = formatter.formatCellValue(row.getCell(colB));
//
//                                                if(tmp.trim().equals("")){
//                                                    msjError = "Error. Sales Date is Empty. Please contact AM. (Column H)";
//
//                                                }else if(tmp.indexOf("N/A") >= 0){
//                                                    msjError = "Error. Sales Date incorrect format (N/A). Please contact AM. (Column H)";
//
//                                                }else if(tmp.equals("99/99/9999") || tmp.equals("99-99-9999")){
//                                                    msjError = "Error. Invalid Sales Date. Please contact AM. (Column H)";
//
//                                                }else if(tmp.length() == 10){
//                                                    cellValueB = tmp;
//
//                                                }else{
//                                                    msjError = "Error. Format Date Invalid. Please contact AM. (Column H)";
////                                                    cellValueB = excelFloatToDate(Number(tmp));
////                                                    if(cellValueB.equals("Error")){
////                                                        msjError = "Error. Sales Date incorrect format. Please contact AM. (Column H)";
////                                                    }
//                                                }
//
//                                            } else{
//                                                cellValueB = formatter.formatCellValue(row.getCell(colB));
//                                            }
//                                        }else{
//                                            break;
//                                        }
//                                        
//                                        if(!msjError.equals("")){
//                                            break;
//                                        }else{
//                                            filaCompleta += cellValueB + ',';
//                                        }
//                                    }// Cell is null
//                                } // for noOfColu
//                                
//                                if(!msjError.equals("")){
//                                    break;
//                                }else{
//                                    listaExcelString.add(filaCompleta);
//                                }
//                            } //if correct
//                        } //while
                    } //else Aclaraciones
                    //</editor-fold>

                }//else BANAMEX

                //Eliminar temporal           
                archivo.delete();

            } //if filedata

            if (!msjError.equals("")) {
                msj = msjError;
            } else {
                msj = upload(listaExcelString, banco, input, "");
            }

        } catch (Exception e) {
            e.printStackTrace();
            if (e.getMessage().contains("to be Excel 5.0/7.0 (BIFF5) format")) {
                msj = "Error. Convertir excel a version 97-2003(*xls)";
            } else {
                msj = "Hubo un error al cargar Archivo";
            }
        }

        return msj;
    }

    private String upload(List lstExcel, String strBanco, String strInput, String type_file) throws Exception {

        Functions.msjConsola("PRAXIS", this.serverSession.getServerSession().getUserView().getUserInfo().USR, getClass().getSimpleName() + " : " + Thread.currentThread().getStackTrace()[1].getMethodName());
        String msj = "";

        try {
            String strHora = Functions.getHoraActual();
            if (lstExcel != null && lstExcel.size() > 0) {

                if (strInput.trim().equals("N")) {
                    //AVISOS PREVIOS / CONTRACARGOS
                    ClarificationLoadLogic logic = new ClarificationLoadLogic();
                    logic.setSession(this.serverSession.getServerSession());

                    msj = logic.loadPX413SQP01999(lstExcel, strBanco, strHora);

                    if (msj.trim().equals("SUCCESS")) {
                        //Llamando al PRO10577
                        msj = logic.loadPX413PRO10577(strBanco, strHora);
                    }

                } else {
                    //ACLARACIONES

                    ClarificationLoadLogic logic = new ClarificationLoadLogic();
                    logic.setSession(this.serverSession.getServerSession());

                    msj = logic.loadPX413SQP01977(lstExcel, strBanco, strHora);

                    if (msj.trim().equals("SUCCESS")) {
                        //Llamando al PRO10570/71/72/73
                        msj = logic.loadPX413PRO10570(strBanco, strHora, type_file);
                    }
                }

            } else {
                msj = "Error. Information not found.";
            }

        } catch (Exception e) {
            e.printStackTrace();
            msj = "Se produjo un error al intentar subir el archivo.";
        }

        return msj;

    }

    @RequestMapping(value = "search")
    public @ResponseBody
    String search(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- ClarificationLoad : Search-------------");

        map.put("success", true);
        List<A1686Filter> lst = this.getList(request, false);
        System.out.println("Total : " + lst.size());
        map.put("total", lst.size() > 0 ? lst.get(0).page.TOTROW : 0);
        map.put("data", lst);
        return new Gson().toJson(map);
    }

    public List<A1686Filter> getList(HttpServletRequest request, Boolean bExcel) {

        List<A1686Filter> lst = new ArrayList<>(0);
        A1686Filter filter = new A1686Filter();
        Gson gson = new Gson();
        String beanString = "";
        String strBanco = "", buffer = "";

        strBanco = request.getParameter("banco");
        if (strBanco.trim().equals("AX")) {
            //AMEX
            buffer = "ACLARAMEX";
        } else if (strBanco.trim().equals("ST")) {
            //SANTANDER
            buffer = "ACLARSNTDR";
        } else if (strBanco.trim().equals("PP")) {
            //PAYPAL
            buffer = "ACLARPAYPA";
        } else if (strBanco.trim().equals("EL")) {
            //PAYPAL
            buffer = "ACLAELAVON";
        } else if (strBanco.trim().equals("US")) {
            //PAYPAL
            buffer = "ACLARAMEXU";
        } else {
            //BANAMEX
//            buffer = "ACLARBNMX";
            buffer = strBanco;
        }

        try {
            filter.IN_FECHA_FROM = Functions.getFechaActual().substring(0, 6);
            filter.IN_FECHA_TO = Functions.getFechaActual().substring(0, 6);
            filter.IN_FUENTE = buffer;

            ClarificationLoadLogic logic = new ClarificationLoadLogic();
            logic.setSession(this.serverSession.getServerSession());

            lst = logic.loadPX264SQP00665(filter, "");
//            resp.vars.put("listaData", lst);

        } catch (Exception e) {
            throw new SpringException(e);
        }
        return lst;
    }

    private static String getAbreviaturaMes(String strDate) {
//
        if (strDate.equals("01")) {
            return "Jan";
        } else if (strDate.equals("02")) {
            return "Feb";
        } else if (strDate.equals("03")) {
            return "Mar";
        } else if (strDate.equals("04")) {
            return "Apr";
        } else if (strDate.equals("05")) {
            return "May";
        } else if (strDate.equals("06")) {
            return "Jun";
        } else if (strDate.equals("07")) {
            return "Jul";
        } else if (strDate.equals("08")) {
            return "Aug";
        } else if (strDate.equals("09")) {
            return "Sep";
        } else if (strDate.equals("10")) {
            return "Oct";
        } else if (strDate.equals("11")) {
            return "Nov";
        } else if (strDate.equals("12")) {
            return "Dec";
        } else {
            return "Error";
        }
    }

//    private static String excelFloatToDate(double floatVal) {
//
//        double seconds = (floatVal - 25569) * 86400.0;
//        Date fec = new Date(seconds*1000);
//        fec.setDate(fec.date + 1);
//        
//        String result = "";
//
//        try{
//            result = formatDate.format(fec);
//        }catch(Exception e){
//            result = "Error";
//        }
//        
//        return result;
//    }
}
