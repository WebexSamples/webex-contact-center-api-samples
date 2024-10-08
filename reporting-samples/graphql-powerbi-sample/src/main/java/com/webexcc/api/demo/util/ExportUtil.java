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
import java.io.FileWriter;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webexcc.api.demo.model.CallbackData;
import com.webexcc.api.demo.model.ChannelInfo;
import com.webexcc.api.demo.model.Customer;
import com.webexcc.api.demo.model.LastEntryPoint;
import com.webexcc.api.demo.model.LastQueue;
import com.webexcc.api.demo.model.LastSite;
import com.webexcc.api.demo.model.LastTeam;
import com.webexcc.api.demo.model.Owner;

/**
 * The <code>UserProfile</code> is a utility class that uses Java Reflection to
 * export data to a CSV FILE
 *
 * @author jiwyatt
 *
 */
@Service
public class ExportUtil {
	static Logger logger = LoggerFactory.getLogger(ExportUtil.class);

	// Using Java Reflection to convert to CSV
	public  String taskToCsv(List<?> list) throws Exception {
		if (list.size() < 1) {
			logger.info("Nothing to export");
			return "Nothing to export";
		}
		// header
		Method[] methods = list.get(0).getClass().getMethods();

		StringBuffer header = new StringBuffer();
		for (Method method : methods) {
			if (method.getName().startsWith("get")) {
				String columnName = method.getName().substring(3);
				if (!"Class".equalsIgnoreCase(columnName)) {
					header.append(columnName).append(",");
				}
			}
		}
		header.append(header.toString()).append("\n");
		// data / records
		StringBuffer rows = new StringBuffer();
		list.forEach(o -> {
			try {
				for (Method method : methods) {
					if (method.getName().startsWith("get")) {
						Object check = method.invoke(o);
						if (check == null) {
							rows.append("-").append(",");
						} else if (check instanceof String) {
							rows.append((String) check).append(",");
						} else if (check instanceof Boolean) {
							Boolean v = (Boolean) check;
							rows.append("" + v.booleanValue()).append(",");
						} else if (check instanceof ArrayList) {
							ArrayList<?> v = (ArrayList<?>) check;
							rows.append("" + v.size()).append(",");
						} else if (check instanceof Long) {
							Long v = (Long) check;
							rows.append("" + v).append(",");
						} else if (check instanceof Integer) {
							Integer v = (Integer) check;
							rows.append("" + v).append(",");
						}

						else if (check instanceof LastEntryPoint) {
							LastEntryPoint v = (LastEntryPoint) check;
							rows.append("" + v.getName()).append(",");
						} else if (check instanceof LastQueue) {
							LastQueue v = (LastQueue) check;
							rows.append("" + v.getName()).append(",");
						} else if (check instanceof LastTeam) {
							LastTeam v = (LastTeam) check;
							rows.append("" + v.getName()).append(",");
						}

						else if (check instanceof Owner) {
							Owner v = (Owner) check;
							rows.append("" + v.getName()).append(",");
						} else if (check instanceof Customer) {
							Customer v = (Customer) check;
							rows.append("" + v.getName()).append(",");
						} else if (check instanceof LastSite) {
							LastSite v = (LastSite) check;
							rows.append("" + v.getName()).append(",");
						} else if (check instanceof CallbackData) {
							CallbackData v = (CallbackData) check;
							rows.append("" + v.getName()).append(",");
						} else if (check instanceof Class) {
							// do nothing
						} else {
							rows.append(check.getClass().getSimpleName() + ".class").append(",");
						}
					}
				}
				rows.append("\n");

			} catch (Exception e) {
				e.printStackTrace();
			}

		});

		return header.toString() + rows.toString();
	}

