/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.classes;

import com.ibm.as400.access.AS400;
import com.ibm.as400.access.AS400SecurityException;
import com.ibm.as400.access.ProgramCall;
import com.ibm.as400.access.ProgramParameter;
import java.io.IOException;
//import java.util.List;
import java.sql.SQLException;
import java.util.GregorianCalendar;
import java.util.Map;
import javax.naming.Context;
import javax.naming.InitialContext;
import net.miatech.beans.GeneralResponse;
import net.miatech.beans.spring.S0010INF020Filter;
import net.miatech.beans.spring.ServerSession;
import net.miatech.beans.spring.UserView;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.program.UserLogic;
import net.miatech.praxis.persistence.facade.UserFacade;
import net.miatech.praxis.persistence.facadeimpl.UserFacadeImpl;
import net.miatech.praxis.spring.INF001;
import net.miatech.praxis.spring.INF020;
import static net.miatech.utils.Application.char03Conv;
//import net.miatech.praxis.spring.INF021;
import net.miatech.utils.spring.Application;
import net.miatech.utils.spring.SimpleEncrypt;

/**
 *
 * @author lzambrano
 */
public class App extends Application {

    private ServerSession serverSession;
    private SimpleEncrypt se = new SimpleEncrypt();
    public int POST = 1;
    public int PP_CUSER = 2;
    public int PP_PUSER = 3;
    public int PARRAM = 4;
    public int PARRAM_USR = 5;
    public int PARRAM_PWD = 6;
    public int PARRAM_CUST_ALF = 7;
    public int PARAM_PROG = 8;
    public int PARAM_NBRID = 9;
    public String SECURITY_ACCESS = "A";
    public String SECURITY_READ = "L";
    public String SECURITY_CREATE = "C";
    public String SECURITY_MODIFY = "M";
    public String SECURITY_DELETE = "E";
    public String SECURITY_EXPORT = "X";
    //private String strUserFacade = "UserLogic#net.miatech.praxis.persistence.facade.UserFacade";
    public String msgLogin = "";

    public App(Map<String, Object> propertySession) throws Exception {
        super(propertySession);
        this.serverSession = this.getServerSession();
    }

    //public ServerSession getServerSession() {
    //   return serverSession;
    //}
    //public void setServerSession(ServerSession serverSession) {
    //    this.serverSession = serverSession;
    //}
    public void assignAuthentication(INF001 user) throws SQLException, Exception {
        try {
            Context ic = new InitialContext();
            UserFacade logic = new UserFacadeImpl(); //(UserFacade) ic.lookup(strUserFacade);

            logic.setSession(serverSession);
            logic.setApp(this);
            user = logic.obtainUserInfo(user);

            UserView userView = new UserView();
            userView.setUserInfo(user);

            serverSession.setACCCNX(true);
            serverSession.setUserView(userView);
        } catch (Exception e) {
            throw new SpringException(e);
        }

    }
    
    public Object[] autenthicateUser(INF001 user) throws Exception {
        boolean bValidacion = false;
        String strError = "";
        Object[] result = new Object[2];

        long diasExpiracion = -1, diasMinimos = 0;
        AS400 system = null;
        try {
            system = new AS400(serverSession.getAttribute("DB_SERVER_" + serverSession.getAttribute("DB_SERVER_DEFAULT_CALF").toString() + "_" + serverSession.getAttribute("DB_SERVER_DEFAULT_TYPE").toString() + "_HOST").toString(), user.USR, user.TOKEN);
            system.setGuiAvailable(false);
            bValidacion = system.authenticate(user.USR, user.TOKEN);

            if (bValidacion) {
                system.connectService(AS400.AUTHENTICATION_SCHEME_PROFILE_TOKEN);
                GregorianCalendar fechaExpiracion = system.getPasswordExpirationDate();//profile.getSystem().getPasswordExpirationDate();
                if (fechaExpiracion != null) {
                    GregorianCalendar fechaSistema = system.getSignonDate();

                    diasExpiracion = fechaExpiracion.getTime().getTime() - fechaSistema.getTime().getTime();

                    diasExpiracion = diasExpiracion / (1000 * 60 * 60 * 24);

                    diasMinimos = Integer.parseInt(serverSession.getAttribute("DB_SERVER_MINIMU_DAYS_NUMBER").toString());
                    if (diasExpiracion - 7 < diasMinimos && diasExpiracion > 7) {
                        strError = "Your password will expire in " + String.valueOf(diasExpiracion) + " days.";
                    }
                }
            }
        } //        catch (InterruptedException ex) {
        //            bValidacion = false;
        //            strError = ex.getMessage();
        //            
        //        } 
        //        catch (PropertyVetoException ex) {
        //            strError = ex.getMessage();
        //            bValidacion = false;
        //
        //        }         
        catch (AS400SecurityException ex) {
            strError = ex.getMessage();
            bValidacion = false;

        } catch (IOException ex) {
            strError = ex.getMessage();
            bValidacion = false;
        } finally {
            result[0] = bValidacion;
            result[1] = strError;
            if (system != null) {
                system.disconnectAllServices();
            }
        }

        return result;
    }

