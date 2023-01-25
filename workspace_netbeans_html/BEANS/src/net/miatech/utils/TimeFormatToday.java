/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.utils;

import java.util.Calendar;

import java.text.DecimalFormat;

/**
 *
 * @author rmayta
 */
public class TimeFormatToday {

    // <editor-fold defaultstate="collapsed" desc="{...} Set Attributes and Vars">
    public static final int DATE_YYYYMMDD   = 0;
    public static final int DATE_YYMMDD     = 1;
    public static final int DATE_DDMMYYYY   = 2;
    public static final int DATE_DDMMYY     = 3;
    public static final int DATE_YEAR       = 4;
    public static final int DATE_MONTH      = 5;
    public static final int DATE_DAY        = 6;

    public static final int TIME_HHMMSS      = 4;
    public static final int TIME_hhMMSS      = 5;

    public static final int FORMAT_SIMPLE      = 6;
    public static final int FORMAT_PADDING      = 7;

    private Calendar calendar;

    private DecimalFormat format_00, format_0000;
    // </editor-fold>

    public TimeFormatToday(){
        initProgram();
    }

    private void initProgram(){
        format_00 = new DecimalFormat("00");
        format_0000 = new DecimalFormat("0000");
    }

    public void setNow(){
        calendar = Calendar.getInstance();
    }

    public void setCalendar(Calendar pCalendar){
        calendar = pCalendar;
    }

    public String getTime(int pFormat){
        return getTime(pFormat, "");
    }

    public String getTime(int pFormat, String pSeparator){

        String today;

        if(calendar == null){
            setNow();
        }

        int YEAR = Integer.parseInt(Integer.toString(calendar.get(Calendar.YEAR)));
        int MONTH = (calendar.get(Calendar.MONTH) + 1);
        int DATE = calendar.get(Calendar.DATE);

        int HOUR_OF_DAY = calendar.get(Calendar.HOUR_OF_DAY);
        int HOUR = (calendar.get(Calendar.HOUR) + 1);
        int MINUTE = calendar.get(Calendar.MINUTE);
        int SECOND = calendar.get(Calendar.SECOND);

        switch(pFormat){
            case DATE_YYYYMMDD:
                today = format_0000.format(YEAR) + pSeparator + format_00.format(MONTH) + pSeparator + format_00.format(DATE);
                break;
                
            case DATE_YYMMDD:
                YEAR = Integer.parseInt(Integer.toString(YEAR).substring(2, 4));
                today = format_00.format(YEAR) + pSeparator + format_00.format(MONTH) + pSeparator + format_00.format(DATE);
                break;
                
            case DATE_DDMMYYYY:
                today = format_00.format(DATE) + pSeparator + format_00.format(MONTH) + pSeparator + format_0000.format(YEAR);
                break;

            case DATE_DDMMYY:
                YEAR = Integer.parseInt(Integer.toString(YEAR).substring(2, 4));
                today = format_00.format(DATE) + pSeparator + format_00.format(MONTH) + pSeparator + format_00.format(YEAR);
                break;

            case TIME_HHMMSS:
                today = format_00.format(HOUR_OF_DAY) + pSeparator + format_00.format(MINUTE) + pSeparator + format_00.format(SECOND);
                break;
                
            case TIME_hhMMSS:
                today = format_00.format(HOUR) + pSeparator + format_00.format(MINUTE) + pSeparator + format_00.format(SECOND);
                break;

            default:
                today = "";
        }

        return today;
    }

    public String getDate(int type){
        return getDate(type, FORMAT_SIMPLE);
    }

    public String getDate(int type, int format){
        String date = "";

        if(calendar == null){
            setNow();
        }

        int YEAR = calendar.get(Calendar.YEAR);
        int MONTH = (calendar.get(Calendar.MONTH) + 1);
        int DATE = calendar.get(Calendar.DATE);

        switch(type){
            case DATE_YEAR:
                date = (format == FORMAT_PADDING) ? format_0000.format(YEAR) : Integer.toString(YEAR);
                break;

            case DATE_MONTH:
                date = (format == FORMAT_PADDING) ? format_00.format(MONTH) : Integer.toString(MONTH);
                break;

            case DATE_DAY:
                date = (format == FORMAT_PADDING) ? format_00.format(DATE) : Integer.toString(DATE);
                break;
        }

        return date;
    }

}
