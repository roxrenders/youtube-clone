import React, { useContext, useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import ReactPlayer from "react-player/youtube";
import {AiOutlineLike} from "react-icons/ai";
import {abbreviateNumber} from "js-abbreviation-number";

import { fetchDataFromApi} from "../utils/api";
import { Context } from "../context/contextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";
 
const VideoDetails = () => {
  
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const {id} = useParams();
  const {setLoading} = useContext(Context);

  useEffect(()=>{
    document.getElementById("root").classList.add("custom-h")
    fetchVideoDetails();
    fetchRelatedVideos();
  },[id])

  const fetchVideoDetails = ()=>{
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res)=>{
      console.log(res);
      setVideo(res);
      setLoading(false);
    })
  }

  const fetchRelatedVideos = ()=>{
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res)=>{
      console.log(res);
      setRelatedVideos(res);
      setLoading(false);
    })
  }
  
  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-400px)] xl:w-[calc(100%-450px)] px-4 py-4 lg:py-6 ">
          <div className="h-[200px] md:h-[400px] lg:h-[350px] xl:h-[430px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0" >
            <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
            height="100%"
            width="100%"
            style={{backgroundColor: "#0000"}}
            playing={true}
            />
          </div>

          <div className=' text-white text-sm md:text-xl mt-4 font-bold line-clamp-2 ml-3 ' >
                {video?.title}
          </div>

          <div className="flex flex-col justify-between md:flex-row mt-4 ">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img 
                   className='h-full  w-full object-cover'
                   src={video?.author?.avatar[0]?.url} 
                   />
                </div>
              </div>

              <div className="flex flex-col ml-3">
                <div className="text-white text-md font-semibold flex items-center ">
                   
                   {video?.author?.title}
                <span className='ml-1'>{video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className='text-white/[0.5] text-[12px] ml-1'/>
                )}</span>
                </div>

                <div className="text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>
            <div className="flex text-white mt-4 md:mt-0">
              <div className="flex bg-white/[0.15] items-center h-11 px-6 justify-center rounded-3xl" >
                <AiOutlineLike className="text-xl font-bold mr-2 h-5 w-6 text-white ml-2"  />
                <span>{`${abbreviateNumber(video?.stats?.likes, 5) } Likes`}</span>
              </div>
              <div className="flex rounded-3xl bg-white/[0.15] items-center h-11 px-6 justify-center ml-4 " >
                
                <span>{`${abbreviateNumber(video?.stats?.views, 2) } Views`}</span>
              </div>
            </div>
          </div>
                  
        </div>

        <div className="flex flex-col py-6 px-4 lg:w-[340px] xl:w-[400px] lg:sticky lg:top-[20px] lg:h-[calc(100vh-20px)] related-videos-container overflow-y-auto scrollbar-hide">
  {relatedVideos?.contents?.map((item, index) => {
    if (item?.type !== "video") return false;
    return <SuggestionVideoCard key={index} video={item?.video} />;
  })}
</div>

      </div>
    </div>
  )
}

export default VideoDetails

