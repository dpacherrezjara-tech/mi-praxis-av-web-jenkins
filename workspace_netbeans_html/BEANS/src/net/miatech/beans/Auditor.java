package net.miatech.beans;
import java.io.*;
/**
 *
 * @author  claudia
 */
public class Auditor implements Serializable {
    
    
    public String strUsuario;
    public String strDepartamento;
    public String strAplicativo;
    public String strNombreUsuario;
    public String strJefeResponsable;
    public String strNivel;
    public String strCiudadBase;
    public String strCodigoBase;
    public boolean booSelect;
    
    /** Creates a new instance of UserView 
     * @param strFirstName New value of property strFirstName.
     * @param strLastName New value of property strLastName.
     */

    public Auditor() {
        strUsuario = "";
        strDepartamento = "";
        strAplicativo = "";
        strNombreUsuario = "";
        strJefeResponsable = "";
        strNivel = "";
        strCiudadBase = "";
        strCodigoBase = "";
    }
    
}
