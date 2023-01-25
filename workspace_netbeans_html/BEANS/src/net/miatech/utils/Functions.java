/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.StringTokenizer;
import net.miatech.beans.A020Filter;
import net.miatech.beans.ProrateHeader;
import net.miatech.beans.RECA021;
import net.miatech.beans.SubProrateHeader;
import net.miatech.beans.lists.RECA021List;
import net.miatech.libmiatec.A021;

/**
 *
 * @author claudia
 */
public class Functions {

    public Functions() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public static void msjConsola(String app, String user, String servlet) {
        System.out.println(app + " : El usuario : " + user + " entro al Servlet " + servlet + ", " + getFechaActual() + " - " + getHoraActualHHMM());
    }

    public static String fillString(String field, int len) {
        if (field == null) {
            field = "";
        }
        for (int i = field.length(); i < len; i++) {
            field = field + " ";
        }
        return field;

    }

    public static String fillZeros(int size, String value) {
        for (int i = value.length(); i < size; i++) {
            value = "0" + value;
        }
        return value;
    }

    public static String restZeros(int size, String value) {
        for (int i = value.length(); i <= size; i++) {
            if (value.startsWith("0")) {
                value = value.replaceFirst("^0*", "");
            }
        }
        return value;
    }

    public static String fillZeros1(int size, String strvalue) {
        String value = strvalue.trim();
        try {
            for (int i = value.length(); i < size; i++) {
                if (value.contains(".")) {
                    value = value.replace(".", "");
                }

                value = "0" + value;
            }
        } catch (Exception e) {
        }

        return value;
    }

    public static String rest1Month(String strDate) {
        int mes = 0;
        String strValue;
        mes = Integer.parseInt(strDate.substring(4, 6));
        if (mes - 1 < 1) {
            strValue = String.valueOf(12);
        } else {
            strValue = Functions.fillZeros(2, String.valueOf(mes - 1));
        }
        return strValue;
    }

    public static String suma1Month(String strDate) {
        int mes = 0;
        String strValue;
        int anio = Integer.parseInt(strDate.substring(0, 4));
        mes = Integer.parseInt(strDate.substring(4, 6));
        if (mes + 1 > 12) {
            anio += 1;
            strValue = anio + Functions.fillZeros(2, String.valueOf(1));
        } else {
            strValue = anio + Functions.fillZeros(2, String.valueOf(mes + 1));
        }
        return strValue;
    }

    public static String fillPorcentajeLike(int size, String value) {
        for (int i = value.length(); i < size; i++) {
            value = value + "%";
        }
        return value;
    }

    public static String getFechaActual() {
        Date fecha = new Date();
        SimpleDateFormat formato = new SimpleDateFormat("yyyyMMdd");
        String fechaActual = formato.format(fecha);
        return fechaActual;
    }

    public static String getFechaActualTexto() {
        //19 de Agosto del 2015.
        //Calendar calendario = new GregorianCalendar();
        SimpleDateFormat sdf = new SimpleDateFormat("dd 'de' MMMM 'de' yyyy");
        return sdf.format(new Date());
    }

    public static String getFechaenTexto(String fecha) {
        //19 de Agosto del 2015.

        SimpleDateFormat formatoFecha = new SimpleDateFormat("yyyyMMdd", Locale.getDefault());
        formatoFecha.setLenient(false);
        DateFormat df = DateFormat.getDateInstance(DateFormat.MEDIUM);
        //Fecha Inicio
        Date fechaInicial = new Date();
        try {
            fechaInicial = formatoFecha.parse(fecha);
        } catch (Exception e) {
        }

        SimpleDateFormat sdf = new SimpleDateFormat("dd 'de' MMMM 'de' yyyy");
        return sdf.format(fechaInicial);
    }

    public static String getHoraActual() {
        Calendar calendario = new GregorianCalendar();
        String hora;
        hora = Functions.fillZeros(2, (String.valueOf(calendario.get(Calendar.HOUR_OF_DAY)))).concat(Functions.fillZeros(2, (String.valueOf(calendario.get(Calendar.MINUTE))))).concat(Functions.fillZeros(2, (String.valueOf(calendario.get(Calendar.SECOND)))));
        return hora;
    }

    public static String getHoraActualHHMM() {
        Calendar calendario = new GregorianCalendar();
        String hora;
        hora = Functions.fillZeros(2, (String.valueOf(calendario.get(Calendar.HOUR_OF_DAY)))).concat(":").concat(Functions.fillZeros(2, (String.valueOf(calendario.get(Calendar.MINUTE)))));
        return hora;
    }

    public static String setFormatFecha(String oldFecha) {
        if (oldFecha.length() < 6 || oldFecha.trim().equals("")) {
            return "";
        } else if (oldFecha.trim().length() == 6) {
            return "20".concat(oldFecha.substring(4, 6)).concat(oldFecha.substring(2, 4)).concat(oldFecha.substring(0, 2));
        }
        return "";
    }

    public static String setFormatFechaNew(String oldFecha) {

        try {
            return "20".concat(oldFecha.substring(4, 6)).concat(oldFecha.substring(2, 4)).concat(oldFecha.substring(0, 2));
        } catch (Exception e) {
            return "";
        }
    }

    public static String getAbreviaturaMes(String strDate) {
        if (strDate.trim().equals("01")) {
            return "Jan";
        } else if (strDate.trim().equals("02")) {
            return "Feb";
        } else if (strDate.trim().equals("03")) {
            return "Mar";
        } else if (strDate.trim().equals("04")) {
            return "Apr";
        } else if (strDate.trim().equals("05")) {
            return "May";
        } else if (strDate.trim().equals("06")) {
            return "Jun";
        } else if (strDate.trim().equals("07")) {
            return "Jul";
        } else if (strDate.trim().equals("08")) {
            return "Aug";
        } else if (strDate.trim().equals("09")) {
            return "Sep";
        } else if (strDate.trim().equals("10")) {
            return "Oct";
        } else if (strDate.trim().equals("11")) {
            return "Nov";
        } else if (strDate.trim().equals("12")) {
            return "Dec";
        } else {
            return strDate;
        }
    }

    public static String getAbreviaturaAnio(String strDate) {
        
        return getFechaActual().substring(0, 2) + strDate;
        
//        if (strDate.trim().equals("06")) {
//            return "2006";
//        } else if (strDate.trim().equals("07")) {
//            return "2007";
//        } else if (strDate.trim().equals("08")) {
//            return "2008";
//        } else if (strDate.trim().equals("09")) {
//            return "2009";
//        } else if (strDate.trim().equals("10")) {
//            return "2010";
//        } else if (strDate.trim().equals("11")) {
//            return "2011";
//        } else if (strDate.trim().equals("12")) {
//            return "2012";
//        } else if (strDate.trim().equals("13")) {
//            return "2013";
//        } else if (strDate.trim().equals("14")) {
//            return "2014";
//        } else if (strDate.trim().equals("15")) {
//            return "2015";
//        } else if (strDate.trim().equals("16")) {
//            return "2016";
//        } else if (strDate.trim().equals("17")) {
//            return "2017";
//        } else if (strDate.trim().equals("18")) {
//            return "2018";
//        } else if (strDate.trim().equals("19")) {
//            return "2019";
//        } else if (strDate.trim().equals("20")) {
//            return "2020";
//        } else {
//            return "Error";
//        }
    }

    public static String getMonthwitZeros(String strDate, String separator) {
        String fecha = strDate.trim();
        String dia = "";
        String mes = "";
        String ano = "";
        if (!fecha.equals("") && fecha.trim().length() >= 6 && fecha.trim().length() < 10) {
            try {
                String[] parts = fecha.split(separator);
                dia = fillZeros(2, parts[0].toString());
                mes = fillZeros(2, parts[1].toString());
                ano = "20" + parts[2].toString();
                fecha = ano + separator + mes + separator + dia;
            } catch (Exception e) {
            }
        }

        return fecha;
    }

    /**
     * Devuelve el Mes en formato Jan ,Feb,Mar,etc Parametro requerido yyyymmdd
     * o yyyymm
     */
    public static String getMonthConvert(String strDate) {
        String fecha = strDate.trim();

        try {
            if (!fecha.contains("*")) {
                if (fecha.contains("-")) {
                    fecha = fecha.replace("-", "");
                }
                if (fecha.length() == 8) {
                    fecha = fecha.substring(0, 4) + "-" + fecha.substring(4, 6) + "-" + fecha.substring(6, 8);
                } else if (fecha.length() == 6) {
                    fecha = fecha.substring(0, 4) + "-" + getAbreviaturaMes(fecha.substring(4, 6));
                }
            } else {
                fecha = fecha.replace("*", "");
            }
        } catch (Exception e) {
        }

        return fecha;
    }

    public static String getMonthConvert6(String strDate) {
        String fecha = strDate.trim();

        try {
            if (!fecha.contains("*")) {
                if (fecha.contains("-")) {
                    fecha = fecha.replace("-", "");
                }
                if (fecha.length() == 8) {
                    fecha = fecha.substring(0, 4) + "-" + fecha.substring(4, 6) + "-" + fecha.substring(6, 8);
                } else if (fecha.length() == 6) {
                    fecha = getAbreviaturaMes(fecha.substring(4, 6)) + " - " + fecha.substring(0, 4);
                }
            } else {
                fecha = fecha.replace("*", "");
            }
        } catch (Exception e) {
        }

        return fecha;
    }

    public static String getMonthConvertX(String strDate) {
        String fecha = strDate.trim();

        try {
            if (!fecha.contains("*")) {
                if (fecha.contains("-")) {
                    fecha = fecha.replace("-", "");
                }
                if (fecha.length() == 8) {
                    fecha = fecha.substring(0, 4) + "-" + getAbreviaturaMes(fecha.substring(4, 6)) + "-" + fecha.substring(6, 8);
                } else if (fecha.length() == 6) {
                    fecha = fecha.substring(0, 4) + "-" + getAbreviaturaMes(fecha.substring(4, 6));
                }
            } else {
                fecha = fecha.replace("*", "");
            }
        } catch (Exception e) {
        }

        return fecha;
    }
    
    public static String getMonthConvertX1(String strDate) {
        String fecha = strDate.trim();

        try {
            if (!fecha.contains("*")) {
                if (fecha.contains("-")) {
                    fecha = fecha.replace("-", "");
                }
                if (fecha.length() == 8) {
                    fecha = fecha.substring(6, 8) + "-" + getAbreviaturaMes(fecha.substring(4, 6)) + "-" + fecha.substring(2, 4);
                } else if (fecha.length() == 6) {
                    fecha = fecha.substring(0, 4) + "-" + getAbreviaturaMes(fecha.substring(4, 6));
                }
            } else {
                fecha = fecha.replace("*", "");
            }
        } catch (Exception e) {
        }

        return fecha;
    }

    public static String getMonthConvert2(String strDate) {
        String fecha = strDate.trim();
        try {
            if (fecha.contains("-")) {
                fecha = fecha.replace("-", "");
            }
            if (fecha.length() == 6) {

                fecha = getAbreviaturaAnio(fecha.substring(0, 2)) + "-" + getAbreviaturaMes(fecha.substring(2, 4) + fecha.substring(4, 6).replace("00", ""));

            }
        } catch (Exception e) {
        }
        return fecha;
    }

    public static String getMonthConvert8(String strDate) {
        String fecha = strDate.trim();
        try {
            if (fecha.contains("-")) {
                fecha = fecha.replace("-", "");
            }
            if (fecha.length() == 6) {

                fecha = getAbreviaturaAnio(fecha.substring(0, 2)) + "-" + getAbreviaturaMes(fecha.substring(2, 4) + "-" + fecha.substring(4, 6));

            }
        } catch (Exception e) {
        }
        return fecha;
    }

    public static String getMonthConvert7(String strDate) {
        String fecha = strDate.trim();
        try {
            if (fecha.contains("-")) {
                fecha = fecha.replace("-", "");
            }
            if (fecha.length() == 6 || fecha.length() == 4) {

                fecha = getAbreviaturaAnio(fecha.substring(0, 2)) + "-" + getAbreviaturaMes(fecha.substring(2, 4));

            }
        } catch (Exception e) {
        }
        return fecha;
    }

