/**
 * Copyright (c) 2022
 * All rights reserved.
 *
 * Permission is hereby granted, free  of charge, to any person obtaining
 * a  copy  of this  software  and  associated  documentation files  (the
 * "Software"), to  deal in  the Software without  restriction, including
 * without limitation  the rights to  use, copy, modify,  merge, publish,
 * distribute,  sublicense, and/or sell  copies of  the Software,  and to
 * permit persons to whom the Software  is furnished to do so.
 *
 * THE  SOFTWARE IS  PROVIDED  "AS  IS", WITHOUT  WARRANTY  OF ANY  KIND,
 * EXPRESS OR  IMPLIED, INCLUDING  BUT NOT LIMITED  TO THE  WARRANTIES OF
 * MERCHANTABILITY,    FITNESS    FOR    A   PARTICULAR    PURPOSE    AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE,  ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
package com.webexcc.api.demo.util;

import java.io.BufferedWriter;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * The <code>UserProfile</code> is a utility class that uses Java Reflection to
 * export data to a CSV FILE
 * 
 * @author jiwyatt
 *
 */
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

	public static void toJson(BufferedWriter writer, List<?> list) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			// pretty print
			String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(list);
			writer.append(json);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
