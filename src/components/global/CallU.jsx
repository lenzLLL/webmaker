import { useState } from 'react'
import AgoraUIKit from "agora-react-uikit";




import React from 'react'
import { Button } from '../ui/button';

export default function CallUi() {
    
const [videoCall, setVideoCall] = useState(true);

const rtcProps = {
    appId:'f778be966d8a4872b2cafda4db129050',
    channel: "calling",
};

const callbacks = {
    EndCall: () => setVideoCall(false),
};
    return  (
        <div style={{ display: "flex", width: "60vw", height: "85vh" }}>
          <AgoraUIKit  rtcProps={rtcProps} callbacks={callbacks} />
        </div>
      ) 
}
