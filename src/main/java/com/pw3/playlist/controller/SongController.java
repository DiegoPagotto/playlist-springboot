package com.pw3.playlist.controller;

import com.pw3.playlist.dto.SongDTO;
import com.pw3.playlist.model.Song;
import com.pw3.playlist.service.SongService;
import org.apache.coyote.Response;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/song")
public class SongController {
    final SongService songService;

    public SongController(SongService songService) {
        this.songService = songService;
    }

    @PostMapping
    public ResponseEntity<Object> saveSong(@RequestBody @Valid SongDTO songDTO){
        var song = new Song();
        BeanUtils.copyProperties(songDTO, song);
        return ResponseEntity.status(HttpStatus.CREATED).body(songService.save(song));
    }

    @GetMapping
    public ResponseEntity<List<Song>> getAllSongs(){
        return ResponseEntity.status(HttpStatus.OK).body(songService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOneSong(@PathVariable(value = "id") UUID id){
        Optional<Song> songOptional= songService.findById(id);
        return songOptional.<ResponseEntity<Object>>map(song -> ResponseEntity.status(HttpStatus.OK).body(song))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Song not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteSong(@PathVariable(value = "id") UUID id){
        Optional<Song> songOptional = songService.findById(id);
        if(songOptional.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Song not found");

        songService.delete(songOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Song deleted successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateSong(@PathVariable(value = "id") UUID id,
                                             @RequestBody @Valid SongDTO songDTO){
        Optional<Song> songOptional = songService.findById(id);
        if(songOptional.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Song not found");

        var song = new Song();
        BeanUtils.copyProperties(songDTO, song);
        song.setId(songOptional.get().getId());
        return ResponseEntity.status(HttpStatus.OK).body(songService.save(song));
    }
}
