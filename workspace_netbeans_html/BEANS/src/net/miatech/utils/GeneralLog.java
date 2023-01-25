/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.utils;

import java.text.DecimalFormat;

/**
 *
 * @author rmayta
 */
public class GeneralLog {

    // <editor-fold defaultstate="collapsed" desc="{...} Set Attributes">
    private static GeneralLog generalLogInstance;
    private static boolean instantiated = false;

    private DecimalFormat decimalFormat;

    private String log;
    private int counterLog;
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="{...} Singleton Pattern">
    private GeneralLog(){
        initProgram();
    }

    public static GeneralLog getInstance(){
        if(instantiated == false){
            generalLogInstance = new GeneralLog();
            instantiated = true;
        }
        return generalLogInstance;
    }
    // </editor-fold>

    private void initProgram(){

        decimalFormat = new DecimalFormat("000");

        log = "";
        counterLog = 0;
    }

    public void add(String pValue){
        counterLog++;

        String counter = decimalFormat.format(counterLog);

        log += counter + " >>> " + pValue + "\n";

        System.out.println(pValue);
    }

    public void clear(){
        log = "";
        counterLog = 0;
    }

    // <editor-fold defaultstate="collapsed" desc="{...} Java Beans ::: Getters">
    public String getText(){
        return log;
    }

    public int getCount(){
        return counterLog;
    }
    // </editor-fold>

}
