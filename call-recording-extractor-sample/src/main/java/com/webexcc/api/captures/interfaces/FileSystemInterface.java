/**
 * Copyright (c) 2020 Cisco Systems, Inc. See LICENSE file.
 */
package com.webexcc.api.captures.interfaces;

import com.webexcc.api.model.Recording;

/**
 * implement this class for new file systems
 *
 * @author jiwyatt
 * @since 12/12/2020
 *
 */
public interface FileSystemInterface {

	String copyFile(Recording record) throws Exception;

}