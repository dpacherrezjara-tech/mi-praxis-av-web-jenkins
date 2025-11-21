package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.DataImportMonitoringDAO;
import net.miatech.praxis.payment.MPFER90;

@Service
public class DataImportMonitoringLogic {

    
     private final DataImportMonitoringDAO Dataimport = new DataImportMonitoringDAO();
     
     public void setSession(IServerSession ss){
        Dataimport.setSession(ss);
    }
     
     
      public List<MPFER90> listProcesses(MPFER90 filter) throws SQLException, Exception {
        return Dataimport.listProcesses(filter);

    }
     
     
     

    
    
    
    
    
    
      
    
    
}
