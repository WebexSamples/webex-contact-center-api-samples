package com.webexcc.api.captures.util;

import java.lang.reflect.Field;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * @author jiwyatt
 * this is an experiment class to see if export GOOGLE_APPLICATION_CREDENTIALS will work.
 */
public class SetEnv {
	static Logger logger = LoggerFactory.getLogger(SetEnv.class);

	public static void setEnv(Map<String, String> newenv) throws ClassNotFoundException, IllegalAccessException, NoSuchFieldException {
		try {
			Class<?> processEnvironmentClass = Class.forName("java.lang.ProcessEnvironment");
			Field theEnvironmentField = processEnvironmentClass.getDeclaredField("theEnvironment");
			theEnvironmentField.setAccessible(true);
			Map<String, String> env = (Map<String, String>) theEnvironmentField.get(null);
			env.putAll(newenv);
			Field theCaseInsensitiveEnvironmentField = processEnvironmentClass.getDeclaredField("theCaseInsensitiveEnvironment");
			theCaseInsensitiveEnvironmentField.setAccessible(true);
			Map<String, String> cienv = (Map<String, String>) theCaseInsensitiveEnvironmentField.get(null);
			cienv.putAll(newenv);
		} catch (NoSuchFieldException e) {
			Class[] classes = Collections.class.getDeclaredClasses();
			Map<String, String> env = System.getenv();
			for (Class cl : classes) {
				if ("java.util.Collections$UnmodifiableMap".equals(cl.getName())) {
					Field field = cl.getDeclaredField("m");
					field.setAccessible(true);
					Object obj = field.get(env);
					Map<String, String> map = (Map<String, String>) obj;
					map.clear();
					map.putAll(newenv);
				}
			}
		}
	}

//	Here's a simple Java method that uses the `Runtime` class to print out information about the JVM's memory usage:
		public static void printJvmMemoryInfo() {
			var bytesPerMegabyte = 1024 * 1024;
		    Runtime runtime = Runtime.getRuntime();
		    long maxMemory = runtime.maxMemory()/ bytesPerMegabyte; // Max memory JVM will attempt to use
		    long allocatedMemory = runtime.totalMemory()/ bytesPerMegabyte; // Total memory currently in use by the JVM
		    long freeMemory = runtime.freeMemory()/ bytesPerMegabyte; // Free memory out of the total memory
		    long totalFreeMemory = (freeMemory + (maxMemory - allocatedMemory));
		    logger.info("Max memory:{} Meg Allocated memory:{} Meg Free memory:{} Meg Total free memory:{} Meg", maxMemory, allocatedMemory, freeMemory, totalFreeMemory);
		}

//	public static void main(String[] args) {
//		try {
//			Map<String, String> google = new HashMap<>();
////			google.put("GOOGLE_APPLICATION_CREDENTIALS", new ClassPathResource("google_credentials.json").getURI().getPath());
//			google.put("GOOGLE_APPLICATION_CREDENTIALS", new ClassPathResource("jiwyattpoc-22c84c821b77.json").getURI().getPath());
//			SetEnv.setEnv(google);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
}
