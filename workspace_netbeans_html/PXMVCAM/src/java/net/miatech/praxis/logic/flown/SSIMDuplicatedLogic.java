package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.flown.SSIMDuplicatedDAO;

// </editor-fold>

/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : SSIMDuplicatedLogic                     *                           
 * Created on : 19/02/2018, 15:12:10                              *                
 * Author     : Gregory Sánchez (gsanchez)                        *           
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 20-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */
public class SSIMDuplicatedLogic {
    
    private SSIMDuplicatedDAO objDAO = new SSIMDuplicatedDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1691Filter> loadPX232S01A1691(A1691Filter filter, HashMap hmAeropuertos) {
        return objDAO.loadPX232S01A1691(filter, hmAeropuertos);
    }

    public A1691Filter loadPX095S04A1691(A1691Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return objDAO.loadPX095S04A1691(filter, hmAeropuertos);
    }

    public String loadPX232S02A1691(A1691Filter filter, String strOption) throws SQLException, Exception {
        return objDAO.loadPX232S02A1691(filter, strOption);
    }
    
}
