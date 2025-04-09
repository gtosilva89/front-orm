import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Home from "./Home";
import FormUser from "./FormUser";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <FormUser />
      <Home />
    </MantineProvider>
  );
}
