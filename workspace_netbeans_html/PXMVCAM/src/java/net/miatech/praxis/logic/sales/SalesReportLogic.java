/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.sales;

import com.google.gson.JsonArray;
import java.sql.SQLException;
import java.util.List;
import net.miatech.beans.PX036S01A1531Filter;
import net.miatech.beans.PX036S01A1532Filter;
import net.miatech.beans.PX036S01A1533Filter;
import net.miatech.beans.PX036S01A1534Filter;
import net.miatech.beans.PX036S01A1720Filter;
import net.miatech.beans.PX036S01A1721Filter;
import net.miatech.beans.PX036S01A1731Filter;
import net.miatech.beans.PX036S01A1732Filter;
import net.miatech.beans.PX036S01A1733Filter;
import net.miatech.beans.PX036S01A1734Filter;
import net.miatech.beans.PX036S01A1735Filter;
import net.miatech.beans.PX038S01A1724Filter;
import net.miatech.beans.PX038S02A713Filter;
import net.miatech.beans.PX038S02A714Filter;
import net.miatech.beans.PX038S02A720Filter;
import net.miatech.beans.S0001A1530Filter;
import net.miatech.beans.S0001A1730Filter;
import net.miatech.beans.S0001A713Filter;
import net.miatech.beans.S0001A714Filter;
import net.miatech.beans.S0002A1530Filter;
import net.miatech.beans.S0007A720Filter;
import net.miatech.beans.S0007A730Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.A003;
import net.miatech.praxis.A005;
import net.miatech.praxis.A1772;
import net.miatech.praxis.dao.sales.SalesReportDAO;

/**
 *
 * @author jmeiggs
 */
public class SalesReportLogic {

    private final SalesReportDAO salesReportDAO = new SalesReportDAO();

    public void setSession(IServerSession ss) {
        salesReportDAO.setSession(ss);

    }

    public List<S0001A1530Filter> loadS0001A1530(S0001A1530Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadS0001A1530(filter);
    }

    public A006 loadPX038S01A006(A006 filter) throws SQLException, Exception {
        return salesReportDAO.loadPX038S01A006(filter);
    }

    public List<A003> loadPX038S01A003(A003 filter) throws SQLException, Exception {
        return salesReportDAO.loadPX038S01A003(filter);
    }

    public A1007 loadPX038S01A1007(A1007 filter) throws SQLException, Exception {
        return salesReportDAO.loadPX038S01A1007(filter);
    }
    
    public A1772 loadA1772(A1772 filter) throws SQLException, Exception {
        return salesReportDAO.loadA1772(filter);
    }
    
    public A005 loadA005(A005 filter) throws SQLException, Exception {
        return salesReportDAO.loadA005(filter);
    }

    public S0002A1530Filter setS0002A1530(S0002A1530Filter filter) throws SQLException, Exception {
        return salesReportDAO.setS0002A1530(filter);
    }

    public List<PX038S02A713Filter> loadPX038S02A713(PX038S02A713Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadPX038S02A713(filter);
    }

    public List<PX038S02A720Filter> loadPX038S02A720(PX038S02A720Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadPX038S02A720(filter);
    }

    public List<PX038S02A714Filter> loadPX038S02A714(PX038S02A714Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadPX038S02A714(filter);
    }

    public List<PX036S01A1720Filter> loadPX036S01A1720(PX036S01A1720Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadPX036S01A1720(filter);
    }

    public List<PX038S01A1724Filter> loadPX038S01A1724(PX038S01A1724Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadPX038S01A1724(filter);
    }

    public List<S0007A730Filter> loadS0007A730EXCH(S0007A730Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadS0007A730EXCH(filter);
    }
    
    public List<S0007A730Filter> loadS0007A730EXCHGrilla(S0007A730Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadS0007A730EXCHGrilla(filter);
    }

    public List<S0007A720Filter> loadS0007A720(S0007A720Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadS0007A720(filter);
    }

    public List<S0007A720Filter> loadS0007A720Grilla(S0007A720Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadS0007A720Grilla(filter);
    }
    
    public List<S0001A713Filter> loadS0001A713(S0001A713Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadS0001A713(filter);
    }

    public List<S0001A713Filter> loadS0001A713Grilla(S0001A713Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadS0001A713Grilla(filter);
    }

    public List<S0007A720Filter> loadS0007A720Tot(S0007A720Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadS0007A720Tot(filter);
    }
    
    public List<S0001A713Filter> S0001A713TOT(S0001A713Filter filter) throws SQLException, Exception {
        return salesReportDAO.S0001A713TOT(filter);
    }

    public List<PX036S01A1531Filter> loadPX036S01A1531(PX036S01A1531Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadPX036S01A1531(filter);
    }

