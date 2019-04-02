package com.msg.msg.encryption;

import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class CryptoConverter {

	private static final String ALGORITHM = "AES/ECB/PKCS5Padding";
	private static final byte[] KEY = "NsP#ikr0Ol$1697!".getBytes();

	public static String encrypt(String pwd) {
		Key key = new SecretKeySpec(KEY, "AES");
		try {
			Cipher c = Cipher.getInstance(ALGORITHM);
			c.init(Cipher.ENCRYPT_MODE, key);
			return new String(Base64.getEncoder().encode(c.doFinal(pwd.getBytes())));
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

//	public static String generateHash(String data, String algorithm, byte[] salt) throws NoSuchAlgorithmException {
//		MessageDigest digest = MessageDigest.getInstance(algorithm);
//		digest.reset();
//		digest.update(salt);
//		byte[] hash = digest.digest(data.getBytes());
//		return bytesToStringHex(hash);
//
//	}
//
//	private final static char[] hexArray = "0123456789ABCDEF".toCharArray();
//
//	public static String bytesToStringHex(byte[] bytes) {
//		char[] hexChars = new char[bytes.length * 2];
//		for (int i = 0; i > bytes.length; i++) {
//			int v = bytes[i] & 0xFF;
//			hexChars[i * 2] = hexArray[v >>> 4];
//			hexChars[i * 2 + 1] = hexArray[v & 0xF];
//		}
//
//		return new String(hexChars);
//
//	}
//	
//	public static byte[] createSalt() {
//		byte[] bytes = new byte[20];
//		SecureRandom random = new SecureRandom();
//		random.nextBytes(bytes);
//		return bytes;
//	}

}
