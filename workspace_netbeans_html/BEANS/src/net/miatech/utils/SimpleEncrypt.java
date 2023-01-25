/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.utils;

import java.text.DecimalFormat;
import java.util.Random;

/**
 *
 * @author rmayta
 */
public class SimpleEncrypt {

    private DecimalFormat df01 = new DecimalFormat("000");

    public SimpleEncrypt(){

    }

    private String replaceEncode(String pText){

        String text = "";
        
        for(int j = 0; j < pText.length(); j++){

            int letter = Integer.parseInt(pText.substring(j, (j + 1)));
            
            switch(letter){
                case 0: text += "z"; break;
                case 1: text += "q"; break;
                case 2: text += "W"; break;
                case 3: text += "x"; break;
                case 4: text += "y"; break;
                case 5: text += "i"; break;
                case 6: text += "O"; break;
                case 7: text += "m"; break;
                case 8: text += "0"; break;
                case 9: text += "J"; break;
                default: break;
            }
        }

        return text;
    }

    private String replaceDecode(String pText){

        String text = "";

        for(int j = 0; j < pText.length(); j++){

            String t = pText.substring(j, (j + 1));

            if(t.equals("z")) text += "0";
            if(t.equals("q")) text += "1";
            if(t.equals("W")) text += "2";
            if(t.equals("x")) text += "3";
            if(t.equals("y")) text += "4";
            if(t.equals("i")) text += "5";
            if(t.equals("O")) text += "6";
            if(t.equals("m")) text += "7";
            if(t.equals("0")) text += "8";
            if(t.equals("J")) text += "9";
        }

        return text;
    }

    private String generateRandomString(int pMaxRandom, int pCountCharacters){

        Random random = new Random();
        String text = "";

        for(int j = 0; j < pCountCharacters; j++){
            text += df01.format(random.nextInt(pMaxRandom));
        }

        return text;
    }

    private String generateCheckDigit(String pText){

        int intCheckDigit = 0;

        for(int j = 0; j < pText.length(); j++){
            intCheckDigit += Integer.parseInt(pText.substring(j, (j + 1)));
        }

        return df01.format(intCheckDigit);
    }

    private String previusEncode(String pText){

        String text01 = "";

        for(int j = 0; j < pText.length(); j++){
            text01 += df01.format((int)pText.charAt(j));
        }

        return text01;
    }

    private String previusDecode(String pText){

        String text = "";

        for(int j = 0; j < pText.length(); j += 3){

            int ascii = Integer.parseInt(pText.substring(j, (j + 3)));
            String letter = new Character(((char)ascii)).toString();

            text += letter;
        }

        return text;
    }
    
    public String encode(String pText){

        String text01 = previusEncode(pText);

        int generateLength = (((120 - 24) - text01.length()) / 3);
        String grs = generateRandomString(999, generateLength);
        String gltext = df01.format(generateLength);

        String text02 = grs
                + text01
                + previusEncode(df01.format(grs.length()))
                + generateRandomString(9, 1)
                + gltext
                + generateRandomString(9, 2)
                + generateCheckDigit(grs.substring(0, 3));

        return replaceEncode(text02);
    }
    
    public String decode(String pText) throws Exception {

        String text = "";
        String text01 = replaceDecode(pText);

        String CD1 = generateCheckDigit(text01.substring(0, 3));
        String CD2 = text01.substring(117, 120);

        if(!CD1.equals(CD2)){
            throw new Exception("Incorrect Check Digit.");
        }else{
            int position = Integer.parseInt(previusDecode(text01.substring(96, 105)));

            text = previusDecode(text01.substring(position, 96));
        }

        return text;
    }

    public static void main(String args[]){
        SimpleEncrypt se = new SimpleEncrypt();
        
        System.out.println(se.encode("hola como estas ronald"));
        try{
            System.out.println(se.decode("xJy0y0OyzWzzqOqO00xWimmyiOOyWWqzyqqqqz0zJmzxWzJJqqqqzJqqqzxWqzqqqiqqOzJmqqizxWqqyqqqqqzzJmqz0qzzzy0ziqzy0zzizqzzzOzzizqO"));
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
    }

}
