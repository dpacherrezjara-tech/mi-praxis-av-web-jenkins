package net.miatech.praxis.payment;

import java.util.ArrayList;
import java.util.List;

public class MPF291LinkPayload {

    public String IN_SFILE   = "";
    public String IN_NPAGE   = "";
    public String IN_PAYDAY  = "";
    public String IN_TYPE    = "";
    public String IN_SEQ     = "";
    public String IN_CBATCH  = "";
    public String IN_DATEBAT = "";
    public List<SelectedRecord> selected = new ArrayList<>();

    public static class SelectedRecord {
        public String AWBNO  = "";
        public String NCICLO = "";
    }
}
