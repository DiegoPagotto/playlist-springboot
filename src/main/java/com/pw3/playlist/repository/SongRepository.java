package com.pw3.playlist.repository;

import com.pw3.playlist.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface SongRepository extends JpaRepository<Song, UUID> {
}
