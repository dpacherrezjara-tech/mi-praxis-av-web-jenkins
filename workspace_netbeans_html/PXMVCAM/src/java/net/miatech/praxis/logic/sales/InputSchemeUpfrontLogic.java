package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.SaleAudit.A1155Filter;
import net.miatech.beans.SaleAudit.A1179Filter;
import net.miatech.beans.SaleAudit.BEANSCONSOLE;
import net.miatech.beans.SaleAudit.CONSOLE_PARANT;
import net.miatech.beans.SaleAudit.SQP01597Filter;
import net.miatech.beans.SaleAudit.SQP01723Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A051;
import net.miatech.praxis.SaleAudit.PSA00004;
import net.miatech.praxis.SaleAudit.SQP01090;
import net.miatech.praxis.SaleAudit.SQP01265;
import net.miatech.praxis.SaleAudit.SQP01723;
import net.miatech.praxis.dao.sales.InputSchemeUpfrontDAO;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class InputSchemeUpfrontLogic {

    private InputSchemeUpfrontDAO objDAO = new InputSchemeUpfrontDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }
    
    public   List<A1155Filter> getListAgreement(A1155Filter filter) throws SQLException, Exception {
       return objDAO.getListAgreement(filter);
    }
    
    public List<SQP01090> getSQP01096() throws SQLException, Exception {
        return objDAO.getSQP01096();
    }
    
    public   List<CONSOLE_PARANT> getFunctions(CONSOLE_PARANT filter) throws SQLException, Exception {
       return objDAO.getFunctions(filter);
    }
    
    public   List<CONSOLE_PARANT> getFunctionsParamsA(CONSOLE_PARANT filter) throws SQLException, Exception {
       return objDAO.getFunctionsParamsA(filter);
    }
    
    public   List<CONSOLE_PARANT> getFunctionsParamsA2(CONSOLE_PARANT filter) throws SQLException, Exception {
       return objDAO.getFunctionsParamsA2(filter);
    }
    
    public   List<SQP01265> getListLabel(SQP01265 filter) throws SQLException, Exception {
       return objDAO.getListLabel(filter);
    }
    
    public   List<SQP01265> getListIATAGROUP(SQP01265 filter) throws SQLException, Exception {
       return objDAO.getListIATAGROUP(filter);
    }
    
    public   List<A1179Filter> getTableTmp(A1179Filter filter) throws SQLException, Exception {
       return objDAO.getTableTmp(filter);
    }
    
    public   List<A1179Filter> getTableREF(A1179Filter filter) throws SQLException, Exception {
       return objDAO.getTableREF(filter);
    }
    
    public List<A1155Filter> setMantenimientoLabel(A1155Filter filter,String VP_ACTION) throws SQLException, Exception {
        return objDAO.setMantenimientoLabel(filter,VP_ACTION);
    }
    
    public List<BEANSCONSOLE> getListViewCCodeGlobal(SQP01090 filter) throws SQLException, Exception {
        return objDAO.getListViewCCodeGlobal(filter);  
    }
    
    public List<BEANSCONSOLE> getListViewCCodeSector(SQP01090 filter) throws SQLException, Exception {
        return objDAO.getListViewCCodeSector(filter);  
    }
    
    public   List<SQP01265> setGROUPCODE(SQP01265 filter) throws SQLException, Exception {
       return objDAO.setGROUPCODE(filter);
    }
    
    public   List<PSA00004> getGROUPIATA(PSA00004 filter) throws SQLException, Exception {
       return objDAO.getGROUPIATA(filter);
    }
    
    public List<SQP01090> getSQP01090(SQP01090 filter) throws SQLException, Exception {
        return objDAO.getSQP01090(filter);
    }
    
    public List<SQP01090> getSQP01093(SQP01090 filter) throws SQLException, Exception {
        return objDAO.getSQP01093(filter);
    }
    
    public List<SQP01090> getSQP01094(SQP01090 filter) throws SQLException, Exception {
        return objDAO.getSQP01094(filter);
    }
    
    public List<SQP01090> getSQP01095(SQP01090 filter) throws SQLException, Exception {
        return objDAO.getSQP01095(filter);
    }
    
    public List<SQP01090> setSQP01090(SQP01090 filter,String VP_ACTION) throws SQLException, Exception {
        return objDAO.setSQP01090(filter,VP_ACTION);
    }
    
    public List<A051> getListCountry() throws SQLException, Exception {
       return objDAO.getListCountry();
    }
    
    public List<SQP01597Filter> getCheckList(SQP01597Filter filter) throws SQLException, Exception {
       return objDAO.getCheckList(filter);
    }
    
    public   List<SQP01723> getStatusList(SQP01723Filter filter) throws SQLException, Exception {
       return objDAO.getStatusList(filter);
    }
    
    public   List<SQP01597Filter> setProccess(SQP01597Filter filter) throws SQLException, Exception {
       return objDAO.setProccessAsync(filter);//amdReasons.setProccess(filter);
    }
    
    public List<A1155Filter> setA1155(A1155Filter filter,String VP_ACTION) throws SQLException, Exception {
        return objDAO.setA1155(filter,VP_ACTION);
    }
}
