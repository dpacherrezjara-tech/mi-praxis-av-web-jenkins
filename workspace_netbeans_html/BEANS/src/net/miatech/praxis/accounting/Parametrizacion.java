/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.accounting;

/**
 *
 * @author asifuentes
 */

import java.util.List;
import java.util.ArrayList;
import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.text.DateFormatSymbols;

public class Parametrizacion {
    
    public List<Layout> listarLayouts(Boolean bGL, Boolean bAP, Boolean bAR, Boolean bApertura, Boolean bEstimacionProvision, Date fechaSistema){
        List<Layout> lbeConfigVolados;
        lbeConfigVolados = new ArrayList(0);

        DateFormat fmtHora = new SimpleDateFormat("HHmmss");
        DateFormat fmtSoloFecha = new SimpleDateFormat("yyyyMMdd");
        String strPrefijo = fmtHora.format(fechaSistema);
        String strSufijo = fmtSoloFecha.format(fechaSistema);
        
        /*GL*/
        /******************************************************/
        
        //NORMAL
        //==============================
        //GL    AP  AR  APERT   EST_PROV
        //==    ==  ==  =====   ========
        //1     1   1   0       0
        //
        //
        //SOLO GL
        //==============================
        //GL    AP  AR  APERT   EST_PROV
        //==    ==  ==  =====   ========
        //1     0   0   0       0       
        
        if((bGL && bAP && bAP && !bApertura && !bEstimacionProvision) || (bGL && !bAP && !bAP && !bApertura && !bEstimacionProvision)){            
            cargarNormal(lbeConfigVolados,strPrefijo, strSufijo);
        }
        
        //CIERRE GL
        //==============================
        //GL    AP  AR  APERT   EST_PROV
        //==    ==  ==  =====   ========
        //1     0   0   0       1       
        
        if(bGL && !bAP && !bAP && !bApertura && bEstimacionProvision){
            /*Normal*/
            cargarNormal(lbeConfigVolados,strPrefijo, strSufijo);
            cargarEstimacionProvision(lbeConfigVolados,strPrefijo, strSufijo);
        }
        
        //REVERSA GL
        //==============================
        //GL    AP  AR  APERT   EST_PROV
        //==    ==  ==  =====   ========
        //0     0   0   1       1  
        
        if(!bGL && !bAP && !bAP && bApertura && bEstimacionProvision){
            cargarEstimacionProvision(lbeConfigVolados,strPrefijo, strSufijo);
        }
        
        /*AP*/
        /******************************************************/
        if(bAP){
            DateFormatSymbols dfs = new DateFormatSymbols();
            String[] months = dfs.getMonths();    
            String strDia = String.format("%02d",fechaSistema.getDate());
            int nMes = fechaSistema.getMonth();
            String strSufijoAP = String.format("%1$s%2$s",strDia,months[nMes].toUpperCase().substring(0, 3));

            lbeConfigVolados.add(new Layout("5D", "AP", "LOTE5", String.format("AP_E_VOLADO_CONNECT_%1$s_#",strSufijoAP)));
            lbeConfigVolados.add(new Layout("5D", "AP", "LOTE6", String.format("AP_D_VOLADO_CONNECT_%1$s_#",strSufijoAP)));
            lbeConfigVolados.add(new Layout("CH", "AP", "LOTE7", String.format("AP_E_VOLADO_CONNECT_%1$s_#",strSufijoAP)));
            lbeConfigVolados.add(new Layout("CH", "AP", "LOTE8", String.format("AP_D_VOLADO_CONNECT_%1$s_#",strSufijoAP)));        
            lbeConfigVolados.add(new Layout("IN", "AP", "LOTE9", String.format("AP_E_PR_INTERLINEALFAVOR_%1$s_#",strSufijoAP)));
            lbeConfigVolados.add(new Layout("IN", "AP", "LOTE10",String.format("AP_D_PR_INTERLINEALFAVOR_%1$s_#",strSufijoAP)));
        }

        /*AR*/
        /******************************************************/
        if(bAR){
            lbeConfigVolados.add(new Layout("5D", "AR", "LOTE11", "AR_#_D"));
            lbeConfigVolados.add(new Layout("5D", "AR", "LOTE12", "AR_#_L"));
            lbeConfigVolados.add(new Layout("CH", "AR", "LOTE13", "AR_#_D"));
            lbeConfigVolados.add(new Layout("CH", "AR", "LOTE14", "AR_#_L"));
            lbeConfigVolados.add(new Layout("IN", "AR", "LOTE15", "AR_#_D"));
            lbeConfigVolados.add(new Layout("IN", "AR", "LOTE16", "AR_#_L"));                    
        }
        
        return lbeConfigVolados;
    }
    
