package net.miatech.praxis.payment;

import net.miatech.beans.Pagination;

public class MPF291Filter {
    public Pagination page = new Pagination();

    // MPS600 – search
    public String IN_CCUST  = "";
    public String IN_SFILE  = "";

    // MPS573 – general search
    public String IN_STVAL      = "";
    public String IN_FECHA_FROM = "";
    public String IN_FECHA_TO   = "";
    public String IN_OPTION     = "";
    public String IN_SCURRENCY  = "";
    public String IN_COUNTRY    = "";

    // MPS609 – GUIAS (ARC tab)
    public String IN_NUMGUIA = "";
    public String IN_NUMFAC  = "";

    // MPS601 – link one MPF291 record to MPF295
    public String IN_AWBNO    = "";
    public String IN_NCICLO   = "";
    // MPF295 keys used as context for linking
    public String IN_NPAGE    = "";
    public String IN_PAYDAY   = "";
    public String IN_TYPE     = "";
    public String IN_SEQ      = "";
    public String IN_CBATCH   = "";   // CBATCH value from MPF295
    public String IN_DATEBAT   = "";   // CBATCH value from MPF295

    public String option = "";
}
