/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.panel;

/**
 *
 * @author lzambrano
 */
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.beans.S0007INF053Filter;
import net.miatech.beans.S0008INF020Filter;
import net.miatech.beans.S0010INF020Filter;
import net.miatech.beans.implement.IServerSession;
import net.miatech.dao.UserDAO;
import net.miatech.praxis.A2149;
import net.miatech.praxis.INF001;
import net.miatech.praxis.INF020;
import net.miatech.praxis.classes.App;
import net.miatech.praxis.classes.PraxisSecurityException;
import net.miatech.utils.Application;
import net.miatech.utils.implement.IApp;

/**
 *
 * @author mflor
 */
public class UserLogic {

    private UserDAO userDAO = new UserDAO();

    /**
     * Creates a new instance of UserLogic
     */
    public void setSession(IServerSession ss) {
        userDAO.setSession(ss);
    }

    public void setApp(Application app) {
        userDAO.setApp(app);
        userDAO.setIApp((IApp) app);
    }

    public List<S0008INF020Filter> validateAirlinesAllowed(S0008INF020Filter filter) throws SQLException, Exception {
        return userDAO.validateAirlinesAllowed(filter);
    }

    public INF001 obtainUserInfo(INF001 filter) throws SQLException, Exception {
        return userDAO.obtainUserInfo(filter);
    }

    public S0010INF020Filter obtainCustomerInfo(INF001 user, INF020 filter) throws SQLException, Exception {
        return userDAO.obtainCustomerInfo(user, filter);
    }

    public Boolean autentificateUser(INF001 user) {
        return userDAO.autentificateUser(user);
    }

    public Object[] autenthicateUser(INF001 user) {
        return userDAO.autenthicateUser(user);
    }

    public List<Map<?, ?>> obtainMenu(String appCode) throws SQLException, Exception {
        return userDAO.obtainMenu(appCode);
    }

    public List<Map<?, ?>> obtainMenu(String appCode, String mnuType) throws SQLException, Exception {
        return userDAO.obtainMenu(appCode, mnuType);
    }

    public boolean accessSecurity(S0007INF053Filter filter) throws SQLException, Exception {
        return userDAO.accessSecurity(filter);
    }

    /*public void accessSecurityTrigger(S0007INF053Filter filter) throws PraxisSecurityException, SQLException, Exception {
        if (!accessSecurity(filter)) {
            PraxisSecurityException pse = new PraxisSecurityException(App.accessSecurityMeessage(filter.IN_TPERM));
            throw pse;
        }
    }*/

    public PX041S01INF001Filter accessProgram(PX041S01INF001Filter filter) throws SQLException, Exception {
        return userDAO.accessProgram(filter);
    }

    public List<PX041S01INF001Filter> accessUser(PX041S01INF001Filter filter) throws SQLException, Exception {
        return userDAO.accessUser(filter);
    }

    public List<A2149> obtainFavorite() throws Exception {
        return userDAO.obtainFavorite();
    }

    public void logAccessProgram(PX041S01INF001Filter filter) throws Exception {
        userDAO.logAccessProgram(filter);
    }
    
    public void SQP02491(String usuario) throws SQLException, Exception {
        userDAO.SQP02491(usuario);
    }
    
    public void SQP03266(String usuario, String expiredDate) throws SQLException, Exception {
        userDAO.SQP03266(usuario,expiredDate);
    }
    
    public void SQP02743(INF001 auth, INF020 usuario) throws SQLException, Exception {
        userDAO.SQP02743(auth, usuario);
    }
    
    public void SQP03218(String usuario, String pass) throws SQLException, Exception {
        userDAO.SQP03218(usuario, pass);
    }
    
    public void SQP03219(String usuario, String clave, String desc) throws SQLException, Exception {
        userDAO.SQP03219(usuario, clave, desc);
    }
    
    public boolean SQP03268(String usuario) throws SQLException, Exception {
        return userDAO.SQP03268(usuario);
    }
}