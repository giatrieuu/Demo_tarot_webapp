import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";
import { Typography, Spin, Button, message } from "antd";
import { useSelector } from "react-redux"; // Import useSelector để lấy dữ liệu từ Redux
import { fetchLiveKitToken } from "../services/livekitService";
import { RootState } from "../redux/store";


const { Title } = Typography;

const VideoCall: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy userName và userId từ Redux

  const userId = useSelector((state: RootState) => state.auth.userId);

  // Tạo userName theo định dạng user_userId
  const formattedUserName = userId ? `user_${userId}` : "default_user";

  useEffect(() => {
    if (!bookingId) {
      message.error("Không tìm thấy booking ID!");
      navigate("/mybooking");
      return;
    }

    if (!formattedUserName) {
      message.error("Không tìm thấy thông tin người dùng!");
      navigate("/mybooking");
      return;
    }

    const loadToken = async () => {
      setLoading(true);
      const data = await fetchLiveKitToken(bookingId, formattedUserName);

      if (!data) {
        setError("Không thể lấy token LiveKit từ server!");
        setLoading(false);
        return;
      }

      setToken(data.token);
      setServerUrl(data.serverUrl);
      setLoading(false);
    };

    loadToken();
  }, [bookingId, formattedUserName, navigate]);

  const handleDisconnected = (reason: string) => {
    if (reason.includes("invalid token")) {
      setError("Token không hợp lệ! Vui lòng kiểm tra lại.");
      message.error("Token không hợp lệ! Vui lòng kiểm tra lại.");
    } else {
      message.info("Đã ngắt kết nối khỏi video call.");
    }
    navigate("/mybooking");
  };

  const handleConnected = () => {
    message.success("Đã kết nối thành công đến video call!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !token || !serverUrl) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography.Text type="danger">
          {error || "Không thể lấy token hoặc server URL để bắt đầu video call!"}
        </Typography.Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Title level={3} className="text-center text-black pt-6">
        📹 Video Call - Booking ID: {bookingId}
      </Title>
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={serverUrl}
        data-lk-theme="default"
        style={{ height: "calc(100vh - 60px)" }}
        onConnected={handleConnected}
        onDisconnected={handleDisconnected}
      >
        <MyVideoConference />
        <RoomAudioRenderer />
        <ControlBar />
        <Button
          type="default"
          onClick={() => navigate("/mybooking")}
          style={{ position: "absolute", bottom: "20px", left: "20px" }}
        >
          Thoát
        </Button>
      </LiveKitRoom>
    </div>
  );
};

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height) - 60px)" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}

export default VideoCall;