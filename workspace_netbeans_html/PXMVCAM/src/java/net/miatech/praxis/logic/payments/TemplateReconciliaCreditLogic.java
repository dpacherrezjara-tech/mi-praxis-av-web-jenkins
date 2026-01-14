package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.TemplateReconciliaCreditDAO;
import net.miatech.praxis.payment.MPF060Filter;
import net.miatech.praxis.payment.MPF060;
import net.miatech.praxis.payment.MPF083;
import net.miatech.praxis.payment.MPF083Filter;
import net.miatech.praxis.payment.MPF091;
import net.miatech.praxis.payment.MPF091Filter;
import net.miatech.praxis.payment.MPF100C;
import net.miatech.praxis.payment.MPF100Filter;
import net.miatech.praxis.payment.MPF102;
import net.miatech.praxis.payment.MPF102Filter;
import net.miatech.praxis.payment.dto.ConciliationTemplate;

public class TemplateReconciliaCreditLogic {

    private final TemplateReconciliaCreditDAO TemplateReconciliaCreditDAO = new TemplateReconciliaCreditDAO();

    public void setSession(IServerSession ss) {
        TemplateReconciliaCreditDAO.setSession(ss);
    }

    public List<MPF102> loadMPS111(MPF102Filter filter) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS111(filter);
    }
    
    public List<MPF060> loadMPS113(MPF060Filter filter) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS113(filter);
    }
    
    public List<MPF091> loadMPS112(MPF091Filter filter) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS112(filter);
    }
    
    public List<MPF100C> loadMPS107(MPF100Filter filter) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS107(filter);
    }
    
    public List<MPF091> loadMPS484(MPF091Filter filter) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS484(filter);
    }
    
    public List<MPF083> loadMPS485(MPF083Filter filter) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS485(filter);
    }
    
    public String loadMPS100(List<ConciliationTemplate> lst) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS100(lst);
    }
    
    public String loadMPS106(List<ConciliationTemplate> lst) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS106(lst);
    }
    
    public String loadMPS486(List<MPF102> lstBandoc, MPF102Filter filter) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS486(lstBandoc, filter);
    }
    
    public String loadMPS487(List<MPF060> lstSettlements, MPF102Filter filter) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS487(lstSettlements, filter);
    }
    
    public String loadMPS488(List<MPF091> lstDiscount, MPF102Filter filter) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS488(lstDiscount, filter);
    }
    
    public String loadMPS489(List<MPF083> lstHeader, MPF102Filter filter) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS489(lstHeader, filter);
    }
    
    public String loadMPS109(MPF102Filter filter) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS109(filter);
    }
    
//    REVIEW BANDOC
    public List<MPF102> loadMPS419(MPF102Filter filter) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS419(filter);
    }
    
    public List<MPF060> loadMPS480(MPF060Filter filter) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS480(filter);
    }
    
    public List<MPF091> loadMPS481(MPF091Filter filter) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS481(filter);
    }
    
    public List<MPF083> loadMPS482(MPF083Filter filter) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS482(filter);
    }
    
    public List<MPF100C> loadMPS483(MPF100Filter filter) throws SQLException, Exception {
        return TemplateReconciliaCreditDAO.loadMPS483(filter);
    }
    
    public String loadMPS420(MPF091Filter bean) throws Exception {
        return TemplateReconciliaCreditDAO.loadMPS420(bean);
    }
    
    public String loadMPS426(MPF091Filter bean) throws Exception {
        return TemplateReconciliaCreditDAO.loadMPS426(bean);
    }
    
}
