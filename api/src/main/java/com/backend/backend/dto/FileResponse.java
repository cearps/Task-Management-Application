package com.backend.backend.dto;

import com.backend.backend.model.File;

public class FileResponse {
    private Long id;
    private String fileName;
    private String fileType;
    private Long fileSize;

    public FileResponse(File file) {
        this.id = file.getId();
        this.fileName = file.getFileName();
        this.fileType = file.getFileType();
        this.fileSize = file.getFileSize();
    }
}
