import "./global.css";
import "@/app/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, usePathname, useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { cn } from "@/lib/utils/cn";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const { navigate } = useRouter();
  const pathname = usePathname();

  return (
    <GluestackUIProvider mode="light">
      <QueryClientProvider client={queryClient}>
        <VStack className="h-screen pt-[4vh]">
          <Slot />
          <HStack
            space="md"
            className="pb-10 pt-2 items-center justify-center bg-neutral-200"
          >
            <Button
              className={cn(
                "flex flex-col items-center h-fit w-24 p-2",
                pathname.startsWith("/library") ? "bg-black" : "bg-neutral-200",
              )}
              onPress={() => navigate("/(tabs)/library")}
            >
              <Ionicons
                name="library-outline"
                size={20}
                color={pathname.startsWith("/library") ? "white" : "black"}
              />
              <Text
                className={cn(
                  pathname.startsWith("/library") ? " text-white" : "",
                )}
              >
                library
              </Text>
            </Button>
            <Button
              className={cn(
                "flex flex-col items-center h-fit w-24 p-2",
                pathname.startsWith("/search") ? "bg-black" : "bg-neutral-200",
              )}
              onPress={() => navigate("/(tabs)/search")}
            >
              <Ionicons
                name="search"
                size={20}
                color={pathname.startsWith("/search") ? "white" : "black"}
              />
              <Text
                className={cn(
                  pathname.startsWith("/search") ? " text-white" : "",
                )}
              >
                search
              </Text>
            </Button>
            <Button
              className={cn(
                "flex flex-col items-center h-fit w-24 p-2",
                pathname.startsWith("/queue") ? "bg-black" : "bg-neutral-200",
              )}
              onPress={() => navigate("/(tabs)/queue")}
            >
              <Ionicons
                name="bookmark-outline"
                size={20}
                color={pathname.startsWith("/queue") ? "white" : "black"}
              />
              <Text
                className={cn(
                  pathname.startsWith("/queue") ? " text-white" : "",
                )}
              >
                queue
              </Text>
            </Button>
            <Button
              className={cn(
                "flex flex-col items-center h-fit w-24 p-2",
                pathname.startsWith("/dashboard")
                  ? "bg-black"
                  : "bg-neutral-200",
              )}
              onPress={() => navigate("/(tabs)/dashboard")}
            >
              <AntDesign
                name="user"
                size={20}
                color={pathname.startsWith("/dashboard") ? "white" : "black"}
              />
              <Text
                className={cn(
                  pathname.startsWith("/dashboard") ? " text-white" : "",
                )}
              >
                dashboard
              </Text>
            </Button>
          </HStack>
        </VStack>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
