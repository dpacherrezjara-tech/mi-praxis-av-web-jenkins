/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.classes;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.apache.log4j.Logger;

/**
 *
 * @author lzambrano
 */
/**
 * ClientSecurityUtil.java - 
 * @author 
 *
 */
public class ClientSecurityUtil {
	
	private static final Logger logger = Logger.getLogger("errorLog");
	
	private static String  private_key="";
	private static String  public_key="";
	
	private String sCharformat ="ASCII"; // "ISO-8859-1";
	//public static final String PUBLIC_KEY = "PUBLIC";
	private static final char kHexChars[] =
	{ '0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F' };

	
	public ClientSecurityUtil(){
		
	}

	/**
	 * This API getPublicKey() is used to get the web services PUBLIC KEY
	 * String
	 * @return
	 */
	public String getPublicKey() {
			return public_key; 
	}
	/**
	 * This API getPrivateKey() is used to get the web services PRIVATER KEY for a given application
	 * String
	 * @param applicationName
	 * @return
	 */
	public  void setPrivateKey(String privateKey) { 
	private_key=privateKey;
	}
	public void setPublicKey(String publicKey) {
	 public_key=publicKey;
	}
	public String getPrivateKey() {
		return  private_key;
	
}
	public String getPrivateKey(String applicationName) {
			return  private_key;
		
	}
	/**
	 * This API decryptMessage() is used to decrypt a given message using the provided key. 
	 * @param key
	 * @param message
	 * @return
	 * @throws 
	 */
	public String decryptMessage(String key, String message)throws Exception{
		try{
			Cipher cipherClass = getCipherClass(key,Cipher.DECRYPT_MODE);

			byte[] byteVal = hexToBuffer(message); 
			byte[] result = cipherClass.doFinal(byteVal);       
			return new String(result,sCharformat);
		}catch(BadPaddingException nspe){ 
			logger.error("BadPaddingException caught >" + nspe);
			throw new Exception("Error While Decrypting Message"+nspe.getMessage()); 
		}catch(java.io.IOException ioe ){ 
			logger.error("IOException caught >" + ioe);
			throw new Exception("Error While Decrypting Message"+ioe.getMessage()); 
		}catch (IllegalBlockSizeException ibe) {
			logger.error("IllegalBlockSizeException caught >" + ibe);
			throw new Exception("Error While Decrypting Message"+ibe.getMessage()); 
		}catch (NumberFormatException nbfe) {
			logger.error("Exception caught >" + nbfe);
			throw new Exception("Error While Decrypting Message"+nbfe.getMessage()); 
		}catch (Exception e) {
			logger.error("Exception caught >" + e);
			throw new Exception("Error While Decrypting Message"+e.getMessage()); 
		}
	}
	/**
	 * This API encryptMessage() is used to encrypt a given message using the provided key. 
	 * @param key
	 * @param message
	 * @return
	 * @throws 
	 */
	public String encryptMessage(String key, String message)throws Exception{
		try{
		
			Cipher cipherClass = getCipherClass(key,Cipher.ENCRYPT_MODE);
			byte[] aValuebytes = message.getBytes(sCharformat);
			
	        byte[] result = cipherClass.doFinal(aValuebytes);   
	        
	        return bufferToHex(result);
	        
		}catch(BadPaddingException nspe){ 
			logger.error("BadPaddingException caught >" + nspe);
	        throw new Exception("Error While Encrypting Message "+nspe.getMessage()); 
	    }catch(java.io.IOException ioe ){ 
	    	logger.error("Exception caught >" + ioe);
	        throw new Exception("Error While Encrypting Message "+ioe.getMessage()); 
	    }catch (IllegalBlockSizeException ibse) {
	    	logger.error("Exception caught >" + ibse);
	        throw new Exception("Error While Encrypting Message "+ibse.getMessage()); 
	    }catch (Exception e) {
	    	logger.error("Exception caught >" + e);
	        throw new Exception("Error While Encrypting Message "+e.getMessage()); 
	    }
	}

