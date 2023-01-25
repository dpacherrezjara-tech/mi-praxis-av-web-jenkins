/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.accounting;

/**
 *
 * @author asifuentes
 */

public class Layout { 
    
    public String Cliente = "";
    public String Poliza = "";
    public String Lote = "";
    public String NombreArchivo = "";
    public String Tipo = "";
    
    public Layout(){ }
    
    public Layout(String _cliente, String _poliza, String _lote, String _nomArchivo){
        this.Poliza = _poliza;
        this.Lote = _lote;
        this.NombreArchivo = _nomArchivo;
        this.Cliente = _cliente;
    }
}
