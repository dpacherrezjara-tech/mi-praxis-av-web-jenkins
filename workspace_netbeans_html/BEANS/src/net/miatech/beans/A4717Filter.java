/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.beans;

import net.miatech.praxis.A4717;

/**
 *
 * @author zperez
 */
public class A4717Filter extends A4717 {

    public String IN_OPTION = "";
    public String IN_TYPEPROCES = "";
    public String IN_USER = "";
    public String IN_DATETO = "";
    public String IN_DATEFROM = "";

    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
