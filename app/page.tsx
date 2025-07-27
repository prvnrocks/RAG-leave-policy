import Image from "next/image";
import ChatBox from "./chatbox/page";
import UploadDocument from "./upload/page";

export default function Home() {
  return (
    <div className="font-sans grid grid-cols-3 items-center justify-items-center min-h-screen sm:p-2">
      <div>
        <UploadDocument />
      </div>
      <div className="col-span-2 w-full h-full" >
        <ChatBox />
      </div>
    </div>
  );
}
