package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.Pagination;
import net.miatech.praxis.payment.A4171;
import net.miatech.praxis.payment.A4172;

public class A4172Filter extends A4172 {

    public String descCBANK = "";
    public String descSCARCOD = "";
    public String descSCOUNTRY = "";
    
    public List<A4171> lstDetalle = new ArrayList<A4171>(0);

    public Pagination page = new Pagination();
}
