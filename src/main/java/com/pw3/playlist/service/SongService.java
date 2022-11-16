package com.pw3.playlist.service;

import com.pw3.playlist.model.Song;
import com.pw3.playlist.repository.SongRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SongService {
    final SongRepository songRepository;

    public SongService(SongRepository songRepository) {
        this.songRepository = songRepository;
    }
    @Transactional
    public Song save(Song song) {
        return songRepository.save(song);
    }

    public List<Song> findAll() {
        return songRepository.findAll();
    }

    public Optional<Song> findById(UUID id) {
        return songRepository.findById(id);
    }
    @Transactional
    public void delete(Song song) {
        songRepository.delete(song);
    }
}
