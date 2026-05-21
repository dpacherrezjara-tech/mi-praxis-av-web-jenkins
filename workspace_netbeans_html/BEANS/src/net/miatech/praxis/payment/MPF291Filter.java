package net.miatech.praxis.payment;

import net.miatech.beans.Pagination;

public class MPF291Filter {
    public Pagination page = new Pagination();

    // MPS600 – search
    public String IN_CCUST  = "";
    public String IN_SFILE  = "";

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
