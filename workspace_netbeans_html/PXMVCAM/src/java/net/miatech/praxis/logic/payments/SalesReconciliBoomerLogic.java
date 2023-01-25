/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX040S01A1716Filter;
import net.miatech.beans.SQP00697Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.SalesReconciliBoomerDAO;
import net.miatech.praxis.payment.filter.A2324Filter;
import net.miatech.praxis.payment.filter.A2318Filter;

public class SalesReconciliBoomerLogic {

    private final SalesReconciliBoomerDAO SalesReconciliBoomerDAO = new SalesReconciliBoomerDAO();

    public void setSession(IServerSession ss) {
        SalesReconciliBoomerDAO.setSession(ss);

    }

    public List<A2324Filter> loadPX559SQP04019(A2324Filter filter) throws SQLException, Exception {
        return SalesReconciliBoomerDAO.loadPX559SQP04019(filter);
    }

    public List<A2318Filter> loadPX559SQP03991(A2318Filter filter) throws SQLException, Exception {
        return SalesReconciliBoomerDAO.loadPX559SQP03991(filter);
    }

    public HashMap<String, List<A2318Filter>> loadPX559SQP03992(A2318Filter filter) throws SQLException, Exception {
        return SalesReconciliBoomerDAO.loadPX559SQP03992(filter);
    }

    public List<A2324Filter> loadPX559SQP04021(A2324Filter filter) throws SQLException, Exception {
        return SalesReconciliBoomerDAO.loadPX559SQP04021(filter);
    }
    
    public List<A2324Filter> loadPX559SQP04285(A2324Filter filter) throws SQLException, Exception {
        return SalesReconciliBoomerDAO.loadPX559SQP04285(filter);
    }

    public List<A2324Filter> loadPX559SQP04020(A2324Filter filter) throws SQLException, Exception {
        return SalesReconciliBoomerDAO.loadPX559SQP04020(filter);
    }

    public HashMap<String, List<A2324Filter>> loadPX559SQP04013(A2324Filter filter) throws SQLException, Exception {
        return SalesReconciliBoomerDAO.loadPX559SQP04013(filter);
    }

    public List<SQP00697Filter> loadSQP04014(SQP00697Filter filter) throws SQLException, Exception {
        return SalesReconciliBoomerDAO.loadSQP04014(filter);
    }

    public List<PX040S01A1716Filter> loadPXSQP04092(PX040S01A1716Filter filter) throws SQLException, Exception {
        return SalesReconciliBoomerDAO.loadPXSQP04092(filter);
    }

    public List<A2324Filter> loadPX559SQP04120(A2324Filter filter) throws SQLException, Exception {
        return SalesReconciliBoomerDAO.loadPX559SQP04120(filter);
    }
    
    public A2324Filter loadPX559SQP04121(A2324Filter filter) throws SQLException, Exception {
        return SalesReconciliBoomerDAO.loadPX559SQP04121(filter);
    }
    
    public String loadPX559SQP04122(A2324Filter filter) throws SQLException, Exception {
        return SalesReconciliBoomerDAO.loadPX559SQP04122(filter);
    }

    /*
    

     public List<A2324Filter> loadPX287SQP00839(A2324Filter filter) throws SQLException, Exception {
     return SalesReconciliBoomerDAO.loadPX287SQP00839(filter);
     }

     public List<A2324Filter> loadPX287SQP00840(A2324Filter filter) throws SQLException, Exception {
     return SalesReconciliBoomerDAO.loadPX287SQP00840(filter);
     }

     public List<A2324Filter> loadPX287SQP00841(A2324Filter filter) throws SQLException, Exception {
     return SalesReconciliBoomerDAO.loadPX287SQP00841(filter);
     }

     public List<A2324Filter> loadPX287SQP00924(A2324Filter filter) throws SQLException, Exception {
     return SalesReconciliBoomerDAO.loadPX287SQP00924(filter);
     }

     public List<A2324Filter> loadPX287SQP00925(A2324Filter filter) throws SQLException, Exception {
     return SalesReconciliBoomerDAO.loadPX287SQP00925(filter);
     }

     public List<A2324Filter> loadPX287SQP00926(A2324Filter filter) throws SQLException, Exception {
     return SalesReconciliBoomerDAO.loadPX287SQP00926(filter);
     }

     public List<A2324Filter> loadPX287SQP02055(A2324Filter filter) throws SQLException, Exception {
     return SalesReconciliBoomerDAO.loadPX287SQP02055(filter);
     }

     public A2324Filter loadPX407SQP02076(A2324Filter filter) throws SQLException, Exception {
     return SalesReconciliBoomerDAO.loadPX407SQP02076(filter);
     }

     public List<A2324Filter> loadPX407SQP01939(A2324Filter filter) throws SQLException, Exception {
     return SalesReconciliBoomerDAO.loadPX407SQP01939(filter);
     }

     public List<A2324Filter> loadPX407SQP01940(A2324Filter filter) throws SQLException, Exception {
     return SalesReconciliBoomerDAO.loadPX407SQP01940(filter);
     }

     public List<A2324Filter> loadPX407SQP01941(A2324Filter filter) throws SQLException, Exception {
     return SalesReconciliBoomerDAO.loadPX407SQP01941(filter);
     }

     public List<A2324Filter> loadPX407SQP01942(A2324Filter filter) throws SQLException, Exception {
     return SalesReconciliBoomerDAO.loadPX407SQP01942(filter);
     }

     public List<A2324Filter> loadPX407SQP01943(A2324Filter filter) throws SQLException, Exception {
     return SalesReconciliBoomerDAO.loadPX407SQP01943(filter);
     }

     public List<A2324Filter> loadPX407SQP02030(A2324Filter filter) throws SQLException, Exception {
     return SalesReconciliBoomerDAO.loadPX407SQP02030(filter);
     }

     public String loadPX407SQP02077(A2324Filter filter) throws SQLException, Exception {
     return SalesReconciliBoomerDAO.loadPX407SQP02077(filter);
     }

     public List<A2324Filter> loadPX407SQP03990(A2324Filter filter) throws SQLException, Exception {
     return SalesReconciliBoomerDAO.loadPX407SQP03990(filter);
     }



     */
}
