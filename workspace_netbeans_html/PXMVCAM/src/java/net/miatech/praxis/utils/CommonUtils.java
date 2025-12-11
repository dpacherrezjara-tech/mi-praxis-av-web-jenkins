/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.utils;

/**
 *
 * @author singa
 */
public class CommonUtils {
    
    /**
     * Quita espacios y si es null devuelve ""
     */
    public static String trimOrEmpty(String value) {
        return (value == null ? "" : value.trim());
    }
    
    
    
}
