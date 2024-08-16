"use client";

import React, { useEffect, useState } from "react";
import CommunityCard from "@/Components/CommunityCard/CommunityCard";
import AddComment from "@/Components/AddComment/AddComment";
import { useUser } from "@clerk/nextjs";
import RightSidebar from "@/Components/RightSideBar/RightSideBar";

interface FormattedPost {
  id: string;
  user: string;
  message: string;
  avatar: string;
  image: string;
  comments: number;
}

const Community = () => {
  const [posts, setPosts] = useState<FormattedPost[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('/api/comments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const resBody = await response.json();

        if (!response.ok) {
          throw new Error(resBody.message || "Error fetching comments");
        }

        const commentsArray = resBody.data;

        if (Array.isArray(commentsArray)) {
          const formattedPosts: FormattedPost[] = commentsArray.map((comment: any) => ({
            id: comment.id,
            user: comment.user?.fullname || "Anonymous",
            message: comment.text,
            avatar: comment.user?.photoUrl || user?.imageUrl || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            image: comment.imgUrl || "",
            comments: comment.childrenComments?.length || 0,
          }));

          setPosts(formattedPosts);
        } else {
          console.error('Unexpected response format:', resBody);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [user?.imageUrl]);

  const handleFavorite = (id: string) => {
    console.log(`Post ${id} marcado como favorito`);
  };

  const handleAddComment = (id: string) => {
    console.log(`Agregar comentario en post ${id}`);
  };

  const handleReply = (id: string) => {
    console.log(`Responder al post ${id}`);
  };

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col w-full">
      <header className="flex flex-row w-full justify-between items-center top-0 bg-white rounded-md p-4">
        <h1 className="text-4xl font-bold">Comunidad</h1>
      </header>
        <AddComment />
        <CommunityCard
          posts={posts}
          handleFavorite={handleFavorite}
          handleAddComment={handleAddComment}
          handleReply={handleReply}
        />
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Community;
