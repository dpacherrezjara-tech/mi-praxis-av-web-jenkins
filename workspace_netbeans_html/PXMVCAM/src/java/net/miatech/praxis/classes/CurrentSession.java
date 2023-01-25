/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.classes;
 
import java.util.List;
import java.util.Map;
import net.miatech.beans.PX019S01A721Filter;
import net.miatech.beans.spring.ServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.A003;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 *
 * @author rmayta
 */
@Component
@Scope("session")
public class CurrentSession {
    
    public String CCUST = "";
    public String CUSER = "";
    public String ACUST = "";
    public String PUSER = "";
    public String DEFAULT_CUSER = "";
    
    public Map<String,Object> propertySession;
    public ServerSession serverSession;
    public String appRoot = "";
    
    public List<A1007> lstCiudades;
    public List<A006> lstPaises;
    public List<PX019S01A721Filter> lstFB;
    public List<A003> lstAM;
    
    public List<A1007> getCiudades() {
        return lstCiudades;
    }

    public void setCiudades(List<A1007> paramCiudades) {
        this.lstCiudades = paramCiudades;
    }
    
    public void setFareBasis(List<PX019S01A721Filter> paramFB) {
        this.lstFB = paramFB;
    }
    
    public void setAgentMasterFile(List<A003> paramAM) {
        this.lstAM = paramAM;
    }
    
    public List<A006> getPaises() {
        return lstPaises;
    }
    
    public List<PX019S01A721Filter> getFareBasis() {
        return lstFB;
    }

    public List<A003> getAgentMaster() {
        return lstAM;
    }
    
    public void setPaises(List<A006> paramPaises) {
        this.lstPaises = paramPaises;
    }
    
    public String getAppRoot() {
        return appRoot;
    }

    public void setAppRoot(String appRoot) {
        this.appRoot = appRoot;
    }
    
    public ServerSession getServerSession() {
        return serverSession;
    }

    public void setServerSession(ServerSession serverSession) {
        this.serverSession = serverSession;
    }

    public String getCCUST() {
        return CCUST;
    }

    public void setCCUST(String CCUST) {
        this.CCUST = CCUST;
    }

    public String getCUSER() {
        return CUSER;
    }

    public void setCUSER(String CUSER) {
        this.CUSER = CUSER;
    }

    public String getACUST() {
        return ACUST;
    }

    public void setACUST(String ACUST) {
        this.ACUST = ACUST;
    }

    public String getPUSER() {
        return PUSER;
    }

    public void setPUSER(String PUSER) {
        this.PUSER = PUSER;
    }

    public String getDEFAULT_CUSER() {
        return DEFAULT_CUSER;
    }

    public void setDEFAULT_CUSER(String DEFAULT_CUSER) {
        this.DEFAULT_CUSER = DEFAULT_CUSER;
    }

    public Map<String,Object> getPropertySession() {
        return propertySession;
    }

    public void setPropertySession(Map<String,Object> propertySession) {
        this.propertySession = propertySession;
    }
}
