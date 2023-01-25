/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.classes;

/**
 *
 * @author rmayta
 */
public class PraxisSecurityException extends Exception {
    public String PERMIT = "";
    
    public PraxisSecurityException(String exc){
        super(exc);
    }
    
    @Override
    public String getMessage(){
        return super.getMessage();
    }
}
