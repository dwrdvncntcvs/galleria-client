import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateInstance } from "../config/axios";
import { GetAllPosts, Post, PostData } from "../models/Post";
import { privateHttpService } from "../services/httpService";

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (
    { userId, limit = 10, page = 0 }: GetAllPosts,
    { rejectWithValue }
  ) => {
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
  async (postData: PostData, { rejectWithValue }) => {
    const body = getBody(postData);

    try {
      let responseData;
      if (!postData.hasImage) {
        responseData = await createNewTextPost(body);
      } else {
        if (postData.imagePost.length > 0 && postData.imagePost.length < 2)
          responseData = await createNewImagePost(body);
        else responseData = await createNewMultipleImagePost(body);
      }

      console.log(responseData);

      return responseData;
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

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

  formData.forEach((value) => console.log("Value: ", value));
  return formData;
};
