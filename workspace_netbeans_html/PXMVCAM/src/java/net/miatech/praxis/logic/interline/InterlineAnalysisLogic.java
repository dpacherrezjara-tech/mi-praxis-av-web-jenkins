package net.miatech.praxis.logic.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.InterlineAnalysisDAO;
import net.miatech.praxis.interline.filter.SFI030Filter;
import net.miatech.praxis.interline.filter.SFI040Filter;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class InterlineAnalysisLogic {
    
    private InterlineAnalysisDAO objDAO = new InterlineAnalysisDAO();
    
    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<SFI040Filter> loadPX237S01SFI040_2(SFI040Filter filter) throws Exception {
        return objDAO.loadPX237S01SFI040_2(filter);
    }

    public List<SFI030Filter> loadPX237S02SFI030(SFI030Filter filter) throws Exception {
        return objDAO.loadPX237S02SFI030(filter);
    }
}
