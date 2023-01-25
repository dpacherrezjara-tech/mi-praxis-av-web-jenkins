/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author rmayta
 */
public class GeneralResponse {
    public ArrayList<String> info = new ArrayList<String>(0);                   //[value]
    public ArrayList<String> infoSecurity = new ArrayList<String>(0);                   //[value]
    public HashMap<String, Object> vars = new HashMap<String, Object>(0);       //[Key, Value]
    public  PX041S01INF001Filter accessInfo = new PX041S01INF001Filter();
    public List<PX041S01INF001Filter> accessUser = new ArrayList<PX041S01INF001Filter>(0);
    public boolean BoSessionExpired = false;
}
