package net.miatech.praxis.logic.interline;

import java.util.List;
import net.miatech.praxis.interline.filter.SFI010Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.interline.ISIDECControlDAO;

/**
 *
 * @author gsanchez
 */
public class ISIDECControlLogic {
     private final ISIDECControlDAO iSIDECControlDAO = new ISIDECControlDAO();

    public void setSession(IServerSession ss) {
        iSIDECControlDAO.setSession(ss);
    }

    public List<SFI010Filter> loadPX195S01SFI010_3(SFI010Filter filter) throws Exception {
        return iSIDECControlDAO.loadPX195S01SFI010_3(filter);
    }

    public List<SFI010Filter> loadPX195S01SFI010_2(SFI010Filter filter) throws Exception {
        return iSIDECControlDAO.loadPX195S01SFI010_2(filter);
    }
}
