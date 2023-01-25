/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;


/**
 *
 * @author rmayta
 */
public class Util {

    public static final int TYPE_PAGE_QRY = 0;
    public static final int TYPE_PAGE_BGN = 1;
    public static final int TYPE_PAGE_PRV = 2;
    public static final int TYPE_PAGE_NXT = 3;
    public static final int TYPE_PAGE_END = 4;

    private HttpServletRequest httpServletRequest;
    
    public Util(){

    }

    public int totalPage(double total){
        int intReturn = 0;

        long longInteger = (long)total;
        double dblFraction = total - (double)longInteger;

        if(dblFraction > 0.0d){
            intReturn = (int)++longInteger;
        }else{
            intReturn = (int)longInteger;
        }

        return intReturn;
    }

    public static String cutFarecal(String strFARECAL){
        String strFARECALTemp = "";
        int intPos = 0;
        int intPosINI = 0;
        int intPosFIN = 0;
        strFARECALTemp = strFARECAL;
        if(strFARECALTemp != null) {
        while(intPos < strFARECALTemp.length()) {
            intPosFIN = strFARECALTemp.indexOf(" ",intPos);
            if(intPosFIN < 0) {
                intPosFIN = strFARECALTemp.length();
            }
            if(intPosFIN - intPos > 95){
                strFARECALTemp = strFARECALTemp.substring(0,intPos + 95) + " " + strFARECALTemp.substring(intPos + 95,strFARECALTemp.length());
                intPosINI = intPosINI + 96;
                intPos = intPosINI + 1;
            }else{
                intPosINI = intPosFIN;
                intPos = intPosINI + 1;
            }
        }
        }else{
            strFARECALTemp = "";
        }
        strFARECAL = strFARECALTemp;
        return strFARECAL;
    }


    public static String format(String s) {
        if (s==null) {
            s="";
        }
        s = s.trim();
        return s.length()>0? s : "&nbsp;";
    }

    public HashMap<String, String> processPage(int typePage, int amountDisplay, int totalPage, int page){
        HashMap<String, String> mapReturn = new HashMap<String, String>(2);
        mapReturn.put("RTN", "true");
        mapReturn.put("MSG", "");
        mapReturn.put("LIMIT", "0");
        mapReturn.put("PAGE", "0");

        // <editor-fold defaultstate="collapsed" desc="{...} PORCESS TYPE PAGE AND TOTAL PAGES DISPLAY">
        int limit = 0;

        switch(typePage){
            case TYPE_PAGE_QRY:
                limit = 0;
                page = 1;
                break;

            case TYPE_PAGE_BGN:
                limit = 0;
                page = 1;
                break;

            case TYPE_PAGE_PRV:
                if(totalPage >= (page - 1) && page != 1){
                    limit = ((page - 1) * amountDisplay) - amountDisplay;
                    page--;

                }else{
                    mapReturn.put("RTN", "false");
                    mapReturn.put("MSG", "This is the first page to display");
                }
                break;

            case TYPE_PAGE_NXT:
                if(totalPage >= (page + 1)){
                    limit = (page * amountDisplay);
                    page++;

                }else{
                    mapReturn.put("RTN", "false");
                    mapReturn.put("MSG", "This is the last page to display");
                }
                break;

            case TYPE_PAGE_END:
                if(totalPage > 0){
                    limit = ((totalPage - 1) * amountDisplay);
                    page = totalPage;

                }else{
                    mapReturn.put("RTN", "false");
                    mapReturn.put("MSG", "No pages were found to show");
                }
                break;

            default:
                mapReturn.put("RTN", "false");
                mapReturn.put("MSG", "Page Type Unknown: '" + typePage + "'");
        }
        
        mapReturn.put("LIMIT", Integer.toString(limit));
        mapReturn.put("PAGE", Integer.toString(page));
        // </editor-fold>

        return mapReturn;
    }

    public static String ucwords(String text){
        StringBuilder upperCasedWords = new StringBuilder(text.length());

        String[] word = text.split("\\s");

        for(int i = 0, l = word.length; i < l; ++i){

            if(i>0) upperCasedWords.append(" ");
            upperCasedWords.append(Character.toUpperCase(word[i].charAt(0))).append(word[i].substring(1));
        }

        return upperCasedWords.toString();
    }

    public static String getMonthAlfCode(int month){
        String strMonth = "";

        switch(month){
            case 1: strMonth = "JAN"; break;
            case 2: strMonth = "FEB"; break;
            case 3: strMonth = "MAR"; break;
            case 4: strMonth = "APR"; break;
            case 5: strMonth = "MAY"; break;
            case 6: strMonth = "JUN"; break;
            case 7: strMonth = "JUL"; break;
            case 8: strMonth = "AUG"; break;
            case 9: strMonth = "SEP"; break;
            case 10: strMonth = "OCT"; break;
            case 11: strMonth = "NOV"; break;
            case 12: strMonth = "DEC"; break;
            default:strMonth = "";
        }

        return strMonth = "";
    }

