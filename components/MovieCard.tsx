import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
  adult,
}: Movie) => {
  console.log(poster_path);
  return (
    <>
      <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className="w-[30%] ">
          <Image
            source={{
              uri: poster_path
                ? `https://tmdb.org/t/p/w500${poster_path}`
                : "https://placehold.co/600x400/1a1a1a/ffffff.png",
            }}
            className="w-full h-52 rounded-lg"
          />
          <Text numberOfLines={1} className="text-white text-sm font-bold mt-2">{title}</Text>
          <View className="flex-row items-center justify-start gap-x-1 ">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white text-xs font-bold uppercase">
              {Math.round(vote_average / 2)}
            </Text>
                 </View>
            <View className="flex-row items-center justify-between ">
              <Text className="text-xs text-light-300 font-medium mt-1">
                {release_date?.split("-")[0]}
              </Text>
              <Text className="text-light-300 font-medium text-xs">{adult ? "+18":"+5"}</Text>
            </View>     
        </TouchableOpacity>
      </Link>
    </>
  );
};

export default MovieCard;