    public static String getMonthConvert3(String strDate) {
        String fecha = strDate.trim();
        try {
            if (fecha.contains("-")) {
                fecha = fecha.replace("-", "");
            }

            if (fecha.length() == 6 && !fecha.equals("000000")) {
                fecha = getAbreviaturaAnio(fecha.substring(0, 2)) + "-" + (fecha.substring(2, 4)) + "-" + fecha.substring(4, 6);
            } else if (fecha.length() == 6 && fecha.equals("000000")) {
                fecha = "00-00-00";
            }
        } catch (Exception e) {
        }
        return fecha;
    }

    public static String getMonthConvert4(String strDate) {
        String fecha = strDate.trim();
        try {
            if (fecha.contains("-")) {
                fecha = fecha.replace("-", "");
            }
            if (fecha.length() == 6) {

                fecha = getAbreviaturaAnio(fecha.substring(0, 2)) + (fecha.substring(2, 4) + fecha.substring(4, 6).replace("00", ""));

            }
        } catch (Exception e) {
        }
        return fecha;
    }

    public static String getMonthConvert5(String strDate) { //DDMMYY
        String fecha = strDate.trim();
        try {
            if (fecha.contains("-")) {
                fecha = fecha.replace("-", "");
            }

            if (fecha.length() == 6 && !fecha.equals("000000")) {
                fecha = getAbreviaturaAnio(fecha.substring(4, 6)) + "-" + getAbreviaturaMes(fecha.substring(2, 4)) + "-" + fecha.substring(0, 2);
            } else if (fecha.length() == 6 && fecha.equals("000000")) {
                fecha = "00-00-00";
            }
        } catch (Exception e) {
        }
        return fecha;
    }

    public static String getMonthConvert_WR(String strDate) {
        String fecha = strDate.trim();

        try {
            if (fecha.contains("-")) {
                fecha = fecha.replace("-", "");
            }
            if (fecha.length() == 8) {
                fecha = fecha.substring(6, 8) + " - " + getAbreviaturaMesEspaniol(fecha.substring(4, 6)) + " - " + fecha.substring(0, 4);
            } else if (fecha.length() == 6) {
                fecha = getAbreviaturaMesEspaniol(fecha.substring(4, 6)) + " - " + fecha.substring(0, 4);
            }
        } catch (Exception e) {
        }

        return fecha;
    }

    public static String getMonthConvertDate(String strDate) {
        String fecha = strDate.trim();

        try {
            if (fecha.contains("/")) {
                fecha = fecha.replace("/", "");
            }
            if (fecha.contains("-")) {
                fecha = fecha.replace("-", "");
            }
            if (fecha.length() == 8) {
                fecha = fecha.substring(0, 4) + "/" + fecha.substring(4, 6) + "/" + fecha.substring(6, 8);
            } else if (fecha.length() == 6) {
                fecha = fecha.substring(0, 4) + "/" + getAbreviaturaMes(fecha.substring(4, 6));
            }
        } catch (Exception e) {
        }

        return fecha;
    }

    public static String getStringConvertDate(String strDate) {
        String fecha = strDate.trim();

        try {
            if (fecha.contains("/")) {
                fecha = fecha.replace("/", "");
            }
            if (fecha.contains("-")) {
                fecha = fecha.replace("-", "");
            }
            if (fecha.length() == 8) {
                fecha = fecha.substring(6, 8) + "/" + fecha.substring(4, 6) + "/" + fecha.substring(0, 4);
            } else if (fecha.length() == 6) {
                fecha = getAbreviaturaMes(fecha.substring(4, 6)) + "/" + fecha.substring(0, 4);
            }
        } catch (Exception e) {
        }

        return fecha;
    }

    public static String getStringConvertDateFormatYYMMDD(String strDate, String formato) {
        String fecha = strDate.trim();

        try {
            if (fecha.contains("/")) {
                fecha = fecha.replace("/", "");
            }
            if (fecha.contains("-")) {
                fecha = fecha.replace("-", "");
            }
            if (fecha.length() == 8) {
                if (formato.equals("MMDDYY")) {
                    fecha = fecha.substring(4, 6) + "/" + fecha.substring(6, 8) + "/" + fecha.substring(0, 4);
                } else {
                    fecha = fecha.substring(6, 8) + "/" + fecha.substring(4, 6) + "/" + fecha.substring(0, 4);
                }
            } else if (fecha.length() == 6) {
                fecha = getAbreviaturaMes(fecha.substring(4, 6)) + "/" + fecha.substring(0, 4);
            }
        } catch (Exception e) {
        }

        return fecha;
    }

    public static String ConvertedTime(String strHour) {
        String hora = strHour.trim();
        if (!hora.equals("")) {
            if (hora.length() == 8) {
                hora = hora.substring(0, 2) + ":" + hora.substring(2, 4) + ":" + hora.substring(4, 6) + ":" + hora.substring(6, 8);
            } else if (hora.length() == 6) {
                hora = hora.substring(0, 2) + ":" + hora.substring(2, 4) + ":" + hora.substring(4, 6);
            } else if (hora.length() == 4) {
                hora = hora.substring(0, 2) + ":" + hora.substring(2, 4);
            }
        }
        return hora;
    }

    public static String getAbreviaturaMesEspaniol(String strDate) {

        if (strDate.trim().equals("01")) {
            return "Ene";
        } else if (strDate.trim().equals("02")) {
            return "Feb";
        } else if (strDate.trim().equals("03")) {
            return "Mar";
        } else if (strDate.trim().equals("04")) {
            return "Abr";
        } else if (strDate.trim().equals("05")) {
            return "May";
        } else if (strDate.trim().equals("06")) {
            return "Jun";
        } else if (strDate.trim().equals("07")) {
            return "Jul";
        } else if (strDate.trim().equals("08")) {
            return "Ago";
        } else if (strDate.trim().equals("09")) {
            return "Sep";
        } else if (strDate.trim().equals("10")) {
            return "Oct";
        } else if (strDate.trim().equals("11")) {
            return "Nov";
        } else if (strDate.trim().equals("12")) {
            return "Dic";
        } else {
            return "Error";
        }

    }

    public static String rest1DaytoDate(String strDate) {
        int anio = 0;
        int mes = 0;
        int dia = 0;
        String strValue;
        anio = Integer.parseInt(strDate.substring(0, 4));
        mes = Integer.parseInt(strDate.substring(4, 6));
        dia = Integer.parseInt(strDate.substring(6, 8));
        if (dia - 1 < 1) {
            if (mes - 1 < 1) {
                strValue = String.valueOf(anio - 1) + String.valueOf(12)
                        + String.valueOf(31);
            } else {
                strValue = String.valueOf(anio) + Functions.fillZeros(2, String.valueOf(mes - 1))
                        + String.valueOf(31);
            }
        } else {
            strValue = String.valueOf(anio) + Functions.fillZeros(2, String.valueOf(mes))
                    + Functions.fillZeros(2, String.valueOf(dia - 1));
        }
        return strValue;
    }

    public static int hallarFindeMes(String date) {
        date = fillZeros(6, date);
        //YYYYMMDD
        int nMes = Integer.parseInt(date.substring(4, 6));
        int nRes = 0;
        int nAno = Integer.parseInt(date.substring(0, 4));

        switch (nMes) {
            case 1:
                nRes = 31;
                break;
            case 2:
                if (nAno % 4 == 0) {
                    nRes = 29;
                } else {
                    nRes = 28;
                }
                break;
            case 3:
                nRes = 31;
                break;
            case 4:
                nRes = 30;
                break;
            case 5:
                nRes = 31;
                break;
            case 6:
                nRes = 30;
                break;
            case 7:
                nRes = 31;
                break;
            case 8:
                nRes = 31;
                break;
            case 9:
                nRes = 30;
                break;
            case 10:
                nRes = 31;
                break;
            case 11:
                nRes = 30;
                break;
            case 12:
                nRes = 31;
                break;
        }

        return nRes;
    }

    public static String restXDaystoDate(String strDate, int cantDias) {

        String strValue = "";
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
            Date date = formatter.parse(strDate);

            Calendar cal = new GregorianCalendar();
            cal.setTimeInMillis(date.getTime());
            cal.add(Calendar.DATE, -cantDias);
            Date fechaRest = new Date(cal.getTimeInMillis());

            strValue = formatter.format(fechaRest);

        } catch (ParseException e) {
            e.printStackTrace();
        }

