/**
 * Copyright (c) 2020 Cisco Systems, Inc. See LICENSE file.
 */
package com.webexcc.api.captures.interfaces;

import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.webexcc.api.model.CaptureAttributes;
import com.webexcc.api.model.Recording;

/**
 * localhost file system storage
 *
 * @author jiwyatt
 * @since 12/12/2020
 *
 */
@Component(value = "fileSystemLocalhost")
public class FileSystemInterfaceLocalhostImpl implements FileSystemInterface {
	Logger logger = LoggerFactory.getLogger(FileSystemInterfaceLocalhostImpl.class);

	@Value("${localhost.dataDirectory}")
	private String dataDirectory;

	public FileSystemInterfaceLocalhostImpl() {
		super();
	}

	@Override
	public String copyFile(Recording record) throws Exception {
		try {
			CaptureAttributes attributes = record.getAttributes();
			String fileName = record.getId() + "";
			InputStream in = new URL(attributes.getFilePath()).openStream();
			new File(dataDirectory).mkdirs();
			File file = new File(dataDirectory + File.separatorChar + fileName + ".wav");
			logger.info("file: {}", file.getAbsolutePath());
			Files.copy(in, Paths.get(file.getAbsolutePath()), StandardCopyOption.REPLACE_EXISTING);
			return file.getAbsolutePath();
		} catch (Exception e) {
			logger.error("Exception:{}", e.getMessage());
			return e.getMessage();
		}
	}

	@PostConstruct
	private void postConstruct() {
		logger.info("postConstruct: dataDirectory:{}", dataDirectory);
	}
}
