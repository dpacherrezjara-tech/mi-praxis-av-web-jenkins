/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.utils;

import net.miatech.utils.GeneralLog;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.IOException;

import java.util.ArrayList;

/**
 *
 * @author rmayta
 */
public class ReadFile {

    // <editor-fold defaultstate="collapsed" desc="{...} Set Attributes and Vars">
    private GeneralLog generalLog = GeneralLog.getInstance();

    private String filePath;
    private FileReader fileRead;
    private BufferedReader bufferReader;
    private ArrayList<String> listLine;
    // </editor-fold>

    public ReadFile(){
        initProgram();
    }

    public ReadFile(String pFilePath){
        this();
        setFilePath(pFilePath);
    }

    public void initProgram(){
        filePath = "";
        listLine = new ArrayList<String>();
    }

    public void load(){

        listLine.clear();

        try{
            fileRead = new FileReader(filePath);
            bufferReader = new BufferedReader(fileRead);

            String line = "";

            while((line = bufferReader.readLine()) != null){
                listLine.add(line);
            }

            bufferReader.close();
            fileRead.close();

        }catch(FileNotFoundException e) {
            generalLog.add(e.getMessage());

        }catch(IOException e){
            generalLog.add(e.getMessage());
        }
    }

    // <editor-fold defaultstate="collapsed" desc="{...} Java Beans ::: Setters">
    public void setFilePath(String pFilePath){
        filePath = pFilePath;
    }

    public String getFilePath(){
         return filePath;
    }
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="{...} Java Beans ::: Getters">
    public String getLine(int pLine){
        return listLine.get(pLine).toString();
    }

    public int getCountLine(){
        return listLine.size();
    }
    // </editor-fold>

    public static void main(String[] args){

        ReadFile rf = new ReadFile();
        rf.setFilePath("D:\\Archivos_Compartidos\\SIRAX\\RobotSirax\\TextFiles\\RBT0207_201010_01.txt");
        rf.load();

        for(int j = 0; j < rf.getCountLine(); j++){
            System.out.println(rf.getLine(j));
        }

        System.out.println("Total Lines: " + rf.getCountLine());
    }

}
