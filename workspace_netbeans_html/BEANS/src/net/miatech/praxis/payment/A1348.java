/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.payment;

import lombok.Data;
import org.codehaus.jackson.annotate.JsonAutoDetect;

/**
 *
 * @author ftorres
 */
@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class A1348 {
    
    
    public String fechaProceso = "";
    public String tipoDoc = "";
    public String tablaOrigen = "";
    public String ticket = "";
    
    public int totalCinta = 0;
    public int ventasEsperadas = 0;
    public int ventasCargadas = 0;
    
    public String estadoVentas = "";
    public int reembolsosEsperados = 0;
    public int reembolsosCargados = 0;
    public String estadoReembolsos = "";
    
    public int admAcmEsperados = 0;
    public int admAcmCargados = 0;
    public String estadoAdmAcm = "";
    public String balanceProceso = "";
    
    
    //Variables del 
    public String USCR = "";
    public String FECR = "";
    public String HOCR = "";
    public String PGMCR = "";
    public String USUP = "";
    public String FEUP = "";
    public String HOUP = ""; 
   
    
}
