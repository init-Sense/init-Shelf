import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Icon, PlayIcon, SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { KeyboardAvoidingView, Platform } from "react-native";

const SearchIndexRoute = () => {
	const focusInput = (inputElement: { focus: () => void }) => {
		if (inputElement) {
			setTimeout(() => inputElement.focus(), 100);
		}
	};

	return (
		<Box className="flex-1 justify-end">
			<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={40}>
				<Box
					className="flex flex-row justify-between items-center gap-[10px] p-4"
					style={{
						boxShadow: "0 -4px 32px 0 rgba(0, 0, 0, 0.12)",
					}}
				>
					<Input
						className="h-[44px] flex-1 bg-white rounded-xl"
						variant="outline"
						size="md"
						isDisabled={false}
						isInvalid={false}
						isReadOnly={false}
					>
						<InputField ref={focusInput} placeholder="search for a book" />
						<InputSlot className="pr-4">
							<InputIcon color={"black"} as={SearchIcon} />
						</InputSlot>
					</Input>
					<Button className="rounded-xl h-[44px] px-4">
						<Icon color={"white"} as={PlayIcon} />
					</Button>
				</Box>
			</KeyboardAvoidingView>
		</Box>
	);
};

export default SearchIndexRoute;