    public Layout obtenerLayout(Layout objLayout, Date fechaSistema){
        
        /*switch(objLayout.Poliza){
            case "GL":{
                DateFormat fmtHora = new SimpleDateFormat("HHmmss");
                DateFormat fmtSoloFecha = new SimpleDateFormat("yyyyMMdd");
                String strPrefijo = fmtHora.format(fechaSistema);
                String strSufijo = fmtSoloFecha.format(fechaSistema);
            
                objLayout.NombreArchivo = String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,objLayout.Cliente,strSufijo);
            } break;
                
            case "AP":{
                DateFormatSymbols dfs = new DateFormatSymbols();
                String[] months = dfs.getMonths();    
                String strDia = String.format("%02d",fechaSistema.getDate());
                int nMes = fechaSistema.getMonth();
                String strSufijoAP = String.format("%1$s%2$s",strDia,months[nMes].toUpperCase().substring(0, 3));

                
                switch(objLayout.Lote){
                    case "LOTE5" : objLayout.NombreArchivo = String.format("AP_E_VOLADO_CONNECT_%1$s_#",strSufijoAP); break;
                    case "LOTE6" : objLayout.NombreArchivo = String.format("AP_D_VOLADO_CONNECT_%1$s_#",strSufijoAP); break;
                    case "LOTE7" : objLayout.NombreArchivo = String.format("AP_E_VOLADO_CONNECT_%1$s_#",strSufijoAP); break;
                    case "LOTE8" : objLayout.NombreArchivo = String.format("AP_D_VOLADO_CONNECT_%1$s_#",strSufijoAP); break;
                    case "LOTE9" : objLayout.NombreArchivo = String.format("AP_E_PR_INTERLINEALFAVOR_%1$s_#",strSufijoAP); break;
                    case "LOTE10": objLayout.NombreArchivo = String.format("AP_D_PR_INTERLINEALFAVOR_%1$s_#",strSufijoAP); break;
                }
            
            } break;
                
            case "AR":{
                switch(objLayout.Lote){
                    case "LOTE11" :case "LOTE13" : case "LOTE15": objLayout.NombreArchivo = "AR_#_D"; break;
                    case "LOTE12" :case "LOTE14" : case "LOTE16": objLayout.NombreArchivo = "AR_#_L"; break;
                }
            } break;
        }*/
        
        return objLayout;
    }
    
    void cargarNormal(List<Layout> lbeConfigVolados, String strPrefijo, String strSufijo){
        lbeConfigVolados.add(new Layout("AM", "GL", "LOTE" , String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"LIF",strSufijo)));
        lbeConfigVolados.add(new Layout("IN", "GL", "LOTE2", String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"IR",strSufijo)));
        lbeConfigVolados.add(new Layout("CH", "GL", "LOTE3", String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"CHT",strSufijo)));
        lbeConfigVolados.add(new Layout("CA", "GL", "LOTE4", String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"CA",strSufijo)));        
    }
    
    void cargarEstimacionProvision(List<Layout> lbeConfigVolados, String strPrefijo, String strSufijo){
        /* AM Est/Prov */
        lbeConfigVolados.add(new Layout("AM", "GL", "LOTE22" , String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"LIF",strSufijo)));
        lbeConfigVolados.add(new Layout("AM", "GL", "LOTE23" , String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"LIF",strSufijo)));
        lbeConfigVolados.add(new Layout("AM", "GL", "LOTE52" , String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"LIF",strSufijo)));
        lbeConfigVolados.add(new Layout("AM", "GL", "LOTE53" , String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"LIF",strSufijo)));
        lbeConfigVolados.add(new Layout("AM", "GL", "LOTE60" , String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"LIF",strSufijo)));

        /* INT Est/Prov */
        lbeConfigVolados.add(new Layout("IN", "GL", "LOTE24", String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"IR",strSufijo)));
        lbeConfigVolados.add(new Layout("IN", "GL", "LOTE25", String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"IR",strSufijo)));
        lbeConfigVolados.add(new Layout("IN", "GL", "LOTE54", String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"IR",strSufijo)));
        lbeConfigVolados.add(new Layout("IN", "GL", "LOTE55", String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"IR",strSufijo)));
        lbeConfigVolados.add(new Layout("IN", "GL", "LOTE61", String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"IR",strSufijo)));

        /* CH Est/Prov */
        lbeConfigVolados.add(new Layout("CH", "GL", "LOTE28", String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"CHT",strSufijo)));
        lbeConfigVolados.add(new Layout("CH", "GL", "LOTE29", String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"CHT",strSufijo)));
        lbeConfigVolados.add(new Layout("CH", "GL", "LOTE58", String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"CHT",strSufijo)));
        lbeConfigVolados.add(new Layout("CH", "GL", "LOTE59", String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"CHT",strSufijo)));
        lbeConfigVolados.add(new Layout("CH", "GL", "LOTE62", String.format("GL_#%1$s_PR_GL_%2$s_$",strPrefijo,"CHT",strSufijo)));        
    }
}
