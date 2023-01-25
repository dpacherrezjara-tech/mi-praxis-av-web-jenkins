package net.miatech.praxis.logic.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import net.miatech.praxis.logic.flown.*;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.dao.sales.CountryMasterFileDAO;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class CountryMasterFileLogic {
    
    private CountryMasterFileDAO objDAO = new CountryMasterFileDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List loadCountryMasterFile(A006 filter) throws SQLException {
        return objDAO.loadCountryMasterFile( filter);
    }

    public String maintanceA006(A006 filter, String strOption, String strCampo) throws SQLException {
            return objDAO.maintanceA006(filter,strOption, strCampo);
    }
}