    public void defaultValidation(GeneralResponse resp, INF020 airline) throws SQLException, Exception {
        Context ic = new InitialContext();
        UserFacade logic = new UserFacadeImpl(); //(UserFacade) ic.lookup(strUserFacade);

        resp.vars.put("customerExists", true);

        S0010INF020Filter customerInfoComplete = new S0010INF020Filter();
        customerInfoComplete.fileINF020 = airline;
        logic.setSession(serverSession);
        logic.setApp(this);
        if (airline.USCR.isEmpty()) {
            customerInfoComplete = logic.obtainCustomerInfo(serverSession.getUserView().getUserInfo(), airline);
        }
        serverSession.getUserView().setCustomerInfoComplete(customerInfoComplete);

        serverSession.setCNXIBMDB2(getConnection(serverSession.getUserView().getUserInfo().USR, serverSession.getUserView().getUserInfo().TOKEN, serverSession.getUserView().getCustomerInfoComplete().fileA005.A005KEY1));

        ///serverSession.getUserView()
        resp.vars.put("MAIN_MENU", "MODE_01"); //menuPrin.jsp
    }

    /* public void log4jConfig(IServerSession ss){
     try{
     PropertyConfigurator.configure(FlexContext.getServletContext().getResource(ss.getAttribute("LOG4J_PROPERTIES")));
     }catch(MalformedURLException e){
     System.err.println(e.getMessage());
     }
     }*/
    public Boolean changePassword(String username, String password, String passwordNew) throws Exception {
        Boolean validateUser = false;
        AS400 system = null;
        try {
            system = new AS400(String.valueOf(serverSession.getAttribute("DB_SERVER_" + String.valueOf(serverSession.getAttribute("DB_SERVER_DEFAULT_CALF")) + "_" + String.valueOf(serverSession.getAttribute("DB_SERVER_DEFAULT_TYPE")) + "_HOST")), username, password);
            system.changePassword(password, passwordNew);

             //Actualizar STAT="A"
            UserLogic logic = new UserLogic();
            logic.setSession(serverSession);  
            
            
            INF001 auth = new INF001();
            auth.USR = username;
            auth.TOKEN = passwordNew;
            
            INF020 usuario = new INF020();
            usuario.USR = username;
            usuario.STAT = "A";
            
            logic.SQP02743(auth, usuario);
            
            validateUser = true;

        } catch (AS400SecurityException ase) {
            String msg = ase.getMessage();
            setMsgLogin(msg);
            validateUser = false;
            //throw new SpringException(ase);
        } catch (java.io.IOException ase) {
            validateUser = false;
            throw new SpringException(ase);
        } finally {
            if (system != null) {
                system.disconnectAllServices();
            }
        }

        return validateUser;
    }

    public String accessSecurityMeessage(String type) {
        String strMsg = "";
        if (type.equals(SECURITY_ACCESS)) {
            strMsg = "Permits access denied";
        } else if (type.equals(SECURITY_READ)) {
            strMsg = "Permits read denied";
        } else if (type.equals(SECURITY_CREATE)) {
            strMsg = "Permits create denied";
        } else if (type.equals(SECURITY_MODIFY)) {
            strMsg = "Permits modify denied";
        } else if (type.equals(SECURITY_DELETE)) {
            strMsg = "Permits delete denied";
        } else if (type.equals(SECURITY_EXPORT)) {
            strMsg = "Permits export denied";
        }
        return strMsg;
    }

    public String getMsgLogin() {
        return msgLogin;
    }

    public void setMsgLogin(String msgLogin) {
        this.msgLogin = msgLogin;
    }
    
    public boolean callCL3050(AS400 system, String library, String cia) throws Exception {
        return CALL_CL3050(system, library, cia);
    }
    
    public static boolean CALL_CL3050(AS400 system, String library, String cia) throws Exception {
        ProgramCall program = new ProgramCall(system);
        String CL3050 = "/QSYS.LIB/" + library + ".LIB/CL3050.PGM";             // Initialize the name of the program to run.
        ProgramParameter[] CL3050_PARM = new ProgramParameter[1];               // Set up the 3 parameters.
        CL3050_PARM[0] = new ProgramParameter(char03Conv.toBytes(cia));         // First parameter is to input a name.
        program.setProgram(CL3050, CL3050_PARM);                                // Set the program name and parameter list.
        return program.run();
    }
}
