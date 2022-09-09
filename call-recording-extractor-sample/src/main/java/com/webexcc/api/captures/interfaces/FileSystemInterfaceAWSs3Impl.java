/**
 * Copyright (c) 2020 Cisco Systems, Inc. See LICENSE file.
 */
package com.webexcc.api.captures.interfaces;

import java.io.ByteArrayInputStream;
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

import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.webexcc.api.model.CaptureAttributes;
import com.webexcc.api.model.Recording;

/**
 * AWS file system storage AKA bucket
 *
 * @author jiwyatt
 * @since 12/12/2020
 *
 */
@Component(value = "fileSystemAWSS3")
public class FileSystemInterfaceAWSs3Impl implements FileSystemInterface {
	Logger logger = LoggerFactory.getLogger(FileSystemInterfaceAWSs3Impl.class);

	@Value("${fileSystemAWSS3.accessKey}")
	protected String accessKey;

	@Value("${fileSystemAWSS3.secretKey}")
	protected String secretKey;

	protected AmazonS3 s3Client = null;

	@Value("${fileSystemAWSS3.bucketName}")
	protected String bucketName;

	@Value("${fileSystemAWSS3.region}")
	protected String region;

	public FileSystemInterfaceAWSs3Impl() {
		super();
	}

	@Override
	public String copyFile(Recording record) throws Exception {
		File oFile = copyFile2TmpDir(record);
		String absolutePath = oFile.getAbsolutePath();
		logger.debug("bucketName:" + bucketName);
		logger.debug("putFile:" + oFile.getAbsolutePath());
		byte[] bytes = Files.readAllBytes(Paths.get(absolutePath));

		InputStream fis = new ByteArrayInputStream(bytes);

		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(bytes.length);

		String fileName = new File(absolutePath).getName();
		s3Client.putObject(bucketName, fileName, fis, metadata);
		s3Client.setObjectAcl(bucketName, fileName, CannedAccessControlList.Private);
		return fileName;
	}

	private File copyFile2TmpDir(Recording record) throws Exception {
		try {
			CaptureAttributes attributes = record.getAttributes();
			String fileName = record.getId() + "";
			InputStream in = new URL(attributes.getFilePath()).openStream();
			File file = File.createTempFile(fileName, ".wav");
			logger.debug("file: {}", file.getAbsolutePath());
			file.deleteOnExit();
			Files.copy(in, Paths.get(file.getAbsolutePath()), StandardCopyOption.REPLACE_EXISTING);
			return file;
		} catch (Exception e) {
			logger.error("Exception:{}", e.getMessage());
			throw e;
		}
	}


	// Create a bucket by using a S3Waiter object
	public void createBucket() {
		if (s3Client.doesBucketExistV2(bucketName)) {
			logger.info("Bucket %s already exists.\n", bucketName);
		} else {
			try {
				s3Client.createBucket(bucketName);
				s3Client.deleteBucketPolicy(bucketName);				
			} catch (AmazonS3Exception e) {
				logger.error(e.getErrorMessage());
			}
		}

	}

	@SuppressWarnings("deprecation")
	@PostConstruct
	private void postConstruct() {
		logger.debug("postConstruct: accessKey:{}", accessKey);
		logger.debug("postConstruct: secretKey:{}", secretKey);
		logger.debug("postConstruct: bucketName:{}", bucketName);
		logger.debug("postConstruct: region:{}", region);
		try {
			s3Client = new AmazonS3Client(new BasicAWSCredentials(accessKey, secretKey));
			this.createBucket();
		} catch (Exception e) {
			logger.warn("postConstruct: s3Client:not connected");
			logger.error("Exception: {}", e.getMessage());
		}

	}
}
