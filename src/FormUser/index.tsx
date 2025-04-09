import { Box, Button, Center, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback } from "react";
import { api } from "../services/api";

export default function FormUser() {
  const form = useForm({
    mode: "uncontrolled",
    onSubmitPreventDefault: "always",
    initialValues: {
      name: "",
      email: "",
      document: "",
      birth_date: "",
      phone_number: "",
      address: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      birth_date: (value) =>
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value)
          ? null
          : "Data de Nascimento Inválida",
    },
  });

  const handleForm = useCallback(async (values: typeof form.values) => {
    const [dia, mes, ano] = values.birth_date.split("/");
    const parsedDate = `${ano}-${mes}-${dia}T00:00:00Z`;
    const body = { ...values, birth_date: parsedDate };
    console.log(body);
    const { data } = await api.post("/users", body);
    console.log(data)
  }, []);

  return (
    <Center bg="var(--mantine-color-gray-light)">
      <Box w={"70vw"} h={"100vh"}>
        <form onSubmit={form.onSubmit(handleForm)}>
          <TextInput
            withAsterisk
            label="Nome"
            placeholder="Nome Completo"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="Endereço"
            placeholder="Rua de tal, 1234"
            key={form.key("address")}
            {...form.getInputProps("address")}
          />
          <TextInput
            withAsterisk
            label="CPF"
            placeholder=""
            key={form.key("document")}
            {...form.getInputProps("document")}
          />
          <TextInput
            withAsterisk
            label="Telefone"
            placeholder=""
            key={form.key("phone_number")}
            {...form.getInputProps("phone_number")}
          />
          <TextInput
            withAsterisk
            label="Data de Nascimento"
            placeholder="02/03/1990"
            key={form.key("birth_date")}
            {...form.getInputProps("birth_date")}
          />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </Center>
  );
}
