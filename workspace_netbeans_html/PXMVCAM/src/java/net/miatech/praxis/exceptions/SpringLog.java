/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.exceptions;

import java.io.PrintWriter;
import java.io.StringWriter;
import org.apache.log4j.Logger;

/**
 *
 * @author lzambrano
 */
public class SpringLog {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private static final Logger log = Logger.getLogger(SpringException.class.getName()); // LogFactory.getLog(SpringException.class.getName());
    StringWriter sw = new StringWriter();
    PrintWriter pw = new PrintWriter(sw);
    private String exceptionMsg;

    public SpringLog(String exceptionMsg) {
        this.exceptionMsg = exceptionMsg;
        log.error("Message: " + (exceptionMsg == null ? "No Message" : exceptionMsg));
    }

    public SpringLog(Exception e) {
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
