/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.io.Serializable;
import net.miatech.praxis.A005;
import net.miatech.praxis.INF020;
import net.miatech.praxis.flown.A2826;

/**
 *
 * @author rmayta
 */
public class S0010INF020Filter implements Serializable {
    public INF020 fileINF020 = new INF020();
    public A005 fileA005 = new A005();
    public A2826 fileA2826 = new A2826();
}
