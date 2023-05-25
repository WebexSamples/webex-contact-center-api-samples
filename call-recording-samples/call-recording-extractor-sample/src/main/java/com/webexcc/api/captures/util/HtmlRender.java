package com.webexcc.api.captures.util;

import java.lang.reflect.Field;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webexcc.api.captures.service.ApiService;
import com.webexcc.api.model.Capture;
import com.webexcc.api.model.CaptureAttributes;
import com.webexcc.api.model.Recording;

@Service
public class HtmlRender {
	static Logger logger = LoggerFactory.getLogger(HtmlRender.class);
	@Autowired
	ApiService apiService;

//	private Organization organization = new Organization();
	public void printOrginizationForm(HttpServletRequest request, StringBuffer sb) {
		sb.append("	<a href='/' >(HOME)</a> <br>\n");
	}

	public void printCapturesQueryForm(HttpServletRequest request, StringBuffer sb) {
		sb.append("	<a href='/' >(HOME)</a> <br>\n");

		sb.append("<form action='/captures/query'>");

		sb.append("</form>");
	}

	public void printCapture(Capture capture, StringBuffer sb) {
		try {

			Field[] fields = capture.getClass().getDeclaredFields();
			for (Field field : fields) {
				if (field.get(capture) instanceof String) {
					if ("createdTime".equals(field.getName())) {
						try {
							Date d = new Date(Long.parseLong((String) field.get(capture)));
							sb.append("<tr>");
							sb.append("<td nowrap style='text-align:right;font-size:10px' width='200px' >Capture.<b>" + field.getName() + "</b>-></td>");
							sb.append("<td nowrap>" + d + "</td>");
							sb.append("</tr>");
						} catch (Exception e) {
							logger.error("Exception:{}", e.getMessage());
						}
					} else if ("lastUpdatedTime".equals(field.getName())) {
						try {
							Date d = new Date(Long.parseLong((String) field.get(capture)));
							sb.append("<tr>");
							sb.append("<td nowrap style='text-align:right;font-size:10px' width='200px' >Capture.<b>" + field.getName() + "</b>-></td>");
							sb.append("<td nowrap>" + d + "</td>");
							sb.append("</tr>");
						} catch (Exception e) {
							logger.error("Exception:{}", e.getMessage());
						}
					}
					//
					else if ("skillId".equals(field.getName())) {
						try {
							sb.append("<tr>");
							sb.append("<td nowrap style='text-align:right;font-size:10px' width='200px' >Capture.<b>" + field.getName() + "</b>-></td>");
							sb.append("<td style='background-color:green'>todo:8 " + field.get(capture) + "</td>");
							sb.append("</tr>");
						} catch (Exception e) {
							logger.error("Exception:{}", e.getMessage());
						}
					} else {
						sb.append("<tr>");
						sb.append("<td nowrap style='text-align:right;font-size:10px' width='200px' >Capture.<b>" + field.getName() + "</b>-></td>");
						sb.append("<td nowrap>" + field.get(capture) + "</td>");
						sb.append("</tr>");
					}
				} else if (field.get(capture) instanceof java.lang.Boolean) {
					sb.append("<tr>");
					sb.append("<td nowrap style='text-align:right;font-size:10px' width='200px' >Capture.<b>" + field.getName() + "</b>-></td>");
					sb.append("<td nowrap>" + field.get(capture) + "</td>");
					sb.append("</tr>");
				} else if (field.get(capture) instanceof java.lang.Integer) {
					sb.append("<tr>");
					sb.append("<td nowrap style='text-align:right;font-size:10px;' width='200px' >Capture.<b>" + field.getName() + "</b>-></td>");
					sb.append("<td nowrap>" + field.get(capture) + "</td>");
					sb.append("</tr>");
				} else if (field.get(capture) instanceof java.util.ArrayList) {
				} else {
					logger.warn("fields[x].get(oAgentProfile):{}", field.get(capture).getClass());
				}
			}

		} catch (Exception e) {
			logger.error("Exception:{}", e.getMessage());
		}

	}

