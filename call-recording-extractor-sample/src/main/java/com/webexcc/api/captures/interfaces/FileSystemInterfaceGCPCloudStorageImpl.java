/**
 * Copyright (c) 2020 Cisco Systems, Inc. See LICENSE file.
 */
package com.webexcc.api.captures.interfaces;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.google.api.gax.paging.Page;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.BucketInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageClass;
import com.google.cloud.storage.StorageOptions;
import com.webexcc.api.model.CaptureAttributes;
import com.webexcc.api.model.Recording;

/**
 * AWS file system storage AKA bucket
 *
 * @author jiwyatt
 * @since 12/12/2020
 *
 */
@Component(value = "fileSystemGCPCloudStorage")
public class FileSystemInterfaceGCPCloudStorageImpl implements FileSystemInterface {
	Logger logger = LoggerFactory.getLogger(FileSystemInterfaceGCPCloudStorageImpl.class);


//
	@Value("${fileSystemGCPCloudStorage.bucketName}")
	protected String bucketName;
	//
	@Value("${fileSystemGCPCloudStorage.region}")
	protected String region;
	//
	@Value("${fileSystemGCPCloudStorage.projectId}")
	protected String projectId;

	Storage storage;

	public FileSystemInterfaceGCPCloudStorageImpl() {
		super();
	}

	@Override
	public String copyFile(Recording record) throws Exception {
		try {
			logger.debug("bucketName:" + record);
			File oFile = copyFile2TmpDir(record);
			String absolutePath = oFile.getAbsolutePath();
			logger.debug("bucketName:" + bucketName);
			logger.debug("putFile:" + oFile.getAbsolutePath());

			String blobName = new File(absolutePath).getName();
			BlobId blobId = BlobId.of(bucketName, blobName);
			BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("audio/wav").build();

			int largeBufferSize = 150 * 1024 * 1024;
			Path file = Paths.get(absolutePath);
			Blob oBlob = storage.createFrom(blobInfo, file, largeBufferSize);

			logger.debug("oBlob.getBlobId():" + oBlob.getBlobId());
			return blobName;
		} catch (Exception e) {
			logger.error("Exception:{}", e.getMessage());
			throw e;
		}
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

	private Page<Blob> listBucket() throws Exception {

		storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
		return storage.list(bucketName);
	}

	public void createBucket() {
		// https://googleapis.dev/java/google-cloud-clients/latest/com/google/cloud/storage/StorageClass.html
		StorageClass storageClass = StorageClass.COLDLINE;
		try {
			// check to see if bucket exists
//			storage.list(bucketName);
			this.listBucket();
			logger.info("Bucket %s already exists.\n", bucketName);
		} catch (Exception e) {
			try {
				// create bucket
				Bucket bucket = storage.create(BucketInfo.newBuilder(bucketName).setStorageClass(storageClass).build());
				logger.info("Created bucket " + bucket.getName() + " in " + bucket.getLocation() + " with storage class " + bucket.getStorageClass());
			} catch (Exception e1) {
				logger.warn("postConstruct: s3Client:not connected");
				logger.error("Exception: {}", e.getMessage());
			}
		}
	}

	public boolean uploadFile(String filePath, byte[] file) {
		try {
			storage.create(BlobInfo.newBuilder(bucketName, filePath).build(), new ByteArrayInputStream(file));
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@PostConstruct
	private void postConstruct() {
		logger.info("postConstruct: projectId:{}", projectId);
		logger.info("postConstruct: bucketName:{}", bucketName);
		logger.info("postConstruct: region:{}", region);
		try {
			storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
			this.createBucket();
			// for testing
//			Gson oGson = new Gson();
//			String json = "{\"id\":\"08ae9b64-d5df-40c8-807f-3edea6baa8d3\",\"segment\":false,\"attributes\":{\"fileName\":\"combinedRecordings.wav\",\"filePath\":\"https://cjp-ccone-produs1-media-storage-recording.s3.amazonaws.com/1c71287f-2f41-458b-b101-c4e616123554/08ae9b64-d5df-40c8-807f-3edea6baa8d3/08ae9b64-d5df-40c8-807f-3edea6baa8d3/combinedRecordings.wav?X-Amz-Algorithm\\u003dAWS4-HMAC-SHA256\\u0026X-Amz-Date\\u003d20220830T095509Z\\u0026X-Amz-SignedHeaders\\u003dhost\\u0026X-Amz-Expires\\u003d1800\\u0026X-Amz-Credential\\u003dAKIATRZUOXQOKWHH6JML%2F20220830%2Fus-east-1%2Fs3%2Faws4_request\\u0026X-Amz-Signature\\u003dc5297419522436ebb45513f933837cbaa8f4b114147253a7c4c9588504ae3472\",\"startTime\":\"1661785612510\",\"stopTime\":\"1661785616249\",\"participants\":[\"68f50ada-f99d-4bad-87ac-0efd116a8b05\",\"+14088502172\"]}}";
//			Recording record = oGson.fromJson(json, Recording.class);
//			this.copyFile(record);
		} catch (Exception e) {
			logger.error("Exception: {}", e.getMessage());
		}

	}
}
