package net.miatech.praxis.payment;

import net.miatech.beans.Pagination;

/**
 * Filter for MPS734 (CargoGuide Data Entry — bank reconciliation manual scan).
 * See {@link MPF287Mov} for why this is a separate class from MPF287Filter.
 */
public class MPF287MovFilter {
    public Pagination page = new Pagination();

    // MPS734 – scan MPF287 (Extractos) bank movements
    public String IN_CCUST   = ""; // set server-side from the session, not sent by the client
    public String IN_ADATE   = "";
    public String IN_MONTO   = ""; // sent as text from the UI, cast to DECIMAL inside the SP
    public String IN_ACCOUNT = "";
    public String IN_TEXTO   = "";
    public String IN_BANDOC  = "";
    public String IN_STVAL   = "";
}