	public void printRecord(Recording record, StringBuffer sb) {
		try {

			Field[] fields = record.getClass().getDeclaredFields();
			for (Field field : fields) {
				if (field.get(record) instanceof String) {
					if ("createdTime".equals(field.getName())) {
						try {
							Date d = new Date(Long.parseLong((String) field.get(record)));
							sb.append("<tr>");
							sb.append("<td nowrap style='text-align:right;font-size:10px' width='200px' >Recording.<b>" + field.getName() + "</b>-></td>");
							sb.append("<td nowrap>" + d + "</td>");
							sb.append("</tr>");
						} catch (Exception e) {
							logger.error("Exception:{}", e.getMessage());
						}
					} else if ("lastUpdatedTime".equals(field.getName())) {
						try {
							Date d = new Date(Long.parseLong((String) field.get(record)));
							sb.append("<tr>");
							sb.append("<td nowrap style='text-align:right;font-size:10px' width='200px' >Recording.<b>" + field.getName() + "</b>-></td>");
							sb.append("<td nowrap>" + d + "</td>");
							sb.append("</tr>");
						} catch (Exception e) {
							logger.error("Exception:{}", e.getMessage());
						}
					}
					//
					else if ("skillId".equals(field.getName())) {
						try {
							sb.append("<tr>");
							sb.append("<td nowrap style='text-align:right;font-size:10px' width='200px' >Recording.<b>" + field.getName() + "</b>-></td>");
							sb.append("<td style='background-color:green'>todo:8 " + field.get(record) + "</td>");
							sb.append("</tr>");
						} catch (Exception e) {
							logger.error("Exception:{}", e.getMessage());
						}
					} else {
						sb.append("<tr>");
						sb.append("<td nowrap style='text-align:right;font-size:10px' width='200px' >Recording.<b>" + field.getName() + "</b>-></td>");
						sb.append("<td nowrap>" + field.get(record) + "</td>");
						sb.append("</tr>");
					}
				} else if (field.get(record) instanceof java.lang.Boolean) {
					sb.append("<tr>");
					sb.append("<td nowrap style='text-align:right;font-size:10px' width='200px' >Recording.<b>" + field.getName() + "</b>-></td>");
					sb.append("<td nowrap>" + field.get(record) + "</td>");
					sb.append("</tr>");
				} else if (field.get(record) instanceof java.lang.Integer) {
					sb.append("<tr>");
					sb.append("<td nowrap style='text-align:right;font-size:10px;' width='200px' >Recording.<b>" + field.getName() + "</b>-></td>");
					sb.append("<td nowrap>" + field.get(record) + "</td>");
					sb.append("</tr>");
				} else if (field.get(record) instanceof java.util.ArrayList) {
				} else {
					logger.warn("fields[x].get(oAgentProfile):{}", field.get(record).getClass());
				}
			}

		} catch (Exception e) {
			logger.error("Exception:{}", e.getMessage());
		}

	}

	public void printCaptureRecording(Recording record, StringBuffer sb) {
		try {
			CaptureAttributes attributes = record.getAttributes();

			Date d1 = new Date(Long.parseLong(attributes.getStartTime()));
			Date d2 = new Date(Long.parseLong(attributes.getStopTime()));

//			sb.append("<td nowrap style='text-align:right;font-size:10px' width='200px' >attributes.<b>" + fields[x].getName() + "</b>-></td>");
			sb.append("<td nowrap>" + record.getId() + "</td>");
			sb.append("<td nowrap>" + d1 + "</td>");
			sb.append("<td nowrap>" + d2 + "</td>");
			sb.append("<td style=''> <a href=\"" + attributes.getFilePath() + "\">Download</a>" + "" + "</td>");
			sb.append("</tr>");

		} catch (Exception e) {
			logger.error("Exception:{}", e.getMessage());
		}

	}

	public void printCaptureRecording2(Recording record, StringBuffer sb, String fileName) {
		try {
			CaptureAttributes attributes = record.getAttributes();

			Date d1 = new Date(Long.parseLong(attributes.getStartTime()));
			Date d2 = new Date(Long.parseLong(attributes.getStopTime()));

//			sb.append("<td nowrap style='text-align:right;font-size:10px' width='200px' >attributes.<b>" + fields[x].getName() + "</b>-></td>");
			sb.append("<td nowrap>" + record.getId() + "</td>");
			sb.append("<td nowrap>" + d1 + "</td>");
			sb.append("<td nowrap>" + d2 + "</td>");
			sb.append("<td style=''> <a href=\"file:" + fileName + "\">Download</a>" + "" + "</td>");
			sb.append("</tr>");

		} catch (Exception e) {
			logger.error("Exception:{}", e.getMessage());
		}

	}

	public void printCaptureAttributes(Recording record, StringBuffer sb) {
		try {
			Date d1 = new Date(Long.parseLong(record.getAttributes().getStartTime()));
			Date d2 = new Date(Long.parseLong(record.getAttributes().getStopTime()));

//			sb.append("<td nowrap style='text-align:right;font-size:10px' width='200px' >attributes.<b>" + fields[x].getName() + "</b>-></td>");
			sb.append("<td nowrap>" + record.getId() + "</td>");
			sb.append("<td nowrap>" + d1 + "</td>");
			sb.append("<td nowrap>" + d2 + "</td>");
			sb.append("<td style=''> <a href=\"" + record.getAttributes().getFilePath() + "\">Download</a>" + "" + "</td>");
			sb.append("</tr>");

		} catch (Exception e) {
			logger.error("Exception:{}", e.getMessage());
		}

	}

