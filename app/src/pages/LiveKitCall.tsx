"use client";
import React, { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { useSearchParams } from "next/navigation";

const LiveKitCall: React.FC = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");
  const username = searchParams.get("username");

  const [token, setToken] = useState<string | null>(null);
  const [serverUrl, setServerUrl] = useState<string | null>(process.env.NEXT_PUBLIC_LIVEKIT_URL);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!roomId || !username) {
      setLoading(false);
      return;
    }

    fetch(`/api/livekit?room=${roomId}&username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        setToken(data.token);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy LiveKit token:", error);
        setLoading(false);
      });
  }, [roomId, username]);

  if (loading) return <p>🔄 Đang kết nối...</p>;
  if (!token || !serverUrl) return <p>❌ Không thể kết nối đến LiveKit</p>;

  return (
    <LiveKitRoom serverUrl={serverUrl} token={token} connect>
      <VideoConference />
    </LiveKitRoom>
  );
};

export default LiveKitCall;