    public List<PX036S01A1532Filter> loadPX036S01A1532(PX036S01A1532Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadPX036S01A1532(filter);
    }

    public List<PX036S01A1533Filter> loadPX036S01A1533(PX036S01A1533Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadPX036S01A1533(filter);
    }

    public List<PX036S01A1534Filter> loadPX036S01A1534(PX036S01A1534Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadPX036S01A1534(filter);
    }
    
    public List<PX036S01A1721Filter> loadPX036S01A1721(PX036S01A1721Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadPX036S01A1721(filter);
    }
     
    public List<S0001A1730Filter> loadBalance(S0001A1730Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadBalance(filter);
    }
            
    public List<PX036S01A1721Filter> loadReference(PX036S01A1721Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadReference(filter);
    }
    
    public List<PX036S01A1731Filter> loadPX036S01A1731(PX036S01A1731Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadPX036S01A1731(filter);
    }

    public List<PX036S01A1732Filter> loadPX036S01A1732(PX036S01A1732Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadPX036S01A1732(filter);
    }

    public List<PX036S01A1733Filter> loadPX036S01A1733(PX036S01A1733Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadPX036S01A1733(filter);
    }

    public List<PX036S01A1734Filter> loadPX036S01A1734(PX036S01A1734Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadPX036S01A1734(filter);
    }
    
     public List<PX036S01A1735Filter> loadPX036S01A1735(PX036S01A1735Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadPX036S01A1735(filter);
    }
            
    public List<PX036S01A1735Filter> loadReferenceRfnd(PX036S01A1735Filter filter) throws SQLException, Exception {
        return salesReportDAO.loadReferenceRfnd(filter);
    }
    
    public List<S0007A730Filter> loadExchange(S0007A720Filter filter) throws SQLException,Exception {
        return salesReportDAO.loadExchange(filter);
    }
    
    public List<S0007A720Filter> loadEMD(S0007A720Filter filter) throws SQLException,Exception {
        return salesReportDAO.loadEMD(filter);
    }
    
    public List<S0001A713Filter> loadEMDRfnd(S0001A713Filter filter) throws SQLException,Exception {
        return salesReportDAO.loadEMDRfnd(filter);
    }
    
    public List<S0001A714Filter> loadS0001A714(S0001A714Filter filter) throws SQLException,Exception {
        return salesReportDAO.loadS0001A714(filter);
    }
    public S0001A1530Filter setS0003A1530(S0001A1530Filter filter) throws SQLException, Exception {
        return salesReportDAO.setS0003A1530(filter);
    }
    public List<PX038S02A720Filter> getdetailloadErrorTKT(PX038S02A720Filter filter) throws SQLException, Exception {
        return salesReportDAO.getdetailloadErrorTKT(filter);
    }
    public List<PX038S02A720Filter> getdetailloadErrorRFND(PX038S02A720Filter filter) throws SQLException, Exception {
        return salesReportDAO.getdetailloadErrorRFND(filter);
    }
    public List<PX038S02A720Filter> getdetailloadErrorADMACM(PX038S02A720Filter filter) throws SQLException, Exception {
        return salesReportDAO.getdetailloadErrorADMACM(filter);
    }
    public S0001A1530Filter refreshGroup(S0001A1530Filter filter) throws SQLException, Exception {
        return salesReportDAO.refreshGroup(filter);
    }
    public String ProcesaInsertFopManual(PX036S01A1731Filter filter,String ListFop) throws SQLException, Exception {
        return salesReportDAO.ProcesaInsertFopManual(filter,ListFop);
    }
    public String ProcesaDeleteEntryRfndCompleManual(PX036S01A1731Filter filter) throws SQLException, Exception {
        return salesReportDAO.ProcesaDeleteEntryRfndCompleManual(filter);
    }
    public String ProcesaInsertTAXManual(PX036S01A1732Filter filter,String ListTAX) throws SQLException, Exception {
        return salesReportDAO.ProcesaInsertTAXManual(filter,ListTAX);
    }
    public String ProcesaInsertCommiManual(PX036S01A1733Filter filter,String ListCommi) throws SQLException, Exception {
        return salesReportDAO.ProcesaInsertCommiManual(filter,ListCommi);
    }
    public String ProcesaInsertTAXCOMMManual(PX036S01A1731Filter filter,String lstTaxComm) throws SQLException, Exception {
        return salesReportDAO.ProcesaInsertTAXCOMMManual(filter,lstTaxComm);
    }
    public String ProcesaInsertFareCalcRfnd(PX036S01A1735Filter filter) throws SQLException, Exception {
        return salesReportDAO.ProcesaInsertFareCalcRfnd(filter);
    }
}
