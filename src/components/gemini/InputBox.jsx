"use client"
import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import React from "react";
import { Progress } from "@/components/ui/progress"
import Loading from "../global/loading";
const InputBox = ({ sendMessage, loading }) => {
  const [input, setInput] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      sendMessage(input);
      setInput("");
    }
  };
  const [progress, setProgress] = React.useState(13)
 
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(1000), 500)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="input-box ">
      {loading && <div style={{margin:"10px auto",}} className="mx-auto m-5"><Loading/></div>}

      <input
        disabled={loading}
        type="text"
        className="w-full rounded-md py-4 outline-none px-6"
        placeholder="Type a message..."
        value={loading ? "Loading..." : input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default InputBox;