	public void footer(StringBuffer sb) {
		sb.append("</table>\n");
		sb.append("</body>\n");
		sb.append("</html>\n");
	}

	public void form(HttpServletRequest request, StringBuffer sb) {

		sb.append("<span> &nbsp; &nbsp; &nbsp;<span/>");
		sb.append("\n<script>");
		sb.append("\nfunction submit2() {");
		sb.append("document.getElementById(\"tableWait\").style.display = \"block\";\n");
		sb.append("\ndocument.getElementById('main').submit();");
		sb.append("\n}");
		sb.append("\n");
		sb.append("\n</script>");
		sb.append("\n");

		sb.append("<form id='main' action='/captures'>");
		sb.append("<label for=\"meeting-time\">Choose end time: (working backwards) </label>");
		sb.append("</br>");
		try {
			sb.append("<input type=\"date\" id=\"meeting-time\" name=\"date\" value=\"" + request.getParameter("date").toString() + "\"> \n");
		} catch (Exception e) {
			DecimalFormat mFormat = new DecimalFormat("00");
			Calendar c = Calendar.getInstance();
			sb.append("<input type=\"date\" id=\"meeting-time\" name=\"date\" value=\"" + c.get(Calendar.YEAR) + "-" + (mFormat.format(Double.valueOf(c.get(Calendar.MONTH) + 1))) + "-" + mFormat.format(Double.valueOf(c.get(Calendar.DAY_OF_MONTH))) + "\"> \n");
		}
		String sDay = "1";
		try {
			sDay = request.getParameter("days").toString();
		} catch (Exception e) {
			sDay = "1";
		}
		sb.append("<label for=\"days\">Number of days:</label> ");
		sb.append("<select name=\"days\" id=\"days\">");

		for (int i = 1; i <= 30; i++) {
			if (sDay.equals("" + i)) {
				sb.append("  <option selected value=\"" + i + "\">" + i + "</option>");
			} else {
				sb.append("  <option value=\"" + i + "\">" + i + "</option>");
			}
		}
		sb.append("</select>");
		try {
			String search = request.getParameter("search").toString();
			sb.append(" &nbsp; &nbsp;Search: <input  type='text' id='search' name='search' size=\"50\" value='" + search + "'>");
		} catch (Exception e) {
			sb.append(" &nbsp; &nbsp;Search: <input type='text' id='search' name='search' size=\"50\" value=''>");
		}

		sb.append("</br>");
		sb.append("<button type='button' onClick='javaScript:submit2();'>Submit</button>");

		sb.append("</form>");
		sb.append("<table id='tableWait' width='50%' border='0' style=\"border:0px solid black;;margin-left:auto;margin-right:auto;display:none\">");
		sb.append("<tr><td > <img src='wait.gif' /></td></tr>");
		sb.append("</table>");
		sb.append("</br>");
		sb.append("<table width='50%' border='1' style=\"border:1px solid black;margin-left:auto;margin-right:auto;\">");
		sb.append("<tr style='text-align: center;vertical-align: middle;' >\n");

		sb.append("</tr>");

	}

	public void header(StringBuffer sb) {
		sb.append("<head>\n");
		sb.append("	<title> Webexcc Captures API example</title>\n");
		sb.append("</head>\n");
		sb.append("<br>\n");
		sb.append("	<hr>\n");
		sb.append("	<div style=\"display: inline-block; text-align: right; width: 100%\"><a href='https://devportal.wxcc-us1.cisco.com/documentation/captures' >documentation</a> </div>\n");
		sb.append("	 <br>\n");
		sb.append("<table width='50%' border='0' style=\"border:0px solid black;margin-left:auto;margin-right:auto;\">");
		sb.append("<tr style='text-align: center;vertical-align: middle;' >\n");
		try {
			sb.append("<td colspan='55'  ><b>Name: " + apiService.getOrginzation().getName() + "&nbsp; &nbsp; &nbsp; &nbsp; id:" + apiService.getOrginzation().getId() + "</b></td>\n");

		} catch (Exception e) {
		}
		sb.append("</tr>\n");
		sb.append("</table>\n");

		sb.append("<br>\n");
		sb.append("<br>\n");

		sb.append("<b>Captures</b>\n<br>\n");
	}

}
