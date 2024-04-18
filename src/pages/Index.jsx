import { useEffect, useState } from "react";
import { Box, Button, Container, Flex, Heading, Input, Stack, Text, useColorMode, useColorModeValue, IconButton, VStack, HStack, Textarea } from "@chakra-ui/react";
import { FaPlus, FaSun, FaMoon, FaTrash } from "react-icons/fa";

const fetchNotes = async () => {
  const response = await fetch("https://vdnhjxmsuykhvhnvjupi.supabase.co/rest/v1/notes", {
    headers: {
      "Content-Type": "application/json",
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmhqeG1zdXlraHZobnZqdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjIyNjUsImV4cCI6MjAyNTM5ODI2NX0.byaihexABIEbRtnd1-n8R33kkt4lIwcB1xsX6P6PUA8",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmhqeG1zdXlraHZobnZqdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjIyNjUsImV4cCI6MjAyNTM5ODI2NX0.byaihexABIEbRtnd1-n8R33kkt4lIwcB1xsX6P6PUA8",
    },
  });
  const data = await response.json();
  return data.map((note) => note.content);
};

const addNoteToDB = async (noteContent) => {
  await fetch("https://vdnhjxmsuykhvhnvjupi.supabase.co/rest/v1/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmhqeG1zdXlraHZobnZqdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjIyNjUsImV4cCI6MjAyNTM5ODI2NX0.byaihexABIEbRtnd1-n8R33kkt4lIwcB1xsX6P6PUA8",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmhqeG1zdXlraHZobnZqdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjIyNjUsImV4cCI6MjAyNTM5ODI2NX0.byaihexABIEbRtnd1-n8R33kkt4lIwcB1xsX6P6PUA8",
    },
    body: JSON.stringify({ content: noteContent }),
  });
};

const deleteNoteFromDB = async (noteId) => {
  await fetch(`https://vdnhjxmsuykhvhnvjupi.supabase.co/rest/v1/notes?id=eq.${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmhqeG1zdXlraHZobnZqdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjIyNjUsImV4cCI6MjAyNTM5ODI2NX0.byaihexABIEbRtnd1-n8R33kkt4lIwcB1xsX6P6PUA8",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmhqeG1zdXlraHZobnZqdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjIyNjUsImV4cCI6MjAyNTM5ODI2NX0.byaihexABIEbRtnd1-n8R33kkt4lIwcB1xsX6P6PUA8",
    },
  });
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  useEffect(() => {
    fetchNotes().then(setNotes);
  }, []);

  const addNote = async () => {
    if (input.trim()) {
      await addNoteToDB(input);
      const updatedNotes = await fetchNotes();
      setNotes(updatedNotes);
      setInput("");
    }
  };

  const deleteNote = async (index) => {
    const noteId = notes[index].id;
    await deleteNoteFromDB(noteId);
    const updatedNotes = await fetchNotes();
    setNotes(updatedNotes);
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
