"use client";
import * as React from "react";
import axios from "axios";
import { Pokemon } from "../../interfaces/pokemon";
import PokemonListCard from "./PokemonListCard";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchPokemons = async () => {
    try {
      const response = await axios.get<Pokemon[]>(
        "http://localhost:4000/api/pokemon"
      );
      setPokemons(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error al obtener los datos");
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div>
      <Container sx={{ padding: "0px !important" }}>
        <Box
          component="div"
          sx={{
            display: "flex",
          }}
        >
          <Typography variant="h5">Select your pokemon</Typography>
        </Box>
        <Box
          component="div"
          sx={{
            marginTop: "1rem",
            height: '179px'
          }}
        >
          {loading ? (
            <Grid sx={{display: 'flex' , flexDirection: 'row', justifyContent:'space-between'}}>
              <Skeleton variant="rectangular" width={211} height={155} />
              <Skeleton variant="rectangular" width={211} height={155} />
              <Skeleton variant="rectangular" width={211} height={155} />
              <Skeleton variant="rectangular" width={211} height={155} />
              <Skeleton variant="rectangular" width={211} height={155} />
            </Grid>
          ) : (
            <Grid container sx={{ flexWrap: "nowrap" }} spacing={3}>
              {pokemons.map((pokemon, index) => (
                <Grid item xs={10} sm={5} md={3} key={index}>
                  <PokemonListCard key={index} pokemon={pokemon} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default PokemonList;
