import { useState } from "react";
import { Box, Button, Container, Flex, Heading, Input, Stack, Text, useColorMode, useColorModeValue, IconButton, VStack, HStack, Textarea } from "@chakra-ui/react";
import { FaPlus, FaSun, FaMoon, FaTrash } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const addNote = () => {
    if (input.trim()) {
      setNotes([...notes, input]);
      setInput("");
    }
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4}>
        <Flex justifyContent="space-between" alignItems="center" w="full">
          <Heading mb={4}>Notes</Heading>
          <IconButton icon={colorMode === "light" ? <FaMoon /> : <FaSun />} onClick={toggleColorMode} aria-label="Toggle color mode" />
        </Flex>
        <HStack w="full">
          <Input placeholder="Add a new note" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && addNote()} />
          <Button leftIcon={<FaPlus />} onClick={addNote} colorScheme="blue">
            Add
          </Button>
        </HStack>
        <Stack spacing={4} w="full">
          {notes.map((note, index) => (
            <Flex key={index} p={4} bg={bgColor} color={textColor} rounded="md" justifyContent="space-between" alignItems="center">
              <Text>{note}</Text>
              <IconButton icon={<FaTrash />} onClick={() => deleteNote(index)} aria-label="Delete note" colorScheme="red" />
            </Flex>
          ))}
        </Stack>
      </VStack>
    </Container>
  );
};

export default Index;
