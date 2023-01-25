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
public class FORMATEAARC {
     private String dirBASE, dirARC7060, fileName;
     
     public FORMATEAARC(String base, String arc760, String filename) {
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
            File file = new File(dirARC7060 + "\\" + fileName);
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
                while ((linea = br.readLine()) != null) {
                    if (linea.length() >= 11 && linea.substring(0, 4).equals("PAGE")) {
                        PAGE = linea.substring(7, 11);
                    }
                    if (linea.length() >= 131 && linea.substring(113, 120).equals("CUR PED")) {
                        CUR_PED = linea.substring(123, 125)+linea.substring(126, 128)+"20"+linea.substring(129, 131);
                    }
                    /*if (linea.length() >= 17 && linea.substring(0, 17).equals("139 AEROVIAS DE M")) {
                        AEROVIAS_DE_M = "139";
                    }*/
                    if (linea.length() >= 65 && linea.substring(40, 54).equals("INVOICE NUMBER")) {
                        INVOICE_NUMBER = linea.substring(57, 65);
                    }
                    if (linea.length() >= 103 && linea.substring(78, 90).equals("INVOICE DATE")) {
                        INVOICE_DATE = "20"+linea.substring(95, 97)+linea.substring(98, 100)+linea.substring(101, 103);
                    }
                    if (linea.length() >= 132 && linea.substring(113, 124).equals("JULIAN DATE")) {
                        JULIAN_DATE = linea.substring(127, 132);
                    }
                    if (linea.length() >= 7 && linea.substring(0, 3).equals("xxx") ) {
                        TAT_TCN = linea.substring(3, 7);
                    }
                    if (linea.length() >= 17 && linea.substring(8, 17).equals("SALES SEC")) {
                        TRANSTYPE = "S";
                    }
                     if (linea.length() >= 16 && linea.substring(8, 16).equals("REVERSAL")) {
                        TRANSTYPE = "R";
                    }
                   
                    if (linea.length() >= 131 && linea.substring(0, 5).equals("1396/")) {
                        ATB_TKT = linea.substring(0, 3)+linea.substring(5, 16);
                        NBR = linea.substring(29, 33);
                        AGENT_NUM = linea.substring(38, 40)+linea.substring(41, 46)+linea.substring(47, 48);
                        /*AMT = linea.substring(61, 62)+linea.substring(53, 61);
                        CURRENT = linea.substring(75, 76)+linea.substring(67, 75);*/
                        AMT     = linea.substring(61, 62)+Functions.fillZeros(9, linea.substring(53, 61).trim().replace(".", "").replace(",", ""));
                        CURRENT = linea.substring(75, 76)+Functions.fillZeros(9, linea.substring(67, 75).trim().replace(".", "").replace(",", ""));
                        EXTENDED = linea.substring(89, 90)+linea.substring(81, 89);
                        CROSS_REF_NBR = linea.substring(116, 131);
                        tarjeta=TAT_TCN+"xxxxxxxx"+NBR;

                        //-----0---------3----------------------4----------7--------9--------14---------------28---------------36----------------50-------60----------61------------79-----------87-------98----------------108------109-----118----------124--------128-------------------.
                        //-----3---------1----------------------3----------2--------5--------14---------------8----------------14----------------10-------1-----------18------------8------------11-------10----------------1--------9-------6------------4----------20--------------------.
                       // line = CUR_PED + AEROVIAS_DE_M + INVOICE_NUMBER + INVOICE_DATE + JULIAN_DATE   + TRANSTYPE + ATB_TKT + TAT_TCN + NBR + AGENT_NUM + AMT + CURRENT + EXTENDED + CROSS_REF_NBR ;
                        line = CUR_PED + AEROVIAS_DE_M + INVOICE_NUMBER + INVOICE_DATE + JULIAN_DATE   + TRANSTYPE + ATB_TKT + tarjeta+ AGENT_NUM + AMT + CURRENT + EXTENDED + CROSS_REF_NBR ;
                      
                        // line = TAT_TCN;
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
        FORMATEAARC arc760 = new FORMATEAARC("C:\\Documents and Settings\\Jtorres\\Escritorio\\Insumos PAYMENT\\NUEVO\\EJEM", "C:\\Documents and Settings\\Jtorres\\Escritorio\\Insumos PAYMENT\\NUEVO\\FORMATEADO", "CREDSALD_ARC.txt");
        arc760.exec();
    }
}