        return strValue;

    }

    public static Date sumAnyDaystoDate(Date fecha, int dias) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(fecha); // Configuramos la fecha que se recibe
        calendar.add(Calendar.DAY_OF_YEAR, dias);  // numero de días a añadir, o restar en caso de días<0

        return calendar.getTime(); // Devuelve el objeto Date con los nuevos días añadidos	
    }

    /**
     * Se recibe una cadena con la fecha en el formato definido, se le adiciona
     * o resta una cantidad de dias y se devuelve un string con el mismo formato
     *
     * @param fecha Cadena con la fecha en el formato que se establece
     * @param dias La catidad de dias a adicionar o restar si es negativo
     * @param formato El formato que define la cadena de entrada y retorno
     * @return La nueva fecha con el mismo formato que se recibió la primera
     * @throws ParseException
     */
    public static String sumXDaystoStringDate(String fecha, int dias, String formato) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat(formato);
        Date dfecha_orig = sdf.parse(fecha);

        Calendar cal = Calendar.getInstance();
        cal.setTime(dfecha_orig);
        cal.add(Calendar.DAY_OF_MONTH, dias);
        return sdf.format(cal.getTime());
    }

    public static String sumXDaystoDate(String strDate, int cantDias) {
        //YYYYMMDD
        int anio = 0;
        int mes = 0;
        int dia = 0;
        String strValue;
        anio = Integer.parseInt(strDate.substring(0, 4));
        mes = Integer.parseInt(strDate.substring(4, 6));
        dia = Integer.parseInt(strDate.substring(6, 8));

        int finDeMes = hallarFindeMes(strDate);

        if (mes != 2 && cantDias > finDeMes) {
            strValue = "ERRORFOR";
        } else {
            if (dia + cantDias > finDeMes) {
                if (mes + 1 > 12) {
                    //Solo para Diciembre
                    int diaFinal = cantDias - (finDeMes - dia);
                    strValue = String.valueOf(anio + 1) + "01" + Functions.fillZeros(2, String.valueOf(diaFinal));
                } else {
                    int diaFinal = cantDias - (finDeMes - dia);
                    strValue = String.valueOf(anio) + Functions.fillZeros(2, String.valueOf(mes + 1))
                            + Functions.fillZeros(2, String.valueOf(diaFinal));
                }
            } else {
                strValue = String.valueOf(anio) + Functions.fillZeros(2, String.valueOf(mes))
                        + Functions.fillZeros(2, String.valueOf(dia + cantDias));
            }
        }

        return strValue;

    }

    public static String sumMonthsToDate(String fecha, int cantMeses) {
        //Recibe fecha formato YYYYMMDD y devuelve fecha Formato YYYYMMDD
        String fechaResult = "";
        try {
            SimpleDateFormat curFormater = new SimpleDateFormat("yyyyMM");
            Date dateObj = curFormater.parse(fecha);
            Calendar c1 = Calendar.getInstance();
            c1.setTime(dateObj);
            c1.add(Calendar.MONTH, cantMeses);
            fechaResult = curFormater.format(c1.getTime().getTime());

        } catch (Exception e) {
            e.printStackTrace();
        }
        return fechaResult;

    }

    public static String sumXMonthsToDate(String fecha, int cantMeses) {
        //Recibe fecha formato YYYYMMDD y devuelve fecha Formato YYYYMMDD
        String fechaResult = "";
        try {
            SimpleDateFormat curFormater = new SimpleDateFormat("yyyyMMdd");
            Date dateObj = curFormater.parse(fecha);
            Calendar c1 = Calendar.getInstance();
            c1.setTime(dateObj);
            c1.add(Calendar.MONTH, cantMeses);
            fechaResult = curFormater.format(c1.getTime().getTime());

        } catch (Exception e) {
            e.printStackTrace();
        }
        return fechaResult;

    }

    public static HashMap obtenerListaMeseRangoFechas(String fechaDesde, String fechaHasta) {
        //Recibe fecha formato YYYYMM y devuelve HashMap con Lista de Meses (01/02/03/etc) comprendidos entre el rango de fecha
        //Para PLM, tabla A1515 (Filtro de Fechas)
        HashMap<String, String> hmResult = new HashMap<String, String>();
        switch (fechaDesde.length()) {
            case 4:
                fechaDesde += "0101";
                break;
            case 6:
                fechaDesde += "01";
                break;
        }
        switch (fechaHasta.length()) {
            case 4:
                fechaHasta += "1201";
                break;
            case 6:
                fechaHasta += "01";
                break;
        }
        try {
            SimpleDateFormat curFormater = new SimpleDateFormat("yyyyMMdd");
            String fechaTemp = fechaDesde;
            hmResult.put(fechaTemp.substring(0, 6), fechaTemp.substring(0, 6));

            while (Long.parseLong(fechaTemp) < Long.parseLong(fechaHasta)) {
                Date dateObj = curFormater.parse(fechaTemp);
                Calendar c1 = Calendar.getInstance();
                c1.setTime(dateObj);
                c1.add(Calendar.MONTH, 1);
                fechaTemp = curFormater.format(c1.getTime().getTime());
                hmResult.put(fechaTemp.substring(0, 6), fechaTemp.substring(0, 6));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return hmResult;

    }

    public static String getFechaActual(String fecFormato) {
        Date fecha = new Date();
        SimpleDateFormat formato = new SimpleDateFormat(fecFormato);
        String fechaActual = formato.format(fecha);
        return fechaActual;
    }

    public static String getFormatoAnioMesDia(String fecFormato) {
        String var1 = fecFormato;
        String var2 = fecFormato;
        String anio = "", mes = "", dia = "";
        anio = fecFormato.substring(2, 4);
        mes = var1.substring(4, 6);
        dia = var2.substring(6, 8);
        return anio.concat(mes).concat(dia);

    }

    public static String getFormatoActual(String fecFormato) {
        String var1 = fecFormato;
        String var2 = fecFormato;
        String año = "", mes = "", dia = "";
        año = fecFormato.substring(2, 4);
        mes = var1.substring(4, 6);
        dia = var2.substring(6, 8);
        return mes.concat(dia).concat(año);

    }

    public static int fechasDiferenciaEnDias(Date fechaInicial, Date fechaFinal) {

        double dias = 0;

        try {

            DateFormat df = DateFormat.getDateInstance(DateFormat.MEDIUM);
            String fechaInicioString = df.format(fechaInicial);
            try {
                fechaInicial = df.parse(fechaInicioString);
            } catch (ParseException ex) {
            }
            String fechaFinalString = df.format(fechaFinal);
            try {
                fechaFinal = df.parse(fechaFinalString);
            } catch (ParseException ex) {
            }

            long fechaInicialMs = fechaInicial.getTime();
            long fechaFinalMs = fechaFinal.getTime();
            long diferencia = fechaFinalMs - fechaInicialMs;
            dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

        } catch (Exception e) {
            e.printStackTrace();
        }

        return ((int) dias);
    }

    public static String restarDiasFechaActual(int dias) {

        GregorianCalendar calendar = new GregorianCalendar();
        SimpleDateFormat d1 = new SimpleDateFormat("yyyyMMdd");
        Date d = new Date();
        calendar.setGregorianChange(d);
        calendar.set(GregorianCalendar.DAY_OF_YEAR, calendar.get(GregorianCalendar.DAY_OF_YEAR) - dias);

        return d1.format(calendar.getTime());

    }

    public static boolean esAnioBisiesto(int year) {
        GregorianCalendar calendar = new GregorianCalendar();
        if (calendar.isLeapYear(year)) {
            return true;
        } else {
            return false;
        }
    }

    public static boolean esFechaValida(String fechax) {
        try {
            SimpleDateFormat formatoFecha = new SimpleDateFormat("yyyyMMdd", Locale.getDefault());
            formatoFecha.setLenient(false);
            formatoFecha.parse(fechax);
        } catch (ParseException e) {
            return false;
        }
        return true;
    }

    public static void deleteFile(String strPath) {

        try {

            File src = new File(strPath);
            if (src.isDirectory()) {

                String list[] = src.list();
                for (int i = 0; i < list.length; i++) {
                    String src1 = src.getAbsolutePath() + "/" + list[i];
                    deleteFile(src1);
                }
            }
            new File(strPath).delete();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void renameFile(String nombre, String renombre) {

        try {

            File file = new File(nombre);
            file.renameTo(new File(renombre));

            if (file.exists()) {
                System.out.println("existe " + nombre);
            }

            File f2 = new File(renombre);
            if (f2.exists()) {
                System.out.println("existe " + renombre);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void copyFiles(String ruta, String rutaDestino) {

        try {

            File src = new File(ruta);
            File dest = new File(rutaDestino);

            if (src.isDirectory()) {

                dest.mkdirs();
                String list[] = src.list();

                for (int i = 0; i < list.length; i++) {
                    String dest1 = dest.getAbsolutePath() + "/" + list[i];
                    String src1 = src.getAbsolutePath() + "/" + list[i];
                    copyFiles(src1, dest1);
                }
            } else {
                InputStream in = new FileInputStream(src);
                OutputStream out = new FileOutputStream(dest);

                byte[] buffer = new byte[4096];
                int bytesRead;
                while ((bytesRead = in.read(buffer)) >= 0) {
                    out.write(buffer, 0, bytesRead);
                }
                out.close();
                in.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void copyFilesWithName(String rutaOrig, String rutaDestino) {

        try {

            File fileLeo = new File(rutaOrig);
            File fileCopio = new File(rutaDestino);

            InputStream in = new FileInputStream(fileLeo);
            OutputStream out = new FileOutputStream(fileCopio);

            byte[] buf = new byte[1024];
            int len;
            while ((len = in.read(buf)) > 0) {
                out.write(buf, 0, len);
            }
            out.flush();
            out.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String setNumber(double d) {
        String result = "0";
        DecimalFormat dn = new DecimalFormat("############0.00");
        DecimalFormatSymbols ds = new DecimalFormatSymbols();
        ds.setDecimalSeparator('.');
        dn.setDecimalFormatSymbols(ds);
        try {
            result = dn.format(d);
        } catch (Exception pe) {
        }
        return result;
    }

    public static String getAbreviaturaMesNum(String strDate) {
        strDate = strDate.toLowerCase();

        if (strDate.trim().contains("jan")) {
            return "01";
        } else if (strDate.contains("feb")) {
            return "02";
        } else if (strDate.contains("mar")) {
            return "03";
        } else if (strDate.contains("apr")) {
            return "04";
        } else if (strDate.contains("may")) {
            return "05";
        } else if (strDate.contains("jun")) {
            return "06";
        } else if (strDate.contains("jul")) {
            return "07";
        } else if (strDate.contains("aug")) {
            return "08";
        } else if (strDate.contains("sep")) {
            return "09";
        } else if (strDate.contains("oct")) {
            return "10";
        } else if (strDate.contains("nov")) {
            return "11";
        } else if (strDate.contains("dec")) {
            return "12";
        } else {
            return "13";
        }
    }

    public static String getAbreviaturaMesNumEsp(String strDate) {
        strDate = strDate.toLowerCase();

        if (strDate.trim().contains("ene")) {
            return "01";
        } else if (strDate.contains("feb")) {
            return "02";
        } else if (strDate.contains("mar")) {
            return "03";
        } else if (strDate.contains("abr")) {
            return "04";
        } else if (strDate.contains("may")) {
            return "05";
        } else if (strDate.contains("jun")) {
            return "06";
        } else if (strDate.contains("jul")) {
            return "07";
        } else if (strDate.contains("ago")) {
            return "08";
        } else if (strDate.contains("sep")) {
            return "09";
        } else if (strDate.contains("oct")) {
            return "10";
        } else if (strDate.contains("nov")) {
            return "11";
        } else if (strDate.contains("dic")) {
            return "12";
        } else {
            return "13";
        }
    }

    //VALIDAR SOLO NUMEROS :  
    public static boolean onlyNumbers(String var) {
        boolean suitch = false;
        outer:
        for (int i = 0; i < var.length(); i++) {
            if (var.charAt(i) < 48 || var.charAt(i) > 57) {
                suitch = true;
                break outer;
            }
        }
        return suitch;
    }

    public static int getDayofDate(String strFecha) {
        //Obtiene el numero de dia de la semana segun la fecha indicada.
        //Fecha en formato : YYYYMMDD
        //Domingo = 0, Lunes = 1, Martes = 2, Miercoles = 3, Jueves = 4, Viernes = 5, Sabado = 6;
        SimpleDateFormat formato = new SimpleDateFormat("yyyyMMdd");
        Date fecha = null;
        int dia = -1;
        try {
            fecha = formato.parse(strFecha);
            dia = fecha.getDay();
        } catch (ParseException ex) {
            dia = -1;
        }

        return dia;
    }

    public static String restMonthtoDate(String strDate, int num) {
        int anio = 0;
        int mes = 0;
        String strValue = "000000";
        anio = Integer.parseInt(fillZeros(6, strDate).substring(0, 4));
        mes = Integer.parseInt(fillZeros(6, strDate).substring(4, 6));
        for (int i = 0; i < num; i++) {
            if (i > 0) {
                anio = Integer.parseInt(fillZeros(6, strValue).substring(0, 4));
                mes = Integer.parseInt(fillZeros(6, strValue).substring(4, 6));
            }
            if (mes - 1 < 1) {
                strValue = String.valueOf(anio - 1)
                        + String.valueOf(12);
            } else {
                strValue = String.valueOf(anio)
                        + Functions.fillZeros(2, String.valueOf(mes - 1));
            }
        }
        return strValue;
    }

    public static String FormateaFecha(String vFecha) {
        String vDia, vMes, vAno;
        StringTokenizer tokens = new StringTokenizer(vFecha, "/");
        vDia = tokens.nextToken();
        vMes = tokens.nextToken();
        vAno = tokens.nextToken();
        return vAno + fillZeros(2, vMes) + fillZeros(2, vDia);
    }

    public static String FormateaFechaCopa(String vFecha) {
        vFecha = vFecha.trim().replace(".0", "");
        String vDia = "", vMes = "", vAno = "";
        if (vFecha.length() <= 5) {
            vDia = vFecha.substring(0, 1);
            vMes = vFecha.substring(1, 3);
            vAno = vFecha.substring(3);
        } else {
            vDia = vFecha.substring(0, 2);
            vMes = vFecha.substring(2, 4);
            vAno = vFecha.substring(4);
        }

        return "20" + vAno + fillZeros(2, vMes) + fillZeros(2, vDia);
    }

    public static int diferenciaDiasEntreSistema(String fec) {

        double dias = 0;
        try {
            SimpleDateFormat formatoFecha = new SimpleDateFormat("yyyyMMdd", Locale.getDefault());
            formatoFecha.setLenient(false);
            Date fechaInicial = formatoFecha.parse(fec);

            DateFormat df = DateFormat.getDateInstance(DateFormat.MEDIUM);
            String fechaInicioString = df.format(fechaInicial);
            try {
                fechaInicial = df.parse(fechaInicioString);
            } catch (ParseException ex) {
            }

            long fechaInicialMs = fechaInicial.getTime();
            long fechaFinalMs = new Date().getTime();
            long diferencia = fechaFinalMs - fechaInicialMs;
            dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

        } catch (Exception e) {
            e.printStackTrace();
        }

        return ((int) dias);
    }

    public static int diferenciaDiasEntreSistemaPago(String fec, String fecPago) {

        double dias = 0;
        try {
            SimpleDateFormat formatoFecha = new SimpleDateFormat("yyyyMMdd", Locale.getDefault());
            formatoFecha.setLenient(false);
            Date fechaInicial = formatoFecha.parse(fec);
            Date fechaFinalPago = formatoFecha.parse(fecPago);
            DateFormat df = DateFormat.getDateInstance(DateFormat.MEDIUM);
            String fechaInicioString = df.format(fechaInicial);
            String fechaFinPagoString = df.format(fechaFinalPago);
            try {
                fechaInicial = df.parse(fechaInicioString);
                fechaFinalPago = df.parse(fechaFinPagoString);
            } catch (ParseException ex) {
            }

            long fechaInicialMs = fechaInicial.getTime();
            long fechaFinalMs = fechaFinalPago.getTime();
            long diferencia = fechaFinalMs - fechaInicialMs;
            dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

        } catch (Exception e) {
            e.printStackTrace();
        }

        return ((int) dias);
    }

    public static int diferenciaDias(String fecI, String fecF) {

        double dias = 0;
        try {
            SimpleDateFormat formatoFecha = new SimpleDateFormat("yyyyMMdd", Locale.getDefault());
            formatoFecha.setLenient(false);
            DateFormat df = DateFormat.getDateInstance(DateFormat.MEDIUM);
            //Fecha Inicio
            Date fechaInicial = formatoFecha.parse(fecI);
            String fechaInicioString = df.format(fechaInicial);
            try {
                fechaInicial = df.parse(fechaInicioString);
            } catch (ParseException ex) {
            }
            long fechaInicialMs = fechaInicial.getTime();

            //Fecha Fin
            Date fechaFin = formatoFecha.parse(fecF);
            String fechaFinString = df.format(fechaFin);
            try {
                fechaFin = df.parse(fechaFinString);
            } catch (ParseException ex) {
            }
            long fechaFinalMs = fechaFin.getTime();

            long diferencia = fechaFinalMs - fechaInicialMs;
            dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

        } catch (Exception e) {
            e.printStackTrace();
        }

        return ((int) dias);
    }

    public static String deleteZerosLeft(String value) {
        int size = value.length();
        for (int i = 0; i < size; i++) {
            if (value.substring(0, 1).equals("0")) {
                value = value.replaceFirst("0", "");
            } else {
                i = size;
            }
        }
        if (value.length() == 0) {
            value = "0";
        }
        return value;
    }

    public static double obtenerValorEquivalenteEBCDIC(String campo) {
        //Esto es para obtener el valor equivalente al formato EBCDIC (As400)
        String caracter = "";
        double resultado = 0, total = 0;

        for (int i = 0; i < campo.trim().length(); i++) {
            caracter = campo.substring(i, i + 1);
            if (caracter.equals("{")) {
                resultado = 0;
            } else if (caracter.equals("A")) {
                resultado = 1;
            } else if (caracter.equals("B")) {
                resultado = 2;
            } else if (caracter.equals("C")) {
                resultado = 3;
            } else if (caracter.equals("D")) {
                resultado = 4;
            } else if (caracter.equals("E")) {
                resultado = 5;
            } else if (caracter.equals("F")) {
                resultado = 6;
            } else if (caracter.equals("G")) {
                resultado = 7;
            } else if (caracter.equals("H")) {
                resultado = 8;
            } else if (caracter.equals("I")) {
                resultado = 9;
            } else if (caracter.equals("}")) {
                resultado = -0;
            } else if (caracter.equals("J")) {
                resultado = -1;
            } else if (caracter.equals("K")) {
                resultado = -2;
            } else if (caracter.equals("L")) {
                resultado = -3;
            } else if (caracter.equals("M")) {
                resultado = -4;
            } else if (caracter.equals("N")) {
                resultado = -5;
            } else if (caracter.equals("O")) {
                resultado = -6;
            } else if (caracter.equals("P")) {
                resultado = -7;
            } else if (caracter.equals("Q")) {
                resultado = -8;
            } else if (caracter.equals("R")) {
                resultado = -9;
            }
        }

        if (resultado * (-1) > 0) {
            //Es negativo
            campo = campo.substring(0, campo.length() - 1) + (resultado * -1);
            total = (Double.parseDouble(campo) / 100) * -1;
        } else {
            //Es positivo
            campo = campo.substring(0, campo.length() - 1) + resultado;
            total = Double.parseDouble(campo) / 100;
        }

        return total;
    }

    public static int restBetween2Dates(String fecha1, String fecha2) {
        //Devuelve el resultado en meses para fechas en formato YYYYMM
        int Resultado = 0;

        try {
            int anio1 = Integer.parseInt(fecha1.substring(0, 4));
            int anio2 = Integer.parseInt(fecha2.substring(0, 4));

            int mes1 = Integer.parseInt(fecha1.substring(4, 6));
            int mes2 = Integer.parseInt(fecha2.substring(4, 6));

            Resultado = ((anio1 * 12) + mes1) - ((anio2 * 12) + mes2);

        } catch (Exception e) {
            Resultado = 0;
        }

        return Resultado;
    }

    public static double validarCampoDouble(String value) {
        double campoValidado = 0;
        if (value != null) {
            try {
                if (!value.trim().equals("")) {
                    campoValidado = Double.parseDouble(value.trim().replace(",", ""));
                } else {
                    campoValidado = 0;
                }
            } catch (NumberFormatException e) {
                campoValidado = 0;
                System.out.println("Error en método validarCampoDouble de Functions para el valor: ".concat(value));
            }

        }
        return campoValidado;
    }

    public static double validarCampoDoubleROE(String value) {
        double campoValidado = 0;
        if (value != null) {
            try {
                if (!value.trim().equals("")) {
                    if (value.trim().contains(".")) {
                        campoValidado = Double.parseDouble(value.trim().replace(",", ""));
                    } else {
                        campoValidado = Double.parseDouble("0." + value.trim());
                    }

                } else {
                    campoValidado = 0;
                }
            } catch (NumberFormatException e) {
                campoValidado = 0;
                System.out.println("Error en método validarCampoDouble de Functions para el valor: ".concat(value));
            }

        }
        return campoValidado;
    }

    public static String format(String s) {
        if (s == null) {
            s = "";
        }
        s = s.trim();
        return s.length() > 0 ? s : "&nbsp;";
    }

    public static String[] obtenerMesgErrorProrrateo(int cod) {

        String msg = "", txt = "", txtNuc = "txtFare";
        String[] lista = new String[3];
        try {

            switch (cod) {
                case 1:
                    msg = "Invalid Issue Date. This must be YYYMMDD.";
                    txt = "txtSaleDate";
                    break;
                case 2:
                    msg = "Invalid Flight Date. This must be YYYYMMDD.";
                    txt = "txtFlightDate";
                    break;
                case 3:
                    msg = "Invalid Flight Date. This must be less than Billing Date.";
                    txt = "txtFlightDate";
                    break;
                case 4:
                    msg = "Invalid Issue Date. This must be less than Billing Date.";
                    txt = "txtSaleDate";
                    break;
                case 5:
                    msg = "Invalid Issue Date. This must be less than Current Date.";
                    txt = "txtSaleDate";
                    break;
                case 6:
                    msg = "Invalid Flight Date. This must be less than Current Date.";
                    txt = "txtFlightDate";
                    break;
                case 7:
                    msg = "Invalid Issue Date. This must be less than Flight Date.";
                    txt = "txtSaleDate";
                    break;
                case 8:
                    msg = "Invalid [ATBP]. Format Error.";
                    txt = "txtATBP";
                    break;
                case 9:
                    msg = "[ATBP] should not be zero if [IT] is empty or has spaces.";
                    txt = "txtATBP";
                    break;
                case 10:
                    msg = "Invalid [ATBP CURRENCY].";
                    txt = "cmbFCURR";
                    break;
                case 11:
                    msg = "Invalid [CURRENCY FARE]. Currency doesn't exists.";
                    txt = "NUCROE";
                    txtNuc = "txtFCurr";
                    break;
                case 12:
                    msg = "Invalid [CURRENCY PAYMENT]. Currency doesn't exists.";
                    txt = "NUCROE";
                    txtNuc = "txtEqvFCurr";
                    break;
                case 13:
                    msg = "Invalid Rate. Is not recorded in table 51.";
                    txt = "txtCOMISP";
                    break;
                case 14:
                    msg = "Invalid [FARE BASIS].";
                    txt = "txtBase";
                    break;
                case 15:
                    msg = "Invalid [LON-HOUL] or [FARE BASIS]. Doesn't exists.";
                    txt = "txtBase";
                    break;
                case 16:
                    msg = "Invalid [STOPOVER PERCENTAGE]. Format Error.";
                    txt = "txtStopover02";
                    break;
                case 17:
                    msg = "Invalid [STOPOVER AMOUNT]. Format Error.";
                    txt = "txtStopover01";
                    break;
                case 18:
                    msg = "You must entered a Stopover amount.";
                    txt = "txtStopover01";
                    break;
                case 19:
                    msg = "Invalid [PLUS AMOUNT]. Format Error.";
                    txt = "txtPlusC";
                    break;
                case 20:
                    msg = "Invalid [PLUS]. It must be 'N' or 'S'.";
                    txt = "txtPlusI";
                    break;
                case 21:
                    msg = "Invalid [ISSUE PLACE]. City doesn't exists.";
                    txt = "txtIssuePlace";
                    break;
                case 22:
                    msg = "Invalid [SALE PLACE]. City doesn't exists.";
                    txt = "txtSellingPlace";
                    break;
                case 23:
                    msg = "Invalid [JOURNEY INIT PLACE]. City doesn't exists.";
                    txt = "txtJourney";
                    break;
                case 24:
                    msg = "Invalid [SECTOR]. Cities doesn't exists.";
                    txt = "txtSectores";
                    break;
                case 30:
                    msg = "Invalid [X/O]. Values allowed : 'X' ,'O' and space.";
                    txt = "X0";
                    break;
                case 31:
                    msg = "Invalid [ROUTING]. The city of origin and destination can not be the same.";
                    txt = "FT0";
                    break;
                case 32:
                    msg = "Invalid [ROUTING]. One of the cities doesn't exists.";
                    txt = "FT0";
                    break;
                case 33:
                    msg = "Invalid [CARRIER].";
                    txt = "CR0";
                    break;
                case 34:
                    msg = "Invalid [ROUTING].Prorrate Sector not found.";
                    txt = "FT0";
                    break;
            }

            lista[0] = msg;
            lista[1] = txt;
            lista[2] = txtNuc;

        } catch (Exception e) {
            lista[0] = "An error ocurred. Please contact our System Department.";
            lista[1] = "txtSaleDate";
            lista[2] = "txtFare";
            e.printStackTrace();
        }
        return lista;
    }

    public static double redondear(double numero, int decimales) {
        return Math.round(numero * Math.pow(10, decimales)) / Math.pow(10, decimales);
    }

    public static void ValidarSectoresEstilos(ProrateHeader data) {
        //Contando si hay + de una ruta q coincida con el sector a prorratear
        //Y guardando las posiciones respectivas.
        try {

            int[] lstPosSectores = new int[5];
            int cont = 0;
            boolean igualCupon = false;
            for (int x = 0; x < data.getSECTORS().size(); x++) {
                if (data.getSECTORS().get(x).getStrEsSector().equals("todo")) {
                    lstPosSectores[cont] = x;
                    cont++;
                    if (x == Integer.parseInt(data.getStrA728CUPON().trim())) {
                        igualCupon = true;
                    }
                }
            }
            if (cont > 1) {
                //Hallando si el numero de Cupon esta dentro de las rutas encontradas
                if (igualCupon) {
                    //Recorre el Routing y si es diferente del cupon entonces lo limpia.
                    for (int x = 0; x < cont; x++) {
                        if (lstPosSectores[x] != Integer.parseInt(data.getStrA728CUPON().trim())) {
                            data.getSECTORS().get(lstPosSectores[x] - 1).setStrEsSector("");
                            data.getSECTORS().get(lstPosSectores[x]).setStrEsSector("");
                        }
                    }
                } else {
                    //Si no lo encuentra, recorre el Routing y limpia todo menos el ultimo.
                    for (int x = 0; x < cont - 1; x++) {
                        data.getSECTORS().get(lstPosSectores[x] - 1).setStrEsSector("");
                        data.getSECTORS().get(lstPosSectores[x]).setStrEsSector("");
                    }
                }
            }

        } catch (Exception e) {
            System.out.println("Error al recorrer lista de sectores. ProrateInteractiveServlet. : " + e.getMessage());
        }

    }

    public static String mensajesdeError(String msgOriginal) {

        if (msgOriginal.trim().toUpperCase().contains("ST.") && msgOriginal.trim().toUpperCase().contains("9D")) {
            return "The register is being used, please try again later.";
        } else if (msgOriginal.trim().toUpperCase().contains("*PRO9500- ERROR/FILE:")) {
            return "DANGER ERROR: ERROR/FILE. PLEASE CONTACT OUR OFFICE SYSTEM. Detail: ".concat(msgOriginal.trim());
        } else {
            return msgOriginal.trim();
        }
    }

    public static void actualizarCamposA020_Prod(ProrateHeader prorateData) {

        //Calculando Valores A020
        prorateData.setDblA020REDEBI(prorateData.getDblA020SUDEBI() - prorateData.getDblA020ACEPTA());
        if (prorateData.getDblA020COMISIP() > 0) {
            prorateData.setDblA020IMPINT((prorateData.getDblA020COMISIP() * prorateData.getDblA020ACEPTA()) / 100);
        } else {
            prorateData.setDblA020IMPINT(0);
        }
        prorateData.setDblA020COMISI(prorateData.getDblA020IMPNAC() - prorateData.getDblA020IMPINT());
        if (prorateData.getStrA020TCALC().trim().equals("R") || prorateData.getStrA020TCALC().trim().equals("L")) {
            prorateData.setDblA020TAX(prorateData.getDblA020TOTHAB() - prorateData.getDblA020TOTDEB());
        } else {
            prorateData.setDblA020TAX(prorateData.getDblA020TOTDEB() - prorateData.getDblA020TOTHAB());
        }

        if (prorateData.getDblA020TAX() < prorateData.getDblVALMINIMOTAX()
                && prorateData.getDblA020REDEBI() < prorateData.getDblVALMINIMOTARIFA()
                && prorateData.getDblA020ANALIZ() >= prorateData.getDblA020COMISIP()) {
            prorateData.setDblA020NETO(0);
        } else {

            // <editor-fold defaultstate="collapsed" desc="Antiguas Validaciones">
            /*double redebi = 0, comisi = 0, tax = 0;
             // Aplicacion de Neto propuesto x Interlinea (R.T)
             if (prorateData.getA020COMISI() < 0) {
             //this.A020COMISI = 0;
             comisi = 0;
             } else {
             comisi = prorateData.getA020COMISI();
             }
             if (prorateData.getA020REDEBI() < prorateData.getVALMINIMOTARIFA()) {
             redebi = 0;
             } else {
             redebi = prorateData.getA020REDEBI();
             }
             if (prorateData.getA020TAX() < prorateData.getVALMINIMOTAX()) {
             tax = 0;
             } else {
             tax = prorateData.getA020TAX();
             }
             if (prorateData.getA020ANALIZ() > prorateData.getA020COMISP()) {
             double netoTemp = prorateData.getA020REDEBI() - prorateData.getA020COMISI();
             if (netoTemp < prorateData.getVALMINIMOTARIFA()) {
             redebi = 0;
             comisi = 0;
             }
             }
             prorateData.setA020NETO((redebi - comisi) + tax);*/
            //</editor-fold>
            prorateData.setDblA020NETO(0);
            double tax = 0, neto = 0, comisi = 0;
            if (prorateData.getDblA020TAX() < prorateData.getDblVALMINIMOTAX()) {
                tax = 0;
            } else {
                tax = prorateData.getDblA020TAX();
                prorateData.setDblA020NETO(prorateData.getDblA020NETO() + prorateData.getDblA020TAX());
            }
            //Se resetea los valores del COMISI porque no hay rechazo x monto minimo de ISC.
            /*if (prorateData.getA020REDEBI()< prorateData.getVALMINIMOTARIFA() &&
             prorateData.getA020COMISI() >=-0.99 && prorateData.getA020COMISI() <=0.99) {
             comisi = 0;
             } else {
             comisi = prorateData.getA020COMISI();
             }*/
            comisi = prorateData.getDblA020COMISI();
            neto = (prorateData.getDblA020REDEBI() - comisi) + tax;
            if (prorateData.getDblA020REDEBI() >= prorateData.getDblVALMINIMOTARIFA()) {
                if (neto > 0) {
                    prorateData.setDblA020NETO(prorateData.getDblA020NETO() + (prorateData.getDblA020REDEBI() - prorateData.getDblA020COMISI()));
                }
            } else {
                if (neto > 0 && prorateData.getDblA020ANALIZ() < prorateData.getDblA020COMISIP()) {
                    prorateData.setDblA020NETO(prorateData.getDblA020NETO() + (prorateData.getDblA020IMPINT() - prorateData.getDblA020IMPNAC()));
                }
            }

            /*if (prorateData.getA020ANALIZ() > prorateData.getA020COMISP()) {
             double netoTemp = prorateData.getA020REDEBI() - prorateData.getA020COMISI();
             if (netoTemp < prorateData.getVALMINIMOTARIFA()) {
             prorateData.setA020NETO(tax);
             }
             }*/
        }
    }

    public static void prepararComentariosParaPresentar(ProrateHeader data) {

        RECA021 comentario = null;
        RECA021List lstComentarios = new RECA021List();

        if (data.getStrA020CODOB1() != null && !data.getStrA020CODOB1().trim().equals("")) {
            comentario = new RECA021();
            comentario.strCodigo = data.getStrA020CODOB1().trim();
            comentario.strConcept = data.getStrA021CONCEP01();
            comentario.strComentario1 = data.getStrA020COMME1();
            if (data.getStrA020CODOB2() == null || data.getStrA020CODOB2().trim().equals("")) {
                comentario.strComentario2 = data.getStrA020COMME2();
            } else {
                comentario.strComentario2 = "";
            }
            lstComentarios.add(comentario);

        }
        if (data.getStrA020CODOB2() != null && !data.getStrA020CODOB2().trim().equals("")) {
            comentario = new RECA021();
            comentario.strCodigo = data.getStrA020CODOB2().trim();
            comentario.strConcept = data.getStrA021CONCEP02();
            comentario.strComentario1 = data.getStrA020COMME2();
            if (data.getStrA020CODOB3() == null || data.getStrA020CODOB3().trim().equals("")) {
                comentario.strComentario2 = data.getStrA020COMME3();
            } else {
                comentario.strComentario2 = "";
            }
            lstComentarios.add(comentario);

        }
        if (data.getStrA020CODOB3() != null && !data.getStrA020CODOB3().trim().equals("")) {
            comentario = new RECA021();
            comentario.strCodigo = data.getStrA020CODOB3().trim();
            comentario.strConcept = data.getStrA021CONCEP03();
            comentario.strComentario1 = data.getStrA020COMME3();
            if (data.getStrA020CODOB4() == null || data.getStrA020CODOB4().trim().equals("")) {
                comentario.strComentario2 = data.getStrA020COMME4();
            } else {
                comentario.strComentario2 = "";
            }
            lstComentarios.add(comentario);

        }
        if (data.getStrA020CODOB4() != null && !data.getStrA020CODOB4().trim().equals("")) {
            comentario = new RECA021();
            comentario.strCodigo = data.getStrA020CODOB4().trim();
            comentario.strConcept = data.getStrA021CONCEP04();
            comentario.strComentario1 = data.getStrA020COMME4();
            if (data.getStrA020CODOB5() == null || data.getStrA020CODOB5().trim().equals("")) {
                comentario.strComentario2 = data.getStrA020COMME5();
            } else {
                comentario.strComentario2 = "";
            }
            lstComentarios.add(comentario);

        }
        if (data.getStrA020CODOB5() != null && !data.getStrA020CODOB5().trim().equals("")) {
            comentario = new RECA021();
            comentario.strCodigo = data.getStrA020CODOB5().trim();
            comentario.strConcept = data.getStrA021CONCEP05();
            comentario.strComentario1 = data.getStrA020COMME5();
            comentario.strComentario2 = data.getStrA020COMME6();
            lstComentarios.add(comentario);
        }
        //Limpiando los campos A020
        limpiarCamposA020Comentarios(data);

        //Volver a colocar los comentarios en data, pero con un nuevo formato,
        //para presentación.
        for (int i = 0; i < lstComentarios.size(); i++) {
            colocarComentarios(data, lstComentarios.getRECA021(i));
        }

    }

    public static void limpiarCamposA020Comentarios(ProrateHeader data) {
        try {

            data.setStrA020CODOB1("");
            data.setStrA020CODOB2("");
            data.setStrA020CODOB3("");
            data.setStrA020CODOB4("");
            data.setStrA020CODOB5("");
            data.setStrA020COMME1("");
            data.setStrA020COMME2("");
            data.setStrA020COMME3("");
            data.setStrA020COMME4("");
            data.setStrA020COMME5("");
            data.setStrA020COMME6("");
            data.setStrA020COMME7("");
            data.setStrA020COMME8("");
            data.setStrA020COMME9("");
            data.setStrA020COMME10("");
            data.setStrA021CONCEP01(" ");
            data.setStrA021CONCEP02(" ");
            data.setStrA021CONCEP03(" ");
            data.setStrA021CONCEP04(" ");
            data.setStrA021CONCEP05(" ");

        } catch (Exception e) {
            System.out.println("Error en el método LimpiarCamposA020Comentarios :  Functions TW : " + e.getMessage());
        }
    }

    public static void colocarComentariosSubPro(SubProrateHeader data, RECA021 comentario) {

        if (data.getA020CODOB1() == null || data.getA020CODOB1().trim().equals("")) {
            data.setA020CODOB1(comentario.strCodigo);
            data.setA021CONCEP01(comentario.strConcept);
            data.setA020COMME1(comentario.strComentario1);
            data.setA020COMME2(comentario.strComentario2);
        } else if ((data.getA020CODOB2() == null || data.getA020CODOB2().trim().equals(""))
                && (data.getA020COMME2() == null || data.getA020COMME2().trim().equals(""))) {
            data.setA020CODOB2(comentario.strCodigo);
            data.setA021CONCEP02(comentario.strConcept);
            data.setA020COMME2(comentario.strComentario1);
            data.setA020COMME3(comentario.strComentario2);
        } else if ((data.getA020CODOB3() == null || data.getA020CODOB3().trim().equals(""))
                && (data.getA020COMME3() == null || data.getA020COMME3().trim().equals(""))) {
            data.setA020CODOB3(comentario.strCodigo);
            data.setA021CONCEP03(comentario.strConcept);
            data.setA020COMME3(comentario.strComentario1);
            data.setA020COMME4(comentario.strComentario2);
        } else if ((data.getA020CODOB4() == null || data.getA020CODOB4().trim().equals(""))
                && (data.getA020COMME4() == null || data.getA020COMME4().trim().equals(""))) {
            data.setA020CODOB4(comentario.strCodigo);
            data.setA021CONCEP04(comentario.strConcept);
            data.setA020COMME4(comentario.strComentario1);
            data.setA020COMME5(comentario.strComentario2);
        } else if ((data.getA020CODOB5() == null || data.getA020CODOB5().trim().equals(""))
                && (data.getA020COMME5() == null || data.getA020COMME5().trim().equals(""))) {
            data.setA020CODOB5(comentario.strCodigo);
            data.setA021CONCEP05(comentario.strConcept);
            data.setA020COMME5(comentario.strComentario1);
            data.setA020COMME6(comentario.strComentario2);
        } else {
            data.setA020COMME6(comentario.strComentario1);
        }

    }

    public static void colocarComentarios(ProrateHeader data, RECA021 comentario) {

        if (data.getStrA020CODOB1() == null || data.getStrA020CODOB1().trim().equals("")) {
            data.setStrA020CODOB1(comentario.strCodigo);
            data.setStrA021CONCEP01(fillString(comentario.strConcept, 1));
            data.setStrA020COMME1(comentario.strComentario1);
            data.setStrA020COMME2(comentario.strComentario2);
        } else if ((data.getStrA020CODOB2() == null || data.getStrA020CODOB2().trim().equals(""))
                && !data.getStrA020CODOB1().trim().equals(comentario.strCodigo.trim())) {
            data.setStrA020CODOB2(comentario.strCodigo);
            data.setStrA021CONCEP02(fillString(comentario.strConcept, 1));
            data.setStrA020COMME3(comentario.strComentario1);
            data.setStrA020COMME4(comentario.strComentario2);
        } else if ((data.getStrA020CODOB3() == null || data.getStrA020CODOB3().trim().equals(""))
                && !data.getStrA020CODOB1().trim().equals(comentario.strCodigo.trim())
                && !data.getStrA020CODOB2().trim().equals(comentario.strCodigo.trim())) {
            data.setStrA020CODOB3(comentario.strCodigo);
            data.setStrA021CONCEP03(fillString(comentario.strConcept, 1));
            data.setStrA020COMME5(comentario.strComentario1);
            data.setStrA020COMME6(comentario.strComentario2);
        } else if ((data.getStrA020CODOB4() == null || data.getStrA020CODOB4().trim().equals(""))
                && !data.getStrA020CODOB1().trim().equals(comentario.strCodigo.trim())
                && !data.getStrA020CODOB2().trim().equals(comentario.strCodigo.trim())
                && !data.getStrA020CODOB3().trim().equals(comentario.strCodigo.trim())) {
            data.setStrA020CODOB4(comentario.strCodigo);
            data.setStrA021CONCEP04(fillString(comentario.strConcept, 1));
            data.setStrA020COMME7(comentario.strComentario1);
            data.setStrA020COMME8(comentario.strComentario2);
        } else if ((data.getStrA020CODOB5() == null || data.getStrA020CODOB5().trim().equals(""))
                && !data.getStrA020CODOB1().trim().equals(comentario.strCodigo.trim())
                && !data.getStrA020CODOB2().trim().equals(comentario.strCodigo.trim())
                && !data.getStrA020CODOB3().trim().equals(comentario.strCodigo.trim())
                && !data.getStrA020CODOB4().trim().equals(comentario.strCodigo.trim())) {
            data.setStrA020CODOB5(comentario.strCodigo);
            data.setStrA021CONCEP05(fillString(comentario.strConcept, 1));
            data.setStrA020COMME9(comentario.strComentario1);
            data.setStrA020COMME10(comentario.strComentario2);
        }
    }

    // Para Control de Producción ==============================================
    // =========================================================================
    // (REVISAR)
    public static int getDayOfTheWeek(String date) {

        /*
         * Retorna:
         * 1: Domingo   2: Lunes    3: Martes   4: Miercoles
         * 5: Jueves    6: Viernes  7: Sábado
         */
        GregorianCalendar cal = new GregorianCalendar();
        SimpleDateFormat formato = new SimpleDateFormat("yyyyMMdd");
        try {
            Date fecha = formato.parse(date);
            cal.setTime(fecha);
        } catch (Exception e) {
        }
        return cal.get(Calendar.DAY_OF_WEEK);
    }

    public static String rest1MonthtoDate(String strDate, String strFormato) {
        //strFormato = yyyyMMdd o yyyyMM
        String strValue = "";
        try {
            GregorianCalendar calendar = new GregorianCalendar();
            SimpleDateFormat formato = new SimpleDateFormat(strFormato);
            Date fechaInicial = formato.parse(strDate);
            calendar.setTime(fechaInicial);
            calendar.add(Calendar.MONTH, -1);
            Date fechaFinal = calendar.getTime();
            strValue = formato.format(fechaFinal);

        } catch (Exception e) {
        }
        return strValue;
    }

    public static String restBetween2Hours(String hora1, String hora2) {
        //Resta hora 1 - hora 2 (Formatos válidos: HHMMSS o HHMM)
        //Devuelve HHMMSS

        boolean flagNega = false;
        hora1 = fillZeros(6, hora1.replace("-", ""));
        hora2 = fillZeros(6, hora2.replace("-", ""));

        if (hora1.startsWith("-") || hora2.startsWith("-")) {
            flagNega = true;
        }

        String segRest = hora1.substring(4, 6);
        int minutos1 = 0, minutos2 = 0;
        int horas1 = 0, horas2 = 0;

        if (hora1.length() > 6) {
            minutos1 = Integer.parseInt(hora1.substring(hora1.length() - 4, hora1.length() - 2));
            minutos2 = Integer.parseInt(hora2.substring(hora2.length() - 4, hora2.length() - 2));
            horas1 = Integer.parseInt(hora1.substring(0, hora1.length() - 4));
            horas2 = Integer.parseInt(hora2.substring(0, hora2.length() - 4));
        } else {
            minutos1 = Integer.parseInt(hora1.substring(2, 4));
            minutos2 = Integer.parseInt(hora2.substring(2, 4));
            horas1 = Integer.parseInt(hora1.substring(0, 2));
            horas2 = Integer.parseInt(hora2.substring(0, 2));
        }

        long strValue;
        String horaFinal = "";

        horas1 = horas1 * 60; //Transformando a minutos.
        horas2 = horas2 * 60;

        strValue = (horas1 + minutos1) - (horas2 + minutos2);
        boolean flag = false;

        if (strValue < 0) {
            strValue = strValue * -1;
            flag = true;
        }

        if (strValue >= 60) {
            long temp = 0;
            temp = strValue / 60;
            strValue = strValue - (temp * 60);
            horaFinal = fillZeros(2, String.valueOf(temp)) + fillZeros(2, String.valueOf(strValue)) + segRest;
        } else {
            horaFinal = strValue + segRest;
        }

        if (flag == true || flagNega == true) {
            horaFinal = "-" + fillZeros(6, horaFinal);
        } else {
            horaFinal = fillZeros(6, horaFinal);
        }

        return horaFinal;
    }

    public static String restBetween2Hours_2(String strHora1, String strHora2) {
        //Resta hora 1 - hora 2 (Formatos válidos: HHMMSS o HHMM)
        //Devuelve HHMMSS
        String value = "";

        try {
            Date hora1 = new SimpleDateFormat().parse("01/01/2013 " + strHora1);
            Date hora2 = new SimpleDateFormat().parse("01/01/2013 " + strHora2);
            long lantes = hora1.getTime();
            long lahora = hora2.getTime();
            long diferencia = (lahora - lantes);
            value = new java.text.SimpleDateFormat("hhmmss").format(new Date(diferencia));
        } catch (Exception e) {
            e.printStackTrace();
        }

        return value;
    }

    public static String restBetween2Hours(String horaDesde, String horaHasta, String fechaDesde, String fechaHasta) {

        //FORMATO HORA DESDE/HASTA : HHMMSS (aunque no esta tomando en cuenta los segundos)
        //FORMATO FECHA DESDE/HASTA : YYYYMMDD
        //Devuelve el resultado en HHMMSS
        long restaMinutos = 0, minutosAdicionales = 0, valorFinal = 0;
        String horaFinal = "";
        if (horaDesde.trim().equals("")) {
            horaDesde = "000000";
        }
        if (horaHasta.trim().equals("")) {
            horaHasta = "000000";
        }

        try {

            //Calculando la cantidad de dias transcurridos entre las dos fechas: ***
            int dias = restBetween2Dates(fechaDesde, fechaHasta);
            minutosAdicionales = 1440 * dias;
            //**********************************************************************

            if (horaDesde.startsWith("-")) {
                horaDesde = fillZeros(6, horaDesde.substring(1, horaDesde.length()));
            } else {
                horaDesde = fillZeros(6, horaDesde);
            }

            if (horaHasta.startsWith("-")) {
                horaHasta = fillZeros(6, horaHasta.substring(1, horaHasta.length()));
            } else {
                horaHasta = fillZeros(6, horaHasta);
            }

            int minutosD = 0, minutosH = 0;

            //Transformando todo a minutos *****************************************
            minutosD = (Integer.parseInt(horaDesde.substring(0, 2)) * 60) + Integer.parseInt(horaDesde.substring(2, 4));
            minutosH = (Integer.parseInt(horaHasta.substring(0, 2)) * 60) + Integer.parseInt(horaHasta.substring(2, 4));

            //Hallando la resta de las dos horas en minutos ************************
            restaMinutos = minutosH - minutosD;

            if (restaMinutos < 0) {
                valorFinal = minutosAdicionales - (restaMinutos * -1);
            } else {
                valorFinal = minutosAdicionales + restaMinutos;
            }

            if (valorFinal >= 60) {
                horaFinal = fillZeros(2, String.valueOf(valorFinal / 60)) + fillZeros(2, String.valueOf(valorFinal % 60)) + "00";
            } else {
                horaFinal = "00" + fillZeros(2, String.valueOf(valorFinal)) + "00";
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return horaFinal;
    }

    public static String convertirCadenaHoraASeg(String hora) {
        String resultado = "";
        try {

            hora = Functions.fillZeros(6, hora);
            //Transformando a Segundos
            long horaT = (Long.parseLong(hora.substring(0, hora.length() - 4)) * 60) * 60;
            long minT = Long.parseLong(hora.substring(hora.length() - 4, hora.length() - 2)) * 60;
            long segT = Long.parseLong(hora.substring(hora.length() - 2, hora.length()));

            resultado = String.valueOf(horaT + minT + segT);
        } catch (Exception e) {
            resultado = "ERROR";
            e.printStackTrace();
        }
        return resultado;
    }

    public static String convertir_HHMMSS(long seg) {
        String HHMMSS = "";

        try {
            long Temp = seg / 60;
            long segundosR = seg - (Temp * 60);
            if (Temp >= 60) {
                long Temp2 = Temp / 60;
                long minutosR = Temp - (Temp2 * 60);
                HHMMSS = Functions.fillZeros(2, String.valueOf(Temp2))
                        + Functions.fillZeros(2, String.valueOf(minutosR))
                        + Functions.fillZeros(2, String.valueOf(segundosR));
            } else {
                HHMMSS = "00"
                        + Functions.fillZeros(2, String.valueOf(Temp))
                        + Functions.fillZeros(2, String.valueOf(segundosR));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return HHMMSS;
    }

    public static String sumBetween2Hours(String hora1, String horaBase) {

        String horaSum = "";
        boolean flagNega = false;
        if (hora1.startsWith("-") || horaBase.startsWith("-")) {
            flagNega = true;
            //horaSum= fillZeros(6, hora1.substring(1, hora1.length()));
            //horaBase= fillZeros(6, horaBase.substring(1, horaBase.length()));
            horaSum = fillZeros(6, hora1.replace("-", ""));
            horaBase = fillZeros(6, horaBase.replace("-", ""));
        } else {
            horaSum = fillZeros(6, hora1);
            horaBase = fillZeros(6, horaBase);
        }
        //***************************************************************
        String segSum = horaSum.substring(4, 6);
        int minutosSum = Integer.parseInt(horaSum.substring(2, 4)), minutosBase = Integer.parseInt(horaBase.substring(2, 4));
        int horasSum = Integer.parseInt(horaSum.substring(0, 2)), horasBase = Integer.parseInt(horaBase.substring(0, 2));

        long strValue;
        String horaFinal = "";

        horasSum = horasSum * 60; //Transformando a minutos.
        horasBase = horasBase * 60;

        strValue = horasSum + minutosSum + horasBase + minutosBase;
        long temp = 0;
        if (strValue >= 60) {
            temp = strValue / 60;
            strValue = strValue - (temp * 60);
            horaFinal = fillZeros(2, String.valueOf(temp)) + fillZeros(2, String.valueOf(strValue)) + segSum;
        } else {
            horaFinal = strValue + segSum;
        }
        if (flagNega == true) {
            horaFinal = "-" + fillZeros(6, horaFinal);
        } else {
            horaFinal = fillZeros(6, horaFinal);
        }
        return horaFinal;
    }

    public static String restBetween2Hours_enMinutos(String hora1, String horaBase) {
        String horaFinal = "";

        try {
            hora1 = fillZeros(6, hora1.trim().replace("-", ""));
            horaBase = fillZeros(6, horaBase.trim().replace("-", ""));
            int minutosRest = Integer.parseInt(hora1.substring(2, 4)), minutosBase = Integer.parseInt(horaBase.substring(2, 4));
            int horasRest = Integer.parseInt(hora1.substring(0, 2)), horasBase = Integer.parseInt(horaBase.substring(0, 2));
            long strValue;

            horasRest = horasRest * 60; //Transformando a minutos.
            horasBase = horasBase * 60;

            strValue = (horasRest + minutosRest) - (horasBase + minutosBase);
            horaFinal = String.valueOf(strValue);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return horaFinal;
    }

    public static String convertir_a_HHMM(String minutos) {
        long min = Long.parseLong(minutos);
        long temp = 0;
        long strValue = 0;
        String horaFinal = "";
        if (min >= 60) {
            temp = min / 60;
            strValue = min - (temp * 60);
            horaFinal = fillZeros(2, String.valueOf(temp)) + fillZeros(2, String.valueOf(strValue)) + "00";
        } else {
            horaFinal = "00" + min + "00";
        }

        return horaFinal;
    }

    public static long restBetween2Hours_enMinutos_Long(String hora1, String horaBase) {
        long horaFinal = 0;

        try {
            hora1 = fillZeros(6, hora1.trim().replace("-", ""));
            horaBase = fillZeros(6, horaBase.trim().replace("-", ""));
            int minutosRest = Integer.parseInt(hora1.substring(2, 4)), minutosBase = Integer.parseInt(horaBase.substring(2, 4));
            int horasRest = Integer.parseInt(hora1.substring(0, 2)), horasBase = Integer.parseInt(horaBase.substring(0, 2));
            long strValue;

            horasRest = horasRest * 60; //Transformando a minutos.
            horasBase = horasBase * 60;

            strValue = (horasRest + minutosRest) - (horasBase + minutosBase);
            horaFinal = strValue;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return horaFinal;
    }
    // =========================================================================
    // =========================================================================

    public static String FormatearFecha(String strFecha, String strFormatoEntrada) {
        String strFechaResult = "";
        //Método para pasar fecha de un formato X a formato yyyyMMdd.

        try {
            //Ej. formatos: dd/MM/yyyy * ddMMyy * yyyyMMdd * yyMMdd * ddMMMyyyy * dd-MM-yyyy * yyyy-MM-dd
            DateFormat formatter = new SimpleDateFormat(strFormatoEntrada);
            Date date = (Date) formatter.parse(strFecha);
            SimpleDateFormat formato = new SimpleDateFormat("yyyyMMdd");
            strFechaResult = formato.format(date);
        } catch (ParseException e) {
            strFechaResult = "";
            e.printStackTrace();
        }
        return strFechaResult;
    }

    public static String FormatFecha(String strFecha, String strFormatoEntrada, String strFormatoSalida) {
        String strFechaResult = "";
        //Método para pasar fecha de un formato X a formato Y.

        try {
            if (!strFecha.isEmpty()) {
                //Ej. formatos: dd/MM/yyyy * ddMMyy * yyyyMMdd * yyMMdd * ddMMMyyyy * dd-MM-yyyy * yyyy-MM-dd
                DateFormat formatter = new SimpleDateFormat(strFormatoEntrada);
                Date date = (Date) formatter.parse(strFecha);
                SimpleDateFormat formato = new SimpleDateFormat(strFormatoSalida);
                strFechaResult = formato.format(date);
            }

        } catch (ParseException e) {
            strFechaResult = "";
            e.printStackTrace();
        }
        return strFechaResult;
    }

    public static String cleanCityandCountryAgent(String parametro) {
        String valor_encontrado = "";
        //CITY
        valor_encontrado = parametro;
        if (valor_encontrado.contains("-")) {
            valor_encontrado = valor_encontrado.substring(0, valor_encontrado.indexOf("-")).trim();
        } else if (valor_encontrado.contains("/")) {
            valor_encontrado = valor_encontrado.substring(0, valor_encontrado.indexOf("/")).trim();
        } else if (valor_encontrado.contains(",")) {
            valor_encontrado = valor_encontrado.substring(0, valor_encontrado.indexOf(",")).trim();
            if (valor_encontrado.length() > 25) {
                valor_encontrado = valor_encontrado.substring(0, 25).trim();
            }
        } else if (valor_encontrado.contains("(")) {
            valor_encontrado = valor_encontrado.substring(0, valor_encontrado.indexOf("(") - 1).trim();
        } else if (valor_encontrado.length() > 25) {
            valor_encontrado = valor_encontrado.substring(0, 25).trim();
        }

        return valor_encontrado;
    }

    public static int formatHashMap(Object objeto) {
        return Integer.parseInt(objeto.toString().replace(",", ""));
    }

    public static double formatHashMapDouble(Object objeto) {
        return Double.parseDouble(objeto.toString().replace(",", ""));
    }

    public static double formatStringZerosToDecimal(String VALOR) {
        double decimal = 0.0;
        try {
            for (int i = 0; i < VALOR.length(); i++) {

                if (VALOR.charAt(1) == '0' && VALOR.charAt(i + 1) != '0') {
                    //CONVERTIR VALOR STRING TO DECIMAL
                    String NEW_VALOR = VALOR.substring(i + 1);
                    decimal = Double.parseDouble(formatearDecimalIDEC(NEW_VALOR));
                    return decimal;
                }
            }
        } catch (Exception e) {
            decimal = 0.0;
        }

        return decimal;
    }

    public static String formatearDecimalIDEC(String valor) {
        try {
            StringBuilder sb = new StringBuilder();
            sb.append(valor.substring(0, valor.length() - 2));
            sb.append(".");
            sb.append(valor.substring(valor.length() - 2));
            return sb.toString();
        } catch (Exception ex) {
            ex.printStackTrace();
            return "";
        }
    }

    public static String Valor_Letra(int valor) {

        String letra = "", Strvalor = String.valueOf(valor);

        ArrayList<HashMap<String, HashMap<String, String>>> LST_EBECEDIC = new ArrayList<HashMap<String, HashMap<String, String>>>();
        HashMap<String, HashMap<String, String>> MapEBECDIC;
        HashMap<String, String> MapASCII;

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "C1");
        MapASCII.put("ASCII", "A");
        MapEBECDIC.put("193", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "C2");
        MapASCII.put("ASCII", "B");
        MapEBECDIC.put("194", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "C3");
        MapASCII.put("ASCII", "A");
        MapEBECDIC.put("195", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "C4");
        MapASCII.put("ASCII", "D");
        MapEBECDIC.put("196", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "C5");
        MapASCII.put("ASCII", "E");
        MapEBECDIC.put("197", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "C6");
        MapASCII.put("ASCII", "F");
        MapEBECDIC.put("198", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "C7");
        MapASCII.put("ASCII", "G");
        MapEBECDIC.put("199", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "C8");
        MapASCII.put("ASCII", "H");
        MapEBECDIC.put("200", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "C9");
        MapASCII.put("ASCII", "I");
        MapEBECDIC.put("201", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "D1");
        MapASCII.put("ASCII", "J");
        MapEBECDIC.put("209", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "D2");
        MapASCII.put("ASCII", "K");
        MapEBECDIC.put("210", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "D3");
        MapASCII.put("ASCII", "L");
        MapEBECDIC.put("211", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "D4");
        MapASCII.put("ASCII", "M");
        MapEBECDIC.put("212", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "D5");
        MapASCII.put("ASCII", "N");
        MapEBECDIC.put("213", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "D6");
        MapASCII.put("ASCII", "O");
        MapEBECDIC.put("214", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "D7");
        MapASCII.put("ASCII", "P");
        MapEBECDIC.put("215", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "D8");
        MapASCII.put("ASCII", "Q");
        MapEBECDIC.put("216", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "D9");
        MapASCII.put("ASCII", "R");
        MapEBECDIC.put("217", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "E2");
        MapASCII.put("ASCII", "S");
        MapEBECDIC.put("226", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "E3");
        MapASCII.put("ASCII", "T");
        MapEBECDIC.put("227", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "E4");
        MapASCII.put("ASCII", "U");
        MapEBECDIC.put("228", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "E5");
        MapASCII.put("ASCII", "V");
        MapEBECDIC.put("229", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "E6");
        MapASCII.put("ASCII", "W");
        MapEBECDIC.put("230", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "E7");
        MapASCII.put("ASCII", "X");
        MapEBECDIC.put("231", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "E8");
        MapASCII.put("ASCII", "Y");
        MapEBECDIC.put("232", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        MapEBECDIC = new HashMap<String, HashMap<String, String>>(1);
        MapASCII = new HashMap<String, String>(2);
        MapASCII.put("EBECDIC", "E9");
        MapASCII.put("ASCII", "Z");
        MapEBECDIC.put("233", MapASCII);
        LST_EBECEDIC.add(MapEBECDIC);

        for (int i = 0; i < LST_EBECEDIC.size(); i++) {
            if (LST_EBECEDIC.get(i).containsKey(Strvalor)) {
                letra = LST_EBECEDIC.get(i).get(Strvalor).get("ASCII");
            }
        }

        return letra;
    }

    public static String searchCountryByCity(List listado_ciudades, String parametro/*, int opcion*/) {
        String valor_encontrado = "";
        for (int i = 0; i < listado_ciudades.size(); i++) {
            HashMap ciudad = (HashMap) listado_ciudades.get(i);

            if (ciudad.get("A1007CIUD") != null && parametro.equals(ciudad.get("A1007CIUD").toString())) {
                valor_encontrado = ciudad.get("A1007PAIS").toString().trim();
            }
        }
        return valor_encontrado;
    }

    public static String getNombreMes(String strDate) {

        if (strDate.trim().equals("01")) {
            return "JANUARY";
        } else if (strDate.trim().equals("02")) {
            return "FEBRUARY";
        } else if (strDate.trim().equals("03")) {
            return "MARCH";
        } else if (strDate.trim().equals("04")) {
            return "APRIL";
        } else if (strDate.trim().equals("05")) {
            return "MAY";
        } else if (strDate.trim().equals("06")) {
            return "JUNE";
        } else if (strDate.trim().equals("07")) {
            return "JULY";
        } else if (strDate.trim().equals("08")) {
            return "AUGUST";
        } else if (strDate.trim().equals("09")) {
            return "SEPTEMBER";
        } else if (strDate.trim().equals("10")) {
            return "OCTOBER";
        } else if (strDate.trim().equals("11")) {
            return "NOVEMBER";
        } else if (strDate.trim().equals("12")) {
            return "DECEMBER";
        } else {
            return "Error";
        }

    }

    public static String getNombreMesEsp(String strDate) {

        if (strDate.trim().equals("01")) {
            return "Enero";
        } else if (strDate.trim().equals("02")) {
            return "Febrero";
        } else if (strDate.trim().equals("03")) {
            return "Marzo";
        } else if (strDate.trim().equals("04")) {
            return "Abril";
        } else if (strDate.trim().equals("05")) {
            return "Mayo";
        } else if (strDate.trim().equals("06")) {
            return "Junio";
        } else if (strDate.trim().equals("07")) {
            return "Julio";
        } else if (strDate.trim().equals("08")) {
            return "Agosto";
        } else if (strDate.trim().equals("09")) {
            return "Septiembre";
        } else if (strDate.trim().equals("10")) {
            return "Octubre";
        } else if (strDate.trim().equals("11")) {
            return "Noviembre";
        } else if (strDate.trim().equals("12")) {
            return "Diciembre";
        } else {
            return "Error";
        }

    }

    public static String getNombreZonas(String cod) {

        HashMap<String, String> hm = new HashMap<String, String>();
        /*hm.put("ASI", "ASIA");
         hm.put("CAN", "CANADA");
         hm.put("CAR", "CARIBE");
         hm.put("CAM", "CENTROAMERICA");
         hm.put("USA", "ESTADOS UNIDOS");
         hm.put("EUR", "EUROPA");
         hm.put("FRO", "FRONTERA");
         hm.put("LOC", "LOCAL");
         hm.put("PLA", "PLAYA");
         hm.put("SUD", "SUDAMERICA");
         hm.put("OCE", "OCEANIA");
         hm.put("AFR", "AFRICA");*/
        //Cambiado a Inglés a pedido de MPH 20161119
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBBEAN");
        hm.put("CAM", "CENTRAL AMERICA");
        hm.put("USA", "UNITED STATES");
        hm.put("EUR", "EUROPE");
        hm.put("FRO", "BORDER");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "BEACH");
        hm.put("SUD", "SOUTH AMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");

        if (hm.containsKey(cod)) {
            return hm.get(cod).toString();
        } else {
            return "";
        }
    }

    public static String getNombresGroupCode(String cod) {
        HashMap<String, String> hm = new HashMap<String, String>();
        hm.put("1", "Prime Source Code");
        hm.put("2", "Rejections Coupons");
        hm.put("3", "Rejections FIM's");
        hm.put("4", "Rejections Frequent Flyer");
        hm.put("5", "Billing Memo's");
        hm.put("6", "Sampling Related");
        hm.put("7", "Credit Memo");
        hm.put("8", "Optional Codes Bilateral");
        if (hm.containsKey(cod)) {
            return hm.get(cod).toString();
        } else {
            return "";
        }
    }

    public static void limpiarComentarios(A020Filter data) {
        try {

            data.A020CODOB1 = "";
            data.A020CODOB2 = "";
            data.A020CODOB3 = "";
            data.A020CODOB4 = "";
            data.A020CODOB5 = "";
            data.A020COMME1 = "";
            data.A020COMME2 = "";
            data.A020COMME3 = "";
            data.A020COMME4 = "";
            data.A020COMME5 = "";
            data.A020COMME6 = "";
            //data.setStrA020COMME7("");
            //data.setStrA020COMME8("");
            //data.setStrA020COMME9("");
            //data.setStrA020COMME10("");
            data.A021CONCEP1 = " ";
            data.A021CONCEP2 = " ";
            data.A021CONCEP3 = " ";
            data.A021CONCEP4 = " ";
            data.A021CONCEP5 = " ";

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void colocarComentarios(A020Filter data, A021 comentario) {

        if (data.A020CODOB1 == null || data.A020CODOB1.trim().equals("")) {
            data.A020CODOB1 = comentario.A021KEY;
            data.A021CONCEP1 = fillString(comentario.A021CONCEP, 1);
            data.A020COMME1 = comentario.A021COMEN1;
            data.A020COMME2 = comentario.A021COMEN2;
        } else if ((data.A020CODOB2 == null || data.A020CODOB2.trim().equals(""))
                && !data.A020CODOB1.trim().equals(comentario.A021KEY.trim())) {
            data.A020CODOB2 = comentario.A021KEY;
            data.A021CONCEP2 = fillString(comentario.A021CONCEP, 1);
            data.A020COMME3 = comentario.A021COMEN1;
            data.A020COMME4 = comentario.A021COMEN2;
        } else if ((data.A020CODOB3 == null || data.A020CODOB3.trim().equals(""))
                && !data.A020CODOB1.trim().equals(comentario.A021KEY.trim())
                && !data.A020CODOB2.trim().equals(comentario.A021KEY.trim())) {
            data.A020CODOB3 = comentario.A021KEY;
            data.A021CONCEP3 = fillString(comentario.A021CONCEP, 1);
            data.A020COMME5 = comentario.A021COMEN1;
            data.A020COMME6 = comentario.A021COMEN2;
        } else if ((data.A020CODOB4 == null || data.A020CODOB4.trim().equals(""))
                && !data.A020CODOB1.trim().equals(comentario.A021KEY.trim())
                && !data.A020CODOB2.trim().equals(comentario.A021KEY.trim())
                && !data.A020CODOB3.trim().equals(comentario.A021KEY.trim())) {
            data.A020CODOB4 = comentario.A021KEY;
            data.A021CONCEP4 = fillString(comentario.A021CONCEP, 1);
            //data.setStrA020COMME7(comentario.A021COMEN1);
            //data.setStrA020COMME8(comentario.A021COMEN2);
        } else if ((data.A020CODOB5 == null || data.A020CODOB5.trim().equals(""))
                && !data.A020CODOB1.trim().equals(comentario.A021KEY.trim())
                && !data.A020CODOB2.trim().equals(comentario.A021KEY.trim())
                && !data.A020CODOB3.trim().equals(comentario.A021KEY.trim())
                && !data.A020CODOB4.trim().equals(comentario.A021KEY.trim())) {
            data.A020CODOB5 = comentario.A021KEY;
            data.A021CONCEP5 = fillString(comentario.A021CONCEP, 1);
            //data.setStrA020COMME9(comentario.A021COMEN1);
            //data.setStrA020COMME10(comentario.A021COMEN2);
        }
    }

    public static void colocarComentariosA020(A020Filter data, A021 comentario) {

        if (data.A020CODOB1 == null || data.A020CODOB1.trim().equals("")) {
            data.A020CODOB1 = comentario.A021KEY;
            data.A020COMME1 = comentario.A021COMEN1;
            data.A020COMME2 = comentario.A021COMEN2;
        } else if ((data.A020CODOB2 == null || data.A020CODOB2.trim().equals(""))
                && (data.A020COMME2 == null || data.A020COMME2.trim().equals(""))) {
            data.A020CODOB2 = comentario.A021KEY;
            data.A020COMME2 = comentario.A021COMEN1;
            data.A020COMME3 = comentario.A021COMEN2;
        } else if ((data.A020CODOB3 == null || data.A020CODOB3.trim().equals(""))
                && (data.A020COMME3 == null || data.A020COMME3.trim().equals(""))) {
            data.A020CODOB3 = comentario.A021KEY;
            data.A020COMME3 = comentario.A021COMEN1;
            data.A020COMME4 = comentario.A021COMEN2;
        } else if ((data.A020CODOB4 == null || data.A020CODOB4.trim().equals(""))
                && (data.A020COMME4 == null || data.A020COMME4.trim().equals(""))) {
            data.A020CODOB4 = comentario.A021KEY;
            data.A020COMME4 = comentario.A021COMEN1;
            data.A020COMME5 = comentario.A021COMEN2;
        } else if ((data.A020CODOB5 == null || data.A020CODOB5.trim().equals(""))
                && (data.A020COMME5 == null || data.A020COMME5.trim().equals(""))) {
            data.A020CODOB5 = comentario.A021KEY;
            data.A020COMME5 = comentario.A021COMEN1;
            data.A020COMME6 = comentario.A021COMEN2;
        } else {
            data.A020COMME6 = comentario.A021COMEN1;
        }

    }

    public static String restBetween2HoursMinSeg(String horaBase, String hora1) {

        String horaRest = "000000";

        if (horaBase.trim().length() == 6 && hora1.trim().length() == 6) {
            String h1 = hora1.substring(0, 2), m1 = hora1.substring(2, 4), s1 = hora1.substring(4, 6);
            String hB = horaBase.substring(0, 2), mB = horaBase.substring(2, 4), sB = horaBase.substring(4, 6);

            int hourRes = 0, minRes = 0, segRes = 0;

            hourRes = Integer.parseInt(hB) - Integer.parseInt(h1);
            minRes = Integer.parseInt(mB) - Integer.parseInt(m1);
            segRes = Integer.parseInt(sB) - Integer.parseInt(s1);

            horaRest = Functions.fillZeros(2, String.valueOf(hourRes).replace("-", ""))
                    + Functions.fillZeros(2, String.valueOf(minRes).replace("-", ""))
                    + Functions.fillZeros(2, String.valueOf(segRes).replace("-", ""));
        }

        return horaRest;
    }

    public static String restBetween2HoursMinSeg_HF_HI(String horaFin, String horaInicio) {
        horaFin = horaFin.trim();
        horaInicio = horaInicio.trim();
        int resto = 0;
        String horafin = "", minfin = "", segfin = "";
        String ValorFinal = "000000";

        try {

            int horF = Integer.parseInt(horaFin.substring(0, 2)) * 3600;
            int minF = Integer.parseInt(horaFin.substring(2, 4)) * 60;

            int segundosFin = horF + minF + Integer.parseInt(horaFin.substring(4, 6));

            int horI = Integer.parseInt(horaInicio.substring(0, 2)) * 3600;
            int minI = Integer.parseInt(horaInicio.substring(2, 4)) * 60;

            int segundosInicio = horI + minI + Integer.parseInt(horaInicio.substring(4, 6));

            resto = segundosFin - segundosInicio;

            horafin = String.valueOf(resto / 3600);
            minfin = String.valueOf(resto / 60);
            segfin = String.valueOf(resto % 60);

            ValorFinal = Functions.fillZeros1(2, horafin) + Functions.fillZeros1(2, minfin) + Functions.fillZeros1(2, segfin);

        } catch (Exception e) {
            ValorFinal = "000000";
        }
        return ValorFinal;

    }

    public static String enmascararNumTarjeta(String strTarjVenta, String strTarjACCB) {

        String strNuevaTarjeta = "";
        try {
            if (!strTarjVenta.trim().isEmpty() && !strTarjACCB.trim().isEmpty()) {
                if (!strTarjVenta.contains("*") && !strTarjVenta.contains("X")) {
                    for (int i = 0; i < strTarjACCB.length(); i++) {
                        if ((i + 1) <= strTarjACCB.length()) {
                            if (strTarjACCB.substring(i, i + 1).equals("*") || strTarjACCB.substring(i, i + 1).equals("X")) {
                                strNuevaTarjeta += "*";
                            } else {
                                strNuevaTarjeta += strTarjVenta.substring(i, i + 1);
                            }
                        }
                    }
                } else {
                    //Ya esta enmascarada
                    strNuevaTarjeta = strTarjVenta;
                }
            } else if (!strTarjVenta.trim().isEmpty()) {
                if (!strTarjVenta.contains("*") && !strTarjVenta.contains("X")) {
                    strNuevaTarjeta = strTarjVenta.substring(0, 6) + "******" + strTarjVenta.substring(12);
                } else {
                    //Ya esta enmascarada
                    strNuevaTarjeta = strTarjVenta;
                }
            }
        } catch (Exception e) {
        }
        return strNuevaTarjeta;
    }

    public static String getStringWithSeparator(String strCadena, String separator, int cant) {

        String cad = strCadena.trim(), cadResult = "";
        int Cadsize = strCadena.trim().length();

        for (int x = 0; x < Cadsize; x++) {

            if (x % cant == 0 && x > 0) {
                cadResult += separator + cad.charAt(x);
            } else {
                cadResult += cad.charAt(x);
            }

        }

        return cadResult;
    }

    /**
     * Used to extract and return the extension of a given file.
     *
     * @param f Incoming file to get the extension of
     * @return <code>String</code> representing the extension of the incoming
     * file.
     */
    public static String getExtension(String f) {
        String ext = "";
        int i = f.lastIndexOf('.');

        if (i > 0 && i < f.length() - 1) {
            ext = f.substring(i + 1);
        }
        return ext;
    }

    public static String replaceUnkwonCaracters(String linea) {
        linea = linea.replace("/viewGeneralReportSearchAction.do?actualPage=1&amp;notReload=1", "");
        linea = linea.replace("Ã¡", "&aacute;").replace("Ã³", "&oacute;").replace("ï»¿", "").replace("Ã±", "n").replace("Ã©", "é");
        linea = linea.replace("Ãº", "ú").replace("Ã­", "í").replace("Ã?ltima", "Última").replace("CRÃ?DITO", "CRÉDITO");//.replace("País", "Pais");
        return linea.trim().replace("ó", "&oacute;").replace("ñ", "n").replace("Ú", "&uacute;").replace("ú", "&uacute;").replace("í", "&iacute;").replace("é", "&eacute;");
    }

}
