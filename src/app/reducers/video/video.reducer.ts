import { VideoActionTypes, VideoActions } from "./video.actions";
import { SelectedVideo, Video } from "./video.model";

export const initialState: SelectedVideo = { video: {comment:"", id:"",thumb:"",title:""} };

export const reducer = (state = initialState, action: VideoActions): SelectedVideo => {
  switch (action.type) {
    case VideoActionTypes.SetSelectedVideo:
      return state = action.payload;

    default:
      return state;
  }
};
