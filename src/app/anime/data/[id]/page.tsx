"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import style from "./page.module.scss";
import AnimeForm, {
  AnimeFormData,
} from "@/components/layout/forms/animeForm/AnimeForm";
import AnimeAPI from "@/lib/api/animeApi";
import { AnimeDTO } from "@/lib/dto/anime.dto";
import Loader from "@/components/ui/loaders/Loader";

const mapDtoToFormData = (dto: AnimeDTO): Partial<AnimeFormData> => {
  return {
    name: dto.name,
    synopsis: dto.synopsis,
    category: { name: dto.category?.name || "" },
    genres: dto.genres?.map((g) => ({ name: g.name })) || [],
    adultGenres: dto.adultGenres?.map((g) => ({ name: g.name })) || [],
    typeOfMaterialOrigin: dto.typeOfMaterialOrigin,
    materialOriginName: dto.materialOriginName,
    releaseDate: dto.releaseDate?.substring(0, 10),
    isMovie: dto.isMovie,
    isAdult: dto.isAdult,
    derivate: dto.derivate || { movies: [], ovas: [], specials: [] },
    lastReleaseSeason: dto.lastReleaseSeason,
    lastWatchedSeason: dto.lastWatchedSeason,
    lastWatchedEpisode: dto.lastWatchedEpisode,
    actualStatus: dto.actualStatus,
    status: dto.status,
  };
};

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [initialData, setInitialData] = useState<Partial<AnimeFormData> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const fetchAnime = useCallback(async () => {
    if (!id) return;

    setLoading(true);

    try {
      const dto = await AnimeAPI.getAnimeById(id);

      setInitialData(mapDtoToFormData(dto));
    } catch (err) {
      console.error("Erro ao carregar anime:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAnime();
  }, [fetchAnime]);

  const handleDelete = async () => {
    if (!id) return;

    if (!confirm("Tem certeza que deseja excluir este anime?")) return;

    setDeleting(true);

    try {
      const ok = await AnimeAPI.deleteAnime(id);

      if (ok) {
        router.push("/anime/list");
      }
    } catch (err) {
      console.error("Erro ao excluir anime:", err);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loader message="Carregando dados do anime..." />;

  if (!initialData) return <p>Anime não encontrado.</p>;

  return (
    <>
      <AnimeForm
        initialData={initialData}
        animeId={id}
        onUpdated={() => fetchAnime()}
      />
      <div className={style.deleteContainer}>
        <button
          className={style.deleteButton}
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Excluindo..." : "Excluir"}
        </button>
      </div>
    </>
  );
};

export default Page;
