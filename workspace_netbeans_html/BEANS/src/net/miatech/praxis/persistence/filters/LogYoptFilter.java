/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.filters;

import java.io.Serializable;
import net.miatech.praxis.persistence.entities.yopt.LogYopt;

/**
 *
 * @author lremicio
 */
public class LogYoptFilter extends LogYopt implements Serializable {
    
    public Pagination page = new Pagination();
    
}
