import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import useFetch from "@/services/useFetch";
import { fetchPMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/searchBar";

const search = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchPMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary ">
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
              <SearchBar
                placeholder="Search movies ..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
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

            {!loading && !error && searchQuery.trim() && movies.length > 0 && (
              <>
                <Text className="text-xl text-white font-bold">
                  Search Result For{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              </>
            )}
          </>
        }
        ListEmptyComponent={
        !error && !loading ? (
          <>
          <View className="mt-10 px-5">
<Text className="text-gray-500 text-center">
{searchQuery.trim() ? 'No movies found for this search.' : 'Search for movies or series using the search bar above.'}
</Text>
          </View>
          </>
        ):null
     }
      />
    </View>
  );
};

export default search;