    public static boolean validateString(String text){
        boolean bolReturn = true;

        char[] listNumeric = new char[10];
        listNumeric[0] = '0';
        listNumeric[1] = '1';
        listNumeric[2] = '2';
        listNumeric[3] = '3';
        listNumeric[4] = '4';
        listNumeric[5] = '5';
        listNumeric[6] = '6';
        listNumeric[7] = '7';
        listNumeric[8] = '8';
        listNumeric[9] = '9';

        char letter;

        ForMain:
        for (int i = 0; i < text.length(); i++) {
            letter = text.charAt(i);

            for (int j = 0; j < listNumeric.length; j++) {
                if(letter == listNumeric[j]){
                    bolReturn = false;
                    break ForMain;
                }
            }
        }

        return bolReturn;
    }

    public static String toQueryString(Map<?, ?> data) throws UnsupportedEncodingException {
        StringBuilder queryString = new StringBuilder();

        for (Map.Entry<?, ?> pair : data.entrySet()){
            queryString.append(URLEncoder.encode((String)pair.getKey(), "UTF-8"));
            queryString.append("=");
            queryString.append(URLEncoder.encode((String)pair.getValue(), "UTF-8"));
            queryString.append("&");
        }

        if (queryString.length() > 0){
            queryString.deleteCharAt (queryString.length() - 1);
        }

        return queryString.toString();
    }

    public static String fillString(String field, int len) {
        if(field == null)
            field = "";
        for (int i=field.length();i<len;i++)
            field = field + " ";
        return field;

    }

    public static String fillZeros(int size, int value){
        return fillZeros(size, Integer.toString(value));
    }
    
    public static String fillZeros(int size, String value){
        for(int i=value.length();i<size;i++){
            value = "0" + value;
        }
        return value;
    }
    
     public static String fillZeros2(int size, String value){
        for(int i=value.length();i<size;i++){
            value = value + "0";
        }
        return value;
    }
    /**
     * Used to extract and return the extension of a given file.
     * @param f Incoming file to get the extension of
     * @return <code>String</code> representing the extension of the incoming
     *         file.
     */
    public static String getExtension(String f) {
        String ext = "";
        int i = f.lastIndexOf('.');

        if (i > 0 &&  i < f.length() - 1) {
            ext = f.substring(i+1);
        }
        return ext;
    }
    /**
     * Used to extract the filename without its extension.
     * @param f Incoming file to get the filename
     * @return <code>String</code> representing the filename without its
     *         extension.
     */
    public static String getFileName(String f) {
        String fname = "";
        int i = f.lastIndexOf('.');

        if (i > 0 &&  i < f.length() - 1) {
            fname = f.substring(0,i);
        }
        return fname;
    }

    public static void copyFile(File in, File out) throws Exception {
        FileInputStream fis  = new FileInputStream(in);
        FileOutputStream fos = new FileOutputStream(out);
        byte[] buf = new byte[1024];
        int i = 0;
        while((i=fis.read(buf))!=-1) {
            fos.write(buf, 0, i);
        }
        fis.close();
        fos.close();
    }

    public void setHttpServletRequest(HttpServletRequest httpServletRequest) {
        this.httpServletRequest = httpServletRequest;
    }
    
    public String requestParameter(String name){
        return (httpServletRequest.getParameter(name) != null) ? httpServletRequest.getParameter(name) : "";
    }
   
    public static int diffDayInRangeDate(Date fechaMenor, Date fechaMayor) {
        /* CREAMOS LOS OBJETOS GREGORIAN CALENDAR PARA EFECTUAR LA RESTA */
        GregorianCalendar date1 = new GregorianCalendar();
        date1.setTime(fechaMenor); //dateIni es el objeto Date

        GregorianCalendar date2 = new GregorianCalendar();
        date2.setTime(fechaMayor); //dateFin es el objeto Date

        int rango = 0;

        /* COMPROBAMOS SI ESTAMOS EN EL MISMO AÑO */
        if (date1.get(Calendar.YEAR) == date2.get(Calendar.YEAR)) {
            rango = date2.get(Calendar.DAY_OF_YEAR) - date1.get(Calendar.DAY_OF_YEAR);
        } else {
            /* SI ESTAMOS EN DISTINTO AÑO COMPROBAMOS QUE EL AÑO DEL DATEINI NO SEA BISIESTO
             * SI ES BISIESTO SON 366 DIAS EL AÑO
             * SINO SON 365
             */
            int diasAnyo = date1.isLeapYear(date1.get(Calendar.YEAR)) ? 366 : 365;

            /* CALCULAMOS EL RANGO DE AÑOS */
            int rangoAnyos = date2.get(Calendar.YEAR) - date1.get(Calendar.YEAR);

            /* CALCULAMOS EL RANGO DE DIAS QUE HAY */
            rango = (rangoAnyos * diasAnyo) + (date2.get(Calendar.DAY_OF_YEAR) - date1.get(Calendar.DAY_OF_YEAR));
        }
        return rango;
    }
    
    public static void main(String[] args){
        /*
        Util util = new Util();

        System.out.println(util.totalPage(1.5d));
         *
         */
        /*
        DecimalFormatSymbols dfs = new DecimalFormatSymbols();
        dfs.setDecimalSeparator('.');
        DecimalFormat dformat = new DecimalFormat("0000000000.00", dfs);
        
        Double dblNumber = 25.2d;

        System.out.println(dformat.format(dblNumber));
         *
         */

        String text = "RMC";

        System.out.println(text);
    }
}
