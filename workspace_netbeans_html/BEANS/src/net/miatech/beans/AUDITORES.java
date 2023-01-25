package net.miatech.beans;
import java.io.*;
/**
 *
 * @author  claudia
 */
public class AUDITORES implements Serializable {
    
    
    private String strUsuario;    
    private String strDepartamento;
    private String strAplicativo;
    private String strNombreUsuario;
    private String strJefeResponsable;
    private String strNivel;
    private String strCiudadBase;
    private String strCodigoBase;
    private boolean booSelect;
    
    /** Creates a new instance of UserView 
     * @param strFirstName New value of property strFirstName.
     * @param strLastName New value of property strLastName.
     */

    public AUDITORES() {
        strUsuario = "";
        strDepartamento = "";
        strAplicativo = "";
        strNombreUsuario = "";
        strJefeResponsable = "";
        strNivel = "";
        strCiudadBase = "";
        strCodigoBase = "";
    }    
    
    public String getStrUsuario() {
        return this.strUsuario;
    }
    
    public void setStrUsuario(String strUsuario) {
        this.strUsuario = strUsuario;
    }
    
    
    public String getStrDepartamento() {
        return this.strDepartamento;
    }
    
    public void setStrDepartamento(String strDepartamento) {
        this.strDepartamento = strDepartamento;
    }
    
    
    public String getStrAplicativo() {
        return this.strAplicativo;
    }
    
    public void setStrAplicativo(String strAplicativo) {
        this.strAplicativo = strAplicativo;
    }
    
    
    public String getStrNombreUsuario() {
        return this.strNombreUsuario;
    }
    
    public void setStrNombreUsuario(String strNombreUsuario) {
        this.strNombreUsuario = strNombreUsuario;
    }
    
    
    public String getStrJefeResponsable() {
        return this.strJefeResponsable;
    }
    
    public void setStrJefeResponsable(String strJefeResponsable) {
        this.strJefeResponsable = strJefeResponsable;
    }

    
    public String getStrNivel() {
        return this.strNivel;
    }

    public void setStrNivel(String strNivel) {
        this.strNivel = strNivel;
    }
    
    
    public String getStrCiudadBase() {
        return this.strCiudadBase;
    }
    
    public void setStrCiudadBase(String strCiudadBase) {
        this.strCiudadBase = strCiudadBase;
    }
    
    
    public String getStrCodigoBase() {
        return this.strCodigoBase;
    }
    
    public void setStrCodigoBase(String strCodigoBase){
        this.strCodigoBase = strCodigoBase;
    }
    
    
    public boolean isBooSelect() {
        return this.booSelect;
    }

    public void setBooSelect(boolean booSelect) {
        this.booSelect = booSelect;
    }
    
}
