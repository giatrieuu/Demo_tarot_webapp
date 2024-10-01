import React, { useState, useEffect, useRef } from 'react';
import { Upload, Button, Image, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
import type { UploadFile, UploadProps } from 'antd';

interface FileUploaderProps {
  type: 'image' | 'video';
  onUploadSuccess: (url: string) => void;
  defaultImage?: string;
}

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const FileUploader: React.FC<FileUploaderProps> = ({ type, onUploadSuccess, defaultImage }) => {
  const [uploading, setUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [buttonVisible, setButtonVisible] = useState(true);
  const [videoVisible, setVideoVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultImage) {
      setFileList([{ uid: '-1', name: 'default_image', url: defaultImage, status: 'done' }]);
      setPreviewImage(defaultImage);
    }
  }, [defaultImage]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleUpload = async (file: File) => {
    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const allowedVideoExtensions = ['mp4', 'avi', 'mov', 'mkv'];

    if (type === 'image' && !allowedImageExtensions.includes(fileExtension!)) {
      message.error('File type does not match. Only images are allowed.');
      return;
    }

    if (type === 'video' && !allowedVideoExtensions.includes(fileExtension!)) {
      message.error('File type does not match. Only videos are allowed.');
      return;
    }

    setUploading(true);

    try {
      const storageRef = ref(storage, `${type}s/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          console.log(`${type.toUpperCase()} upload state:`, snapshot.state);
        },
        (error) => {
          message.error('Upload error');
          console.error('Upload error:', error);
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onUploadSuccess(downloadURL);
          setUploading(false);
          setButtonVisible(false); // Hide the button after upload
          if (type === 'video') {
            setVideoUrl(downloadURL);
            setTimeout(() => setVideoVisible(true), 100); // Add delay for smooth transition
          }
        }
      );
    } catch (error) {
      message.error('Error uploading file');
      console.error('Error uploading file:', error);
      setUploading(false);
    }
  };

  const handleDelete = () => {
    setVideoVisible(false);
    setTimeout(() => {
      setVideoUrl('');
      setButtonVisible(true);
      setFileList([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 300);
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file: File) => {
      handleUpload(file);
      return false;
    },
    fileList,
    onPreview: handlePreview,
    onChange: handleChange,
    listType: 'picture-circle',
    showUploadList: {
      showRemoveIcon: !uploading,
    },
    accept: type === 'image' ? 'image/*' : 'video/*',
  };

  const uploadButton = (
    <Button icon={<PlusOutlined />} loading={uploading} style={{ border: 0, background: 'none' }}>
      <div style={{ marginTop: 3 }}>Upload</div>
    </Button>
  );

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      {type === 'image' ? (
        <>
          <Upload {...uploadProps}>
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: 'none' }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(''),
              }}
              src={previewImage}
            />
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <input
            type="file"
            accept="video/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
            disabled={uploading}
          />
          {buttonVisible && (
            <Button
              type='dashed'
              icon={<PlusOutlined />}
              loading={uploading}
              style={{
                background: '#fafafa',
                borderRadius: '50%',
                width: '100px',
                height: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '15px',
              }}
              onClick={handleButtonClick}
            >
              <span style={{ fontSize: '14px' }}>Upload</span>
            </Button>
          )}
          {videoUrl && (
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                opacity: videoVisible ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                marginTop: 20,
              }}
            >
              <video src={videoUrl} controls style={{ width: '60%', borderRadius: '8px' }} />
              <Button
                icon={<DeleteOutlined />}
                style={{
                  position: 'absolute',
                  top: 10, // Adjust to your preference
                  right: 170, // Adjust to your preference
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  border: 'none', // Remove border if necessary
                  borderRadius: '50%', // Ensure button is round
                  padding: 0, // Remove default padding
                  width: 30, // Adjust size
                  height: 30, // Adjust size
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 10, // Ensure button is above the video
                }}
                onClick={handleDelete}
              />
            </div>
          )}

        </div>
      )}
    </>
  );
};

export default FileUploader;
