package com.pw3.playlist.dto;

import javax.validation.constraints.NotBlank;

public class SongDTO {
    @NotBlank
    private String name;
    @NotBlank
    private String artist;
    private Integer duration;
    @NotBlank
    private String album;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }
}
