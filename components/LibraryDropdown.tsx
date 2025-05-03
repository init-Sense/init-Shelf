import { cn } from "@/lib/utils/cn";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

interface LibraryDropdownProps {
	currentLibrary: string;
	onLibraryChange: (library: string) => void;
}

export const LibraryDropdown = ({
	currentLibrary,
	onLibraryChange,
}: LibraryDropdownProps) => {
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

	const selectShelf = (shelf: string): void => {
		onLibraryChange(shelf);
		setDropdownOpen(false);
	};

	return (
		<View className="relative">
			<Pressable
				className="flex flex-row items-center p-4"
				onPress={() => setDropdownOpen(!dropdownOpen)}
			>
				<Text className="font-bold text-3xl mr-2">{currentLibrary}</Text>
				<SvgXml
					xml={`
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `}
				/>
			</Pressable>

			{dropdownOpen && (
				<View className="absolute bottom-20 left-4 bg-white border z-10 w-full">
					{["books", "films", "games"].map((shelf) => (
						<Pressable
							key={shelf}
							className={cn(
								"px-4 py-3 border-b",
								currentLibrary === shelf && "bg-gray-100",
							)}
							onPress={() => selectShelf(shelf)}
						>
							<Text
								className={cn(
									"text-lg",
									currentLibrary === shelf && "font-bold",
								)}
							>
								{shelf}
							</Text>
						</Pressable>
					))}
				</View>
			)}
		</View>
	);
};