	private Cipher getCipherClass(String key, int opMode) throws Exception{
		Cipher aCipher = null;
		SecretKeySpec myKey = null;
		IvParameterSpec ivspec = null;

		//Initilization Vector
		byte[] myIV = {(byte)50,(byte)51,(byte)52,(byte)53,(byte)54,(byte)55,(byte)56,(byte)57};

		try{			
			//create an instance of the cipher class using 
			//public static Cipher getInstance(String transformation);
			//A transformation is of the form: "algorithm/mode/padding"
			//Algorithm used here : DESede: Triple DES Encryption (DES-EDE). 
			//Mode used here : CBC: Cipher Block Chaining Mode, as defined in FIPS PUB 81
			//Padding : PKCS5Padding: The padding scheme described in: RSA Laboratories, "PKCS #5: Password-Based Encryption Standard," version 1.5, November 1993

			aCipher = Cipher.getInstance("DESede/CBC/PKCS5Padding");  //DESede/ECB/PKCS5Padding");
			myKey = new SecretKeySpec(key.getBytes(sCharformat), "DESede");
			ivspec = new IvParameterSpec(myIV); //Initialization Vector

			//  initialize cipher object to one of four modes that are final integer constants in the Cipher class..
			// eg...ENCRYPT_MODE  i.e.Encryption of Data
			// public void init(int opmode, Key key, AlgorithmParameterSpec params);
			// The following cipher algorithms implemented by the SunJCE provider use parameters: 
			// DES, DES-EDE, and Blowfish, when used in feedback (i.e., CBC, CFB, OFB, or PCBC) mode,
			// use an initialization vector (IV). The javax.crypto.spec.IvParameterSpec class can be used 
			// to initialize a Cipher object with a given IV.      

			aCipher.init(opMode, myKey,ivspec);

			/*   
	         aCipher = Cipher.getInstance("DESede");
	         DESedeKeySpec pbeKeySpec = new DESedeKeySpec(sKey.getBytes(sCharformat));
	         SecretKeyFactory keyFac = SecretKeyFactory.getInstance("DESede");
	         aKey = keyFac.generateSecret( pbeKeySpec);
	         aCipher.init(Cipher.ENCRYPT_MODE, aKey);			 */

		}catch(NoSuchAlgorithmException nsae){
			logger.error("In SecurityUtilServiceImpl Exception caught >" + nsae);
			throw new Exception("Internal Server Error"+nsae.getMessage());}
		catch ( NoSuchPaddingException e ){ 
			logger.error("In SecurityUtilServiceImpl Exception caught >" + e);
			throw new Exception("Internal Server Error"+e.getMessage()); }
		catch ( UnsupportedEncodingException e ){ 
			logger.error("In SecurityUtilServiceImpl Exception caught >" + e);
			throw new Exception("In SecurityUtilServiceImpl Internal Server Error " + e.getMessage()); }
		catch ( InvalidKeyException e ){ 
			logger.error("In SecurityUtilServiceImpl Exception caught >" + e);
			throw new Exception("In SecurityUtilServiceImpl Internal Server Error " + e.getMessage()); }
		catch (InvalidAlgorithmParameterException e){ 
			logger.error("In SecurityUtilServiceImpl Exception caught >" + e);
			throw new Exception("In SecurityUtilServiceImpl Internal Server Error " + e.getMessage());}
		return aCipher;
	}


	private byte[] hexToBuffer(String hexString) throws NumberFormatException
	{

		int     length = hexString.length();
		byte[]  buffer = new byte[(length + 1) / 2];
		boolean evenByte = true;
		byte    nextByte = 0;
		int     bufferOffset = 0;


		// If given an odd-length input string, there is an implicit
		// leading '0' that is not being given to us in the string.
		// In that case, act as if we had processed a '0' first.
		// It's sufficient to set evenByte to false, and leave nextChar
		// as zero which is what it would be if we handled a '0'.
		if ((length % 2) == 1)
			evenByte = false;

		for (int i = 0; i < length; i++)
		{
			char c = hexString.charAt(i);
			int  nibble; // A "nibble" is 4 bits: a decimal 0..15

			if ((c >= '0') && (c <= '9'))
				nibble = c - '0';
			else if ((c >= 'A') && (c <= 'F'))
				nibble = c - 'A' + 0x0A;
			else if ((c >= 'a') && (c <= 'f'))
				nibble = c - 'a' + 0x0A;
			else
				throw new NumberFormatException("Invalid hex digit '" + c + "'.");

			if (evenByte)
			{
				nextByte = (byte) (nibble << 4);
			}
			else
			{
				nextByte += (byte) nibble;
				buffer[bufferOffset++] = nextByte;
			}

			evenByte = ! evenByte;
		}
		return buffer;
	}//hexToBuffer()


	/*private String stringToHex(String s)
	{     
		byte[] stringBytes = s.getBytes();
		return bufferToHex(stringBytes);      
	}//stringToHex()
*/
	private void appendHexPair(byte b, StringBuffer hexString)
	{
		char highNibble = kHexChars[(b & 0xF0) >> 4];
		char lowNibble = kHexChars[b & 0x0F];

		hexString.append(highNibble);
		hexString.append(lowNibble);
	}//appendHexPair()

	private String bufferToHex(byte buffer[])
	{
		return bufferToHex(buffer, 0, buffer.length);
	}//bufferToHex(byte[])

	private String bufferToHex(byte buffer[], int startOffset, int length)
	{


		StringBuffer hexString = new StringBuffer(2 * length);
		int          endOffset = startOffset + length;

		for (int i = startOffset; i < endOffset; i++)
			appendHexPair(buffer[i], hexString);
		return hexString.toString();
	}//bufferToHex()

	/**
	 * void
	 * @param args
	 */
	

}
