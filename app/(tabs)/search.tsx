import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import useFetch from "@/services/useFetch";
import { fetchPMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { SearchBar } from "react-native-screens";
import { icons } from "@/constants/icons";

const search = () => {
  const router = useRouter();

const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => fetchPMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary items-center justify-center">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar placeholder="Search movies ..." />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error?.message}
              </Text>
            )}

            {!loading &&
              !error &&
              "SEARCH TERM".trim() &&
              movies.length > 0 && (
                <>
                  <Text className="text-xl text-white font-bold">
                    Search Result For{" "}
                    <Text className="text-accent">SEARCH TERM</Text>
                  </Text>
                </>
              )}
          </>
        }
      />
    </View>
  );
};

export default search;
