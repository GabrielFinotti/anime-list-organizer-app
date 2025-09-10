import { AnimeFormData } from "@/components/layout/forms/animeForm/AnimeForm";
import { AnimeDTO } from "../dto/anime.dto";
import { CategoryDTO } from "../dto/category.dto";
import { GenreDTO } from "../dto/genre.dto";

class AnimeAPI {
  private _username = process.env.NEXT_PUBLIC_BASIC_USERNAME;
  private _password = process.env.NEXT_PUBLIC_BASIC_PASSWORD;
  private _apiUrl = process.env.NEXT_PUBLIC_API_URL;

  constructor() {
    this.verifyEnv();
  }

  static async getAnimeLookup(title: string) {
    const instance = new AnimeAPI();

    try {
      const response = await fetch(
        `${instance._apiUrl}/anime/lookup?title=${title}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Basic " + btoa(`${instance._username}:${instance._password}`),
          },
        }
      );

      return (await response.json()) as AnimeDTO;
    } catch (error) {
      throw error;
    }
  }

  static async getAnime(name?: string) {
    const instance = new AnimeAPI();

    try {
      if (!name) name = "";

      const response = await fetch(`${instance._apiUrl}/animes?name=${name}`, {
        method: "GET",
        headers: {
          Authorization:
            "Basic " + btoa(`${instance._username}:${instance._password}`),
        },
      });

      return (await response.json()) as AnimeDTO[];
    } catch (error) {
      throw error;
    }
  }

  static async getCategories() {
    const instance = new AnimeAPI();

    try {
      const response = await fetch(`${instance._apiUrl}/categories`, {
        method: "GET",
        headers: {
          Authorization:
            "Basic " + btoa(`${instance._username}:${instance._password}`),
        },
      });

      return (await response.json()) as CategoryDTO[];
    } catch (error) {
      throw error;
    }
  }

  static async getGenres() {
    const instance = new AnimeAPI();

    try {
      const response = await fetch(`${instance._apiUrl}/genres`, {
        method: "GET",
        headers: {
          Authorization:
            "Basic " + btoa(`${instance._username}:${instance._password}`),
        },
      });

      return (await response.json()) as GenreDTO[];
    } catch (error) {
      throw error;
    }
  }

  static async getAdultGenres() {
    const instance = new AnimeAPI();

    try {
      const response = await fetch(`${instance._apiUrl}/adult-genres`, {
        method: "GET",
        headers: {
          Authorization:
            "Basic " + btoa(`${instance._username}:${instance._password}`),
        },
      });

      return (await response.json()) as GenreDTO[];
    } catch (error) {
      throw error;
    }
  }

  static async createAnime(anime: AnimeFormData) {
    const instance = new AnimeAPI();

    try {
      const response = await fetch(`${instance._apiUrl}/animes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " + btoa(`${instance._username}:${instance._password}`),
        },
        body: JSON.stringify(anime),
      });

      return (await response.json()) as AnimeDTO;
    } catch (error) {
      throw error;
    }
  }

  private verifyEnv() {
    if (!this._username || !this._password || !this._apiUrl) {
      throw new Error("Missing environment variables");
    }
  }
}

export default AnimeAPI;
