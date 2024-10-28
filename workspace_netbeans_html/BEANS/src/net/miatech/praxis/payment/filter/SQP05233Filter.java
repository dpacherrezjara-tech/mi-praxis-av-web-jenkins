/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.miatech.beans.DBException;
import net.miatech.praxis.payment.A4545;
import net.miatech.utils.CustomPageImpl;

/**
 *
 * @author vhidalgo
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SQP05233Filter extends CustomPageImpl {

    public String IN_IDCONT; 
    List<A4545> response = new ArrayList<>();
    public DBException dbException = new DBException();
    

}
