import { useEffect, useRef } from "react";

const useWebSocket = (url: string) => {
  const wsRef = useRef<WebSocket>();

  useEffect(() => {
    if (!wsRef.current) {
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        console.log("WebSocket connection opened");
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket connection closed");
      };

      wsRef.current.onmessage = (event) => {
        console.log("Message from server:", event.data);
      };
    }

    return () => {};
  }, [url]);

  return wsRef.current;
};

export default useWebSocket;
