/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.tracking;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.Iterator;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 *
 * @author lzambrano
 */
public class DaoException extends Exception{
    static Log log = LogFactory.getLog(DaoException.class.getName());
        
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        String newLine = System.getProperty("line.separator");
        public DaoException(Exception e, Object obj) {
        try {
                Class clase;
                Field campo, campos[];
                String valor, strClassName;
                Map<String, Object> properties = BeanUtils.describe(obj);
                e.printStackTrace(pw);
                sw.toString();
                String strObjectInfo = "ObjectInfo -> ";
                Iterator it = properties.entrySet().iterator();
                while (it.hasNext()) {
                    Map.Entry pairs = (Map.Entry)it.next();
                    System.out.println(pairs.getKey() + " = " + pairs.getValue());
                    strObjectInfo+=(pairs.getKey() + " = " + pairs.getValue() + newLine);
                    strClassName = String.valueOf(pairs.getValue()).replace("class ", "");
                    clase = Class.forName(strClassName);
                    campos = clase.getFields();
                    strObjectInfo+=" Values: " + newLine;
                    for (int i = 0; i < campos.length; i++) {
                        campo = campos[i];
                        valor = String.valueOf(campo.get(obj));
                        strObjectInfo+=campo.getName() + "=" + valor + newLine;
                    }
                    it.remove(); 
                    log.error("DAO Error Message: " + e.getMessage() + newLine + " DAO Parameters : " + strObjectInfo + newLine + " DAO Stacktrace: " + sw.toString());
                }
                
            } catch (IllegalAccessException ex) {
                Logger.getLogger(DaoException.class.getName()).log(Level.SEVERE, null, ex);
            } catch (InvocationTargetException ex) {
                Logger.getLogger(DaoException.class.getName()).log(Level.SEVERE, null, ex);
            } catch (NoSuchMethodException ex) {
                Logger.getLogger(DaoException.class.getName()).log(Level.SEVERE, null, ex);
            } catch (ClassNotFoundException ex) {
                Logger.getLogger(DaoException.class.getName()).log(Level.SEVERE, null, ex);
            }
	}
}
