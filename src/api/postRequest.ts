import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateInstance } from "../config/axios";
import { RootState } from "../config/store";
import { addPost } from "../features/postSlice";
import {
  generatePostFromUserInput,
  GetAllPosts,
  ImagePost,
  Post,
  PostData,
} from "../models/Post";
import { User } from "../models/User";
import { privateHttpService } from "../services/httpService";
import { serializeDate } from "../utils/helper";

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async ({ userId, limit = 5, page = 0 }: GetAllPosts, { rejectWithValue }) => {
    const currentPage = 1 + page;

    try {
      const responseData = await privateHttpService(privateInstance).get<
        Post[]
      >(`/post/?limit=${limit}&page=${currentPage}&id=${userId}`);

      return responseData;
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async (
    { postData, imageUrls }: { postData: PostData; imageUrls: ImagePost[] },
    { rejectWithValue, getState, dispatch }
  ) => {
    const { userState } = getState() as RootState;
    const body = getBody(postData);

    try {
      const responseData = await create(postData, body);

      createSyncPost(dispatch, postData, imageUrls, userState.userData!);

      return responseData;
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

const createSyncPost = (
  dispatch: any,
  postData: PostData,
  images: ImagePost[],
  userData: User
) => {
  const post = serializeDate<Post>(
    generatePostFromUserInput(postData, images, userData!)
  );

  dispatch(addPost(post));
};

const create = (postData: PostData, body: FormData | { content: string }) => {
  let response;

  if (!postData.hasImage) {
    response = createNewTextPost(body);
  } else {
    if (postData.imagePost.length > 0 && postData.imagePost.length < 2)
      response = createNewImagePost(body);
    else response = createNewMultipleImagePost(body);
  }

  return response;
};

const createNewTextPost = (body: FormData | { content: string }) => {
  return privateHttpService(privateInstance).post("/post/text", body);
};

const createNewImagePost = (body: FormData | { content: string }) => {
  return privateHttpService(privateInstance).post(`/post/image`, body, {
    "Content-Type": "multipart/form-data",
  });
};

const createNewMultipleImagePost = (body: FormData | { content: string }) => {
  return privateHttpService(privateInstance).post(`/post/images`, body, {
    "Content-Type": "multipart/form-data",
  });
};

const getBody = (body: PostData) => {
  if (!body.hasImage) return jsonBody(body);

  if (body.imagePost.length > 0 && body.imagePost.length < 2)
    return genFormData(body);
  else return genFormData(body);
};

const jsonBody = (body: PostData) => ({ content: body.content });

const genFormData = (body: PostData) => {
  let formData = new FormData();
  formData.append("content", body.content);
  if (body.imagePost.length > 1)
    body.imagePost.forEach((imagePost) => {
      formData.append("image_post", imagePost.value);
    });
  else formData.append("image_post", body.imagePost[0].value);

  return formData;
};
