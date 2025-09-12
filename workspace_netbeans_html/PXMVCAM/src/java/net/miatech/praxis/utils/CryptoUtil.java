/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.utils;

import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import net.miatech.praxis.classes.CurrentSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 *
 * @author zperez
 */
@Component
@Scope("request")
public class CryptoUtil {

    // Método para encriptar texto plano
    public static String encrypt(String plainText, String secretKey, String vectorKey) throws Exception {
        IvParameterSpec iv = new IvParameterSpec(vectorKey.getBytes("UTF-8"));
        SecretKeySpec skeySpec = new SecretKeySpec(secretKey.getBytes("UTF-8"), "AES");

        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
        cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);

        byte[] encrypted = cipher.doFinal(plainText.getBytes("UTF-8"));
        return Base64.getEncoder().encodeToString(encrypted);
    }

    // Método para desencriptar texto cifrado
    public static String decrypt(String encryptedText, String secretKey, String vectorKey) throws Exception {
        IvParameterSpec iv = new IvParameterSpec(vectorKey.getBytes("UTF-8"));
        SecretKeySpec skeySpec = new SecretKeySpec(secretKey.getBytes("UTF-8"), "AES");

        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
        cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);

        byte[] decodedBytes = Base64.getDecoder().decode(encryptedText);
        byte[] original = cipher.doFinal(decodedBytes);
        return new String(original, "UTF-8");
    }

}
