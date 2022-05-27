package com.webexcc.api.demo.util;

import java.io.BufferedWriter;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExportUtil {
	static Logger logger = LoggerFactory.getLogger(ExportUtil.class);

	public ExportUtil() {

	}

	// Using Java Reflection to export to CSV
	public static void toCsv(BufferedWriter writer, List<?> list) throws Exception {
		if (list.size() < 1) {
			logger.info("Nothing to export");
			return;
		}
		// header
		Method[] methods = list.get(0).getClass().getMethods();

		StringBuffer header = new StringBuffer();
		for (int x = 0; x < methods.length; x++) {
			if (methods[x].getName().startsWith("get")) {
				String columnName = methods[x].getName().substring(3);
				header.append(columnName).append(",");
			}
		}
		writer.append(header.toString()).append("\n");
		// data / records
		list.forEach(o -> {
			try {
				for (int x = 0; x < methods.length; x++) {
					if (methods[x].getName().startsWith("get")) {
						Object check = methods[x].invoke(o);
						if (check == null) {
							writer.append("null").append(",");
						} else if (check instanceof String) {
							writer.append((String) check).append(",");
						} else if (check instanceof Boolean) {
							Boolean v = (Boolean) check;
							writer.append("" + v.booleanValue()).append(",");
						} else if (check instanceof ArrayList) {
							ArrayList<?> v = (ArrayList<?>) check;
							writer.append("" + v.size()).append(",");
						}

						else if (check instanceof Long) {
							Long v = (Long) check;
							writer.append("" + v).append(",");
						} else {
							writer.append(check.getClass().getSimpleName() + ".class").append(",");
						}
					}
				}
				writer.append("\n");

			} catch (Exception e) {
				e.printStackTrace();
			}

		});
	}

}
