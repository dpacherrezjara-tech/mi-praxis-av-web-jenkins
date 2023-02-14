package net.miatech.praxis.logic.master;

/**
 * @author claudia
 * @date 20180611
 */
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.librfnd.A2745;
import net.miatech.praxis.spring.INF020;

public class MasterLogic {

    MasterDAO dao = new MasterDAO();

    public void setSession(IServerSession ss) {
        this.dao.setSession(ss);
    }
   
     public List<INF020> loadSQP03628(String USERW) throws Exception {
        return this.dao.loadSQP03628(USERW);
    }
    
    /*public List<A051> getListCountry(boolean list) throws Exception {
     return this.dao.getListCountry(list);
     }*/
}
