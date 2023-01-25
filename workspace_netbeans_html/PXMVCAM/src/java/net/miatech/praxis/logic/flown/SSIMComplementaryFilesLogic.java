package net.miatech.praxis.logic.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.A005;
import net.miatech.praxis.flown.A1707;
import net.miatech.praxis.dao.flown.SSIMComplementaryFilesDAO;
import net.miatech.praxis.dao.master.MasterDAO;

// </editor-fold>

/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : SSIMComplementaryFilesDAO                         *                           
 * Created on : 13/02/2018, 17:13:10                              *                
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
public class SSIMComplementaryFilesLogic {
    
    private SSIMComplementaryFilesDAO objDAO = new SSIMComplementaryFilesDAO();
    private MasterDAO masterDAO = new MasterDAO();

    public void setSession(IServerSession ss) {
        objDAO.setSession(ss);
    }

    public List<A1007> getCities() throws Exception {
        
        List<A1007> lstCiudades = masterDAO.loadCiudades();
        return lstCiudades;
    }
    
    public List<A1707> loadPX104S01A1707(A1707 a, HashMap<String, String> hmAeropuertos) throws SQLException {
        return objDAO.loadPX104S01A1707(a, hmAeropuertos);
    }
    
    public List<A005> loadPX104S04A005() throws SQLException {
        return objDAO.loadPX104S04A005();
    }
    
    public A1707 loadPX104S02A1707(A1707 filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        return objDAO.loadPX104S02A1707(filter, hmAeropuertos);
    }

    public String loadPX104S03A1707(A1707 filter, String option) throws SQLException, Exception {
        return objDAO.loadPX104S03A1707(filter, option);
    }
    
}