	// Using Java Reflection to export to CSV
	public static void toCsvFile(BufferedWriter writer, List<?> list) throws Exception {
		if (list.size() < 1) {
			logger.info("Nothing to export");
			return;
		}
		// header
		Method[] methods = list.get(0).getClass().getMethods();

		StringBuffer header = new StringBuffer();
		for (Method method : methods) {
			if (method.getName().startsWith("get")) {
				String columnName = method.getName().substring(3);

				if (!"Class".equalsIgnoreCase(columnName)) {
					header.append(columnName).append(",");
				}
			}
		}
		writer.append(header.toString()).append("\n");
		// data records
		list.forEach(o -> {
			try {
				for (Method method : methods) {
					if (method.getName().startsWith("get")) {
						Object check = method.invoke(o);
						if (check == null) {
							writer.append("-").append(",");
						} else if (check instanceof String) {
							writer.append((String) check).append(",");
						} else if (check instanceof Boolean) {
							Boolean v = (Boolean) check;
							writer.append("" + v.booleanValue()).append(",");
						} else if (check instanceof ArrayList) {
							ArrayList<?> v = (ArrayList<?>) check;
							writer.append("" + v.size()).append(",");
						} else if (check instanceof Long) {
							Long v = (Long) check;
							writer.append("" + v).append(",");
						} else if (check instanceof Integer) {
							Integer v = (Integer) check;
							writer.append("" + v).append(",");
						}

						else if (check instanceof LastEntryPoint) {
							LastEntryPoint v = (LastEntryPoint) check;
							writer.append("" + v.getName()).append(",");
						} else if (check instanceof LastQueue) {
							LastQueue v = (LastQueue) check;
							writer.append("" + v.getName()).append(",");
						} else if (check instanceof LastTeam) {
							LastTeam v = (LastTeam) check;
							writer.append("" + v.getName()).append(",");
						} else if (check instanceof Owner) {
							Owner v = (Owner) check;
							writer.append("" + v.getName()).append(",");
						} else if (check instanceof Class) {
							// do nothing
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

	public ExportUtil() {

	}

	public  String agentSessionToCsv(List<Object> list) {
		if (list.size() < 1) {
			logger.info("Nothing to export");
			return "Nothing to export";
		}
//		JAVA reflection
		Method[] methods = list.get(0).getClass().getMethods();
//		builder header
//		String header = getClassAttributes(list.get(0));
		StringBuffer header = new StringBuffer();
		for (Method method : methods) {
//			logger.info("method:{}", method);
			if (method.getName().startsWith("get")) {
				String columnName = method.getName().substring(3);
//				logger.info("columnName:{}", columnName);
				if("ChannelInfo".equals(columnName)) {
//					do nothing... this has to more custom code because ChannelInfo is an arrayList
//					header.append("ChannelType").append(",");
				}
				else if (!"Class".equalsIgnoreCase(columnName)) {
					header.append(columnName).append(",");
				}
				else {
//					logger.info("columnName:{}", columnName);
				}
			}
		}
		header.append("\n");
//		records
		StringBuffer rows = new StringBuffer();
		list.forEach(o -> {
			try {
				for (Method method : methods) {
					if (method.getName().startsWith("get")) {
						Object check = method.invoke(o);
						if(logger.isDebugEnabled()) {
//							logger.info("method:{}", method);						
							//print method
							if (check == null) {
								rows.append(method).append(",");
							} else if (check instanceof String) {
								rows.append(method).append(",");
							} else if (check instanceof Boolean) {
								rows.append(method).append(",");
							} else if (check instanceof ArrayList) {
							} else if (check instanceof Long) {
								rows.append(method).append(",");
							} else if (check instanceof Integer) {
								rows.append(method).append(",");
							} else if (check instanceof ChannelInfo) { /** do nothing this is an arrayList **/}
//							  else if (check instanceof LastEntryPoint) { /** do nothing **/}
//							  else if (check instanceof LastQueue) { /** do nothing **/} 
//							  else if (check instanceof LastTeam) { /** do nothing **/}
//							  else if (check instanceof Owner) { /** do nothing **/}
//							  else if (check instanceof Customer) { /** do nothing **/}
//							  else if (check instanceof LastSite) { /** do nothing **/}
//							  else if (check instanceof CallbackData) { /** do nothing **/}
							  else if (check instanceof Class) { /** do nothing **/} 
							else {
								rows.append(check.getClass().getSimpleName() + ".class").append(",");
							}						
						}
						else {
							//print value
							if (check == null) {
								rows.append("-").append(",");
							} else if (check instanceof String) {
								rows.append((String) check).append(",");
							} else if (check instanceof Boolean) {
								Boolean v = (Boolean) check;
								rows.append("" + v.booleanValue()).append(",");
							} else if (check instanceof ArrayList) {
							} else if (check instanceof Long) {
								Long v = (Long) check;
								rows.append("" + v).append(",");
							} else if (check instanceof Integer) {
								Integer v = (Integer) check;
								rows.append("" + v).append(",");
							} else if (check instanceof ChannelInfo) { /** do nothing this is an arrayList **/} 
//							  else if (check instanceof LastEntryPoint) { /** do nothing **/}
//							  else if (check instanceof LastQueue) { /** do nothing **/} 
//							  else if (check instanceof LastTeam) { /** do nothing **/}
//							  else if (check instanceof Owner) { /** do nothing **/}
//							  else if (check instanceof Customer) { /** do nothing **/}
//							  else if (check instanceof LastSite) { /** do nothing **/}
//							  else if (check instanceof CallbackData) { /** do nothing **/}
							  else if (check instanceof Class) { /** do nothing **/} 
							else {
								rows.append(check.getClass().getSimpleName() + ".class").append(",");
							}						
						}

					}
				}
				rows.append("\n");

			} catch (Exception e) {
				e.printStackTrace();
			}

		});
		if(logger.isDebugEnabled()) {
			writeToFile(header.toString() + rows.toString(), "./test_"+System.currentTimeMillis()+".csv");
		}
		return header.toString() + rows.toString();
	}
	
	
	
	/**
	 * This only happens if you are if logger.isDebugEnabled
	 * @param content
	 * @param filePath
	 */
    private void writeToFile(String content, String filePath) {

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            writer.write(content);
            System.out.println("Successfully wrote to the file.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
	
	
 	

}
