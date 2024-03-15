import React, { useState, useRef } from 'react'

const Filetest = () => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {
            const fileArray = Array.from(fileList);
            setFiles((prevFiles) => {
                const updatedFiles = [...prevFiles];
                fileArray.forEach((file) => {
                    if (!updatedFiles.some((existingFile) => existingFile.name === file.name && existingFile.size === file.size)) {
                        updatedFiles.push(file);
                    }
                });
                return updatedFiles;
            });
        }
    };

    const handleDeleteFile = (index: number) => {
        setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });
        // Reset file input value
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleFileChange}
                multiple
                ref={fileInputRef} // Assign ref to access the file input element
            />
            <div>
                {files.map((file, index) => (
                    <div key={index}>
                        {file.name} - {file.size} bytes
                        <button onClick={() => handleDeleteFile(index)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
Filetest.ignorePath = true
export default Filetest
