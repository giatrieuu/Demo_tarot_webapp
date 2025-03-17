import React, { useState, useEffect, useRef } from "react";
import { Button, Typography, Space, message, Avatar } from "antd";
import { PhoneOutlined, VideoCameraOutlined, AudioOutlined, UserOutlined, ExpandOutlined, ShrinkOutlined } from "@ant-design/icons";
import Draggable from "react-draggable";

const { Title } = Typography;

const VideoCall: React.FC = () => {
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isSplitMode, setIsSplitMode] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [webcamAvailable, setWebcamAvailable] = useState<boolean>(true);
  const [micAvailable, setMicAvailable] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const userName = "Bạn";
  const tarotReaderName = "Tarot Reader";

  // Kiểm tra thiết bị webcam và micro
  useEffect(() => {
    const checkDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasWebcam = devices.some((device) => device.kind === "videoinput");
        const hasMic = devices.some((device) => device.kind === "audioinput");
        
        if (!hasWebcam) {
          setWebcamAvailable(false);
          message.warning("Không tìm thấy webcam trên thiết bị của bạn.");
        }
        if (!hasMic) {
          setMicAvailable(false);
          message.warning("Không tìm thấy micro trên thiết bị của bạn.");
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra thiết bị:", error);
        setWebcamAvailable(false);
        setMicAvailable(false);
        message.error("Không thể kiểm tra thiết bị webcam/micro.");
      }
    };
    checkDevices();
  }, []);

  // Hàm bật/tắt camera và mic
  const toggleCamera = async () => {
    if (!webcamAvailable) {
      message.error("Không có webcam để bật. Vui lòng kiểm tra thiết bị.");
      return;
    }

    if (isCameraOn) {
      // Tắt camera
      if (streamRef.current) {
        streamRef.current.getVideoTracks().forEach((track) => track.stop());
        setIsCameraOn(false);
        message.info("Đã tắt camera");
      }
    } else {
      // Bật camera
      try {
        if (!streamRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: isMicOn 
          });
          streamRef.current = stream;
        } else {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          streamRef.current.addTrack(stream.getVideoTracks()[0]);
        }
        if (videoRef.current) {
          videoRef.current.srcObject = streamRef.current;
          videoRef.current.play();
        }
        setIsCameraOn(true);
        message.success("Đã bật camera");
      } catch (error: any) {
        console.error("Lỗi khi truy cập webcam:", error);
        handleMediaError(error);
      }
    }
  };

  const toggleMic = async () => {
    if (!micAvailable) {
      message.error("Không có micro để bật. Vui lòng kiểm tra thiết bị.");
      return;
    }

    if (isMicOn) {
      // Tắt mic
      if (streamRef.current) {
        streamRef.current.getAudioTracks().forEach((track) => track.stop());
        setIsMicOn(false);
        message.info("Đã tắt mic");
      }
    } else {
      // Bật mic
      try {
        if (!streamRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: true, 
            video: isCameraOn 
          });
          streamRef.current = stream;
        } else {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          streamRef.current.addTrack(stream.getAudioTracks()[0]);
        }
        if (videoRef.current && isCameraOn) {
          videoRef.current.srcObject = streamRef.current;
        }
        setIsMicOn(true);
        message.success("Đã bật mic");
      } catch (error: any) {
        console.error("Lỗi khi truy cập micro:", error);
        handleMediaError(error);
      }
    }
  };

  // Xử lý lỗi khi truy cập media
  const handleMediaError = (error: any) => {
    if (error.name === "NotAllowedError") {
      message.error("Quyền truy cập bị từ chối. Vui lòng cấp quyền trong cài đặt trình duyệt.");
    } else if (error.name === "NotFoundError") {
      message.error("Không tìm thấy thiết bị. Vui lòng kiểm tra webcam/micro.");
      setWebcamAvailable(false);
      setMicAvailable(false);
    } else {
      message.error(`Lỗi: ${error.message}`);
    }
  };

  // Dừng stream khi component unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const toggleSplitMode = () => {
    setIsSplitMode((prev) => !prev);
  };

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  const endCall = () => {
    setIsConnected(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOn(false);
    setIsMicOn(true); // Reset mic về trạng thái mặc định
    message.info("Cuộc gọi đã kết thúc");
  };

  return (
    <div className="p-5 min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <Title level={3} className="text-center mb-5 text-white !text-2xl !font-bold">
        📹 Video Call 1-1
      </Title>

      <div
        className={`flex flex-1 ${
          isSplitMode ? "flex-row gap-5" : "flex-col items-center"
        } justify-center min-h-[calc(100vh-150px)] max-w-full`}
      >
        {/* Luồng video chính (Tarot Reader) */}
        <div
          className={`relative ${
            isSplitMode ? "w-1/2 h-[600px] max-w-[50%]" : "w-[800px] h-[600px] max-w-full"
          } rounded-lg overflow-hidden bg-black shadow-lg transition-all duration-300`}
        >
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center">
              <Avatar size={64} icon={<UserOutlined />} />
              <p className="mt-3">Đang chờ Tarot Reader tham gia...</p>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <img
                src="https://via.placeholder.com/800x600.png?text=Tarot+Reader+Video+Stream"
                alt="Tarot Reader Video"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm">
                {tarotReaderName}
              </div>
            </div>
          )}
        </div>

        {/* Luồng video phụ (Bạn) */}
        <Draggable disabled={isSplitMode}>
          <div
            className={`${
              isSplitMode
                ? "w-1/2 h-[600px] max-w-[50%] relative"
                : `absolute top-5 right-5 ${
                    isMinimized ? "w-[100px] h-[75px]" : "w-[200px] h-[150px]"
                  }`
            } rounded-md overflow-hidden bg-black shadow-md z-10 transition-all duration-300`}
          >
            <div className="relative w-full h-full">
              {isCameraOn && webcamAvailable ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted // Tắt tiếng local video để tránh echo
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-800 text-gray-400">
                  {webcamAvailable ? "Camera tắt" : "Không có webcam"}
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs">
                {userName}
              </div>
            </div>
          </div>
        </Draggable>
      </div>

      {/* Thanh điều khiển */}
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 p-3 rounded-lg shadow-lg z-20">
        <Space size="large">
          <Button
            icon={<VideoCameraOutlined />}
            onClick={toggleCamera}
            className={`text-white border-none transition-colors duration-300 ${
              isCameraOn ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={!webcamAvailable}
          >
            {isCameraOn ? "Tắt Camera" : "Bật Camera"}
          </Button>
          <Button
            icon={<AudioOutlined />}
            onClick={toggleMic}
            className={`text-white border-none transition-colors duration-300 ${
              isMicOn ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={!micAvailable}
          >
            {isMicOn ? "Tắt Mic" : "Bật Mic"}
          </Button>
          <Button
            icon={isSplitMode ? <ShrinkOutlined /> : <ExpandOutlined />}
            onClick={toggleSplitMode}
            className="bg-blue-500 hover:bg-blue-600 text-white border-none transition-colors duration-300"
          >
            {isSplitMode ? "Thu nhỏ" : "Chia đôi"}
          </Button>
          {!isSplitMode && (
            <Button
              icon={isMinimized ? <ExpandOutlined /> : <ShrinkOutlined />}
              onClick={toggleMinimize}
              className="bg-blue-500 hover:bg-blue-600 text-white border-none transition-colors duration-300"
            >
              {isMinimized ? "Phóng to" : "Thu nhỏ"}
            </Button>
          )}
          <Button
            icon={<PhoneOutlined />}
            onClick={endCall}
            className="bg-red-500 hover:bg-red-600 text-white border-none transition-colors duration-300"
          >
            Kết thúc
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default VideoCall;