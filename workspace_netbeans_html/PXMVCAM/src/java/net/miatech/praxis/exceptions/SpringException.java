/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.exceptions;

import java.io.PrintWriter;
import java.io.StringWriter;
//import org.apache.commons.logging.Log;
//import org.apache.commons.logging.LogFactory;
import org.apache.log4j.Logger;

/**
 *
 * @author lzambrano
 */
public class SpringException extends RuntimeException {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private static final Logger log = Logger.getLogger(SpringException.class.getName()); // LogFactory.getLog(SpringException.class.getName());
    StringWriter sw = new StringWriter();
    PrintWriter pw = new PrintWriter(sw);
    private String exceptionMsg;

    public SpringException(String exceptionMsg) {
        this.exceptionMsg = exceptionMsg;
    }

    public SpringException(Exception e) {
        e.printStackTrace(pw);
        sw.toString();
        log.error("Message: " + (e.getMessage() == null ? "No Message" : e.getMessage()) + " Stacktrace: " + sw.toString());
    }

    public String getExceptionMsg() {
        return this.exceptionMsg;
    }

    public void setExceptionMsg(String exceptionMsg) {
        this.exceptionMsg = exceptionMsg;
    }
}
