/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.librfnd.filter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.Pagination;
import net.miatech.librfnd.A3096;
import net.miatech.librfnd.A3097;

/**
 *
 * @author claudia
 */
public class A3096Filter extends A3096 implements Serializable {

    public int RN;
    public String CCIA = "";
    public String FORMA = "";
    public String SERIE = "";
    public String IN_DATE = "";
    public String IN_COUNTRY = "";
    public String IN_TICKET = "";
    public String IN_PNR = "";
    public String IN_NROSOL = "";
    public String strTicket = "";
    public String strMsj = "";
    public String strEstado = "";
    public String strDescripcion = "";
    public String strNomPasajero = "";
    public String strFormatSDATE = "";
    public String strDescPais = "";
    public String strDescCiudad = "";
    public String strDescPaisE = "";
    public String strDescCiudadE = "";
    public String strAttach = "";
    public String strConj = "";
    public String strTitulo = "";
    public String strSFOP = "";
    public String strRFOP = "";
    
    public String strFileSABRE = "";
    public String strFileWEBDEV = "";
    
    public String strTRFND = "";
    public String strFLAG = "";
    public String strTENVI = "";
    public String strTMOTI = "";
    public String strTRUTA = "";
    public String strTEMI = "";
    public String strTFARE = "";
    public String strLPFN = "";
    public String strINFC = "";
    public double dblMontoUsadoUSD = 0;
    public double dblMontoUsadoLoc = 0;
    
    public long lngQTOTAL = 0;
    public Pagination page = new Pagination();
    public List<A3097> lstCupones = new ArrayList<A3097>();
    
    public String getEstado(String strEstado, String idioma) {
        String strDescEstado = "";
        if (idioma.trim().equals("ES")) {
            if (this.A3096ESTAD.trim().equals("3")) {
                strDescEstado = "Pendiente";
            } else if (this.A3096ESTAD.trim().equals("0")) {
                strDescEstado = "En Proceso";
            } else if (this.A3096ESTAD.trim().equals("2")) {
                strDescEstado = "En Consulta";
            } else if (this.A3096ESTAD.trim().equals("1")) {
                strDescEstado = "Denegado";
            }
        } else {
            //EN
            if (this.A3096ESTAD.trim().equals("3")) {
                strDescEstado = "Pending";
            } else if (this.A3096ESTAD.trim().equals("0")) {
                strDescEstado = "Processing";
            } else if (this.A3096ESTAD.trim().equals("2")) {
                strDescEstado = "In Consultation";
            } else if (this.A3096ESTAD.trim().equals("1")) {
                strDescEstado = "Denied";
            }
        }
        return strDescEstado;
    }

    public String getDescTRFND() {
        String strTRFND = "";
        if (this.A3096TRFND.trim().equals("T")) {
            strTRFND = "Total";
        } else if (this.A3096TRFND.trim().equals("P")) {
            strTRFND = "Parcial";
        }
        return strTRFND;
    }

    public String getDescFLAG() {
        String strFLAG = "";
        if (this.A3096FLAG.trim().equals("I")) {
            strFLAG = "Inicio";
        } else if (this.A3096FLAG.trim().equals("C")) {
            strFLAG = "Continuación";
        }
        return strFLAG;
    }
    
    public String getDescTENVI() {
        String strTENVI = "";
        if (this.A3096TENVI.trim().equals("1")) {
            strTENVI = "ANAC";
        } else {
            strTENVI = "Normal";
        }
        return strTENVI;
    }

    public String getDescTMOTI() {
        String strTMOTI = "";
        if (this.A3096TMOTI.trim().equals("I")) {
            strTMOTI = "Involuntario";
        } else if (this.A3096TMOTI.trim().equals("V")) {
            strTMOTI = "Voluntario";
        }
        return strTMOTI;
    }

    public String getDescTRUTA() {
        String strTRUTA = "";
        if (this.A3096TRUTA.trim().equals("D")) {
            strTRUTA = "Doméstico";
        } else if (this.A3096TRUTA.trim().equals("I")) {
            strTRUTA = "Internacional";
        }
        return strTRUTA;
    }

    public String getDescTEMI() {
        String strTEMI = "";
        if (this.A3096TEMI.trim().equals("1")) {
            strTEMI = "Primera Emisión";
        } else if (this.A3096TEMI.trim().equals("2")) {
            strTEMI = "Re-emisión";
        }
        return strTEMI;
    }

    public String getDescTFARE() {
        String strTFARE = "";
        if (this.A3096TFARE.trim().equals("1")) {
            strTFARE = "No Reembolsable";
        } else if (this.A3096TFARE.trim().equals("0")) {
            strTFARE = "Reembolsable";
        }
        return strTFARE;
    }

    public String getDescLPFN() {
        String strLPFN = "";
        if (this.A3096LPFN.trim().equals("L")) {
            strLPFN = "LANPASS";
        } else if (this.A3096LPFN.trim().equals("F")) {
            strLPFN = "Funcionario";
        }
        return strLPFN;
    }

    public String getDescINFC() {
        String strINFC = "";
        if (this.A3096INFC.trim().equals("0")) {
            strINFC = "Generado";
        } else if (this.A3096INFC.trim().equals("1")) {
            strINFC = "Batch OK";
        } else if (this.A3096INFC.trim().equals("2")) {
            strINFC = "Batch Error";
        } else if (this.A3096INFC.trim().equals("3")) {
            strINFC = "Manual";
        } else if (this.A3096INFC.trim().equals("4")) {
            strINFC = "Validación Error";
        }
        return strINFC;
    }
}
