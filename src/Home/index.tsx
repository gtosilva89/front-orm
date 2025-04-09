import { Box, Flex, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { api } from "../services/api";

let didInit = false; // evita duplo carregamento da API

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get("/users", {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(data);
      setData(data);
    }
    if (!didInit) {
      didInit = true;
      fetchData();
    }
  }, []);

  return (
    <Flex direction={"column"} rowGap={20}>
      {
        data.length > 0 &&
        data.map((user: any) => {
          // https://www.alura.com.br/artigos/formatar-datas-horas-moedas-javascript
          const [formatedDate] = new Date(user.birth_date)
            .toLocaleString('pt-BR', { timeZone: "UTC" })
            .split(",");

          return (
            <Box key={user.id}>
              <Text>{user.id} - {user.name}</Text>
              <Text>Data Nascimento: {formatedDate}</Text>
              <Text>Endereço: {user.address}</Text>
              <Text>Email: {user.email}</Text>
              <Text>Documento: {user.document}</Text>
            </Box>
          )
        })
      }
    </Flex>

  )
}