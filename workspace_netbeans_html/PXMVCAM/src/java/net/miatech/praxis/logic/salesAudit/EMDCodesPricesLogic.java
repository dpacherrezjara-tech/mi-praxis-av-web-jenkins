package net.miatech.praxis.logic.salesAudit;

// <editor-fold defaultstate="collapsed" desc="import">
import net.miatech.praxis.logic.payments.*;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.SaleAudit.A2665Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.LoadConciliationDAO;
import net.miatech.praxis.dao.salesAudit.EMDCodesPricesDAO;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2370Filter;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class EMDCodesPricesLogic {
    
    private EMDCodesPricesDAO codesPriceEMD = new EMDCodesPricesDAO();
    
    public void setSession(IServerSession ss) {
        codesPriceEMD.setSession(ss);
    }
    
    public   List<A2665Filter> Search(A2665Filter filter) throws SQLException, Exception {
        
       return codesPriceEMD.Search(filter);
    }
    
    public A2665Filter mantenimientoEMD(A2665Filter filter) throws Exception, SQLException {
        return codesPriceEMD.mantenimientoEMD(filter);
    }
    
    public String subirExcel(String strRutaArchivo, String strSesion,String nameFile) throws SQLException, ClassNotFoundException, Exception{
        return codesPriceEMD.subirExcel(strRutaArchivo, strSesion,nameFile);
    }
}
