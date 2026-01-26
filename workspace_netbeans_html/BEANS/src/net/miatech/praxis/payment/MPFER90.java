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

public class MPFER90 {

    public String PROCID = "";
    public String PROCNAME = "";
    public String PROCDESC = "";
    public String PROCSTATUS = "";
    public String PROCPAIS = "";
    public String PROCMESSAG = "";
    public String PROCFILE = "";
    public String PROCDATE = "";
    public String PROCINI = "";
    public String PROCFIN = "";
    public String CPROGRAM = "";
    public String FUENTE = "";
    public String ORDEN = "";
    public String IN_PROCPAIS = "";
    public String IN_DATETYPE = "";
    public String IN_PROCDATE = "";
    public String IN_PROCFUENTE = "";

//    VARIABLES DE RPA
    public String RN = "";
    public String CCUST = "";
    public String ROBOTNAME = "";
    public String FREQTYPE = "";
    public String FREQDAYS = "";
    public String TIMEEXEC = "";
    public String STATUSRO = "";
    public String LASTEXECD = "";
    public String LASTEXECH = "";
    public String LASTSTATR = "";
    public String LASTMESSA = "";
    public String IN_CCUST = "";

    public boolean LIVE_RUNNING = false;
    public int LIVE_RUNNING_SECONDS = 0;
    public String LIVE_NAME = "";
    public String LIVE_PID = "";
    public String LIVE_ID = "";
    public String LIVE_STATUS = "";
    public String LIVE_LAST_LOG = "";
    
//    VARIABLES ACTUALIZACION
    public String option = "";
    public String IN_CLIENT = "";
    public String IN_NAME = "";
    public String IN_FREQTYPE = "";
    public String IN_FREQDAYS = "";
    public String IN_TIMEEXEC = "";
    public String IN_STATUSRO = "";
    public String IN_CRON = "";

    //Variables del 
    public String USCR = "";
    public String FECR = "";
    public String HOCR = "";
    public String PGMCR = "";
    public String USUP = "";
    public String FEUP = "";
    public String HOUP = "";
    public String PGMUP = "";

}
