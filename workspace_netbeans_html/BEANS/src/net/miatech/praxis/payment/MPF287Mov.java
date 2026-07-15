package net.miatech.praxis.payment;

import net.miatech.beans.Pagination;

/**
 * Row shape for MPS734 (CargoGuide Data Entry — bank reconciliation manual scan).
 * NOTE: the table PRAXISMP.MPF287 already has an unrelated result-row bean
 * ({@link MPF287}) used by MPS657/658/659/662 (settlement dashboard, CargoStatusDAO).
 * This class covers only the columns needed to list/scan bank movements to
 * manually reconcile against a MPF291/MPF295 record.
 */
public class MPF287Mov {
    public Pagination page = new Pagination();

    public long   RN       = 0;
    public String CCUST    = "";
    public String STVAL    = "";
    public String ACCOUNT  = "";
    public String BANDOC   = "";
    public String ADATE    = "";
    public double NETO     = 0;
    public String TEXTO    = "";
    public String TEXTOLAR = "";
    public String USCR     = "";
    public String FECR     = "";
    public String HOCR     = "";
    public String USUP     = "";
    public String FEUP     = "";
    public String HOUP     = "";
}
