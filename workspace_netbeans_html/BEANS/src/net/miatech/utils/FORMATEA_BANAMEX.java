/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.utils;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;

/**
 *
 * @author andrea
 */
public class FORMATEA_BANAMEX {
     private String dirBASE, dirARC7060, fileName;
     
     public FORMATEA_BANAMEX(String base, String arc760, String filename) {
        dirBASE = base;
        dirARC7060 = arc760;
        fileName = filename;
    }
     public void exec() {
        readFile();
    }
      private void readFile() {
        String PAGE = "",
                CUR_PED = "",
                AEROVIAS_DE_M = "",
                INVOICE_NUMBER = "",
                INVOICE_DATE = "",
                JULIAN_DATE = "",
                TAT_TCN = "",
                TRANSTYPE = "",
                ATB_TKT = "",
                NBR = "",
                AGENT_NUM = "",
                AMT = "",
                CURRENT = "",
                EXTENDED = "",
                CROSS_REF_NBR = "";
               
        String line;
        String tarjeta;
        int intLine = 0;

        File archivo = null;
        FileReader fr = null;
        BufferedReader br = null;

        try {
            File file = new File(dirARC7060 + "\\" + fileName.replace(".csv", ".txt"));
            BufferedWriter bw;
            if (file.exists()) {
                System.err.println("Ya existe el archivo.");
            } else {
                bw = new BufferedWriter(new FileWriter(file));

                archivo = new File(dirBASE + "\\" + fileName);
                fr = new FileReader(archivo);
                br = new BufferedReader(fr);

                // Lectura del fichero
                String linea;
                String[] campos ;
                String camp1="",camp2="",camp3="",camp4="",camp5="";
                String codA="";
                while ((linea = br.readLine()) != null) {
                    if (linea.length() >= 100 && linea.substring(3, 4).equals("/")) {
                        campos=linea.split("\",\"");
                        camp1= campos[0].replace("\"", "");
                        camp2= campos[1];
                       
                        int pos = camp2.indexOf("Nzmerica:");
                        codA = camp2.substring(pos, pos+17).replace("Nzmerica:","").replace("Refere", "");
                        
                        camp3= campos[2].replace(",", "");//numero
                        camp4= campos[3].replace(",", "");//numero
                        
                        camp5= campos[4].replace("\"", "").replace(",", "");//numero
                        //Functions.fillZeros1(8, codA);
                        //line =  Functions.fillString(camp1, 20)+Functions.fillString(camp2, 160)+Functions.fillString(codA, 20)+
                        line =  Functions.fillString(camp1, 20)+Functions.fillString(camp2, 160)+Functions.fillString(Functions.fillZeros1(7, codA), 20)+
                                Functions.fillString(Functions.fillZeros1(15, camp3),20) +
                                Functions.fillString(Functions.fillZeros1(15, camp4),20) +
                                Functions.fillString(Functions.fillZeros1(15, camp5),20) ;
                        if(++intLine > 1){
                            bw.append("\n" + line);
                        }else{
                            bw.append(line);
                        }
                    }

                }
                bw.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // En el finally cerramos el fichero, para asegurarnos
            // que se cierra tanto si todo va bien como si salta 
            // una excepcion.
            try {
                if (null != fr) {
                    fr.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
    }

    public static void main(String args[]) {
        //PRUEBA arc760 = new PRUEBA("\\\\miatechnet\\Transito\\EN\\PRUEBA\\ARC760ORIGINALES", "\\\\miatechnet\\Transito\\EN\\PRUEBA\\ARC760FORMATEADOS", "CREDSALD ARCc.txt");
        FORMATEA_BANAMEX arc760 = new FORMATEA_BANAMEX("C:\\Documents and Settings\\Jtorres\\Escritorio\\Insumos PAYMENT\\BANAMEX", "C:\\Documents and Settings\\Jtorres\\Escritorio\\Insumos PAYMENT\\BANAMEX\\FORMATEADO", "Banamex.csv");
        arc760.exec();
    }
}

