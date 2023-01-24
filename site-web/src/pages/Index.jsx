import React, { useState, useEffect, useContext } from "react";
import Playlist from "../components/Playlist";
import Song from "../components/Song";
import SearchBar from "../components/SearchBar";
import PlaylistContext from "../contexts/PlaylistContext";

export default function Index() {
  const api = useContext(PlaylistContext).api;
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    api
     .fetchAllPlaylists() 
      .then((playlists) => setPlaylists(playlists))
      .catch(() => setPlaylists([]));
    // DONE : récupérer les chansons du serveur
    api
      .fetchAllSongs()
      .then((songs) => setSongs(songs))
      .catch(() => setSongs([]));
    
  }, []);

  /**
   * DONE : implémenter la recherche et la mise à jour de l'interface
   * Effectue une recherche par mot clé sur le serveur.
   * Si exactMatch = true, la recherche est sensible à la case
   * @param {Event} event evenement de soumission à bloquer pour ne pas rafraichir la page
   * @param {string} query mot clé pour la recherche
   * @param {boolean} exactMatch si true, la recherche est sensible à la case
   */
  const handleSearch = async (event, query, exactMatch) => {
    event.preventDefault();
    // DONE : implémenter la recherche et la mise à jour de l'interface
    const content = await api.search(query,exactMatch); // returns {playlists: [], songs: []}
    setPlaylists(content.playlists);
    setSongs(content.songs);
    };

  return (
    <>
      <main id="main-area" className="flex-column">
        <SearchBar handleSearch={handleSearch}></SearchBar>
        <div id="playlist-list">
          <h1>Mes Playlists</h1>
          <section id="playlist-container" className="playlist-container">
            {playlists.map((playlist) => (
              <Playlist key={playlist.id} playlist={playlist} />
            ))}
          </section>
        </div>
        <div id="songs-list">
          <h1>Mes Chansons</h1>
          {/*DONE : afficher les chansons dans la page*/
          songs.map((song) => (
              <Song key={song.id} song={song} />
            ))}
        </div>
      </main>
    </>
  );
}
